import {object, string} from "yup";
import {ValidationText} from "@model3d/constants";
import {passwordRegExp} from "@model3d/utils";
import {useForm} from "react-hook-form";
import {IAuthorizationForm} from "../../authorization/models/authorization-form.model";
import {yupResolver} from "@hookform/resolvers/yup";
import {IM3DInputControlProps} from "@model3d/controls";
import {IPassRecoveryForm} from "../models/pass-recovery-form.model";

export function usePassRecoveryForm() {

    const validationSchema = object({
        email: string()
            .required(ValidationText.inputRequired)
            .email(ValidationText.emailMatch)
    })

    const formOutput = useForm<IPassRecoveryForm>({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(validationSchema),
        mode: 'onBlur'
    });

    const emailControlOptions: IM3DInputControlProps = {
        label: 'Email',
        control: formOutput.control,
        name: 'email'
    }

    return {
        controlParams: {
            email: emailControlOptions
        },
        ...formOutput
    }
}
