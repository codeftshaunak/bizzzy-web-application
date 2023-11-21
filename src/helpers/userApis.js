import { BASE_URL } from "./proxy";
import axios from "axios";

export const API = axios.create({
    baseURL: BASE_URL,
});

export const updateFreelancerProfile = async (data) => {
    try {
        const authtoken = localStorage.getItem("authtoken");
        const response = await API.post(`/profile-details`, data, {
            headers: {
                "Content-Type": "application/json",
                "token": `${authtoken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const uploadImage = async (data) => {
    try {
      const authtoken = localStorage.getItem("authtoken");  
      const response = await API.post(`/user-profile-image`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `${authtoken}`,
        },
      });

      return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateFreelancer = async (data) => {
    try {
      const authtoken = localStorage.getItem("authtoken");  
      const response = await API.put(`/edit-profile`, data, {
        headers: {
          "Content-Type": "application/json",
          token: `${authtoken}`,
        },
      });

      return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const getAllDetailsOfUser = async()=>{
    try {
        const authtoken = localStorage.getItem("authtoken");
        const response = await API.get('/get-user-profile',{
            headers: {
                "Content-Type": "application/json",
                "token": `${authtoken}`
            }
        })
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
