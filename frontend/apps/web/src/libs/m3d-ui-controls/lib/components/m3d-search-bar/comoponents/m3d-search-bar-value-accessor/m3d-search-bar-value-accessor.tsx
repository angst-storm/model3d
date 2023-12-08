import {useController} from "react-hook-form";
import {ChangeEvent, useEffect, useState} from "react";
import {IFormControlCreateOptions} from "../../../../interfaces/form-control-options.interface";
import styles from './m3d-search-bar-value-accessor.module.css';

export interface IM3dSearchBarValueAccessorProps extends IFormControlCreateOptions<string> {
    supportingText?: string,
    leadingIcon?: string,
    trailingIcon?: string,
    inputType?: string,
    className?: string
}

export function M3dSearchBarValueAccessor(props: IM3dSearchBarValueAccessorProps) {
    const {
        field,
        fieldState
    } = useController({
        control: props.control,
        name: props.name,
    })

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        props.onValueChanges?.(event.target.value);
    }

    const [iT,chIT] = useState(props.inputType)

    useEffect(() => {
        chIT(props.inputType || 'text')
    }, [props])

    return <div className={`${styles['search-input-outer']} ${props.className ?? ''}`}>
        <div className={`${styles['search-input-container']} M3-body-l`}>
            {
                props.leadingIcon && <img className={styles['leading-icon']} src={require('@assets/icons/svg/' + props.leadingIcon + '.svg')} alt={'leading icon'}/>
            }
            <div className={styles['search-label-container']}>
                {
                    props.label && !field.value && <label className={styles['search-label']}>
                        {props.label}
                    </label>
                }
                <input {...props.control.register(props.name, { onChange: handleChange })} type={iT} className={styles['search-input-value-accessor']}/>
            </div>
            {
                props.trailingIcon && <img className={styles['trailing-icon']} src={require('@assets/icons/svg/' + props.trailingIcon + '.svg')} alt={'trailing icon'}/>
            }
        </div>
    </div>
}
