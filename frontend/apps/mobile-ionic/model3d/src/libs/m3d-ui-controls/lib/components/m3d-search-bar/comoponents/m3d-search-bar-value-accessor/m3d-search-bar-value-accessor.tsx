import {useController} from "react-hook-form";
import {ChangeEvent, useEffect, useState} from "react";
import {IFormControlCreateOptions} from "../../../../interfaces/form-control-options.interface";
import styles from './m3d-search-bar-value-accessor.module.css';

export interface IM3dSearchBarValueAccessorProps extends IFormControlCreateOptions<string> {
    supportingText?: string,
    leadingIcon?: string,
    className?: string,
    onSearch?: (searchValue: string) => void,
    onClear?: () => void
}

export function M3dSearchBarValueAccessor(props: IM3dSearchBarValueAccessorProps) {
    const {
        field
    } = useController({
        control: props.control,
        name: props.name,
    })

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        props.onValueChanges?.(event.target.value);
    }

    function search() {
        if (field.value) {
            props.onSearch?.(field.value)
        }
    }

    const [event, setEvent] =useState<React.KeyboardEvent<HTMLInputElement>>();

    function processKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        setEvent(event)
        if (event.nativeEvent.key === 'Enter' || event.key === 'Enter') {
            search();
        }
    }

    function clear() {
        props.onClear?.()
    }

    return <>
        <div className={`${styles['search-input-outer']} ${props.className ?? ''}`}>
            <div className={`${styles['search-input-container']} M3-body-l`}>
                {
                    props.leadingIcon && <img className={styles['leading-icon']}
                                              src={require('@assets/icons/svg/' + props.leadingIcon + '.svg')}
                                              alt={'leading icon'} onClick={search}/>
                }
                <div className={styles['search-label-container']}>
                    {
                        props.label && !field.value && <label className={styles['search-label']}>
                            {props.label}
                        </label>
                    }
                    <input {...props.control.register(props.name, {onChange: handleChange})} inputMode={'search'}
                           type={'text'} className={styles['search-input-value-accessor']} onKeyDown={processKeyDown}/>
                </div>
                {
                    field.value &&
                    <img className={styles['trailing-icon']} src={require('@assets/icons/svg/cross.svg').default}
                         onClick={clear} alt={'trailing icon'}/>
                }
            </div>
        </div>
        {event?.key}
        {event?.nativeEvent.key}
        {event?.code}
        {event?.keyCode}
        {event?.nativeEvent.code}
        {event?.nativeEvent.keyCode}
    </>
}
