import { BaseType, Pair } from "../Base/Base";
export declare type MapType<T, K> = {
    front: () => Pair<T, K> | undefined;
    back: () => Pair<T, K> | undefined;
    forEach: (callback: (element: Pair<T, K>, index: number) => void) => void;
    find: (element: T) => boolean;
    lowerBound: (key: T) => Pair<T, K> | undefined;
    upperBound: (key: T) => Pair<T, K> | undefined;
    reverseLowerBound: (key: T) => Pair<T, K> | undefined;
    reverseUpperBound: (key: T) => Pair<T, K> | undefined;
    getElementByPos: (pos: number) => Pair<T, K>;
    getElementByKey: (key: T) => K | undefined;
    setElement: (key: T, value: K) => void;
    eraseElementByPos: (pos: number) => void;
    eraseElementByKey: (key: T) => void;
    union: (other: MapType<T, K>) => void;
    getHeight: () => number;
    [Symbol.iterator]: () => Generator<Pair<T, K>, void, undefined>;
} & BaseType;
declare const _default: new <T, K>(container?: {
    forEach: (callback: (element: Pair<T, K>) => void) => void;
}, cmp?: (x: T, y: T) => number) => MapType<T, K>;
export default _default;
