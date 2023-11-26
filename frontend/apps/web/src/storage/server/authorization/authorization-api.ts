import {IAuthorizationResponseModel} from "./models/response/authorization.response-model";
import {IAuthorizationRequestModel} from "./models/request/authorization.request-model";
import {IRegistrationResponseModel} from "./models/response/registration.response-model";
import {IRegistrationRequestModel} from "./models/request/registration.request-model";
import {baseApi} from "../base-api";
import {IPasswordRecoveryResponseModel} from "./models/response/password-recovery.response-model";
import {IPasswordRecoveryRequestModel} from "./models/request/password-recovery.request-model";

export const authorizationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        authorization: builder.mutation<IAuthorizationResponseModel, IAuthorizationRequestModel>({
            query: (requestModel: IAuthorizationRequestModel) => ({
                url: 'auth',
                method: 'POST',
                body: requestModel
            })
        }),
        checkAuthorized: builder.query({
            query: () => ({
                url: 'authenticated'
            })
        }),
        register: builder.mutation<IRegistrationResponseModel, IRegistrationRequestModel>({
            query: (requestModel: IRegistrationRequestModel) => ({
                url: 'register',
                method: 'POST',
                body: requestModel
            })
        }),
        passwordRecovery: builder.mutation<IPasswordRecoveryResponseModel, IPasswordRecoveryRequestModel>({
            query: (requestModel: IPasswordRecoveryRequestModel) => ({
                url: 'passRecovery',
                method: 'POST',
                body: requestModel
            })
        }),
    })
})

export const {
    useAuthorizationMutation,
    useCheckAuthorizedQuery,
    useRegisterMutation,
    usePasswordRecoveryMutation,
} = authorizationApi

