import { BaseType } from "../Base/Base";
export declare type StackType<T> = {
    push: (element: T) => void;
    pop: () => void;
    top: () => T | undefined;
} & BaseType;
declare const _default: new <T>(container?: {
    forEach: (callback: (element: T) => void) => void;
}) => StackType<T>;
export default _default;
