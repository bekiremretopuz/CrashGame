import "styles/style.css";   
import {Base} from "app/EntryPoint"; 
//const EntryPoints = new Base.EntryPoint("", ""); //TODO: remove (client should call the game constructor)

declare global {
    interface Window { gameTarget: any; }
}
window.gameTarget = Base.EntryPoint;    
//window.gameTarget.instance.stageManager.scenes.BaseGame.animationController.setMultiplierText(1.00); //16.05, 60000.02 (toFixed 2);
//window.gameTarget.instance.stageManager.scenes.BaseGame.animationController.crash = true; // True or false 
//const gameClient = new window.gameTarget("","");  //TODO: remove (client should call the game constructor)
//window.gameTarget.instance.stageManager.scenes.BaseGame.dimmer.setTimeText(0); // 5, 4, 3, 2, 1, 0