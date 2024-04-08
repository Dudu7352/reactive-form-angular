import { FormControl } from "@angular/forms";

export type InputType = {
    type: "text" | "number"
} | {
    type: "select",
    options: string[]
};

export interface FormStructure {
    [key: string]: InputType
}

export interface ReactiveFormInputState {
    inputName: string,
    type: InputType,
    control: FormControl
}