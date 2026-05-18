import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const setupInterceptors = (instance: AxiosInstance) => {
  // Request;
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = sessionStorage.getItem("GSIMS_Token");

      if (token) {
        config.headers = config.headers ?? {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      console.log("AUTH HEADER:", config.headers?.["Authorization"]);
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  // Response
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status;

      if (status === 401) {
        sessionStorage.removeItem("GSIMS_Token");

        // 避免重複跳轉
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    },
  );
};

export default setupInterceptors;
