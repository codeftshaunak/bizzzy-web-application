import axios from "axios";
import { BASE_URL } from "./proxy";

export const API = axios.create({
    baseURL: BASE_URL,
});

export const getClientJobs = async () => {
    try {
        const authtoken = localStorage.getItem("authtoken");
        const response = await API.get("/job/client/jobs", {
            headers: {
                "Content-Type": "application/json",
                token: `${authtoken}`,
            },
        });
        return response.data.body;
    } catch (error) {
        return error;
    }
}