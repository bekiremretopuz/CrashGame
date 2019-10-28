import { AlignStrategy } from "./align-strategy";
export declare class AlignMiddleRight implements AlignStrategy {
    align(width: number, height: number, containerWidth: number, containerHeight: number): {
        x: number;
        y: number;
    };
}
