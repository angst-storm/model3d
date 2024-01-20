import {IFormControlCreateOptions} from "../../interfaces/form-control-options.interface";
import {useController} from "react-hook-form";
import {ChangeEvent, useEffect, useState} from "react";
import './m3d-input.scss';
import {M3dButton} from "../m3d-button/m3d-button";

export interface IM3DInputControlProps extends IFormControlCreateOptions<string> {
  supportingText?: string,
  supportingButton?: {
    text: string,
    action: () => void
  },
  leadingIcon?: {
    iconName: string,
    action: () => void
  },
  trailingIcon?: {
    iconName: string,
    action: () => void
  },
  inputType?: string
}

export function M3dInput(props: IM3DInputControlProps) {
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

  return <div className={'input-outer'}>
    <div className={'input-container'} data-is-valid={!fieldState.invalid}>
      {
        props.label && <label data-is-valid={!fieldState.invalid} className={'label ' + (field.value ? 'filled' : 'empty')}>
          {props.label}
        </label>
      }
      {
          props.leadingIcon && <img className={'leading-icon'} src={require('@assets/icons/svg/' + props.leadingIcon.iconName + '.svg')}
                                    onClick={props.leadingIcon.action} alt={'leading icon'}/>
      }
      <input {...props.control.register(props.name, { onChange: handleChange })} type={iT} className={'input-value-accessor'}/>
      {
          props.trailingIcon && <img className={'trailing-icon'} src={require('@assets/icons/svg/' + props.trailingIcon.iconName + '.svg')}
                                     onClick={props.trailingIcon.action} alt={'trailing icon'}/>
      }
    </div>
    {
        fieldState.invalid && <p className={'validation-message'}>{fieldState.error?.message}</p>
    }
    {
        props.supportingButton && <M3dButton type={'text'} onClick={props.supportingButton.action}>{props.supportingButton.text}</M3dButton>
    }
  </div>
}
