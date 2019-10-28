import { Asset, AssetPriority, LoadAsset, PixiAssetsLoader, SoundAsset } from "pixi-assets-loader";
 
import { Base } from "app/EntryPoint";

export class AssetsLoader extends PIXI.utils.EventEmitter {
    private _loader: PixiAssetsLoader;
    private _assetsCount: { [key: number]: { total: number, progress: number } } = {};
    private _totalAssets: number;
    private _loadingProgress: number;  
    private _game: Base.EntryPoint; 
    private _cdnUrl: string;
    constructor(cdnUrl: string) {
        super();
        this._cdnUrl = cdnUrl;
        this._game = Base.EntryPoint.instance; 
        this.loadAssets();  
    } 

    private loadAssets(): void { 
        const assets = [
            { id: "background", url: this._cdnUrl + "/" +"assets/gfx/bg.jpg", priority: AssetPriority.HIGHEST, type: "texture" }, 
            { id: "shadow", url: this._cdnUrl + "/" +"assets/gfx/shadow.png", priority: AssetPriority.HIGHEST, type: "texture" }, 
            { id: "smoke", url: this._cdnUrl + "/" +"assets/gfx/smoke_anim.json", priority: AssetPriority.HIGHEST, type: "atlas" }, 
            { id: "asset", url: this._cdnUrl + "/" +"assets/gfx/asset-0.json", priority: AssetPriority.HIGHEST, type: "atlas" }, 
            { id: "character", url: this._cdnUrl + "/" +"assets/gfx/character.json", priority: AssetPriority.HIGHEST, type: "animation" },  
            { id: "char_front", url: this._cdnUrl + "/" +"assets/gfx/char_front.json", priority: AssetPriority.HIGHEST, type: "atlas" },  
        ];

        assets.forEach(asset => {  
            if (!this._assetsCount[asset.priority]) {
                this._assetsCount[asset.priority] = { total: 1, progress: 0 };
            } else {
                this._assetsCount[asset.priority].total++;
            } 
        });

        this._loadingProgress = 0;
        this._totalAssets = assets.length;

        this._loader = new PixiAssetsLoader();
        this._loader.on(PixiAssetsLoader.PRIORITY_GROUP_LOADED, this.onAssetsLoaded.bind(this));
        this._loader.on(PixiAssetsLoader.PRIORITY_GROUP_PROGRESS, this.onAssetsProgress.bind(this));
        this._loader.on(PixiAssetsLoader.ASSET_ERROR, this.onAssetsError.bind(this));
        this._loader.on(PixiAssetsLoader.ALL_ASSETS_LOADED, this.onAllAssetsLoaded.bind(this));
        this._loader.addAssets(assets).load();
    }
     private onAssetsProgress(args: { priority: number, progress: number }): void {
        const percentFactor = this._assetsCount[args.priority].total / this._totalAssets;
        this._loadingProgress += (args.progress - this._assetsCount[args.priority].progress) * percentFactor;
        this._assetsCount[args.priority].progress = args.progress;
    }

    private onAssetsError(args: LoadAsset): void {
        this.emit("assetLoadfailed");
    }

    private onAllAssetsLoaded(): void { 
        WebFont.load({
            custom: {
                families: ["Luckiest Guy"],
                urls: [this._cdnUrl + 'assets/fonts/stylesheet.css']
            },
            active: (familyName: any, fwd: any) => { 
                 this.emit("completeLoadAsset");
            }
        });
    }

    private onAssetsLoaded(args: { priority: number, assets: LoadAsset[] }): void {
        args.assets.forEach(loadAsset => {
            this.createViewsByPriority(args.priority);
        });
    }

    private createViewsByPriority(priority: number): void {
        switch (priority) {
            case AssetPriority.HIGHEST:
                this.emit("completeLoadHighAsset");
                break;
            case AssetPriority.NORMAL:
                this.emit("completeLoadNormalAsset");
                break;
            case AssetPriority.LOW:
                this.emit("completeLoadLowAsset");
                break;
        }
    }

    public get loader(): any {
        return this._loader
    }

    public get loadingProgress(): number {
        return this._loadingProgress;
    }
}
