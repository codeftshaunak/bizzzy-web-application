import React, { useContext, useEffect, useState } from 'react';
import { Box, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import queryString from 'query-string';
import { acceptInvitation, updateOfferRequest, offerDetails } from '../../helpers/freelancerApis';
import { useNavigate } from 'react-router-dom';
import { JobDetailsSection } from './JobDetails';
import { SocketContext } from '../../Contexts/SocketContext';
import Modal from './Modal';
import { ClientDetailsSection } from './ClientDetailsSection';
import ConfirmModalCommon from '../ConfirmationModal/ConfirmationModalCommon';

const Offer = () => {
    const navigate = useNavigate();
    const currentUrl = window.location.href;
    const { offer_id, job_id } = queryString.parseUrl(currentUrl).query;
    const [openModal, setOpenModal] = useState(false);
    const [jobdetails, setJobDetails] = useState();
    const [reject, setReject] = useState(false);
    const toast = useToast();
    const { socket } = useContext(SocketContext); // Use socket from context
    const getInvitationDetails = async () => {
        try {
            const response = await offerDetails(offer_id);
            setJobDetails(response[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getInvitationDetails();
    }, [offer_id]);

    const performAction = async ({ messages, statusValue }) => {
        try {
            const response = await updateOfferRequest({
                job_id: job_id,
                offer_id: offer_id,
                status: statusValue,
            });
            if (response.isError) {
                throw new Error(response.message)
            }
            sendMessage(messages);
            const message =
                statusValue === "accepted"
                    ? "Offer Accepted Successfully!!!"
                    : "You've Rejected The Offer!!!";

            toast({
                title: message,
                duration: 3000,
                colorScheme: statusValue === "accepted" ? "green" : "warning",
                position: "top-right",
            });
            navigate("/message");
        } catch (error) {
            toast({
                title: "Error performing action",
                description: error.message || "Unknown error",
                duration: 3000,
                position: "top-right",
                status: "warning",
                isClosable: true,
            });
        }
    };

    const handleRejectOffer = async () => {
        try {
            const response = await updateOfferRequest({
                job_id: job_id,
                offer_id: offer_id,
                status: "rejected",
            });
            if (response.isError) {
                throw new Error(response.message)
            }
            const message = "You've Rejected The Offer!!!";

            toast({
                title: message,
                duration: 3000,
                colorScheme: warning,
                position: "top-right",
            });
            navigate("/message");
        } catch (error) {
            toast({
                title: "Error performing action",
                description: error.message || "Unknown error",
                duration: 3000,
                position: "top-right",
                status: "warning",
                isClosable: true,
            });
        }
    }


    const sendMessage = (message) => {
        if (socket) {
            socket.emit("chat_message", {
                sender_id: jobdetails?.freelencer_id,
                receiver_id: jobdetails?.client_id,
                message: message,
                message_type: 1,
            });
        }
    };

    useEffect(() => {
        if (socket) {
            console.log('Socket connected');
            socket.emit("connect_user", { user_id: jobdetails?.freelencer_id });

            // Example: Listening for a custom event
            socket.on("chat_message", (data) => {
                console.log("Received message:", data);
            });

            // Cleanup function
            return () => {
                console.log('Socket disconnected');
                socket.off("chat_message");
            };
        }
    }, [socket, jobdetails]);


    const acceptInvite = (messages) => performAction({ messages, statusValue: "accepted" });
    const rejectInvite = () => setReject(true);

    // const rejectInvite = (messages) => performAction({ messages, statusValue: "rejected" });

    return (
        <Box width="90%" padding="1rem 0">
            <Text fontWeight="500" fontSize="2xl">Job Offer</Text>
            <HStack justifyContent="space-between" padding="2rem 0" alignItems="start">
                <JobDetailsSection jobdetails={jobdetails} />
                <ClientDetailsSection clientDetails={jobdetails?.client_details[0]} status={jobdetails?.status} setOpenModal={setOpenModal} rejectInvite={rejectInvite} offer={true} />
                {
                    openModal && <Modal setOpenModal={setOpenModal} acceptInvite={acceptInvite} offer={true} />
                }
                {
                    reject && <ConfirmModalCommon setOpenModal={setReject} title={"Reject The Offer"} handleSubmit={handleRejectOffer} />
                }
            </HStack>
        </Box>
    );
};

export default Offer;
