import axios from "axios";
import { BASE_URL } from "./proxy";

export const API = axios.create({
  baseURL: BASE_URL,
});

export const getAllJobs = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get("/job/get-all", {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getJobById = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`/job/get-job/${data}`, {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};

export const applyJob = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.post(`/job-proposal`, data, {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.data;
  }
};

export const createJob = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.post("/job/create", data, {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};
