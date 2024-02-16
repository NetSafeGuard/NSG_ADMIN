import axios from "axios";
import { Logout } from "../contextapi/global.context";

export const api = axios.create({
  baseURL: "https://api.netsafeguard.cloud/api/v1/",
  //baseURL: "http://localhost:3000/api/v1/",
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("nsg_token");

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status == 401 || error.response?.status == 403) {
      Logout();
    }
    return Promise.reject(error);
  }
);
