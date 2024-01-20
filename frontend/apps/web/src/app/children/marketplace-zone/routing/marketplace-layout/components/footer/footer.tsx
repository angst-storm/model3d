import './footer.css'
import {M3dButton} from "@model3d/controls";
import { useInfoDocsQuery, useSiteSettingsQuery} from "@storage";
import {useEffect, useState} from "react";

export interface IFooterProps {
    className?: string
}

export function Footer(props: IFooterProps) {
    const docsRequest = useInfoDocsQuery();
    const settingsRequest = useSiteSettingsQuery();

    useEffect(() => {
        if (!docsRequest.isLoading && !settingsRequest.isLoading) {
            recalculateProposals(settingsRequest.currentData?.footerUrls ?? [])
        }
    }, [docsRequest, settingsRequest])

    function recalculateProposals(newData: {text: string, link: string}[]): void {
        const proposalAdditional = (newData)
            .map((footerUrl) => ({
                text: footerUrl.text,
                link: footerUrl.link,
            }))

        setProposalsAll(proposalsHardcoded.concat(proposalAdditional))
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

    const [proposalsAll, setProposalsAll] = useState([] as { text: string, link?: string }[])


    const contacts: { text: string, link?: string }[] = [
        {
            text: '+7 (495) 215-24-47',
            link: 'tel:+74952152447'
        },
        {
            text: 'info@ceramic3d.ru',
            link: 'mailto:info@ceramic3d.ru'
        },
        {
            text: 'г.Екатеринбург, проезд Решетникова 22А, оф.410',
        },
    ]

    const social: { iconName: string, link?: string }[] = [
        {
            iconName: 'vk',
            link: 'https://vk.com/club_ceramic3d?from=groups'
        },
        {
            iconName: 'telegram',
            link: 'https://t.me/ceramic3d_info'
        },
        {
            iconName: 'youtube',
            link: 'https://www.youtube.com/c/Ceramic3D'
        },
    ]

    function getDocs(): { title: string, docLink?: string, downloadName?: string }[] {
        return [
            {
                title: 'Политика конфиденциальности',
                docLink: docsRequest.currentData?.policyDoc,
                downloadName: 'policy_ceramic'
            },
            {
                title: 'Пользовательское соглашение',
                docLink: docsRequest.currentData?.agreementDoc,
                downloadName: 'agreement_ceramic'
            },
            {
                title: 'Контактная информация',
                docLink: docsRequest.currentData?.contactsDoc,
                downloadName: 'contacts'
            }
        ]
    }

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
                        <M3dButton>Получать рассылку</M3dButton>
                    </div>
                    <div className={'social-list'}>
                        {
                            social.map((socialNetwork) => {
                                return <div key={socialNetwork.iconName} className={'rounded-button'}>
                                    <a href={socialNetwork.link} target="_blank" rel="noopener noreferrer">
                                        <img
                                            className={'social-icon'}
                                            src={require(`@assets/icons/svg/${socialNetwork.iconName}.svg`)}
                                        ></img>
                                    </a>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className={'footer-column docs'}>
                    {
                        !docsRequest.isLoading && getDocs().map((doc) => {
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
