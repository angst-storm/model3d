import {MouseEvent, PropsWithChildren} from "react";
import './base-modal-container.css'

export interface IBaseContainerProps extends PropsWithChildren {
    closeSetter: (arg: boolean) => void
}

export function BaseModalContainer(props: IBaseContainerProps) {
    function modalClose(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            props.closeSetter(false);
        }
    }

    return <div className={'overlay'} onClick={modalClose}>
        <div className={'container'}>
            {props.children}
        </div>
    </div>
}
