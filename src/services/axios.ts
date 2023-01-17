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
  return axiosApiInstance
    .get(url)
    .then((res) => res?.data)
    .catch((error) => error)
}

export const fetcher = (url:any) => get(url);
