import {useForm} from "react-hook-form";
import {IRegistrationFormModel} from "../models/registration-form-model";
import {boolean, object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {IM3DCheckboxProps, IM3DInputControlProps} from "@model3d/controls";
import {passwordRegExp} from "@model3d/utils";
import {ValidationText} from "@model3d/constants";

export function useRegistrationForm() {
    const validationSchema = object({
        email: string()
            .required(ValidationText.inputRequired)
            .email(ValidationText.emailMatch),
        login: string()
            .required(ValidationText.inputRequired),
        password: string()
            .required(ValidationText.inputRequired)
            .min(8, ValidationText.shortPass)
            .max(20, ValidationText.longPass)
            .matches(passwordRegExp(), { message: ValidationText.passMatch }),
        receiveMail: boolean()
            .required()
    })

    const formOutput = useForm<IRegistrationFormModel>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur'
    })

    const emailControlOptions: IM3DInputControlProps = {
        name: 'email',
        control: formOutput.control,
        label: 'Email'
    }

    const loginControlOptions: IM3DInputControlProps = {
        name: 'login',
        control: formOutput.control,
        label: 'Nickname'
    }

    const passwordControlOptions: IM3DInputControlProps = {
        name: 'password',
        control: formOutput.control,
        label: 'Пароль'
    }

    const receiveMailControlOptions: IM3DCheckboxProps = {
        name: 'receiveMail',
        control: formOutput.control,
        label: 'Получать уведомления на почту'
    }

    return {
        controlOptions: {
            email: emailControlOptions,
            login: loginControlOptions,
            password: passwordControlOptions,
            receiveMail: receiveMailControlOptions
        },
        ...formOutput
    }
}
