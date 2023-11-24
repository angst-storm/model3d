import {createBrowserRouter, Navigate, Route, RouterProvider, Routes} from "react-router-dom";
import {Authorization} from "./authorization-zone/components/authorization/authorization";
import {Registration} from "./authorization-zone/components/registration/registration";
import {EmailConfirm} from "./authorization-zone/components/email-confirm/email-confirm";
import {PasswordRecovery} from "./authorization-zone/components/password-recovery/password-recovery";
import {NotFound} from "./authorization-zone/components/not-found/not-found";
import {AuthorizationZoneLayout} from "./authorization-zone/components/authorization-zone-layout/authorization-zone-layout";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="not-found" relative='route' replace />,
  },
  {
    path: "/",
    element: <Navigate to="authorization" relative='route' replace />,
  },
  {
    path: "not-found",
    Component: NotFound,
  },
  {
    Component: AuthorizationZoneLayout,
    children: [
      {
        path: "authorization",
        Component: Authorization,
      },
      {
        path: "registration",
        Component: Registration,
      },
      {
        path: "email-confirm",
        Component: EmailConfirm,
      },
      {
        path: "password-recovery",
        Component: PasswordRecovery,
      },
    ],
  },
]);


export function AppRouting() {
  return <RouterProvider router={router}/>
}
