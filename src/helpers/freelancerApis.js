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
    return response.data;
  } catch (error) {
    // Use the error handling hook
    const { handleApiError } = useApiErrorHandling();
    const { path, message, isError } = handleApiError(error);
    return { path, message, isError };
  }
};

export const acceptInvitation = async (data) =>
  makeApiRequest("put", "/invitation-status-update", data);

export const updateOfferRequest = async (data) =>
  makeApiRequest("post", "/offer/update", data);

export const offerDetails = async (offer_id) =>
  makeApiRequest("get", `/freelancer/offer-details?offer_id=${offer_id}`);

export const workSubmit = async (data) =>
  makeApiRequest("post", "/offer/task/submit", data, {}, "multipart/form-data");

export const invitationDetails = async (invite_id) =>
  makeApiRequest(
    "get",
    `/freelancer/invitation-details?invitation_id=${invite_id}`
  );

export const getMessageList = async () =>
  makeApiRequest("get", "/user-chat-list");

export const getMessageDetails = async (data) =>
  makeApiRequest("get", `/message-list?receiver_id=${data}`);

export const getReportData = async () =>
  makeApiRequest("get", "/reports");

export const createGig = async (data) =>
  makeApiRequest('post', '/freelancer/gig/create', data)




//Thous function with end points need to recerate again with the following method avobe 
export const getFreelancers = async (
  skills,
  searchText,
  hourlyRateMin,
  hourlyRateMax
) => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const skillsValues = skills.map((skill) => skill.value).join(",");
    console.log("skillsValues", skillsValues);

    const response = await API.get("/search-freelancers", {
      headers: {
        "Content-Type": "application/json",
        token: authtoken,
      },
      params: {
        searchText: searchText,
        skills: skillsValues,
        hourlyRateMin: hourlyRateMin,
        hourlyRateMax: hourlyRateMax,
      },
    });
    return response.data.body;
  } catch (error) {
    console.error("Error fetching freelancer data:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const authtoken = localStorage.getItem("authtoken");

    const response = await API.get("/category", {
      headers: {
        "Content-Type": "application/json",
        token: authtoken,
      },
    });
    return response.data.body;
  } catch (error) {
    console.error("Error fetching freelancer data:", error);
    throw error;
  }
};

export const getSkills = async (category_id) => {
  console.log("categoryId", category_id);
  try {
    const authtoken = localStorage.getItem("authtoken");

    const response = await API.get(`/skills`, {
      headers: {
        "Content-Type": "application/json",
        token: authtoken,
      },
      params: {
        category_id: category_id,
      },
    });
    return response.data.body;
  } catch (error) {
    console.error("Error fetching freelancer data:", error);
    throw error;
  }
};
