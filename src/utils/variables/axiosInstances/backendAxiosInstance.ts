import axios from "axios";
import { setCurrentUser } from "@/services/auth/sharedFunctions";
import { closeAllPopups } from "@/utils/functions/sharedFunctions";

let abortController = new AbortController();

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
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

      closeAllPopups();
      setCurrentUser(null);
      history.replaceState(null, "", "/login");
    }
    return Promise.reject(error);
  }
);

export { api };
