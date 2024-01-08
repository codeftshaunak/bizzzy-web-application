import { API } from "./proxy";
import { useApiErrorHandling } from "./proxy";

const makeApiRequest = async (
  method,
  endpoint,
  data = null,
  customHeaders = {}
) => {
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

export const updateFreelancerProfile = async (data) =>
  makeApiRequest("post", "/profile-details", data);

export const uploadImage = async (data) =>
  makeApiRequest("post", "/user-profile-image", data, {
    "Content-Type": "multipart/form-data",
  });

export const updateFreelancer = async (data) =>
  makeApiRequest("put", "/edit-profile", data);

export const getAllDetailsOfUser = async () =>
  makeApiRequest("get", "/get-user-profile");

export const userById = async (id) =>
  makeApiRequest("get", `/user?user_id=${id}`);
