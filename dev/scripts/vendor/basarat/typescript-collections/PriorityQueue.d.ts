import * as util from './util';
export default class PriorityQueue<T> {
    private heap;
    constructor(compareFunction?: util.ICompareFunction<T>);
    enqueue(element: T): boolean;
    add(element: T): boolean;
    dequeue(): T | undefined;
    peek(): T | undefined;
    contains(element: T): boolean;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
    forEach(callback: util.ILoopFunction<T>): void;
}
