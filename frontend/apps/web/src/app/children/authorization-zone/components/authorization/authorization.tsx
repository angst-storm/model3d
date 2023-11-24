import {IM3DInputControlProps, M3dButton, M3dInput} from "@model3d/controls";
import {
  M3dFormContainer
} from "../../../../../libs/m3d-ui-controls/lib/components/m3d-form-conainer/m3d-form-container";
import {useForm} from "react-hook-form";
import './authorization.scss'
import {object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


interface IAuthorizationForm {
  email: string,
  password: string
}

export function Authorization() {

  const validationSchema = object({
    email: string().required('Необходимо заполнить').email('Введен некорректный email'),
    password: string()
        .required('Необходимо заполнить')
        .min(6, 'Слишком маленькая длина пароля')
        .max(20, 'Слишком большая длина пароля')
        .matches(/q*/)
  })

  const {
    control,
    handleSubmit,
    formState
  } = useForm<IAuthorizationForm>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });

  const emailControlOptions: IM3DInputControlProps = {
    label: 'Email',
    control: control,
    name: 'email'
  }

  const passwordControlOptions: IM3DInputControlProps = {
    label: 'Пароль',
    control: control,
    name: 'password',
    supportingButton: {
      text: 'Не помню пароль',
      action: () => {

      }
    },
    trailingIcon: {
      iconName: 'eye-crossed',
      action: () => {

      }
    },
    maskValue: true
  }

  function submitForm() {
    if (formState.isValid) {

    }
  }

  return <M3dFormContainer headerName={'Авторизация'}>
      <form className={'auth-form'} onSubmit={handleSubmit(submitForm)}>
        <M3dInput {...emailControlOptions}></M3dInput>
        <M3dInput {...passwordControlOptions}></M3dInput>
        <div className={'submit-button'}>
          <M3dButton disabled={!formState.isValid} nativeType={'submit'}>Войти</M3dButton>
        </div>
        <M3dButton type={'text'}>Зарегистрироваться</M3dButton>
      </form>
    </M3dFormContainer>
}
