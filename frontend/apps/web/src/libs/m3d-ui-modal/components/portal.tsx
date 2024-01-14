import {createPortal} from "react-dom";
import React, {PropsWithChildren} from "react";

export function Portal(props: PropsWithChildren) {
    return <>
        {
            createPortal(
                props.children,
                window.document.body
            )
        }
    </>
}
