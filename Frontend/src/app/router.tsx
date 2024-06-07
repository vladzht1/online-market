import { createBrowserRouter } from "react-router-dom";

import { LINKS } from "../constants/links";
import { HomePage } from "../pages/home";
import { MarketExpandedPage } from "../pages/market-expanded";
import { SingleProductPage } from "../pages/single-product-page";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  ...LINKS.map((link) => ({
    path: link.href,
    element: link.component,
  })),
  {
    path: "/markets/:marketId",
    element: <MarketExpandedPage />,
  },
  {
    path: "/products/:productId",
    element: <SingleProductPage />,
  },
]);
