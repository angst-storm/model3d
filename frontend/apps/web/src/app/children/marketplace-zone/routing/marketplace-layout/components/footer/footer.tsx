import './footer.css'
import {M3dButton} from "@model3d/controls";
import {useSiteSettingsQuery} from "@storage";
import {useEffect, useState} from "react";
import {ISiteSettingsModel} from "../../../../../../../storage/server/common/models/inapp/site-settings.model";

export interface IFooterProps {
    className?: string
}

export function Footer(props: IFooterProps) {
    const settingsRequest = useSiteSettingsQuery();

    useEffect(() => {
        if (!settingsRequest.isLoading) {
            updateFooter(settingsRequest.currentData)
        }
    }, [settingsRequest])

    function updateFooter(mappedRequest?: ISiteSettingsModel): void {
        setProposalsAll(proposalsHardcoded.concat(mappedRequest?.footerUrls ?? []))
        setSocialMedia(mappedRequest?.socialMedia ?? [])
        setContacts(mappedRequest?.contacts ?? [])
        setDocs(mappedRequest?.docs ?? [])
        setDistributionUrl(mappedRequest?.receiveDistributionLink ?? '')
    }

    const proposalsHardcoded: { text: string, link?: string }[] = [
        {
            text: 'Получить программу Ceramic 3D',
            link: 'https://lp-2.ceramic3d.com/c3d/#b17812'
        },
        {
            text: 'Облачный рендер Ceramic 3D(PB)',
            link: 'WILL BE SOON'
        },
        {
            text: 'Обучение программе Ceramic 3D',
            link: 'https://ru.ceramic3d.com/training/training.php'
        },
        {
            text: 'Обучение в Школе дизайна Ceramic 3D',
            link: 'https://t.me/ceramic3d_school'
        }
    ]

    const [proposalsAll, setProposalsAll] = useState([] as { text: string, link?: string }[]);
    const [socialMedia, setSocialMedia] = useState([] as { iconLink: string, link?: string }[]);
    const [contacts, setContacts] = useState([] as { text: string, link?: string }[]);
    const [docs, setDocs] = useState([] as { title: string, docLink?: string, downloadName?: string }[]);
    const [distributionUrl, setDistributionUrl] = useState('');

    return <div className={`footer-layout ${props.className ?? ''}`}>
        <div className={'grid-container'}>
            <div className={'grid-element footer-container'}>
                <div className={'footer-column proposal'}>
                    <img src={require('@assets/icons/svg/ceramic-logo-mid.svg').default} alt={'ceramic logo'}></img>
                    <ul className={'links-list'}>
                        {
                            !settingsRequest.isLoading && proposalsAll.map((proposal) => {
                                return <li key={proposal.text} className={'link-list-element M3-body-m'}>
                                    <a className={'clickable-link'}
                                       href={proposal.link}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                    >
                                        {proposal.text}
                                    </a>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className={'footer-column contacts'}>
                    <ul className={'links-list'}>
                        {
                            contacts.map((contact) => {
                                return <li key={contact.text} className={'link-list-element M3-body-m'}>
                                    <a className={'clickable-link'}
                                       href={contact.link}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                    >
                                        {contact.text}
                                    </a>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className={'footer-column social'}>
                    <div className={'receiving-button'}>
                        <a href={distributionUrl} target="_blank" rel="noopener noreferrer">
                            <M3dButton>Получать рассылку</M3dButton>
                        </a>
                    </div>
                    <div className={'social-list'}>
                        {
                            socialMedia.map((socialNetwork) => {
                                return <div key={socialNetwork.iconLink} className={'rounded-button'}>
                                    <a href={socialNetwork.link} target="_blank" rel="noopener noreferrer">
                                        <img
                                            className={'social-icon'}
                                            src={socialNetwork.iconLink}
                                        ></img>
                                    </a>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className={'footer-column docs'}>
                    {
                        !settingsRequest.isLoading && docs.map((doc) => {
                            return <li key={doc.title} className={'link-list-element M3-body-m'}>
                                <a className={'clickable-link'}
                                   href={doc.docLink}
                                   download={`${doc.downloadName}.pdf`}
                                >
                                    {doc.title}
                                </a>
                            </li>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}
