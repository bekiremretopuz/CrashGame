import { ScaleStrategy } from "./scale-strategy";
export declare class ScaleFullSize implements ScaleStrategy {
    scale(initialWidth: number, initialHeight: number, finalWidth: number, finalHeight: number): {
        scaleX: number;
        scaleY: number;
    };
}
