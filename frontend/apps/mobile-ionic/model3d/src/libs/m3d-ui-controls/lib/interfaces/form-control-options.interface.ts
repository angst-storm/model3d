import {Control} from "react-hook-form/dist/types";

export interface IFormControlCreateOptions<T> {
    label?: string,
    readonly?: boolean,
    autofocus?: boolean,
    onValueChanges?(value: T): void,
    control: Control<any>,
    name: string
}
