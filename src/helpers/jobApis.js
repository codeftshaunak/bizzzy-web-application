import axios from "axios";
<<<<<<< HEAD
import { BASE_URL, useApiErrorHandling } from "./proxy";
=======
import { BASE_URL } from "./proxy";
>>>>>>> parent of db37502 (seperating the git create steps)

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
    throw error;
  }
};

export const searchJobs = async (searchQuery) => {
  const authToken = localStorage.getItem("authtoken");
  try {
    const response = await API.post('/job/search', searchQuery, {
      headers: {
        "Content-Type": "application/json",
        token: authToken,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

// export const getSearchFreelancer = async (keywords) => {
//   try {
//     const authToken = localStorage.getItem("authtoken");
//     const response = await API.get(
//       "/search-freelancers",
//       { keywords },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           token: authToken,
//         },
//       }
//     );
//     console.log("API Success:", response.data.body);
//     return response.data.body;
//   } catch (error) {
//     console.error("API Error:", error.message);
//     throw error;
//   }
// };

export const getInvitedFreelancer = async () => {
  try {
    const authToken = localStorage.getItem("authtoken");
    const response = await API.get(
      "/freelancers/invited",
      {
        headers: {
          "Content-Type": "application/json",
          token: authToken,
        },
      }
    );
    console.log("API Success:", response.data.body);
    return response.data.body;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

<<<<<<< HEAD
// export const getJobById = async (data) => {
//   try {
//     const authtoken = localStorage.getItem("authtoken");
//     const response = await API.get(`/job/get-job/${data}`, {
//       headers: {
//         "Content-Type": "application/json",
//         token: `${authtoken}`,
//       },
//     });
//     return response.data.data;
//   } catch (error) {
//     return error.data;
//   }
// };

=======
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
>>>>>>> parent of db37502 (seperating the git create steps)

export const applyJob = async (data) => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.post(`/job-proposal`, data, {
      headers: {
        'content-type': 'multipart/form-data',
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
<<<<<<< HEAD
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.get("/jobs/proposals", {
      headers: {
        "Content-Type": "application/json",
        token: `${authtoken}`,
      },
    });

    console.log(response?.data?.body);
    return response?.data?.body;
  } catch (error) {
    return error;
=======
      const authtoken = localStorage.getItem("authtoken");
      const response = await API.get("/jobs/proposals", {
          headers: {
              "Content-Type": "application/json",
              token: `${authtoken}`,
          },
      });

      console.log(response?.data?.body);
      return response?.data?.body;
  } catch (error) {
      return error;
>>>>>>> parent of db37502 (seperating the git create steps)
  }
};

// -------------

const makeApiRequest = async (method, endpoint, data = null, customHeaders = {}, params = {}) => {
  const authtoken = localStorage.getItem("authtoken");

  const headers = {
<<<<<<< HEAD
    "Content-Type": "application/json",
    token: authtoken,
    ...customHeaders,
  };

  const config = {
    method,
    url: endpoint,
    headers,
    data,
    params, // Include query parameters
  };

  try {
    const response = await API(config);
    return response?.data.body;

  } catch (error) {
    // Use the error handling hook
    const { handleApiError } = useApiErrorHandling();
    handleApiError(error);
    return error.response?.data;
=======
      "Content-Type": "application/json",
      token: authtoken,
      ...customHeaders,
  };

  const config = {
      method,
      url: endpoint,
      headers,
      data,
      params, // Include query parameters
  };

  try {
      const response = await API(config);
      return response?.data;

  } catch (error) {
      // Use the error handling hook
      const { handleApiError } = useApiErrorHandling();
      handleApiError(error);
      return error.response?.data;
>>>>>>> parent of db37502 (seperating the git create steps)
  }
};

export const userAllJobs = async () =>
<<<<<<< HEAD
  makeApiRequest('get', '/users/jobs');

export const getSingleJobDetails = async (id) =>
  makeApiRequest("get", `/job/get-job?job_id=${id}`);
=======
    makeApiRequest('get', '/users/jobs');


>>>>>>> parent of db37502 (seperating the git create steps)

