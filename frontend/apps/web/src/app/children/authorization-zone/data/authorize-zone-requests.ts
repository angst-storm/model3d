import axios from "axios";
import {IAuthorizationRequestModel} from "./models/authorization.request-model";

export async function authorizeRequest(requestModel: IAuthorizationRequestModel) {
    return axios.get('apiPath' + '/auth', {
        params: requestModel,
    })
}
