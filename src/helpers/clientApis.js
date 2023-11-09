import axios from "axios";
import { BASE_URL } from "./proxy";

export const API = axios.create({
    baseURL: BASE_URL,
});

export const getClientJobs = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get("/job/client/jobs", {
            headers: {
                "Content-Type": "application/json",
                token: `${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        return error;
    }
}

export const getProposals = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get(`/job/${data}/proposal`, {
            headers: {
                "Content-Type": "application/json",
                token: `${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        return error;
    }
}