import {IInfoDocsModel} from "./info-docs.model";

export interface ISiteSettingsModel extends IInfoDocsModel {
    footerUrls?: {text: string, link: string}[],
    socialMedia?: {iconLink: string, link?: string}[],
    wideBanner?: string,
    narrowBanner?: string,
}
