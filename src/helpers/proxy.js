import axios from "axios";

// export const BASE_URL = `http://localhost:5002/api/v1`;
// export const socketURL = 'http://localhost:5002/'

export const socketURL = `https://bizzzy-test-dev-6ffd12d31812.herokuapp.com/`;
export const BASE_URL = `https://bizzzy-test-dev-6ffd12d31812.herokuapp.com/api/v1`;

const authToken = localStorage.getItem("authtoken");
export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    token: authToken,
  },
});

export const useApiErrorHandling = () => {
  const logoutAndRedirect = (msg) => {
    return {
      path: "/login",
      message: msg,
      isError: true,
    }
  };

  const handleErrorResponse=(msg)=>{
    return {
      message: msg,
      isError: true,
    }
  }

  const handleApiError = (error) => {
    console.error("API Error:", error.response.data);
    if (error.response) {
      if (error.response.data.code === 401) {
        return logoutAndRedirect(error.response.data.msg);
      } else if (error.response.data.code === 400) {
        return handleErrorResponse(error.response.data.msg);
      } else if (error.response.data.code === 404) {
        return handleErrorResponse(error.response.data.msg);
      } else {
        throw error;
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("Network error: Unable to connect to the server.");
    } else {
      console.error("Request setup Error:", error.message);
      throw new Error("Unexpected error occurred.");
    }
  };

  API.interceptors.response.use(
    (response) => response,
    (error) => {
      handleApiError(error);
      return Promise.reject(error);
    }
  );

  return {
    handleApiError
  };
};
