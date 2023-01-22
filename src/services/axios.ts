import getConfig from "next/config";
import axios from "axios";
import { getCookie } from "../utils/cookie";

const headers: { [key: string]: any } = {};

const { publicRuntimeConfig } = getConfig();
export const { baseURL } = publicRuntimeConfig;

const axiosApiInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApiInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export async function get(url:string) {
  axiosApiInstance
    .get(url)
    .then((res) => res?.data)
    .catch((error) => error)
}

export async function post(url:string, body?:any, config={}) {
  return axiosApiInstance
  .post(url, body, config)
  .then((res) => res.data)
  .catch((error) => error)
}

export const fetcher = (url:string) => axiosApiInstance.get(url).then(res => res.data)

export default axiosApiInstance;

