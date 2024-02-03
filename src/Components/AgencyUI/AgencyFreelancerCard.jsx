import React from 'react';
import { VStack, Image, Box, Text, Badge, Avatar } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { MainButtonRounded } from '../Button/MainButton';
import { useNavigate } from 'react-router-dom';

export const AgencyManagerCard = () => {
    const profile = useSelector((state) => state.profile);
    const { lastName, firstName, profile_image, professional_role, id } = profile.profile || [];
    return (
        <VStack marginTop={"10px"} paddingY={"25px"} className="shadow-xl border p-4 rounded-md" lineHeight={"20px"} position={"relative"}>
            {
                profile_image ? <Image src={profile_image} width={"90px"} borderRadius={"50%"} /> : <Avatar name={firstName + ' ' + lastName} />

            }
            <Text fontSize={"1.4rem"} fontWeight={"semibold"}>{firstName + ' ' + lastName}</Text>
            <Text fontSize={"1.1rem"} textAlign={"center"}>{professional_role}</Text>
            <Badge variant='solid' colorScheme='green' position={"absolute"} right={"10px"} top={"10px"}>
                Manager
            </Badge>
        </VStack>
    )
}

export const AgencyFreelancerCard = ({ details }) => {
    const navigate = useNavigate();
    const { member_position } = details || [];
    const freelancerDetails = details?.freelancer_details?.length > 0 ? details?.freelancer_details[0] : [];
    const { profile_image, firstName, lastName, professional_role, _id } = freelancerDetails || [];
    const handleClick = (id) => {
        navigate(`/profile/${id}`)
    }
    return (
        <VStack marginTop={"10px"} paddingY={"25px"} className="shadow-xl border p-4 rounded-md" lineHeight={"20px"} position={"relative"} width={"300px"}>
            {
                profile_image ? <Image src={profile_image} width={"90px"} borderRadius={"50%"} /> : <Avatar name={firstName + ' ' + lastName} />

            }
            <Text fontSize={"1.4rem"} fontWeight={"semibold"}>{firstName + ' ' + lastName}</Text>
            <Text fontSize={"1.1rem"} textAlign={"center"}>Professional Role- {professional_role}</Text>
            <Badge variant='solid' colorScheme='green' position={"absolute"} right={"10px"} top={"10px"}>
                {member_position.length > 50 ? member_position.slice(0, 50) + '...' : member_position}
            </Badge>
            <MainButtonRounded onClick={() => handleClick(_id)}>Visit Profile</MainButtonRounded>
        </VStack>
    )
}

