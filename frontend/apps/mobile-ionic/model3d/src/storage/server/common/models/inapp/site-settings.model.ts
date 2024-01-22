export interface ISiteSettingsModel {
    footerUrls?: { text: string, link: string }[],
    socialMedia?: { iconLink: string, link?: string }[],
    wideBanner?: string,
    narrowBanner?: string,
    contacts?: { text: string, link?: string }[],
    docs?: { title: string, docLink?: string, downloadName?: string }[],
    receiveDistributionLink?: string
}
