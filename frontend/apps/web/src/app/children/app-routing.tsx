import {Navigate, Route, Routes} from "react-router-dom";
import {Authorization} from "./authorization-zone/components/authorization/authorization";
import {Registration} from "./authorization-zone/components/registration/registration";
import {EmailConfirm} from "./authorization-zone/components/email-confirm/email-confirm";
import {PasswordRecovery} from "./authorization-zone/components/password-recovery/password-recovery";
import {NotFound} from "./authorization-zone/components/not-found/not-found";
import {AuthorizationZoneLayout} from "./authorization-zone/components/authorization-zone-layout/authorization-zone-layout";

export function AppRouting() {
  return <Routes>
    <Route
      path="*"
      element={<Navigate to="not-found" relative='route' replace />}
    />
    <Route
      path=""
      element={<Navigate to="unauthorized/authorization" relative='route' replace />}
    />
    <Route path="not-found" element={<NotFound/>}/>
    <Route path="unauthorized" element={<AuthorizationZoneLayout/>}>
      <Route path="authorization" element={<Authorization/>}/>
      <Route path="registration" element={<Registration/>}/>
      <Route path="email-confirm" element={<EmailConfirm/>}/>
      <Route path="password-recovery" element={<PasswordRecovery/>}/>
    </Route>
  </Routes>
}
