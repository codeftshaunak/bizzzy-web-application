import axios from "axios";
import { BASE_URL, useApiErrorHandling } from "./proxy";

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
};

export const getProposals = async (data) => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.get(`/job/${data}/proposal`, {
      headers: {
        "Content-Type": "application/json",
        token: `${authtoken}`,
      },
    });
<<<<<<< HEAD
    return response.data;
=======
    return response.data.body;
>>>>>>> parent of db37502 (seperating the git create steps)
  } catch (error) {
    return error;
  }
};

export const deleteJob = async (data) => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.post(`job/delete/${data}`, {
      headers: {
        "Content-Type": "application/json",
        token: `${authtoken}`,
      },
    });
    return response.data;
  } catch (error) { }
};

export const inviteToJob = async (data) => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.post(`invitation-send`, {
      headers: {
        "Content-Type": "application/json",
        token: `${authtoken}`,
      },
    });
    return response.data;
  } catch (error) { }
};

<<<<<<< HEAD
=======
// export const getHiredListByClient = async () => {
//     try {
//         const authtoken = localStorage.getItem("authtoken");
//         const response = await API.get(`client/all-hired`, {
//             headers: {
//                 "Content-Type": "application/json",
//                 token: `${authtoken}`,
//             },
//         })
//         return response.data.body;
//     } catch (error) {

//     }
// }
>>>>>>> parent of db37502 (seperating the git create steps)

// ========= Client reviews =======

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
    params, // Include query parameters
  };

  try {
    const response = await API(config);
<<<<<<< HEAD
    return response?.data?.body;
=======
    return response?.data;
>>>>>>> parent of db37502 (seperating the git create steps)
  } catch (error) {
    // Use the error handling hook
    const { handleApiError } = useApiErrorHandling();
    handleApiError(error);
    return error.response?.data;
  }
};

<<<<<<< HEAD

=======
>>>>>>> parent of db37502 (seperating the git create steps)
export const getSearchFreelancer = async (keywords) =>
  makeApiRequest("get", "/search-freelancers", keywords);

export const giveFeedback = async (data) =>
  makeApiRequest("post", "/feedback/add", data);

export const getHiredListByClient = async () =>
  makeApiRequest("get", "/client/all-hired");

export const getOptionsList = async (userType) =>
  makeApiRequest("get", "/getOptionsList", null, null, { user_type: userType });

export const sendHireFreelancer = async (data) =>
  makeApiRequest("post", "/offer/send", data);

export const getFreelancerInfo = async (id) =>
  makeApiRequest("get", `/user?user_id=${id}`);

export const deleteMessage = async (id) =>
  makeApiRequest("post", `/message/delete?message_id=${id}`);

export const resendEmailVerification = async (email) =>
  makeApiRequest("post", "/email/resend-verification", email);

export const getCountries = async () =>
  makeApiRequest("get", "/get-countries");

export const getCategories = async () =>
<<<<<<< HEAD
  makeApiRequest("get", "/categories");

=======
  makeApiRequest("get", "/category");

export const getSkills = async (categoryId) =>
  makeApiRequest("get", `/skills?category_id=${categoryId}`);

export const getSingleJobDetails = async (id) =>
  makeApiRequest("get", `/job/get-job?job_id=${id}`);
>>>>>>> parent of db37502 (seperating the git create steps)
