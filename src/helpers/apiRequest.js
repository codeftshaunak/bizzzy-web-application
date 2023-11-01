import { BASE_URL } from "./proxy";

export const API = axios.create({
    baseURL: BASE_URL,
  });
  
  API.interceptors.request.use(function (config) {
    let token = null;
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        token = user.token;
      }
    }
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
  
  API.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // store.dispatch(logout());
          setTimeout(() => {
            window.location.replace("/signin");
          }, 500);
        }
      }
      return Promise.reject(error);
    }
  );
  