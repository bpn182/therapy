import axios, { AxiosError, AxiosInstance } from "axios";

// Axios Configuration

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 100000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export { axiosInstance };
