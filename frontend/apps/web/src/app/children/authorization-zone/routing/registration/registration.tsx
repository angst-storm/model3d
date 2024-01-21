import {
  M3dButton,
  M3DCheckbox,
  M3dFormContainer, M3dInput
} from "@model3d/controls";
import './registration.scss'
import {useRegistrationForm} from "./hooks/use-registration-form";
import {useNavigate} from "react-router-dom";
import {useInfoDocsQuery, useRegisterMutation} from "@storage";
import {BaseModalContainer, Portal} from "../../../../../libs/m3d-ui-modal";
import {useState} from "react";

export function Registration() {
  const {
      formState,
      handleSubmit,
      getValues,
      controlOptions: {
        email,
          password,
          login,
          receiveMail
      }
  } = useRegistrationForm();

  const [
    registerTrigger,
    registerResult
  ] = useRegisterMutation();

  const {
    data,
    currentData,
    error,
  } = useInfoDocsQuery();

  const navigate = useNavigate();
  let [showModal, setShowModal] = useState(false);

  function onSubmit() {
    setShowModal(true);
    registerTrigger({
      login: getValues('login'),
      password: getValues('password'),
      email: getValues('email'),
      receiveMail: getValues('receiveMail')
    })
        .then((result) => {
          if (result.hasOwnProperty('error')) {

          }
        });
  }

  function toAuth() {
    navigate('/authorization', { relative: 'route' })
  }

  return <M3dFormContainer headerName={'Регистрация'}>
    <form className={'registration-form__form'} onSubmit={handleSubmit(onSubmit)}>
      <M3dInput {...email}></M3dInput>
      <M3dInput {...login}></M3dInput>
      <M3dInput {...password}></M3dInput>
      <M3DCheckbox {...receiveMail}></M3DCheckbox>
      <p className={'registration-form__agreement-text'}>Нажимая кнопку зарегистрироваться вы
        принимаете <a href={'' + data?.userAgreementUrl} download='terms.pdf'>Условия пользования для покупателей</a> и соглашаетесь
        с <a href={'' + data?.privacyPolicyUrl} download='policy.pdf'>Политикой конфиденциальности</a></p>
      <M3dButton disabled={!formState.isValid} nativeType={'submit'}>Зарегистрироваться</M3dButton>
      <div className={'registration-form__additional-button'}>
        <M3dButton onClick={toAuth} type={'text'}>Войти</M3dButton>
      </div>
    </form>
    {
        showModal && <Portal>
          <BaseModalContainer closeSetter={setShowModal}>
            Благодарим за регистрацию! На Ваш почтовый ящик отправлено сообщение, содержащее ссылку для подтверждения правильности e-mail адреса. Пожалуйста, перейдите по ссылке для завершения регистрации.
            Пожалуйста, подтвердите пароль как можно скорее, ссылка будет активна неделю.
            <div className={'modal__footer'}>
              <M3dButton type={'filled'} onClick={toAuth}>
                Хорошо
              </M3dButton>
            </div>
          </BaseModalContainer>
        </Portal>
    }
  </M3dFormContainer>
}
