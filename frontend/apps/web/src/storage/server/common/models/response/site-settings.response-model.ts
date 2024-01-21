import {IInfoDocsResponseModel} from "./info-docs.response-model";

export interface ISiteSettingsResponseModel extends IInfoDocsResponseModel {
    footerUrls?: {name: string, url: string}[],
    socialMedias?: {image: string, url: string}[],
    wideBanner?: string,
    narrowBanner?: string,
    address?: {
        text: string,
        url:string
    },
    email?: string,
    phone?: string,
}
