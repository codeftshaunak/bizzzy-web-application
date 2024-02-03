import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, HStack, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { AgencyFreelancerCard, AgencyManagerCard } from './AgencyFreelancerCard';
import { FiPlus } from 'react-icons/fi';
import { getAgencyMemburs } from '../../helpers/agencyApis';
import { CurrentUserContext } from '../../Contexts/CurrentUser';

const AgencyMemburs = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full">
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
                <AgencyManagerCard />
            </div>
            <AgencyAllInvitations />
        </div>
    )
}

export const AgencyAllInvitations = () => {
    const { hasAgency } = useContext(CurrentUserContext);
    const [memburs, setMemburs] = useState([]);
    const [acceptInvitation, setAcceptInvitation] = useState([]);
    const [rejectInvitation, setRejectInvitation] = useState([]);
    const [cancelInvitations, setCancelInvitations] = useState([]);
    const [pandingInvitation, setPandingInvitation] = useState([]);

    const getAgencyMembersDetails = async () => {
        try {
            const response = await getAgencyMemburs(hasAgency);
            setMemburs(response)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAgencyMembersDetails();
    }, [hasAgency]);

    useEffect(() => {
        setAcceptInvitation(memburs.acceptedInvitations);
        setCancelInvitations(memburs.cancelInvitations);
        setRejectInvitation(memburs.rejectedInvitations);
        setPandingInvitation(memburs.pendingInvitations);
    }, [memburs]);

    return <>
        {
            memburs?.pendingInvitations && < Tabs marginTop={"1.5rem"} boxShadow='2xl' padding={"2rem"}>
                <TabList>
                    <Tab fontSize={"1.1rem"} fontWeight={"bold"}>Active Members</Tab>
                    <Tab fontSize={"1.1rem"} fontWeight={"bold"}>Pending Members</Tab>
                    <Tab fontSize={"1.1rem"} fontWeight={"bold"}>Rejected Member</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
                        {
                            acceptInvitation && acceptInvitation?.length > 0 && acceptInvitation?.map((invitation, index) => <AgencyFreelancerCard details={invitation} key={index} />)
                        }
                    </TabPanel>
                    <TabPanel display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
                        {
                            pandingInvitation && pandingInvitation?.length > 0 && pandingInvitation?.map((invitation, index) => <AgencyFreelancerCard details={invitation} key={index} />)
                        }
                    </TabPanel>
                    <TabPanel display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
                        {
                            rejectInvitation && rejectInvitation?.length > 0 && rejectInvitation?.map((invitation, index) => <AgencyFreelancerCard details={invitation} key={index} />)
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs >
        }

    </>


}

export default AgencyMemburs
