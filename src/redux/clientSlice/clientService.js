import axios from "axios";
import { BASE_URL } from "../../helpers/proxy";

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Adjust the base URL as needed
});

// For Getting Token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authtoken");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export const clientService = (data) => (dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
        const res = await axiosInstance.post("invitation-send",data);
        // dispatch(updateCode(res.status))
        resolve(res.data)
    } catch (error) {
      reject(error);
    }
  });
};

export const hireFreelancerService= (data) => (dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
        const res = await axiosInstance.post("offer/send",data);
        // dispatch(updateCode(res.status))
        resolve(res.data)
    } catch (error) {
      reject(error);
    }
  });
};