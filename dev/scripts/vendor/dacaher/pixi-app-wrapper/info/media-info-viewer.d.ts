import "../util/math";
export interface DisplayData {
    screen: {
        width: number;
        height: number;
    };
    view: {
        width: number;
        height: number;
    };
    stage: {
        x: number;
        y: number;
        initialWidth: number;
        initialHeight: number;
        currentWidth: number;
        currentHeight: number;
        scaleX: string;
        scaleY: string;
        scaling: string;
        alignment: string;
        orientation: "landscape" | "portrait";
    };
}
export interface MediaInfoData {
    display: DisplayData;
}
export declare class MediaInfoViewer {
    private rootContainer;
    private textContainer;
    private data;
    constructor();
    update(newData: MediaInfoData): void;
    show(): void;
    hide(): void;
    private createContainer;
    private getText;
}
