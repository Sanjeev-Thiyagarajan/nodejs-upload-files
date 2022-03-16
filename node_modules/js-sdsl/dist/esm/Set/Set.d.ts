import { ContainerType } from "../Base/Base";
export declare type SetType<T> = {
    insert: (element: T) => void;
    find: (element: T) => boolean;
    lowerBound: (key: T) => T | undefined;
    upperBound: (key: T) => T | undefined;
    reverseLowerBound: (key: T) => T | undefined;
    reverseUpperBound: (key: T) => T | undefined;
    union: (other: SetType<T>) => void;
    getHeight: () => number;
} & ContainerType<T>;
declare const _default: new <T>(container?: {
    forEach: (callback: (element: T) => void) => void;
}, cmp?: (x: T, y: T) => number) => SetType<T>;
export default _default;
