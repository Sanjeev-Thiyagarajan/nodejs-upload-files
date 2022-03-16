import { SequentialContainerType } from "../Base/Base";
export declare type LinkListType<T> = {
    pushFront: (element: T) => void;
    popFront: () => void;
    merge: (other: LinkListType<T>) => void;
} & SequentialContainerType<T>;
declare const _default: new <T>(container?: {
    forEach: (callback: (element: T) => void) => void;
}) => LinkListType<T>;
export default _default;
