import {M3dButton, M3dFormContainer, M3dInput} from "@model3d/controls";
import {usePassRecoveryForm} from "./hooks/use-pass-recovery-form";
import {usePasswordRecoveryMutation} from "@storage";

export function PasswordRecovery() {
  const {
    controlParams,
      handleSubmit,
      formState,
      getValues
  } = usePassRecoveryForm()

  const [
      passRecoveryTrigger,
      passRecoveryResult
  ] = usePasswordRecoveryMutation();

  function submitForm() {
    passRecoveryTrigger({
      email: getValues('email')
    })
  }

  return <M3dFormContainer headerName={'Восстановление пароля'}>
    <form className={'auth-form'} onSubmit={handleSubmit(submitForm)}>
      <M3dInput {...controlParams.email}></M3dInput>
      <div className={'submit-button'}>
        <M3dButton disabled={!formState.isValid} nativeType={'submit'}>Восстановить</M3dButton>
      </div>
    </form>
  </M3dFormContainer>
}
