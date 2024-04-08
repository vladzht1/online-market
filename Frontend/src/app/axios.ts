import axios from "axios";
import { QueryClient } from "react-query";

import { SERVER_HOST } from "../constants/api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  }
});

export const http = axios.create({
  withCredentials: false,
  baseURL: SERVER_HOST || "",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
});
