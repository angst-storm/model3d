import { M3dButton, M3dInput} from "@model3d/controls";
import {
  M3dFormContainer
} from "@model3d/controls";
import './authorization.scss'
import {useDispatch} from "react-redux";
import {useAuthForm} from "./hooks/use-auth-form";
import {useNavigate} from "react-router-dom";
import {M3dPassword} from "@model3d/controls";
import {authorize, useAuthorizationMutation} from "@storage";

export function Authorization() {
    const dispatch = useDispatch();
    const [
        authorizationTrigger,
        authorizationResult
    ] = useAuthorizationMutation({})

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
            const request = authorizationTrigger({
                email: getValues('email'),
                password: getValues('password')
            })

            request
                .then((value) => {
                    if (!value.hasOwnProperty('error')) {
                        dispatch(authorize())
                        navigate('/catalog')
                    }
                })
        }
    }

  function toRegister() {
      navigate('/registration', { relative: "route" })
  }

  return <M3dFormContainer headerName={'Авторизация'}>
      <form className={'auth-form'} onSubmit={handleSubmit(submitForm)}>
        <M3dInput {...email}></M3dInput>
        <M3dPassword {...password}></M3dPassword>
        <div className={'submit-button'}>
          <M3dButton disabled={!formState.isValid} nativeType={'submit'}>Войти</M3dButton>
        </div>
        <M3dButton onClick={toRegister} type={'text'}>Зарегистрироваться</M3dButton>
      </form>
    </M3dFormContainer>
}
