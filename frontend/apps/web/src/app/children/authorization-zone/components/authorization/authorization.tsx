import { M3dButton, M3dInput} from "@model3d/controls";
import {
  M3dFormContainer
} from "../../../../../libs/m3d-ui-controls/lib/components/m3d-form-conainer/m3d-form-container";
import './authorization.scss'
import {authorize} from "../../../../../storage/authorizedSlice";
import {useDispatch} from "react-redux";
import {useAuthForm} from "./hooks/use-auth-form";
import {authorizeRequest} from "../../data/authorize-zone-requests";
import {useNavigate} from "react-router-dom";

export function Authorization() {
  const dispatch = useDispatch();

  const {
      formState,
      controlParams: {
          email,
          password
      },
      handleSubmit,
      getValues
  } = useAuthForm();

  const navigate = useNavigate();

  function submitForm() {
    if (formState.isValid) {
      authorizeRequest({
          login: getValues('email'),
          password: getValues('password')
      })
          .then((response) => {
              dispatch(authorize())

          })
          .catch((error) => {
              console.log(error)
          })
    }
  }

  function toRegister() {
      navigate('/registration', { relative: "route" })
  }

  return <M3dFormContainer headerName={'Авторизация'}>
      <form className={'auth-form'} onSubmit={handleSubmit(submitForm)}>
        <M3dInput {...email}></M3dInput>
        <M3dInput {...password}></M3dInput>
        <div className={'submit-button'}>
          <M3dButton disabled={!formState.isValid} nativeType={'submit'}>Войти</M3dButton>
        </div>
        <M3dButton onClick={toRegister} type={'text'}>Зарегистрироваться</M3dButton>
      </form>
    </M3dFormContainer>
}
