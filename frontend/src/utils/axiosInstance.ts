"use server";
import axios from "axios";
import envConfig from "./envConfig";

const axiosInstance = axios.create({
  baseURL: envConfig.backendBaseUrl,
  withCredentials: true,
});

export default axiosInstance;
