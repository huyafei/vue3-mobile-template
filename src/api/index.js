import axios from "../utils/axios";

export function userLogin(data) {
  return axios({
    url: `/user/userLogin`,
    method: "post",
    data,
  });
}
export function getUserInfoApi() {
  return axios({
    url: `/user/getUserInfo`,
    method: "post",
  });
}
