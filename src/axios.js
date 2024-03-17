/** @format */
import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor

instance.interceptors.request.use(
  function (config) {
    let localStorageData = window.localStorage.getItem("persist:app/user");
    if (localStorageData) {
      localStorageData = JSON.parse(localStorageData);
      const accessToken = JSON.parse(localStorageData.token);
      config.headers = { authorization: `Bearer ${accessToken}` };
      return config;
    } else return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return error.response.data;
  }
);

export default instance;
