import axios from "axios";
import { BASE_URL } from "./proxy";

export const API = axios.create({
  baseURL: BASE_URL,
});

export const getAllJobs = async () => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.get("/job/get-all", {
      headers: {
        "Content-Type": "application/json",
        token: `${authtoken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getJobById = async (data) => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.get(`/job/get-job/${data}`, {
      headers: {
        "Content-Type": "application/json",
        token: `${authtoken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};

export const applyJob = async (data) => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.post(`/job-proposal`, data, {
      headers: {
        "Content-Type": "application/json",
        token: `${authtoken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.data;
  }
};

export const createJob = async (formData) => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.post("/job/create", formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
        token: `${authtoken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
