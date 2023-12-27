import {IInfoDocsModel} from "../inapp/info-docs.model";
import {IInfoDocsResponseModel} from "../response/info-docs.response-model";

export function infoDocsMapper(data?: IInfoDocsResponseModel): IInfoDocsModel | undefined {
    if (!data) {
        return undefined
    }

    return {
        termsOfUseUrl: data.termsOfUseUrl,
        privacyPolicyUrl: data.privacyPolicyUrl,
        userAgreementUrl: data.userAgreementUrl,
        contactInformationUrl: data.contactInformationUrl,
        receiveDistributionsUrl: data.receiveDistributionsUrl
    }
}
