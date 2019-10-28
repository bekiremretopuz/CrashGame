import { StageManager } from "./Helper/StageManager";
import SoundManager from "./Helper/SoundManager";
import { LocalStorage } from "./Helper/LocalStorage";
export declare class EntryPoint {
    private static _instance;
    private _stageManager;
    private _loader;
    private _localStorage;
    constructor();
    readonly localStorage: LocalStorage;
    readonly sound: SoundManager;
    readonly resource: any;
    readonly stageManager: StageManager;
    static readonly instance: EntryPoint;
}
