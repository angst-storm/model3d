import {Navigate, Route, Routes} from "react-router-dom";
import {Authorization} from "./unauthorized/components/authorization/authorization";
import {Registration} from "./unauthorized/components/registration/registration";
import {EmailConfirm} from "./unauthorized/components/email-confirm/email-confirm";
import {PasswordRecovery} from "./unauthorized/components/password-recovery/password-recovery";
import {NotFound} from "./unauthorized/components/not-found/not-found";
import {UnauthorizedLayout} from "./unauthorized/components/unauthorized-layout/unauthorized-layout";

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
    <Route path="unauthorized" element={<UnauthorizedLayout/>}>
      <Route path="authorization" element={<Authorization/>}/>
      <Route path="registration" element={<Registration/>}/>
      <Route path="email-confirm" element={<EmailConfirm/>}/>
      <Route path="password-recovery" element={<PasswordRecovery/>}/>
    </Route>
  </Routes>
}
