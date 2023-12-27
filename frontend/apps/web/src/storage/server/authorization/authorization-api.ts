import {IAuthorizationResponseModel} from "./models/response/authorization.response-model";
import {IAuthorizationRequestModel} from "./models/request/authorization.request-model";
import {IRegistrationResponseModel} from "./models/response/registration.response-model";
import {IRegistrationRequestModel} from "./models/request/registration.request-model";
import {baseApi} from "../base-api";
import {IPasswordRecoveryResponseModel} from "./models/response/password-recovery.response-model";
import {IPasswordRecoveryRequestModel} from "./models/request/password-recovery.request-model";
import {IUniqueEmailRequestModel} from "./models/request/unique-email.request-model";
import {IUniqueEmailResponseModel} from "./models/response/unique-email.response-model";

export const authorizationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        authorization: builder.mutation<IAuthorizationResponseModel, IAuthorizationRequestModel>({
            query: (requestModel: IAuthorizationRequestModel) => ({
                url: 'login/',
                method: 'POST',
                body: requestModel
            })
        }),
        logout: builder.mutation<{}, {}>({
            query: () => ({
                url: 'logout/',
                method: 'GET'
            })
        }),
        checkAuthorized: builder.query({
            query: () => ({
                url: 'authenticated/',
                method: 'GET'
            })
        }),
        register: builder.mutation<IRegistrationResponseModel, IRegistrationRequestModel>({
            query: (requestModel: IRegistrationRequestModel) => ({
                url: 'reg/',
                method: 'POST',
                body: requestModel
            })
        }),
        checkEmailUnique: builder.query<IUniqueEmailResponseModel, IUniqueEmailRequestModel>({
            query: (requestModel: IUniqueEmailRequestModel) => ({
                url: 'unique-email/',
                method: 'POST',
                body: requestModel
            })
        }),
        passwordRecovery: builder.mutation<IPasswordRecoveryResponseModel, IPasswordRecoveryRequestModel>({
            query: (requestModel: IPasswordRecoveryRequestModel) => ({
                url: 'passRecovery/',
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
    usePasswordRecoveryMutation
} = authorizationApi

