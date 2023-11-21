import {IFormControlCreateOptions} from "../../interfaces/form-control-options.interface";
import {useController} from "react-hook-form";
import {ChangeEvent} from "react";

export interface IInputControlProps extends IFormControlCreateOptions<string> {

}

export function M3dInput(props: IInputControlProps) {
  const {
    field,
    fieldState,
    formState
  } = useController({
    control: props.control,
    name: props.name
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    field.onChange(event.target.value)
    props.onValueChanges?.(event.target.value);
  }

  return <div>
    { props.label && <label className='text-xl'>{props.label}</label> }
    <input onChange={handleChange}
           value={field.value}/>
  </div>
}
