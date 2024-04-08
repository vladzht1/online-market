import { RouterProvider } from "react-router-dom";

import { rootRouter } from "./app/router";

export const App = () => {
  return (
    <>
      <RouterProvider router={rootRouter} />
    </>
  );
};
