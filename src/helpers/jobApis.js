import axios from "axios";
import { BASE_URL, useApiErrorHandling } from "./proxy";

export const API = axios.create({
  baseURL: BASE_URL,
});

export const getAllJobs = async () => {
  // eslint-disable-next-line no-useless-catch
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
    throw error;
  }
};

export const getJobs = async (
  category,
  searchTerm,
  experience,
  contractType
) => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const experienceValues = experience
      ? experience.map((exp) => exp).join(",")
      : "";
    const contractValue = contractType
      ? contractType.map((contact) => contact).join(",")
      : "";

    const response = await API.get("/job/search", {
      headers: {
        "Content-Type": "application/json",
        token: authtoken,
      },
      params: {
        searchTerm: searchTerm || "",
        experience: experienceValues,
        job_type: contractValue,
        category: category ? category.map((cat) => cat.value).join(",") : "",
      },
    });

    return response.data.body;
  } catch (error) {
    console.error("Error fetching job data:", error);
    throw error;
  }
};

export const getInvitedFreelancer = async () => {
  try {
    const authToken = localStorage.getItem("authtoken");
    const response = await API.get("/freelancers/invited", {
      headers: {
        "Content-Type": "application/json",
        token: authToken,
      },
    });

    return response.data.body;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

export const applyJob = async (data) => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.post(`/job-proposal`, data, {
      headers: {
        "content-type": "multipart/form-data",
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

export const getAllJobsProposal = async () => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.get("/jobs/proposals", {
      headers: {
        "Content-Type": "application/json",
        token: `${authtoken}`,
      },
    });

    return response?.data?.body;
  } catch (error) {
    return error;
  }
};

const makeApiRequest = async (
  method,
  endpoint,
  data = null,
  customHeaders = {},
  params = {}
) => {
  const authtoken = localStorage.getItem("authtoken");

  const headers = {
    "Content-Type": "application/json",
    token: authtoken,
    ...customHeaders,
  };

  const config = {
    method,
    url: endpoint,
    headers,
    data,
    params,
  };

  try {
    const response = await API(config);
    return response?.data.body;
  } catch (error) {
    const { handleApiError } = useApiErrorHandling();
    handleApiError(error);
    return error.response?.data;
  }
};

export const userAllJobs = async () => makeApiRequest("get", "/users/jobs");

export const getSingleJobDetails = async (id) =>
  makeApiRequest("get", `/job/get-job?job_id=${id}`);
