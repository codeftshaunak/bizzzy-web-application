import axios from "axios";
import { BASE_URL } from "./proxy";

export const API = axios.create({
    baseURL: BASE_URL,
});

export const getAllJobsProposal = async () => {
    try {
        const authtoken = localStorage.getItem("authtoken");
        const response = await API.get("/job-proposal-by-user", {
            headers: {
                "Content-Type": "application/json",
                token: `${authtoken}`,
            },
        });

        console.log(response?.data?.body);
        return response?.data?.body;
    } catch (error) {
        return error;
    }
};

