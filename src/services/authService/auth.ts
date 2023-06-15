import axiosApiInstance from "../axios";
import { loginUrl } from "../apiEndpoint";
import { setCookie } from "../../utils/cookie";

export async function login(data:any) {
  return axiosApiInstance 
    .post(loginUrl, {
      username: data?.username,
      password: data?.password
    })
    .then(async (response) => {
      console.log("response", response.data.message)
      localStorage.setItem("token", response.data.message);
      // setCookie('backAccessToken', response.data.token);
      return response;
    })
}