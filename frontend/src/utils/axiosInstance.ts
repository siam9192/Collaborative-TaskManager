"use server";
import axios from "axios";
import envConfig from "./envConfig";
import { getNewAccessToken, userLogout } from "../api-services/auth.api.service";

const axiosInstance = axios.create({
  baseURL: envConfig.backendBaseUrl,
  withCredentials: true,
});
 

axiosInstance.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    try {
       await getNewAccessToken();
       return axiosInstance(error.config);
    } catch (error) {
       await userLogout()
    }
    
  }

  throw error;
});
export default axiosInstance;
