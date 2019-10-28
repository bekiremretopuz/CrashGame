/// <reference types="pixi.js" />
import EventEmitter = require("eventemitter3");
import "fpsmeter";
import "pixi-layers";
import { MediaInfoData } from "./info/media-info-viewer";
export interface PixiAppWrapperOptions extends PIXI.ApplicationOptions {
    width: number;
    height: number;
    align?: "top-left" | "top-center" | "top-right" | "middle-left" | "middle" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right";
    scale?: "none" | "keep-aspect-ratio" | "full-size";
    changeOrientation?: boolean;
    showFPS?: boolean;
    showMediaInfo?: boolean;
}
export declare class PixiAppWrapper extends EventEmitter {
    static toggleFulscreen(element?: Element | null): void;
    private readonly defaultScaleMethod;
    private readonly defaultAlignMethod;
    private readonly defaultOptions;
    private readonly fpsmeterOptions;
    private app;
    private appOptions;
    private width;
    private height;
    private landscape;
    private alignStrategy;
    private scaleStrategy;
    private fpsmeter;
    private mediaInfoViewer;
    private resizing;
    constructor(options?: PixiAppWrapperOptions);
    readonly initialHeight: number;
    readonly initialWidth: number;
    readonly stage: PIXI.Container;
    readonly ticker: PIXI.ticker.Ticker;
    readonly renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    readonly screen: PIXI.Rectangle;
    readonly view: HTMLCanvasElement;
    getMediaInfo(): MediaInfoData;
    private configure;
    private createFPSmeter;
    private resize;
    private orientate;
    private swapSize;
    private scale;
    private align;
}
