import { API } from './proxy';
import { useApiErrorHandling } from './proxy';

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
        handleApiError(error);
        return error.response.data;
    }
};

