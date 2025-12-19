const environment =  import.meta.env.VITE_ENVIRONMENT as string
export default {
  backendBaseUrl:  environment.toLowerCase() === "production"? import.meta.env.VITE_BACKEND_BASE_URL_PROD: import.meta.env.VITE_BACKEND_BASE_URL_DEV,
   backendSocketBaseUrl:  environment.toLowerCase() === "production"? import.meta.env.VITE_BACKEND_SOCKET_BASE_URL_PROD:import.meta.env.VITE_BACKEND_SOCKET_BASE_URL_DEV
};
