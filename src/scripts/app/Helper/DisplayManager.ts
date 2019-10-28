import {
    Dom,
    PixiAppWrapper as Wrapper,
    pixiAppWrapperEvent as WrapperEvent,
    PixiAppWrapperOptions as WrapperOpts,
} from "pixi-app-wrapper";
import { ticker } from "pixi.js";

export class DisplayManager extends PIXI.utils.EventEmitter {
    private _app: Wrapper;
    private _rootContainer: PIXI.Container;
    private _orientation: boolean = false;
    private _clientWidth: number = 0;
    private _clientHeight: number = 0;
    private _scaleX: number = 1;
    constructor(rootContainer: PIXI.Container) {
        super();
        this._rootContainer = rootContainer;
    }

    public create(canvasName: string) {
        const canvas = Dom.getElementOrCreateNew<HTMLCanvasElement>(canvasName, "canvas", document.getElementById("app-root"));
        const appOptions: WrapperOpts = {
            width: 2686,
            height: 1414,
            scale: "keep-aspect-ratio",
            align: "top-center",
            resolution: window.devicePixelRatio || 1,
            antialias: true,
            roundPixels: true,
            transparent: false,
            backgroundColor: 0x000000,
            view: canvas,
            showFPS: true,
            showMediaInfo: false,
            changeOrientation: true,
        };
        this._app = new Wrapper(appOptions);
        this._app.on(WrapperEvent.RESIZE_END, this.onResizeEnd.bind(this));
        this.onResizeEnd.bind(this);
        this._app.stage.addChild(this._rootContainer);
    }

    public resolveFpsMeterVisibility(isShow: boolean): void {
        switch (isShow) {
            case true:
                this._app.fps.show();
                break;
            case false:
                this._app.fps.hide();
                break;
        }
    }

    private onResizeEnd(args: any): void {
        this.emit("resize", args.stage.size.width, args.stage.size.height);
        this.clientWidth = args.stage.size.width;
        this.scaleX = args.stage.scale.x;
        this.clientHeight = args.stage.size.height;
        setTimeout(() => {
            this.emit("orientationchanged");
        }, 100);

    }

    //GETTER AND SETTER
    public get stageContainer(): PIXI.Container {
        return this._app.stage;
    }

    public get scaleX(): number {
        return this._scaleX;
    }

    public set scaleX(value: number) {
        this._scaleX = value;
    }

    public get orientation(): boolean {
        return this._orientation;
    }

    public set orientation(value: boolean) {
        this._orientation = value;
        this.emit("orientationchanged", value);
    }

    public get clientWidth(): number {
        return this._clientWidth;
    }

    public set clientWidth(value: number) {
        this._clientWidth = value;
    }

    public get clientHeight(): number {
        return this._clientHeight;
    }

    public set clientHeight(value: number) {
        this._clientHeight = value;
    }

    public get ticker(): ticker.Ticker {
        return this._app.ticker;
    }
}