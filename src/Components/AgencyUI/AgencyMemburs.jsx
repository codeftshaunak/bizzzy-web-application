import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, HStack, VStack } from '@chakra-ui/react';
import AgencyFreelancerCard from './AgencyFreelancerCard';
import { FiPlus } from 'react-icons/fi';

const AgencyMemburs = () => {
    const navigate = useNavigate();
    return (
        <div className='w-[300px]'>
            <HStack>
                <Text fontSize={"1.3rem"} fontWeight={"600"} marginBottom={"0px"}>Your Agency Members</Text>
                <VStack
                    backgroundColor={"white"}
                    borderRadius={"50%"}
                    width={"30px"}
                    border={"1px solid var(--primarycolor)"}
                    height={"30px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    transition={"0.6s ease-in-out"}
                    cursor={"pointer"}
                    _hover={{
                        border: "2px solid var(--primarycolor)",
                        backgroundColor: "transparent",
                        color: "var(--primarycolor)",
                    }}
                    onClick={() => navigate('/search-freelancers')}
                >
                    <FiPlus fontSize={"25px"} />
                </VStack>
            </HStack>
            <AgencyFreelancerCard />
        </div>
    )
}

export default AgencyMemburs
