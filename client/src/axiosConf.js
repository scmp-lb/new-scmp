import axios from "axios";

const axiosConf = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "multipart/form-data",
  },
});

export default axiosConf;
