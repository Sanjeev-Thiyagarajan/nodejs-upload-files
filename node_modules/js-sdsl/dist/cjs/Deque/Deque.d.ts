import { SequentialContainerType } from "../Base/Base";
export declare type DequeType<T> = {
    pushFront: (element: T) => void;
    popFront: () => void;
    shrinkToFit: () => void;
    cut: (pos: number) => void;
} & SequentialContainerType<T>;
declare const _default: new <T>(arr: T[]) => DequeType<T>;
export default _default;
