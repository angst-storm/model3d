import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {IM3DInputControlProps} from "@model3d/controls";
import {IAuthorizationForm} from "../models/authorization-form.model";
import {useNavigate} from "react-router-dom";
import {passwordRegExp} from "@model3d/utils";
import {ValidationText} from "@model3d/constants";
import {
    IM3DPasswordControlProps
} from "@model3d/controls";


export function useAuthForm() {
    const navigate = useNavigate();

    const validationSchema = object({
        email: string()
            .required(ValidationText.inputRequired)
            .email(ValidationText.emailMatch),
        password: string()
            .required(ValidationText.inputRequired)
            .min(6, ValidationText.shortPass)
            .max(20, ValidationText.longPass)
            .matches(passwordRegExp(), { message: ValidationText.passMatch }),
    })

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

    const passwordControlOptions: IM3DPasswordControlProps = {
        label: 'Пароль',
        control: formOutput.control,
        name: 'password',
        // supportingButton: {
        //     text: 'Не помню пароль',
        //     action: () => {
        //         navigate('/password-recovery', {relative: 'route'})
        //     }
        // }
    }

    return {
        controlParams: {
            email: emailControlOptions,
            password: passwordControlOptions
        },
        ...formOutput
    }
}
