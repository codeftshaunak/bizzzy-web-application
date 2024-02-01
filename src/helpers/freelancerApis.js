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
  makeApiRequest("get", "/reports/freelancer");

export const createGig = async (data) =>
  makeApiRequest("post", "/freelancer/gig/create", data);

export const getSubCategory = async (_id) =>
  makeApiRequest("get", `/categories/subcategories?category_id=${_id}`);

export const getSkills = async (category_id, sub_category_id) => {
  let url = `/categories/skills?category_id=${category_id}`;
  if (sub_category_id) url += `&sub_category_id=${sub_category_id}`;

  return makeApiRequest("get", url);
};

// Update the function signature
export const getFreelancers = async (
  skills,
  searchText,
  hourlyRateMin,
  hourlyRateMax,
  selectedSubCategories // Use an array for sub-categories
) => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const skillsValues = skills.map((skill) => skill.value).join(",");
    const subcategoryValue =
      selectedSubCategories && selectedSubCategories.length > 0
        ? selectedSubCategories.map((category) => category.value).join(",")
        : null;

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
        ...(subcategoryValue && { subCategoryId: subcategoryValue }),
      },
    });
    return response.data.body;
  } catch (error) {
    console.error("Error fetching freelancer data:", error);
    throw error;
  }
};

export const getCategories = async () => makeApiRequest("get", "/categories");

export const getCountries = async () => makeApiRequest("get", "/get-countries");
