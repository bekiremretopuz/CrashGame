import * as util from './util';
export declare function indexOf<T>(array: T[], item: T, equalsFunction?: util.IEqualsFunction<T>): number;
export declare function lastIndexOf<T>(array: T[], item: T, equalsFunction?: util.IEqualsFunction<T>): number;
export declare function contains<T>(array: T[], item: T, equalsFunction?: util.IEqualsFunction<T>): boolean;
export declare function remove<T>(array: T[], item: T, equalsFunction?: util.IEqualsFunction<T>): boolean;
export declare function frequency<T>(array: T[], item: T, equalsFunction?: util.IEqualsFunction<T>): number;
export declare function equals<T>(array1: T[], array2: T[], equalsFunction?: util.IEqualsFunction<T>): boolean;
export declare function copy<T>(array: T[]): T[];
export declare function swap<T>(array: T[], i: number, j: number): boolean;
export declare function toString<T>(array: T[]): string;
export declare function forEach<T>(array: T[], callback: util.ILoopFunction<T>): void;
