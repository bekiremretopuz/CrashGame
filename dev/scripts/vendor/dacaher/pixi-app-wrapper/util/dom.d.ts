export declare class Dom {
    static getElementOrBody(elementId: string): HTMLElement;
    static getElementOrCreateNew<T extends HTMLElement>(elementId: string, tagName: string, container?: Element | null): T;
}
