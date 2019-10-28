import { Scene } from "app/Helper/StageManager";
import { Animations } from "app/View/Animations";
import { Dimmer } from "app/View/Dimmer"; 
export class BaseGame extends Scene {
    private _animations: Animations;
    private _dimmer: Dimmer;
    private _backgroundImageDefault: PIXI.Sprite;
    private _shadow: PIXI.Sprite;
    private _shadow1: PIXI.Sprite;
    constructor() {
        super();
        console.log("%cCurrent GameClient Version: 1.0.26", 'background: #222; color: #bada55');
    }

    public awake(): void {
        this.position.x = 380;
        //Green Background Image. 
        this._backgroundImageDefault = new PIXI.Sprite(PIXI.Texture.from("background"));
        this._backgroundImageDefault.anchor.set(0.5, 0.5);
        this._backgroundImageDefault.position.set(960, 707);
        this._backgroundImageDefault.name = "BackgroundImage";
        this.addChild(this._backgroundImageDefault);

        //Animations initiliaze
        this._animations = new Animations();
        this.addChild(this._animations);

        this._shadow = new PIXI.Sprite(PIXI.Texture.from("shadow"));
        this._shadow.anchor.set(0.5, 0.5);
        this._shadow.scale.set(-5.5, 1.2);
        this._shadow.position.set(-253, 680);
        this._shadow.name = "Shadow";
        this.addChild(this._shadow);

        this._shadow1 = new PIXI.Sprite(PIXI.Texture.from("shadow"));
        this._shadow1.anchor.set(0.5, 0.5);
        this._shadow1.scale.set(5.5, 1.2);
        this._shadow1.position.set(2180, 680);
        this._shadow1.name = "Shadow1";
        this.addChild(this._shadow1);

        //Reload game dimmer initiliaze
        this._dimmer = new Dimmer();
        this.addChild(this._dimmer.dimmerContainer);
        this._dimmer.closeDimmer();

        this.initEvents();
    }

    private initEvents(): void {
        this._animations.on("animationstatus", this.onAnimationStatus, this);
        this._dimmer.on("dimmeraction", this.onAnimationStatus, this);
    }


    private onAnimationStatus(action: any, value: any): void {
        switch (action) {
            case "crashed":
                switch (value) { //Başka işlemlerde olabilir. Böyle kalabilir.
                    case true:
                        this._dimmer.resolveDimmer(true);
                        break;
                    case false:
                        this._dimmer.resolveDimmer(false);
                        break;
                }
                break;
            case "dimmer":
                switch (value) {
                    case true:
                        this._animations.resumeAnimation();
                        this._animations.multiplierText.visible = false;
                        break;
                    case false:
                        this._animations.multiplierText.visible = true;
                        break;
                }
                break;
            case "startGame":
                this._animations.finishIdlePreparing();
                break;
            case "startGame2":
                this._animations.finishIdlePreparing2();
                break; 
        }
    }

    public killScene(): void {
        //Destroy scene.
    }

    //GETTER AND SETTER
    public get animationController(): Animations {
        return this._animations;
    }

    public get dimmer(): Dimmer {
        return this._dimmer;
    }
}