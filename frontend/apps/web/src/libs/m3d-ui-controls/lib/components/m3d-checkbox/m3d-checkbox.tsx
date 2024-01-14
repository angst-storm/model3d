import {IFormControlCreateOptions} from "../../interfaces/form-control-options.interface";
import './m3d-checkbox.scss'
import {useEffect} from "react";
import ripple from "ripple-effects";
import {useController} from "react-hook-form";

export interface IM3DCheckboxProps extends IFormControlCreateOptions<boolean> {
    label: string
}

export function M3DCheckbox(props: IM3DCheckboxProps) {
    const {
        field,
        formState,
        fieldState
    } = useController({
        control: props.control,
        name: props.name,
        defaultValue: false
    })

    useEffect(() => {
        ripple('.checkbox__mark-container', {
            opacity: 0.05,
            background: '#006496',
            zIndex: 0
        })
    }, [])

    function toggleCheckbox() {
        field.onChange(!field.value)
    }

    return <div className={'checkbox__container'}>
        <div className={'checkbox__mark-container'}>
            <div onClick={toggleCheckbox} className={'checkbox__mark'} data-value={field.value}></div>
            {
                field.value && <img className={'checkbox__mark-logo'} src={require('@assets/icons/svg/white-checkmark.svg').default} alt={'checkmark'}/>
            }
        </div>
        <label className={'checkbox__label'}>{props.label}</label>
    </div>
}
