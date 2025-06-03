import axios from "axios";
import { setCurrentUser } from "@/utils/functions/auth/functions";
import {
  closeAllPopups,
} from "@/utils/functions/sharedFunctions";
import { queryClient } from "../queryClient";

let abortController = new AbortController();

const BACKEND = !!Number(import.meta.env.VITE_IS_PROD) ? import.meta.env.VITE_BACKEND_BASE_URL_1 : import.meta.env.VITE_BACKEND_BASE_URL
 
const api = axios.create({
  baseURL: BACKEND,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.signal = abortController.signal;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      abortController.abort();
      abortController = new AbortController();
      setCurrentUser(null);
      queryClient.clear();
      closeAllPopups();
      history.replaceState(null, "", "/login");
    }
    return Promise.reject(error);
  }
);

export { api };
