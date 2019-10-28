/// <reference types="pixi.js" />
import { EventEmitter } from "eventemitter3";
import "howler";
export interface Asset {
    id: string;
    url: string;
    priority: number;
    type?: any;
}
export interface SoundAsset extends Asset {
    autoplay: boolean;
    loop?: boolean;
    volume?: number;
    mute?: boolean;
    rate?: number;
    html5?: boolean;
    howl?: Howl;
}
export interface LoadAsset {
    asset: Asset;
    loaded: boolean;
    error: Error | null;
}
export declare class PixiAssetsLoader extends EventEmitter {
    static readonly ASSET_LOADED: string;
    static readonly ASSET_ERROR: string;
    static readonly PRIORITY_GROUP_LOADED: string;
    static readonly PRIORITY_GROUP_PROGRESS: string;
    static readonly ALL_ASSETS_LOADED: string;
    private loader;
    private assetsQueue;
    private assetsLoading;
    private currentPriorityLoading;
    private genericAssetsToLoad;
    private genericAssetsRemaining;
    private soundAssetsToLoad;
    private soundAssetsRemaining;
    private progressPercents;
    constructor(pixiLoader?: PIXI.loaders.Loader);
    isLoading(): boolean;
    addAsset(asset: Asset): this;
    addAssets(assets: Asset[]): this;
    load(): this;
    reset(): this;
    private initLoadingQueue;
    private onGenericAssetProgress;
    private onGenericAssetError;
    private onGenericAssetLoad;
    private onAllGenericAssetsComplete;
    private onSoundAssetProgress;
    private onSoundAssetError;
    private onSoundAssetLoad;
    private loadNextPriorityGroup;
    private loadPriorityGroup;
    private startLoadingAssets;
    private loadSoundAsset;
    private addGenericAsset;
    private loadGenericAssets;
    private checkAllAssetsLoaded;
}
