import { LoaderStage } from "./Scenes/LoaderStage";
import { StageManager } from "./Helper/StageManager";
import { DisplayManager } from "./Helper/DisplayManager";
import { BaseGame } from "./Scenes/BaseGame";
import { AssetsLoader } from "./Helper/AssetsLoader";
export module Base {
    export class EntryPoint {
        private static _instance: EntryPoint;
        private _displayManager: DisplayManager;
        private _stageManager: StageManager;
        private _loader: LoaderStage;
        private _isLoad: boolean = false;
        private _cdnUrl: string;
        private _canvas: string;
        private _c: any;
        private _assetLoader: AssetsLoader;
        constructor(cdnUrl: string, canvasName: string) {
            EntryPoint._instance = this;
            this._cdnUrl = cdnUrl;
            this._canvas = canvasName;
            PIXI.utils.skipHello();

            this._assetLoader = new AssetsLoader(this._cdnUrl); 
            this._assetLoader.on("completeLoadAsset", this.completeLoadAsset, this); 
         
            // this._loader = new LoaderStage(this._cdnUrl);
            // this._stageManager.createScene("LoaderStage", this._loader);
            // this._stageManager.goToScene("LoaderStage", true);
            // this._loader.on("", this.completeLoadAsset, this);
        }

        public completeLoadAsset(): void {
            this.isLoad = true;
        }

        public attach(): void {
            this._stageManager = new StageManager();
            this._displayManager = new DisplayManager(this._stageManager.root);
            this._displayManager.create(this._canvas); 
            clearInterval(this._c);
            this.stageManager.createScene("BaseGame", new BaseGame);
            this.stageManager.goToScene("BaseGame", true);
        }

        public get resource(): any {
            return this._assetLoader.loader;
        }

        public get displayManager(): DisplayManager {
            return this._displayManager;
        }

        public get stageManager(): StageManager {
            return this._stageManager;
        }

        public get isLoad(): boolean {
            return this._isLoad;
        }

        public set isLoad(value: boolean) { 
            if (value == true) { 
                this._c = setInterval(() => {
                    window.dispatchEvent(new Event('isLoad'));
                }, 350);
            }
            this._isLoad = value;
        }

        public static get instance(): EntryPoint {
            return EntryPoint._instance;
        }
    }
}