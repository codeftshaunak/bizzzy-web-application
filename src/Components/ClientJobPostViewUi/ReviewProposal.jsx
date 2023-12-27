import {
    Box,
    VStack,
    HStack,
    Image,
    Text,
    Button,
    Stack,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getProposals } from "../../helpers/clientApis";
import { useEffect, useState } from "react";


export const ReviewProposal = () => {

    const location = useLocation();
    const jobDetails = location.state && location.state.jobDetails;
    const id = jobDetails?._id;
    const [proposals, setProposals] = useState([]);

    const proposalsDetails = async () => {
        const resp = await getProposals(id);
        setProposals(resp);
    };

    useEffect(() => {
        proposalsDetails();
    }, []);

    return (
        <Box className="flex flex-col gap-8 md:flex-row w-full">
            <Box className="overflow-hidden border rounded-lg basis-full md:basis-4/5 border-slate-300">
                <Tabs variant="unstyled">
                    <TabList className="px-6 pt-4 border-b">
                        <Tab className="px-0 text-black">All Proposals</Tab>
                        <Tab>Messaged</Tab>
                    </TabList>
                    <TabPanels width={"100%"}>
                        <TabPanel p={0} bg={"#F3F4F6"} width={"100%"}>
                            {proposals?.length > 0 ? (
                                proposals?.map(() => {
                                    const details = proposals?.[0].user_details?.[0];
                                    return (
                                        <VStack key={details?._id} className="h-auto px-8 pt-8 pb-4 border-b-2 w-full" justifyContent={"start"} width={"100%"}>
                                            <VStack width={"100%"}>
                                                <HStack justifyContent={"space-between"} width={"100%"} alignItems={"center"} paddingBottom={"20px"}>
                                                    <Box>
                                                        <Image
                                                            src={details?.profile_image}
                                                            className="w-[50px] h-full rounded-full"
                                                            alt=""
                                                        />
                                                        <Box className="w-full space-y-3">
                                                            <Box>
                                                                <Text className="font-semibold text-fg-brand">
                                                                    {details?.firstName + " " + details?.lastName}
                                                                </Text>
                                                                <Text className="text-sm font-medium text-[#6B7280]">
                                                                    {details?.professional_role}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                <HStack spacing={4} align="center">
                                                                    <Button size="sm" colorScheme="#16A34A" variant="outline" color={"#16A34A"}>
                                                                        Message
                                                                    </Button>
                                                                    <Button
                                                                        colorScheme="#16A34A"
                                                                        variant="outline"
                                                                        size={"sm"}
                                                                        bg={"#16A34A"}
                                                                        color={"#fff"}
                                                                    >
                                                                        Hire
                                                                    </Button>
                                                                </HStack>
                                                            </Box>
                                                        </Box>

                                                    </Box>
                                                    <Box>
                                                        <Box>
                                                            <Text className="text-sm font-medium text-[#6B7280]">
                                                                {details?.country}
                                                            </Text>
                                                        </Box>
                                                        <HStack spacing={10}>
                                                            <Text className="text-sm font-medium text-[#6B7280]">
                                                                ${proposals?.[0]?.desiredPrice}
                                                            </Text>
                                                            <Text className="text-sm font-medium text-[#6B7280]">
                                                                $3M+ earned
                                                            </Text>
                                                            <Text className="text-sm font-medium text-[#6B7280] border-b-2 block border-fg-brand">
                                                                100% job success
                                                            </Text>
                                                        </HStack>
                                                    </Box>
                                                </HStack>

                                                <VStack justifyContent={"start"} width={"100%"} alignItems={"start"}>
                                                    <Box>
                                                        <Text className="text-[20px]">
                                                            Cover letter
                                                        </Text>
                                                        <Text mt={1} className="mt-1 text-sm font-normal">
                                                            <div dangerouslySetInnerHTML={{ __html: proposals?.[0]?.coverLetter }} />
                                                        </Text>
                                                    </Box>
                                                    <Stack direction="row" align="center">
                                                        {details?.skills?.map((skill) => (
                                                            <Button key={skill.skill_name} size="sm" color={"black"} border={"2px solid var(--primarytextcolor))"}>
                                                                {skill.skill_name}
                                                            </Button>
                                                        ))}
                                                    </Stack>
                                                    <br />
                                                </VStack>
                                            </VStack>
                                        </VStack>
                                    );
                                })
                            ) : (
                                <Box>
                                    <Text>There is no proposals for this job!!!</Text>
                                </Box>
                            )}
                        </TabPanel>
                        <TabPanel>
                            <Text>Messaged!</Text>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    );
};
