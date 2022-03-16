import { BaseType } from "../Base/Base";
export declare type HashSetType<T> = {
    forEach: (callback: (element: T, index: number) => void) => void;
    insert: (element: T) => void;
    eraseElementByValue: (value: T) => void;
    find: (element: T) => boolean;
    [Symbol.iterator]: () => Generator<T, void, undefined>;
} & BaseType;
declare const _default: new <T>(container?: {
    forEach: (callback: (element: T) => void) => void;
}, initBucketNum?: number, hashFunc?: (x: T) => number) => HashSetType<T>;
export default _default;
