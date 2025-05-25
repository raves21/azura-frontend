import axios from "axios";
import { setCurrentUser } from "@/services/auth/sharedFunctions";
import {
  closeAllPopups,
} from "@/utils/functions/sharedFunctions";
import { queryClient } from "../queryClient";

let abortController = new AbortController();

const api = axios.create({
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
