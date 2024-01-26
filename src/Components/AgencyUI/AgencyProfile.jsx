import React, { useEffect, useState } from 'react';
import { VStack, HStack } from '@chakra-ui/react';
import AgencyProfileHeader from './AgencyProfileHeader';
import AgencyBody from './AgencyBody';
import { getAgency } from '../../helpers/agencyApis';


const AgencyProfile = () => {
    const [agency, setAgency] = useState([]);

    const getAgencyDetails = async () => {
        const response = await getAgency();
        console.log(response);
        setAgency(response)
    }

    useEffect(() => {
        getAgencyDetails()
    }, []);

    return (
        <VStack width={"100%"}>
            <AgencyProfileHeader agency={agency} />
            <AgencyBody agency={agency} />
        </VStack>
    )
}

export default AgencyProfile
