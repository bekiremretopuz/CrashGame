import { Scene } from "./../Helper/StageManager";
import { AssetsLoader } from "./../Helper/AssetsLoader";
export declare class LoaderStage extends Scene {
    private _backgroundImageDefault;
    private _assetLoader;
    private _loadingSprite;
    private _loadingProgressText;
    private _game;
    constructor();
    awake(): void;
    private completeLoadAsset;
    private loadingAnimation;
    readonly assetsLoader: AssetsLoader;
    killScene(): void;
}
