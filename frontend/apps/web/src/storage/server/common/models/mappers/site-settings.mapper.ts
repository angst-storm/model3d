import {ISiteSettingsModel} from "../inapp/site-settings.model";
import {ISiteSettingsResponseModel} from "../response/site-settings.response-model";
import {infoDocsMapper} from "./info-docs.mapper";
import {IInfoDocsModel} from "../inapp/info-docs.model";
import {REACT_APP_BASE_ENDPOINT} from "../../../../../constants/base-endpoint";

export function siteSettingsMapper(data?: ISiteSettingsResponseModel): ISiteSettingsModel | undefined {
    if (!data) {
        return undefined;
    }

    const contacts = []

    if (data.phone) {
        contacts.push({
            text: data.phone,
            link: `tel:${data.phone}`
        })
    }

    if (data.email) {
        contacts.push(
            {
                text: data.email,
                link: `mailto:${data.email}`
            }
        )
    }

    if (data.address?.text && data.address?.url) {
        contacts.push(
            {
                text: data.address?.text,
                link: data.address?.url
            }
        )
    }

    return {
        footerUrls: data.footerUrls?.map((item) => ({
            text: item.name,
            link: item.url
        })) || [],
        socialMedia: data.socialMedias?.map((item) => ({
            iconLink: REACT_APP_BASE_ENDPOINT + item.image,
            link: item.url
        })) || [],
        wideBanner: data.wideBanner,
        contacts: contacts,
        docs: [
            {
                title: 'Политика конфиденциальности',
                docLink: data?.privacyPolicyUrl,
                downloadName: 'policy_ceramic'
            },
            {
                title: 'Пользовательское соглашение',
                docLink: data?.userAgreementUrl,
                downloadName: 'agreement_ceramic'
            },
            {
                title: 'Контактная информация',
                docLink: data?.contactInformationUrl,
                downloadName: 'contacts'
            }
        ]
    }
}
