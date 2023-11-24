import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {IM3DInputControlProps} from "@model3d/controls";
import {useSelector} from "react-redux";
import {IAuthorizationForm} from "../models/authorization-form.model";
import {useNavigate} from "react-router-dom";


export function useAuthForm() {
    const validationSchema = object({
        email: string()
            .required('Необходимо заполнить')
            .email('Введен некорректный email'),
        password: string()
            .required('Необходимо заполнить')
            .min(6, 'Слишком маленькая длина пароля')
            .max(20, 'Слишком большая длина пароля')
            .matches(/^[a-zA-Z\s]+$/, { message: 'Пароль должен содержать [то что он должен содержать]' })
    })

    const navigate = useNavigate();

    const formOutput = useForm<IAuthorizationForm>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(validationSchema),
        mode: 'onBlur'
    });

    const emailControlOptions: IM3DInputControlProps = {
        label: 'Email',
        control: formOutput.control,
        name: 'email'
    }

    const passwordControlOptions: IM3DInputControlProps = {
        label: 'Пароль',
        control: formOutput.control,
        name: 'password',
        supportingButton: {
            text: 'Не помню пароль',
            action: () => {
                navigate('/password-recovery', {relative: 'route'})
            }
        },
        trailingIcon: {
            iconName: 'eye-crossed',
            action: () => {

            }
        },
        maskValue: true
    }

    const au = useSelector((state: {authorized: any}) => state.authorized.value)

    return {
        controlParams: {
            email: emailControlOptions,
            password: passwordControlOptions
        },
        ...formOutput
    }
}
