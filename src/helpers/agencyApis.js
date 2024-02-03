import { API } from "./proxy";
import { useApiErrorHandling } from "./proxy";

const makeApiRequest = async (
  method,
  endpoint,
  data = null,
  customHeaders = {},
  contentType = "application/json"
) => {
  const authtoken = localStorage.getItem("authtoken");

  const headers = {
    "Content-Type": contentType,
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
    return response.data.body;
  } catch (error) {
    // Use the error handling hook
    const { handleApiError } = useApiErrorHandling();
    const { path, message, isError } = handleApiError(error);
    return { path, message, isError };
  }
};

export const createAgency = async (data) =>
  makeApiRequest("post", "/agency/create", data);

export const createAgencyProject = async (data) =>
  makeApiRequest("post", "/agency/project", data);
export const updateAgencyProfile = async (data) =>
  makeApiRequest("put", "/agency/update", data);

export const getAgency = async () =>
  makeApiRequest("get", "/agency");

export const sendAgencyInvitation = async (data) =>
  makeApiRequest('post', '/agency/invite', data);

export const getAgencyById = async (id) =>
  makeApiRequest('get', `/agencyById?agency_id=${id}`);

export const getAgencyMemburs = async (id) =>
  makeApiRequest('get', `/invitation/status?agency_id=${id}`)
