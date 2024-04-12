import "@radix-ui/themes/styles.css";
import "./index.css";

import { Theme } from "@radix-ui/themes";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";

import { App } from "./app";
import { queryClient } from "./app/axios";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <Theme accentColor="blue">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Theme>
  </QueryClientProvider>
);
