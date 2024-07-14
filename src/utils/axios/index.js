import axios from "axios";
import LocalStorage from "../../managers/LocalStorage";

const BackendURL= process.env.REACT_APP_BASE_URL
const api = axios.create({
  baseURL: `${BackendURL}`,
});

api.interceptors.request.use(function (config) {
  try {
    let token = LocalStorage.getToken();
    config.headers.Authorization = `bearer ${token}`;
    return config;
  } catch (error) {
    throw new Error(`Api intercept error: ${error.messaage}`);
  }
});

export default api;
