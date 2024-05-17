import { createBrowserRouter } from "react-router-dom";

import { LINKS } from "../constants/links";
import { HomePage } from "../pages/home";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  ...LINKS.map((link) => ({
    path: link.href,
    element: link.component,
  })),
]);
