import {Outlet} from "react-router-dom";
import {Header} from "./components/header/header";
import {Footer} from "./components/footer/footer";

import './marketplace-layout.css'

export function MarketplaceLayout() {
    return <div className={'marketplace-layout'}>
        <Header></Header>
        <Outlet></Outlet>
        <Footer className={'site-footer'}></Footer>
    </div>
}
