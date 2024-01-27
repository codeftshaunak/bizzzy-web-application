import React from 'react';
import { VStack } from '@chakra-ui/react';
import AgencyTitle from './AgencyTitle';
import AgencyOverview from './AgencyOverview';
import AgencyServices from './AgencyServices';
import AgencyPortfolio from './AgencyPortfolio';
import AgencyWorkHistory from './AgencyWorkHistory';
import AgencyMemburs from './AgencyMemburs';

const AgencyLeftbar = ({ agency }) => {
    const { agency_overview, agency_skills, agency_services, agency_portfolio } = agency || [];
    console.log({ agency_services });
    return (
        <VStack alignItems={"flex-start"} width={"75%"} borderRight={"0.1px solid black"} gap={"5"}>
            <AgencyOverview overview={agency_overview} />
            <AgencyServices agency_services={agency_services} />
            <AgencyPortfolio />
            <AgencyWorkHistory />
            <AgencyMemburs />
        </VStack>
    )
}

export default AgencyLeftbar
