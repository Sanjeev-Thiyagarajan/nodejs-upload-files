import { SequentialContainerType } from "../Base/Base";
export declare type VectorType<T> = SequentialContainerType<T>;
declare const _default: new <T>(container?: {
    forEach: (callback: (element: T) => void) => void;
}) => VectorType<T>;
export default _default;
