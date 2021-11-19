import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
// console.log("Base URL", baseUrl);
const KEY = "wines-app";

export const axiosWithoutToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  // console.log("URL env sin token", url);
  return axios({ method, url, data });
};

export const axiosWithToken = (endpoint, data, method = "GET") => {
  try {
    const url = `${baseUrl}/${endpoint}`;
    // console.log("URL env", url);
    const token = JSON.parse(localStorage.getItem(KEY)).token || "";
    return axios({
      method,
      url,
      data,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
    });
  } catch (err) {
    console.log("Gotcha", err);
  }
};
