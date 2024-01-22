import React from 'react';
import { VStack, Image, Box, Text, Badge } from '@chakra-ui/react';
import { useSelector } from 'react-redux'

const AgencyFreelancerCard = () => {
    return (
        <Box>
            <BusinessManager />
        </Box>
    )
}

export const BusinessManager = () => {
    const profile = useSelector((state) => state.profile);
    const { name, profile_image, professional_role, id } = profile.profile || [];
    return (
        <VStack marginTop={"10px"} className="shadow-xl border p-4 rounded-md" lineHeight={"20px"} position={"relative"}>
            <Image src={profile_image} width={"90px"} borderRadius={"50%"} />
            <Text fontSize={"1.4rem"} fontWeight={"semibold"}>{name}</Text>
            <Text fontSize={"1.1rem"}>{professional_role}</Text>
            <Badge variant='solid' colorScheme='green' position={"absolute"} right={"10px"} top={"10px"}>
                Manager
            </Badge>
        </VStack>
    )
}

export default AgencyFreelancerCard
