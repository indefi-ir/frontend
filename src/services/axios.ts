import getConfig from "next/config";
import axios from "axios";

const headers: { [key: string]: any } = {};

const { publicRuntimeConfig } = getConfig();
// export const { baseURL } = publicRuntimeConfig;
const axiosApiInstance = axios.create({
  baseURL:"https://plutus-backend.darkube.app",
  headers,
});

export async function get(url:string) {
  return axiosApiInstance
    .get(url)
    .then((res) => res)
    .catch((error) => error)
}

export const fetcher = (url:any) => get(url);
