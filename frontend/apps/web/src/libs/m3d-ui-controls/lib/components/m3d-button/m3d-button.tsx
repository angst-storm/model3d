import {PropsWithChildren, useEffect} from "react";
import './m3d-button.scss'
import ripple from "ripple-effects";

export interface IM3DButtonProps extends PropsWithChildren {
    onClick?(): void
    type?: "button" | "submit" | "reset" | undefined,
    size?: 'x' | 'm' | 'l',
    disabled?: boolean
}

export function M3dButton(props: IM3DButtonProps) {
    useEffect(() => {
        ripple('.button', {
            opacity: 0.1
        })
    }, [])

    props = setDefaultProps(props)

    return <button type={props.type} onClick={props.onClick} className={'button button-size-' + props.size +
    (props.disabled ? ' disabled' : '')}>
        {props.children}
    </button>
}

function setDefaultProps(props: IM3DButtonProps) {
    const propsWithDefaults: IM3DButtonProps = {...props};
    propsWithDefaults.size = props.size ?? 'm';
    propsWithDefaults.disabled = props.disabled ?? false

    return propsWithDefaults;
}
