import axios from "axios";
import { NETWORK_ERROR_CODES } from "./shared";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (NETWORK_ERROR_CODES.includes(error.code)) {
      history.replaceState(null, ``, `/no-internet`);
      return;
    }
  }
);

export { tmdbApi };
