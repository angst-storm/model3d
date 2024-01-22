import './header.css'
import {M3dButton} from "@model3d/controls";
import {useEffect, useRef} from "react";
import ripple from "ripple-effects";
import {useSelector} from "react-redux";
import {history} from "../../../../history";

export function Header() {
    const button = useRef<HTMLDivElement>(null);
    const button2 = useRef<HTMLDivElement>(null);
    const button3 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ripple(button.current as HTMLDivElement, {
            background: 'blue',
            opacity: 0.01
        })
        ripple(button2.current as HTMLDivElement, {
            background: 'blue',
            opacity: 0.01
        })
        ripple(button3.current as HTMLDivElement, {
            background: 'blue',
            opacity: 0.01
        })
    }, [])

    function toMain() {
        // navigate('/main-page')
    }

    function toCatalog() {
        history.push('/catalog')
    }

    function toFavorite() {
        // navigate('/favorite-list')
    }

    function toCart() {
        // navigate('/shopping-cart')
    }

    function toProfile() {
        // navigate('/to-profile')
    }

    function toRegister() {
        history.push('/registration')
    }

    function toLogIn() {
        history.push('/authorization')
    }

    const authorized = useSelector((state: any) => state.authorized)


    return <div className={'header-layout'}>
        <div className={'header-box'}>
            <div className={'logo-block'}>
                <img className={'ceramic-logo'} onClick={toMain} src={require('@assets/icons/svg/ceramic-logo-big.svg').default} alt={'ceramic logo'}></img>
                {/*<M3dButton leadingIcon={'catalog'} onClick={toCatalog}>Каталог</M3dButton>*/}
            </div>
            {/*<nav className={'nav-bar'} data-authorized={authorized}>*/}
            {/*    {*/}
            {/*        authorized && <>*/}
            {/*            <div ref={button} className={'rounded-button favorites-button nav-button no-select'} onClick={toFavorite}>*/}
            {/*                <img src={require('@assets/icons/svg/heart.svg').default} alt={'ceramic logo'}></img>*/}
            {/*            </div>*/}
            {/*            <div ref={button2} className={'rounded-button shopping-cart-button nav-button no-select'} onClick={toCart} >*/}
            {/*                <img src={require('@assets/icons/svg/shopping-cart.svg').default} alt={'shopping cart logo'}></img>*/}
            {/*            </div>*/}
            {/*            <div ref={button3} className={'rounded-button personal-cabinet avatar-button no-select'} onClick={toProfile} >*/}
            {/*                <img src={require('@assets/icons/svg/avatar.svg').default} alt={'avatar logo'}></img>*/}
            {/*            </div>*/}
            {/*        </>*/}
            {/*    }*/}
            {/*    {*/}
            {/*        !authorized && <>*/}
            {/*            <M3dButton type={'outlined'} onClick={toLogIn}>Войти</M3dButton>*/}
            {/*            <M3dButton type={'text'} onClick={toRegister}>Зарегистрироваться</M3dButton>*/}
            {/*        </>*/}
            {/*    }*/}
            {/*</nav>*/}
        </div>
    </div>
}
