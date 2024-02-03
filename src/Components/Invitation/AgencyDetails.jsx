import React, { useEffect, useState } from 'react'
import { getAgencyById } from '../../helpers/agencyApis'
import { FaHeadSideVirus } from 'react-icons/fa6';
import { BsCalendar2Month } from 'react-icons/bs';
import queryString from 'query-string';
import { Box, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import { IoMdTime } from 'react-icons/io';
import { MainButtonRounded, MainButtonTranparentRounded } from "../Button/MainButton";
import { acceptAgencyInvitation } from '../../helpers/freelancerApis';

const AgencyDetails = () => {
    const [agencydetails, setAgencyDetails] = useState([]);
    const currentUrl = window.location.href;
    const toast = useToast();
    const { agency_id, invitation_id } = queryString.parseUrl(currentUrl).query;

    const agencyDetailsId = async () => {
        try {
            const response = await getAgencyById(agency_id);
            setAgencyDetails(response);
        } catch (error) {
            console.log(error);
        }
    }

    const acceptInvitation = async () => {
        try {
            const response = await acceptAgencyInvitation({
                "invite_id": invitation_id,
                "status": "accepted",
            });
            console.log(response);
            if (response.code === 200) {
                const message = "Invitation Accepted Successfully!!!";
                toast({ title: message, duration: '3000', colorScheme: 'green', position: 'top-right' });
                navigate("/message");
            }
        } catch (error) {
            toast({ title: "Error performing action", duration: '3000', position: 'top-right', status: 'warning', isClosable: true });
        }
    };

    const rejectInvitation = async () => {
        try {
            const response = await acceptAgencyInvitation({
                "invite_id": invitation_id,
                "status": "rejected",
            });
            console.log(response);
            if (response.code === 200) {
                const message = "Invitation Rejected By You!!!";
                toast({ title: message, duration: '3000', colorScheme: 'warning', position: 'top-right' });
                navigate("/message");
            }
        } catch (error) {
            toast({ title: "Error performing action", duration: '3000', position: 'top-right', status: 'warning', isClosable: true });
        }
    };

    useEffect(() => {
        agencyDetailsId();
    }, []);


    return (
        <VStack alignItems="start" width="full" border="1px solid var(--bordersecondary)" padding="1rem 1rem" borderRadius="10px">
            <Text fontSize="2xl" fontWeight="500">Agency Details</Text>
            <HStack marginTop="1rem" alignItems="start">
                <MainButtonRounded onClick={() => acceptInvitation()}>Accept Invitation</MainButtonRounded>
                <MainButtonTranparentRounded onClick={() => rejectInvitation()}>Reject Invitation</MainButtonTranparentRounded>
            </HStack>
        </VStack>
    )
}

export default AgencyDetails
