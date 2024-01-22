import {createBrowserRouter, Navigate, Route, RouterProvider, Routes} from "react-router-dom";
import {Authorization} from "./authorization-zone/routing/authorization/authorization";
import {Registration} from "./authorization-zone/routing/registration/registration";
import {EmailConfirm} from "./authorization-zone/routing/email-confirm/email-confirm";
import {PasswordRecovery} from "./authorization-zone/routing/password-recovery/password-recovery";
import {NotFound} from "./authorization-zone/routing/not-found/not-found";
import {AuthorizationZoneLayout} from "./authorization-zone/routing/authorization-zone-layout/authorization-zone-layout";
import {MarketplaceLayout} from "./marketplace-zone/routing/marketplace-layout/marketplace-layout";
import {Catalog} from "./marketplace-zone/routing/catalog/catalog";
import {ProductDetails} from "./marketplace-zone/routing/product-details/product-details";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="not-found" relative='route' replace />,
  },
  {
    path: "/",
    element: <Navigate to="catalog" relative='route' replace />,
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
  {
    Component: MarketplaceLayout,
    children: [
      {
        path: 'catalog',
        Component: Catalog
      },
      {
        path: 'product/:id',
        Component: ProductDetails
      }
    ]
  }
]);


export function AppRouting() {
  return <RouterProvider router={router}/>
}
