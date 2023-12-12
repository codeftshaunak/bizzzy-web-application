import axios from "axios";
import { BASE_URL } from "./proxy";
import axiosInstance from "../Interceptor/Interceptor";

export const API = axios.create({
    baseURL: BASE_URL,
});

export const getClientJobs = async () => {
    try {
        const authtoken = localStorage.getItem("authtoken");
        const response = await axiosInstance.get("/job/client/jobs", {
            // headers: {
            //     "Content-Type": "application/json",
            //     token: `${authtoken}`,
            // },
        });
        return response.data.body;
    } catch (error) {
        return error;
    }
}

export const getProposals = async (data) => {
    try {
        const authtoken = localStorage.getItem("authtoken");
        const response = await axiosInstance.get(`/job/${data}/proposal`, {
            // headers: {
            //     "Content-Type": "application/json",
            //     token: `${authtoken}`,
            // },
        });
        return response.data.body;
    } catch (error) {
        return error;
    }
}

export const deleteJob = async(data)=>{
    try {
        const authtoken = localStorage.getItem("authtoken");
        const response = await axiosInstance.post(`job/delete/${data}`,{
            // headers: {
            //     "Content-Type": "application/json",
            //     token: `${authtoken}`,
            // },
        })
        return response.data;
    } catch (error) {
        
    }
}


export const inviteToJob = async(data)=>{
    try {
        const authtoken = localStorage.getItem("authtoken");
        const response = await axiosInstance.post(`invitation-send`,{
            // headers: {
            //     "Content-Type": "application/json",
            //     token: `${authtoken}`,
            // },
        })
        return response.data;
    } catch (error) {
        
    }
}