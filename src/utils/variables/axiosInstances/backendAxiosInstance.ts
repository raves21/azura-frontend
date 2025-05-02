import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true
});

export { api };
