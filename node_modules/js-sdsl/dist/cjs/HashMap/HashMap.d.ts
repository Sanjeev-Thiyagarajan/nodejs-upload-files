import { BaseType, Pair } from "../Base/Base";
export declare type HashMapType<T, K> = {
    forEach: (callback: (element: Pair<T, K>, index: number) => void) => void;
    find: (element: T) => boolean;
    getElementByKey: (key: T) => K | undefined;
    setElement: (key: T, value: K) => void;
    eraseElementByKey: (key: T) => void;
    [Symbol.iterator]: () => Generator<Pair<T, K>, void, undefined>;
} & BaseType;
declare const _default: new <T, K>(container?: {
    forEach: (callback: (element: Pair<T, K>) => void) => void;
}, initBucketNum?: number, hashFunc?: (x: T) => number) => HashMapType<T, K>;
export default _default;
