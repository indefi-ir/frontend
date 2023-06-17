import axiosApiInstance from "../axios";
import { loginFunderUrl } from "../apiEndpoint";
import { setCookie } from "../../utils/cookie";

export async function login(data:any) {
  console.log("data", data)
  return axiosApiInstance 
    .post(loginFunderUrl, {
      username: data?.username,
      password: data?.password
    })
    .then(async (response) => {
      localStorage.setItem("token", response.data.message);
      // setCookie('backAccessToken', response.data.token);
      return response;
    })
}