import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react'

const GigStatus = () => {
    return (
        <Tabs size='md' variant='enclosed' width={"100%"}>
            <TabList height={"3.5rem"}>
                <Tab>Approve (0)</Tab>
                <Tab>Under Review (0)</Tab>
            </TabList>
            <TabPanels width={"100%"} height={"100%"}>
                <TabPanel width={"100%"}>
                    <Text textAlign={"center"}>Gigs that are approved and available to buy will show up here.</Text>
                </TabPanel>
                <TabPanel>
                    <Text textAlign={"center"}>Gigs that you've created and submit for review will show up here.</Text>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default GigStatus
