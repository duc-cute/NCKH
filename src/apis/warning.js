import axios from "../axios";

// API create warning
const base_url = "/v1/warning";
export const apiCreateWarning = (data) =>
  axios({
    url: `${base_url}/insert-warning`,
    method: "post",
    data,
  });
export const apiGetWarningById = (id) =>
  axios({
    url: `${base_url}/select-warning-by-id/` + id,
    method: "get",
  });
export const apiGetAllWarning = () =>
  axios({
    url: `${base_url}/select-all-warning`,
    method: "get",
  });
export const apiDeleteWarning = (id) =>
  axios({
    url: `${base_url}/delete-warning/` + id,
    method: "delete",
  });
export const apiUpdateWarning = (data) =>
  axios({
    url: `${base_url}/update-warning`,
    method: "put",
    data,
  });
