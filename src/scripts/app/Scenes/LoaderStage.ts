import { TweenMax, Power0 } from "gsap";
import { Scene } from "app/Helper/StageManager";
import { AssetsLoader } from "app/Helper/AssetsLoader";
import { Base } from "app/EntryPoint";
import { BaseGame } from "./BaseGame";
import { Base64Sprite } from "app/Display/Base64Sprite";
import { loadingSprite } from "app/Helper";

export class LoaderStage extends Scene { //If a class is taken extends from the Scene, that class has to contain two functions.(awake, killScene)
    private _backgroundImageDefault: PIXI.Graphics;
    private _assetLoader: AssetsLoader; // Asset loader utils.
    private _loadingSprite: Base64Sprite;
    private _game: Base.EntryPoint;
    private _cdnUrl: string;
    constructor(cdnUrl: string) {
        super();
        this._cdnUrl = cdnUrl;
        this._game = Base.EntryPoint.instance;
    }

    public awake(): void {
        this.visible = false;
        //Green Background Image.
        this._backgroundImageDefault = new PIXI.Graphics().beginFill(0xffffff, 0.65).drawRect(0, 0, 1920, 1414).endFill();
        this._backgroundImageDefault.name = "BackgroundImageDef";
        this.addChild(this._backgroundImageDefault);

        //Circle loading Sprite
        this._loadingSprite = new Base64Sprite(loadingSprite, { x: 960, y: 707 });
        this._loadingSprite.anchor.set(0.5, 0.5);
        this._loadingSprite.name = "LoadingSprite";
        this.addChild(this._loadingSprite);

    
    }

    private completeLoadAsset(): void { //When the assets have finished loading, the game scene opens.
        this.emit("completeLoadAsset");
      
    }

    private loadingAnimation(): void { //The animation starts after the installation of the high important assets for the opening of the game is finished.
        const loadingAnimation: TweenMax = TweenMax.to(this._loadingSprite, 0.01, {
            rotation: 360, yoyo: true, ease: Power0.easeNone, repeat: -1,
            onUpdate: () => {
                //this._loadingProgressText.text ="Loader Stage\nLoading..\n      " + this._assetLoader.loadingProgress.toFixed(2);
            }
        });
    }

    public get assetsLoader(): AssetsLoader {
        return this._assetLoader;
    }

    public killScene(): void {

    }
}