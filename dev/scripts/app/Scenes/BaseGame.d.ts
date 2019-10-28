import { Scene } from "app/Helper/StageManager";
export declare class BaseGame extends Scene {
    private _game;
    private _userInterfaceController;
    private _animationController;
    private _slotMachine;
    constructor();
    awake(): void;
    private eventListener;
    private onControlEventHandler;
    private onSlotMechanismEventHandler;
    private onLocalStorageUpdate;
    killScene(): void;
}
