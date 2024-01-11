import {useState} from "react";
import {IM3DInputControlProps, M3dInput} from "../m3d-input/m3d-input";

export type IM3DPasswordControlProps = Omit<IM3DInputControlProps, 'trailingIcon'>

export function M3dPassword(props: IM3DPasswordControlProps) {

  const inputProps: IM3DInputControlProps = {
    ...props,
    inputType: 'password',
    trailingIcon: {
      iconName: 'eye-crossed',
      action: () => {
        changeProps((prevProps: IM3DInputControlProps) => {
          return {
            ...prevProps,
            inputType: prevProps.inputType === 'text' ? 'password' : 'text'
          }
        })
      }
    }
  }

  const [propsState, changeProps] = useState(inputProps);

  return <M3dInput {...propsState}></M3dInput>
}
