import React from 'react';
import { VStack, Text, Box, Image, HStack, Button } from "@chakra-ui/react";
import CTAButton from '../../Components/CTAButton';
import { IoMdStar } from 'react-icons/io';

const Interview = () => {
    return (
        <Box width={"90%"} padding={"1rem 0"}>
            <Text fontWeight={"500"} fontSize={"2xl"}> Invitation to Interview</Text>
            <HStack justifyContent={"space-between"} padding={"2rem 0"} alignItems={"start"}>
                <VStack>
                    <Text fontSize={"2xl"} fontWeight={"500"}>Job Details</Text>
                </VStack>
                <VStack alignItems={"start"}>
                    <Text fontSize={"xs"} mb={"15px"}>Interested in discussing this job</Text>
                    <VStack width={"full"}>
                        <VStack>
                            <CTAButton text={"Accept Interview"} size="xl" padding="0.6rem 1.5rem" borderRadius="20px" background="var(--primarycolor)" color="#ffff" border="1px solid var(--primarycolor)" />
                            <CTAButton text={"Decline Interview"} size="xl" padding="0.6rem 1.5rem" borderRadius="20px" border="1px solid var(--primarycolor)" hoverbg="var(--primarycolor)" hovercolor="#ffff" />
                        </VStack>
                        <VStack justifyContent={"left"} width={"90%"} marginTop={"0.8rem"}>
                            <Text textAlign={"left"} width={"full"} fontWeight={"600"}>About the client</Text>
                            <HStack justifyContent={"left"} width={"90%"}>
                                {
                                    [1, 2, 3, 4, 5].map(() => <Text> <IoMdStar fontSize={"20px"} /></Text>
                                    )
                                }
                            </HStack>
                        </VStack>
                    </VStack>
                </VStack>
            </HStack>
        </Box>
    )
}

export default Interview
