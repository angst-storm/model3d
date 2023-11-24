import {PropsWithChildren} from "react";
import './m3d-form-container.scss'

export interface IM3DFormContainerProps extends PropsWithChildren {
    headerName?: string;
}

export function M3dFormContainer(props: IM3DFormContainerProps) {
    return <div className={'form-container'}>
        {
            props.headerName && <h1 className={'form-header'}>{props.headerName}</h1>
        }
        {
            props.children && props.children
        }
    </div>
}
