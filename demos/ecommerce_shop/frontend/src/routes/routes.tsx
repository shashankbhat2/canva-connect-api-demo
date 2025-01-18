import type { RouteObject } from "react-router-dom";
import { CampaignContextProvider } from "src/context";
import {
  ErrorBoundaryPage,
  HomePage,
} from "src/pages";
import { App } from "../app";
import Designs from "src/pages/designs";

export enum Paths {
  DESIGNS = "/designs",
  HOME = "/",
  RETURN_NAV = "/return-nav",
  MARKETING = "/marketing",
  MULTIPLE_DESIGNS_GENERATOR = "/marketing/multiple-designs",
  PRODUCTS = "/products",
  SINGLE_DESIGN_GENERATOR = "/marketing/single-design",
}

export const routes: RouteObject[] = [
  {
    path: Paths.HOME,
    element: <App />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: Paths.DESIGNS,
        element: <Designs />,
      },
    ],
  },
];
