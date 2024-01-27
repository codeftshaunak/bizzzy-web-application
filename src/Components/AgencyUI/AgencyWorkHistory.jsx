import React from 'react';
import { HStack, Box, Text, Image } from '@chakra-ui/react'
import AgencyTitle from './AgencyTitle';

const AgencyWorkHistory = () => {
    return (
        <Box width={"100%"}>
            <AgencyTitle noAdded={true}>Work History</AgencyTitle>
            <Box marginTop={"20px"}>
                <Image src='./images/project.png' width={"100px"} display={"block"} margin={"auto"}></Image>
                <br />
                <Text fontSize={"1.3rem"} textAlign={"center"} fontWeight={"600"}>You haven't done any project yet.</Text>
                <Text fontSize={"1rem"} textAlign={"center"}>Complete your first project!!!</Text>
            </Box>
        </Box>
    )
}

export default AgencyWorkHistory;
