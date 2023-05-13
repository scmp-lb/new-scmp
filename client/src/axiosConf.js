import axios from "axios";

const axiosConf = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'multipart/form-data',
  }
});

export default axiosConf;
