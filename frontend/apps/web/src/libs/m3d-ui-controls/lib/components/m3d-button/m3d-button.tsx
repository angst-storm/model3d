import {PropsWithChildren, useEffect} from "react";
import './m3d-button.scss'
import ripple from "ripple-effects";

export interface IM3DButtonProps extends PropsWithChildren {
    onClick?(): void
    nativeType?: "button" | "submit" | "reset" | undefined,
    type?: 'text' | 'filled',
    disabled?: boolean
}

export function M3dButton(props: IM3DButtonProps) {
    useEffect(() => {
        ripple('.button', {
            background: 'white',
            opacity: 0.01
        })
    }, [])

    props = setDefaultProps(props)

    return <button type={props.nativeType} onClick={props.onClick} className={'button'} data-custom-type={props.type}
                   disabled={props.disabled}>
        {props.children}
    </button>
}

function setDefaultProps(props: IM3DButtonProps) {
    const propsWithDefaults: IM3DButtonProps = {...props};
    propsWithDefaults.disabled = props.disabled ?? false;
    propsWithDefaults.type = props.type ?? 'filled'
    propsWithDefaults.nativeType = props.nativeType ?? 'button'

    return propsWithDefaults;
}
