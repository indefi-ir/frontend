// import axiosApiInstance from "../axios";
// import { loginAnchorUrl } from "../apiEndpoint";

// export async function loginFunder(data:any) {
//   return axiosApiInstance 
//     .post(loginAnchorUrl, {
//       nationalId: data?.username,
//       password: data?.password
//     })
//     .then(async (response) => {
//       localStorage.setItem("token", response.data);
//       // setCookie('backAccessToken', response.data.token);
//       return response;
//     })
// }

import axiosApiInstance from "../axios";
import { loginFunderUrl } from "../apiEndpoint";

export async function loginFunder(data:any) {
  return axiosApiInstance 
    .post(loginFunderUrl, {
      username: data?.username,
      password: data?.password
    })
    .then(async (response) => {
      localStorage.setItem("token", response.data.data);
      // setCookie('backAccessToken', response.data.token);
      return response;
    })
}