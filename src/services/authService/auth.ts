import axiosApiInstance from "../axios";
import { loginUrl } from "../apiEndpoint";
import { setCookie } from "../../utils/cookie";

export async function login(data:any) {
  return axiosApiInstance 
    .post(loginUrl, {
      email: data?.email,
      password: data?.password
    })
    .then(async (response) => {
      setCookie('backAccessToken', response.data.access_token);
      return response;
    })
}