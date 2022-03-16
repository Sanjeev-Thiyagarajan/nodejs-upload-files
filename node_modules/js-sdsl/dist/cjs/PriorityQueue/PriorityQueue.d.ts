import { BaseType } from "../Base/Base";
export declare type PriorityQueueType<T> = {
    push: (element: T) => void;
    pop: () => void;
    top: () => T;
} & BaseType;
declare const _default: new <T>(container?: {
    forEach: (callback: (element: T) => void) => void;
}, cmp?: (x: T, y: T) => number) => PriorityQueueType<T>;
export default _default;
