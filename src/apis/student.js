/** @format */

import axios from "../axios";

export const apiImportScore = (data) =>
  axios({
    url: "/v1/point/import-point",
    method: "post",
    data,
  });
