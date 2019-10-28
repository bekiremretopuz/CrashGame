/// <reference types="pixi.js" />
export declare abstract class Scene extends PIXI.Container {
    abstract awake(...args: any[]): void;
    abstract killScene(...args: any[]): void;
}
export declare class StageManager extends PIXI.utils.EventEmitter {
    private _app;
    private _rootContainer;
    private _scenes;
    private _currentStage;
    private _backgroundImage;
    private _backgroundImageDefault;
    constructor();
    createScene(id: string, TScene: Scene): Scene | any;
    goToScene(id: string, reset?: boolean): boolean;
    create(): void;
    readonly root: PIXI.Container;
}
