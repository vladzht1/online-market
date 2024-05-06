import { createBrowserRouter } from "react-router-dom";

import { AllMarketsPage } from "../pages/all-markets";
import { AllUsersPage } from "../pages/all-users";
import { HomePage } from "../pages/home";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/users",
    element: <AllUsersPage />,
  },
  {
    path: "/markets",
    element: <AllMarketsPage />,
  },
]);
