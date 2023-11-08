import { BASE_URL } from "./proxy";
import axios from "axios";

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
          window.location.replace("/login");
        }, 500);
      }
    }
    return Promise.reject(error);
  }
);


export const signUp = async (data) => {
  try {
    const response = await API.post("/register", data, {
      headers: { "Access-Control-Allow-Credentials": true },
    })
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export const signIn = async (data) => {
  try {
    const response = await API.post("/login", data, {
      headers: { "Access-Control-Allow-Credentials": true },
    });
    console.log(response.data.body.token);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const verifyMail = async (data) => {
  try {
    const response = await API.post("/verify-email", data, {
      headers: { "Access-Control-Allow-Credentials": true },
    })
    return response.data
  } catch (error) {
    return error.response.data;
  }
}
