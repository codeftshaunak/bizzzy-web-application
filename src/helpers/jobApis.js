import axios from "axios";
import { BASE_URL } from "./proxy";
import axiosInstance from "../Interceptor/Interceptor";

export const API = axios.create({
  baseURL: BASE_URL,
});

const makeApiRequest = async (method, endpoint, data = null, customHeaders = {}) => {
  const authtoken = localStorage.getItem("authtoken");

  const headers = {
      "Content-Type": "application/json",
      token: authtoken,
      ...customHeaders, // Allow for custom headers
  };

  const config = {
      method,
      url: endpoint,
      headers,
      data,
  };
  try {
      const response = await API(config);
      return response.data;
  } catch (error) {
      // Use the error handling hook
      const { handleApiError } = useApiErrorHandling();
      const { path, message, isError } = handleApiError(error);
      return { path, message, isError };
  }
};


export const getAllJobs=async()=>
makeApiRequest('get','/job/get-all')

export const searchJobs=async(searchQuery)=>
makeApiRequest('post','/job/search',searchQuery)

export const getSearchFreelancer=async(keywords)=>
makeApiRequest('post',"/search-freelencers", {keywords} )

export const getInvitedFreelancer=async()=>
makeApiRequest('get',"/invited-freelencers")

export const getJobById=async(data)=>
makeApiRequest('get',`/job/get-job/${data}`)

export const applyJob=async(data)=>
makeApiRequest('post','/job-proposal',data)

export const createJob=async(formData)=>
makeApiRequest('post',"/job/create",formData)

export const getAllInvitedHireList=async()=>
makeApiRequest('get',"/get-offers-list")

export const getHiredFreelancerList=async()=>
makeApiRequest('get',"/get-hired-list")

// export const getAllJobs = async () => {
//   try {
//     const authtoken = localStorage.getItem("authtoken");
//     const response = await axiosInstance.get("/job/get-all", {
//       // headers: {
//       //   "Content-Type": "application/json",
//       //   token: `${authtoken}`,
//       // },
//     });

//     return response.data.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const searchJobs = async (searchQuery) => {
//   const authToken = localStorage.getItem("authtoken");
//   try {
//     const response = await API.post('/job/search', searchQuery, {
//       headers: {
//         "Content-Type": "application/json",
//         token: authToken,
//       },
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error("API Error:", error.message);
//     throw error;
//   }
// };

// export const getSearchFreelancer = async (keywords) => {
//   try {
//     const authToken = localStorage.getItem("authtoken");
//     const response = await axiosInstance.post(
//       "/search-freelencers",
//       { keywords },
//       {
//         // headers: {
//         //   "Content-Type": "application/json",
//         //   token: authToken,
//         // },
//       }
//     );
//     console.log("API Success:", response.data.body);
//     return response.data.body;
//   } catch (error) {
//     console.error("API Error:", error.message);
//     throw error;
//   }
// };

// export const getInvitedFreelancer = async () => {
//   try {
//     const authToken = localStorage.getItem("authtoken");
//     const response = await axiosInstance.get(
//       "/invited-freelencers",
//       // {
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     token: authToken,
//       //   },
//       // }
//     );
//     console.log("API Success:", response.data.body);
//     return response.data.body;
//   } catch (error) {
//     console.error("API Error:", error.message);
//     throw error;
//   }
// };

// export const getJobById = async (data) => {
//   try {
//     const authtoken = localStorage.getItem("authtoken");
//     const response = await axiosInstance.get(`/job/get-job/${data}`, {
//       // headers: {
//       //   "Content-Type": "application/json",
//       //   token: `${authtoken}`,
//       // },
//     });
//     return response.data.data;
//   } catch (error) {
//     return error.data;
//   }
// };

// export const applyJob = async (data) => {
//   try {
//     const authtoken = localStorage.getItem("authtoken");
//     const response = await axiosInstance.post(`/job-proposal`, data, {
//       // headers: {
//       //   "Content-Type": "application/json",
//       //   token: `${authtoken}`,
//       // },
//     });
//     return response.data;
//   } catch (error) {
//     return error.data;
//   }
// };

// export const createJob = async (formData) => {
//   try {
//     const authtoken = localStorage.getItem("authtoken");
//     const response = await axiosInstance.post("/job/create", formData, {
//       // headers: {
//       //   "Content-Type": `multipart/form-data`,
//       //   token: `${authtoken}`,
//       // },
//     });
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };


//hire list api

// export const getAllInvitedHireList = async () => {
//   try {
//     const authtoken = localStorage.getItem("authtoken");
//     const response = await axiosInstance.get("/get-offers-list", {
//       // headers: {
//       //   "Content-Type": `multipart/form-data`,
//       //   token: `${authtoken}`,
//       // },
//     });
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const getHiredFreelancerList = async () => {
//   try {
//     const authtoken = localStorage.getItem("authtoken");
//     const response = await axiosInstance.get("/get-hired-list", {
//       // headers: {
//       //   "Content-Type": `multipart/form-data`,
//       //   token: `${authtoken}`,
//       // },
//     });
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };