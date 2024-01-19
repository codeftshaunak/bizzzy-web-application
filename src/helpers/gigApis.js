import { API } from "./proxy";
import { useApiErrorHandling } from "./proxy";

const makeApiRequest = async (
  method,
  endpoint,
  data = null,
  customHeaders = {},
  contentType = "multipart/form-data"
) => {
  const authtoken = localStorage.getItem("authtoken");

  const headers = {
    ...customHeaders,
    token: authtoken,
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
    const { handleApiError } = useApiErrorHandling();
    const { path, message, isError } = handleApiError(error);
    return { path, message, isError };
  }
};

export const uploadImages = async (data) =>
  makeApiRequest(
    "POST",
    "/upload/multiple/images",
    data,
    {},
    "multipart/form-data"
  );

export const uploadMedia = async (data) => {
  makeApiRequest("POST", "/upload/video", data, {}, "multipart/form-data");
};
