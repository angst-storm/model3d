import {ChangeEvent} from "react";
import {useController} from "react-hook-form";
import {IFormControlCreateOptions} from "../../interfaces/form-control-options.interface";

export interface INumberControlProps extends IFormControlCreateOptions<string>{

}

export function M3dNumberControl(props: INumberControlProps) {
    const {
        field,
        fieldState,
        formState
    } = useController({
        control: props.control,
        name: props.name
    })

    function handleIncrease() {
        const value: number = parseInt(field.value)
        field.onChange(((isNaN(value) ? 0 : value) + 1).toString());

    }

    function handleDecrease() {
        const value: number = parseInt(field.value)
        field.onChange(((isNaN(value) ? 0 : value) - 1).toString())
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const pureValue: number = parseInt(event.target.value);
        field.onChange(isNaN(pureValue) ? '' : pureValue.toString())
    }

     const buttonStyles: string = 'text-white rounded-md bg-emerald-500 shadow-md shadow-emerald-700 hover:bg-emerald-400 active:bg-emerald-300 w-6 h-6 text-center flex justify-center items-center leading-4';

    return <div className='flex flex-row shadow-inner shadow-slate-300 focus:shadow-emerald-700/50 border border-white rounded-xl w-min py-1 px-2'>
        <input className='outline-none bg-transparent'
            value={field.value}
            onChange={handleChange}
        />
        <button type='button' onClick={handleIncrease} className={buttonStyles}>+</button>
        <button type='button' onClick={handleDecrease} className={buttonStyles + ' ml-1 '}>-</button>
    </div>
}

