import axiosApiInstance from "../axios";
import { loginCompanyUrl } from "../apiEndpoint";

export async function loginCompany(data:any) {
  return axiosApiInstance 
    .post(loginCompanyUrl, {
      nationalId: data?.username,
      password: data?.password
    })
    .then(async (response) => {
      localStorage.setItem("token", response.data.data);
      // setCookie('backAccessToken', response.data.token);
      return response;
    })
}