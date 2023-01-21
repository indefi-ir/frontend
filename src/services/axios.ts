import getConfig from "next/config";
import axios from "axios";

const headers: { [key: string]: any } = {};

const { publicRuntimeConfig } = getConfig();
export const { baseURL } = publicRuntimeConfig;

const axiosApiInstance = axios.create({
  baseURL,
  headers,
});

export async function get(url:string) {
  axiosApiInstance
    .get(url)
    .then((res) => res?.data)
    .catch((error) => error)
}

export async function post(url:any, body:any, config={}) {
  return axiosApiInstance
  .post(url, body, config)
  .then((res) => res.data)
  .catch((error) => error)
}

export const fetcher = (url:string) => axios.get(url).then(res => res.data)

export default axiosApiInstance;

