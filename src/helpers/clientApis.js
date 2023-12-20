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
}

export const getProposals = async (data) => {
    try {
        const authtoken = localStorage.getItem("authtoken");
        const response = await API.get(`/job/${data}/proposal`, {
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

export const deleteJob = async (data) => {
    try {
        const authtoken = localStorage.getItem("authtoken");
        const response = await API.post(`job/delete/${data}`, {
            headers: {
                "Content-Type": "application/json",
                token: `${authtoken}`,
            },
        })
        return response.data;
    } catch (error) {

    }
}


export const inviteToJob = async (data) => {
    try {
        const authtoken = localStorage.getItem("authtoken");
        const response = await API.post(`invitation-send`, {
            headers: {
                "Content-Type": "application/json",
                token: `${authtoken}`,
            },
        })
        return response.data;
    } catch (error) {

    }
}

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

// ========= Client reviews =======

const makeApiRequest = async (method, endpoint, data = null, customHeaders = {}, params = {}) => {
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
        return response?.data;

    } catch (error) {
        // Use the error handling hook
        const { handleApiError } = useApiErrorHandling();
        handleApiError(error);
        return error.response?.data;
    }
};

export const giveFeedback = async (data) =>
    makeApiRequest('post', '/add/feedback', data);

export const getHiredListByClient = async () =>
    makeApiRequest('get', '/client/all-hired');

export const getOptionsList = async (userType) =>
    makeApiRequest('get', '/getOptionsList', null, null, { user_type: userType });

