import { TweenLite, Linear } from "gsap";

export class Dimmer extends PIXI.utils.EventEmitter {
    private _dimmerContainer: PIXI.Container = new PIXI.Container();
    private _mask: PIXI.Sprite;
    private _whiteMask: PIXI.Graphics;
    private _timeText: PIXI.Text;
    private _time: any;
    constructor() {
        super();
        this.init();
    }
    private init(): void {
        let mask = new PIXI.Graphics().beginFill(0x000000, 0.85).drawCircle(0, 0, 1480).endFill();
        this._mask = new PIXI.Sprite(mask.generateCanvasTexture());
        this._mask.position.set(961, 713);
        this._mask.scale.set(0.01, 0.01);
        this._mask.anchor.set(0.5, 0.5);
        this._mask.name = "GameMask";

        this._dimmerContainer.addChild(this._mask);
        this._whiteMask = new PIXI.Graphics().beginFill(0x000000, 0).drawCircle(960, 712, 180).endFill();
        this._whiteMask.name = "whiteMask";
        this._dimmerContainer.addChild(this._whiteMask);

        //MultiplierText
        this._timeText = new PIXI.Text("5", {
            fontFamily: "Luckiest Guy",
            fontSize: 300,
            fontWeight: "600",
            fill: "#ffffff",
            align: "center", 
        });
        this._timeText.position.set(960, 670);
        this._timeText.anchor.set(0.5, 0.5);
        this._timeText.name = "TimeText";
        this._dimmerContainer.addChild(this._timeText); 
    }

    private maskAnimation(): void {
        this._mask.alpha = 0.85;
        this._mask.scale.set(0.01, 0.01);
        TweenLite.to(this._mask.scale, 0.35, {
            x: 1, y: 1,
            onComplete: () => {
                TweenLite.to(this._mask, 0.35, {
                    alpha: 0, onComplete: () => { 
                    }
                });
            }
        });
    }

    public resolveDimmer(isShow: boolean): void {
        switch (isShow) {
            case true:
                TweenLite.to(this._dimmerContainer, 0.25, {
                    alpha: 0.8,
                    onStart: () => {
                        this.setTimeText(5);
                        this.time = 5;
                        this.emit("dimmeraction", "dimmer", true);
                    }
                });
                break;
            case false:
                TweenLite.to(this._dimmerContainer, 0.25, {
                    alpha: 0,
                    onStart: () => {
                    }
                });
                break;
        }
    }

    public closeDimmer(): void {
        this._dimmerContainer.alpha = 0;
        this.emit("dimmeraction", "dimmer", false);
    }

    private resolveTiming(value: any): void {
        if (value == 5) {
            this.emit("dimmeraction", "timestart");
            this.emit("dimmeraction", "startGame");
        }
        if(value == 1){ 
            this.emit("dimmeraction", "startGame2");
        }
        TweenLite.to(this._timeText.scale, 0.125, {
            x: 1, y: 1, onComplete: () => {
                TweenLite.to(this._timeText.scale, 0.125, {
                    x: 1.5, y: 1.5, onComplete: () => {
                        if (value.toFixed() == 0) {
                            this.closeDimmer();
                            this.emit("dimmeraction", "timezero");
                        }
                    }
                });
            }
        });
    }

    //GETTER AND SETTER
    public get dimmerContainer(): PIXI.Container {
        return this._dimmerContainer;
    }

    public setTimeText(value: any) {
        this.maskAnimation();
        this._timeText.text = value + "";
        this.time = value;
    }

    public set time(value: any) {
        if (this._time != value) {
            this._time = value;
            this.resolveTiming(value);
        }
    }

    public get time(): any {
        return this._time;
    }
}