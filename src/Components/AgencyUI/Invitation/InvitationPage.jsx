import React, { useContext, useEffect, useState } from 'react';
import { Box, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import queryString from 'query-string';
import { acceptInvitation, invitationDetails } from '../../../helpers/freelancerApis';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../../Contexts/SocketContext';
import { ClientDetailsSection } from '../../Invitation/ClientDetailsSection';
import Modal from '../../Invitation/Modal';
import { JobDetailsSection } from '../../Invitation/JobDetails';
import AgencyDetails from '../../Invitation/AgencyDetails';


const InterviewPage = () => {
    const navigate = useNavigate();
    const currentUrl = window.location.href;
    const { agency_id, user_id } = queryString.parseUrl(currentUrl).query;
    console.log(agency_id, user_id);
    const [openModal, setOpenModal] = useState(false);
    const [jobdetails, setJobDetails] = useState();


    const toast = useToast();
    const { socket } = useContext(SocketContext); // Use socket from context
    // const getInvitationDetails = async () => {
    //     try {
    //         const response = await invitationDetails(invite_id);
    //         setJobDetails(response[0]);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     getInvitationDetails();
    // }, [invite_id]);

    // const performAction = async ({ messages, statusValue }) => {
    //     try {
    //         const response = await acceptInvitation({
    //             "job_id": job_id,
    //             "invite_id": invite_id,
    //             "status": statusValue,
    //         });
    //         if (response.code === 200) {
    //             sendMessage(messages);
    //             const message = statusValue === "1" ? "Invitation Accepted Successfully!!!" : "You've Rejected Interview!!!";
    //             toast({ title: message, duration: '3000', colorScheme: statusValue === "1" ? 'green' : 'warning', position: 'top-right' });
    //             navigate("/message");
    //         }
    //     } catch (error) {
    //         toast({ title: "Error performing action", duration: '3000', position: 'top-right', status: 'warning', isClosable: true });
    //     }
    // };

    // const sendMessage = (message) => {
    //     console.log(message);
    //     if (socket) {
    //         socket.emit("chat_message", {
    //             sender_id: jobdetails?.receiver_id,
    //             receiver_id: jobdetails.sender_id,
    //             message: message,
    //             message_type: 1,
    //         });
    //     }
    // };

    // useEffect(() => {
    //     if (socket) {
    //         console.log('Socket connected');
    //         socket.emit("connect_user", { user_id: jobdetails?.receiver_id });

    //         // Example: Listening for a custom event
    //         socket.on("chat_message", (data) => {
    //             console.log("Received message:", data);
    //         });

    //         // Cleanup function
    //         return () => {
    //             console.log('Socket disconnected');
    //             socket.off("chat_message");
    //         };
    //     }
    // }, [socket, jobdetails]);


    const acceptInvite = (messages) => performAction({ messages, statusValue: "1" });
    const rejectInvite = () => performAction("2");

    return (
        <Box width="90%" padding="1rem 0">
            <Text fontWeight="500" fontSize="2xl">Agency Invitation</Text>
            <HStack justifyContent="space-between" padding="2rem 0" alignItems="start">
                <AgencyDetails agency_id={agency_id} />
                <JobDetailsSection jobdetails={jobdetails} />
                <ClientDetailsSection clientDetails={jobdetails?.client_details[0]} status={jobdetails?.status} setOpenModal={setOpenModal} rejectInvite={rejectInvite} />
                {
                    openModal && <Modal setOpenModal={setOpenModal} acceptInvite={acceptInvite} />
                }
            </HStack>
        </Box>
    );
};

export default InterviewPage;

