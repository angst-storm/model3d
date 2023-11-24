import {Outlet} from "react-router-dom";
import './authorization-zone-layout.scss'

export function AuthorizationZoneLayout() {
  return <div className={'authorization-layout'}>
    <Outlet></Outlet>
  </div>
}
