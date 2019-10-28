import * as collections from './util';
export default class Heap<T> {
    private data;
    private compare;
    constructor(compareFunction?: collections.ICompareFunction<T>);
    private leftChildIndex;
    private rightChildIndex;
    private parentIndex;
    private minIndex;
    private siftUp;
    private siftDown;
    peek(): T | undefined;
    add(element: T): boolean;
    removeRoot(): T | undefined;
    contains(element: T): boolean;
    size(): number;
    isEmpty(): boolean;
    clear(): void;
    forEach(callback: collections.ILoopFunction<T>): void;
}
