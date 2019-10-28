export declare const has: (obj: any, prop: any) => any;
export interface ICompareFunction<T> {
    (a: T, b: T): number;
}
export interface IEqualsFunction<T> {
    (a: T, b: T): boolean;
}
export interface ILoopFunction<T> {
    (a: T): boolean | void;
}
export declare function defaultCompare<T>(a: T, b: T): number;
export declare function defaultEquals<T>(a: T, b: T): boolean;
export declare function defaultToString(item: any): string;
export declare function makeString<T>(item: T, join?: string): string;
export declare function isFunction(func: any): boolean;
export declare function isUndefined(obj: any): obj is undefined;
export declare function isString(obj: any): boolean;
export declare function reverseCompareFunction<T>(compareFunction?: ICompareFunction<T>): ICompareFunction<T>;
export declare function compareToEquals<T>(compareFunction: ICompareFunction<T>): IEqualsFunction<T>;
