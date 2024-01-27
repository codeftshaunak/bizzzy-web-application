import React from 'react';
import { Text, HStack, VStack } from '@chakra-ui/react'
import { RiEdit2Fill } from 'react-icons/ri';
import { FiPlus } from 'react-icons/fi';

const AgencyTitle = ({ children, isValue, noAdded }) => {
    return (
        <HStack>
            <Text fontSize={"1.3rem"} fontWeight={"600"} marginBottom={"0px"}>{children}</Text>
            {
                !noAdded && isValue && <VStack backgroundColor={"white"} borderRadius={"50%"} width={"30px"} border={"1px solid var(--primarycolor)"} height={"30px"} alignItems={"center"} justifyContent={"center"} transition={"0.6s ease-in-out"} cursor={"pointer"} _hover={{
                    border: "2px solid var(--primarycolor)",
                    backgroundColor: "transparent",
                    color: "var(--primarycolor)"
                }}>
                    <RiEdit2Fill fontSize={"15px"} />
                </VStack>
            }{
                !noAdded && !isValue && <VStack backgroundColor={"white"} borderRadius={"50%"} width={"30px"} border={"1px solid var(--primarycolor)"} height={"30px"} alignItems={"center"} justifyContent={"center"} transition={"0.6s ease-in-out"} cursor={"pointer"} _hover={{
                    border: "2px solid var(--primarycolor)",
                    backgroundColor: "transparent",
                    color: "var(--primarycolor)"
                }}>
                    <FiPlus fontSize={"25px"} />
                </VStack>
            }
        </HStack>
    )
}

export default AgencyTitle
