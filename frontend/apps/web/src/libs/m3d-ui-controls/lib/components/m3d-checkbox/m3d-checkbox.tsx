import {IFormControlCreateOptions} from "../../interfaces/form-control-options.interface";
import './m3d-checkbox.scss'
import {useEffect, useRef} from "react";
import ripple from "ripple-effects";
import {useController} from "react-hook-form";

export interface IM3DCheckboxProps extends IFormControlCreateOptions<boolean> {
    label: string,
    format: 'small' | 'large',
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
    const button = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ripple(button.current as HTMLDivElement, {
            opacity: 0.05,
            background: '#006496',
            zIndex: 0
        })
    }, [])

    function toggleCheckbox() {
        field.onChange(!field.value)
    }

    return <div className={'checkbox__container'} data-format={props.format}>
        <div className={'checkbox__mark-container'} ref={button}>
            <div onClick={toggleCheckbox} className={'checkbox__mark'} data-value={field.value}></div>
            {
                field.value && <img className={'checkbox__mark-logo'} data-format={props.format} src={require('@assets/icons/svg/white-checkmark.svg').default} alt={'checkmark'}/>
            }
        </div>
        <label className={'checkbox__label'} data-format={props.format}>{props.label}</label>
    </div>
}
