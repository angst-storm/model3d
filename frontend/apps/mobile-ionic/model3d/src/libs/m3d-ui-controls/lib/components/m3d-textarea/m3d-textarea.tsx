import {ChangeEvent} from "react";
import {useController} from "react-hook-form";
import {IFormControlCreateOptions} from "../../interfaces/form-control-options.interface";

export interface ITextareaControlProps extends IFormControlCreateOptions<string> {
    rows?: number,
    cols?: number
}

export function M3dTextarea(props: ITextareaControlProps) {
    const {
        field,
        fieldState,
        formState
    } = useController({
        control: props.control,
        name: props.name
    })

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        field.onChange(event.target.value)
        props.onValueChanges?.(event.target.value);
    }

    function handleClick() {
        if (props.readonly && field.value) {
            navigator.clipboard.writeText(field.value)
        }
    }

    return (<div className='flex flex-col pb-3'>
        { props.label && <label className='text-xl'>{props.label}</label> }
        <textarea className={'transition-all duration-200 resize-none border border-white outline-none p-3 rounded-xl shadow-inner shadow-slate-400 focus:shadow-emerald-700/50'}
                  value={field.value}
                  readOnly={props.readonly}
                  disabled={props.readonly}
                  onChange={handleChange}
                  onClick={handleClick}>
        </textarea>
    </div>)
}
