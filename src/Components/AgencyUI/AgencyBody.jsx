import React from 'react';
import { HStack, VStack, Box } from '@chakra-ui/react'
import AgencyLeftbar from './AgencyLeftbar';
import AgencyRightBar from './AgencyRightBar';

const AgencyBody = ({ agency }) => {
    return (
        <AgencyBodyLayout>
            <Box display={"flex"} width={"95%"} paddingY={"20px"} position={"relative"}>
                <AgencyLeftbar agency={agency} />
                <AgencyRightBar agency={agency} />
            </Box>
        </AgencyBodyLayout>
    )
}



export const AgencyBodyLayout = ({ children }) => {
    return (
        <Box width={"90%"} display={"flex"} justifyContent={"center"} className="shadow-sm border p-4">
            {children}
        </Box>
    )
}

export default AgencyBody
