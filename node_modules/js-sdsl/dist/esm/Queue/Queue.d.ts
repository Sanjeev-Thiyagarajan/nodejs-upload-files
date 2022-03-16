import { BaseType } from "../Base/Base";
export declare type QueueType<T> = {
    push: (element: T) => void;
    pop: () => void;
    front: () => T | undefined;
} & BaseType;
declare const _default: new <T>(container?: {
    forEach: (callback: (element: T) => void) => void;
}) => QueueType<T>;
export default _default;
