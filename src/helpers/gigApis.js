import { API, useApiErrorHandling } from "./proxy";

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
    "Content-Type": contentType,
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

export const uploadImages = async (data, query) =>
  makeApiRequest(
    "POST",
    `/upload/multiple/images${query}`,
    data,
    {},
    "multipart/form-data"
  );

export const uploadMedia = async (data) =>
  makeApiRequest("POST", "/upload/video", data, {}, "multipart/form-data");

export const getFreelancerGigs = async () =>
  makeApiRequest("get", "/freelancer/all/gig");

export const updateFreelancerGig = async (data) =>
  makeApiRequest(
    "patch",
    `/freelancer/gig/update?gig_id=${data._id}`,
    data,
    {},
    "application/json"
  );

export const deleteFreelancerGig = async (_id) =>
  makeApiRequest("delete", `/freelancer/gig/delete?gig_id=${_id}`);

export const getGigDetails = async (_id) =>
  makeApiRequest("get", `/freelancer/gig/getbyGigId?gig_id=${_id}`);
