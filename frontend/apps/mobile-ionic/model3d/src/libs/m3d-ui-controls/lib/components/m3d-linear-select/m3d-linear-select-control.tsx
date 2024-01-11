import {useController} from "react-hook-form";
import {ISelectItemModel} from "../../models/select-item-model.interface";
import {IFormControlCreateOptions} from "../../interfaces/form-control-options.interface";

export interface ILinearSelectControlProps<T> extends IFormControlCreateOptions<T>{
    options: ISelectItemModel<T>[]
}

export function M3dLinearSelectControl<T>(props: ILinearSelectControlProps<T>) {
    const {
        field,
        fieldState,
        formState
    } = useController({
        control: props.control,
        name: props.name
    })
    function handleValueSelect(option: ISelectItemModel<T>) {
        field.onChange(option.value)
        props.onValueChanges?.(option.value)
    }

    return <div className='flex flex-row shadow-inner shadow-slate-300 rounded-xl w-min p-1 overflow-hidden focus:shadow-emerald-700/50'>
        {
            props.options.length && props.options.map((option: ISelectItemModel<T>) =>
                <div key={option.name}
                     className={'rounded-lg px-1.5 cursor-pointer transition-all' + ' ' + (field.value === option.value ? 'text-white bg-emerald-500 shadow-md shadow-emerald-700' : '')}
                     onClick={() => handleValueSelect(option)}
                >
                    {option.name}
                </div>
            )
        }
    </div>
}
