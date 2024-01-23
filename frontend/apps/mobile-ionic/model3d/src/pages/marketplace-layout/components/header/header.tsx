import './header.css'

import {history} from "../../../../history";

export function Header() {

    function toMain() {
        history.push('/catalog')
    }

    return <div className={'header-layout'}>
        <div className={'header-box'}>
            <div className={'logo-block'}>
                <img className={'ceramic-logo'} onClick={toMain} src={require('@assets/icons/svg/ceramic-logo-big.svg').default} alt={'ceramic logo'}></img>
            </div>
        </div>
    </div>
}
