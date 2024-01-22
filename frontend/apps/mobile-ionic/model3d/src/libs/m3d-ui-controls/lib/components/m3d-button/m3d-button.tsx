import {PropsWithChildren, useEffect, useRef} from "react";
import './m3d-button.css'
import ripple from "ripple-effects";

export interface IM3DButtonProps extends PropsWithChildren {
    onClick?(): void
    nativeType?: "button" | "submit" | "reset" | undefined,
    type?: 'text' | 'filled' | 'outlined',
    disabled?: boolean,
    leadingIcon?: string,
    trailingIcon?: string,
    className?: string
}

export function M3dButton(props: IM3DButtonProps) {
    const button = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        ripple(button.current as HTMLButtonElement, {
            background: 'white',
            opacity: 0.01
        })
    }, [])

    props = setDefaultProps(props)

    return <button ref={button} type={props.nativeType} onClick={props.onClick} className={`button M3-label-l ${props.className ?? ''}`} data-custom-type={props.type}
                disabled={props.disabled}>
            {
                props.leadingIcon && <img className={'leading-icon'} src={require('@assets/icons/svg/' + props.leadingIcon + '.svg')}
                                          alt={'trailing icon'}/>
            }
            {props.children}
            {
                props.trailingIcon && <img className={'trailing-icon'} src={require('@assets/icons/svg/' + props.trailingIcon + '.svg')}
                                           alt={'trailing icon'}/>
            }
        </button>
}

function setDefaultProps(props: IM3DButtonProps) {
    const propsWithDefaults: IM3DButtonProps = {...props};
    propsWithDefaults.disabled = props.disabled ?? false;
    propsWithDefaults.type = props.type ?? 'filled'
    propsWithDefaults.nativeType = props.nativeType ?? 'button'

    return propsWithDefaults;
}
