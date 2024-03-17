/** @format */

import axios from "../axios";

export const apiLogin = (data) =>
  axios({
    url: "/v1/user/login",
    method: "post",
    data,
  });
export const apiRegister = (data) =>
  axios({
    url: "/v1/user/register",
    method: "post",
    data,
  });
