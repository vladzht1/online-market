import { createBrowserRouter } from "react-router-dom";

import { LINKS } from "../constants/links";
import { HomePage } from "../pages/home";
import { MarketExpandedPage } from "../pages/market-expanded";
import { SingleOrderPage } from "../pages/single-order-page";
import { SingleProductPage } from "../pages/single-product-page";

import { Query1Page } from "../pages/queries/query-1";
import { Query2Page } from "../pages/queries/query-2";
import { Query3Page } from "../pages/queries/query-3";
import { Query4Page } from "../pages/queries/query-4";
import { Query5Page } from "../pages/queries/query-5";

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
  {
    path: "/orders/:orderId",
    element: <SingleOrderPage />,
  },
  {
    path: "/queries/1",
    element: <Query1Page />,
  },
  {
    path: "/queries/2",
    element: <Query2Page />,
  },
  {
    path: "/queries/3",
    element: <Query3Page />,
  },
  {
    path: "/queries/4",
    element: <Query4Page />,
  },
  {
    path: "/queries/5",
    element: <Query5Page />,
  },
]);
