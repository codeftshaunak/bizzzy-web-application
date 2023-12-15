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
        const { path, message, isError } = handleApiError(error);
        return { path, message, isError };
    }
};

export const getClientJobs = async () =>
    makeApiRequest('get', '/job/client/jobs');

export const acceptInvitation = async (data) =>
    makeApiRequest('put', '/invitation-status-update', data);

export const acceptOffer = async (data) =>
    makeApiRequest('post', '/offer-update', data);

export const invitationDetails = async (invite_id) =>
    makeApiRequest('get', `/freelancer/invitation-details?invitation_id=${invite_id}`)

export const offerDetails = async (offer_id) =>
    makeApiRequest('get', `/freelancer/offer-details?offer_id=${offer_id}`)

export const getMessageList = async () =>
    makeApiRequest('get', '/user-chat-list');

export const getMessageDetails = async (data) =>
    makeApiRequest('get', `/message-list?receiver_id=${data}`)