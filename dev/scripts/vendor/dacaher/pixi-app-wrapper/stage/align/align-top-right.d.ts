import { AlignStrategy } from "./align-strategy";
export declare class AlignTopRight implements AlignStrategy {
    align(width: number, height: number, containerWidth: number, containerHeight: number): {
        x: number;
        y: number;
    };
}
