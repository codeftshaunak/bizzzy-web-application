import {
  Button, Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useLocation } from "react-router-dom";
import AvatarImg from "../../assets/img/avatar-placeholder.jpg";
import { getProposals } from "../../helpers/clientApis";
import { btnArray } from "./state";


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

  // const createdAtAgo =
  //   jobDetails &&
  //   formatDistanceToNow(new Date(jobDetails.created_at), { addSuffix: true });
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="overflow-hidden border rounded-lg basis-full md:basis-4/5 border-slate-300">
        <Tabs variant="unstyled">
          <TabList className="px-6 pt-4 border-b">
            <Tab className="px-0 text-black">All Proposals</Tab>
            <Tab>Messaged</Tab>
            {/* <Tab>Archived</Tab> */}
          </TabList>
          <TabIndicator
            height="2px"
            borderRadius="1px"
            color={"#000"}
            className=" bg-fg-brand" />
          <TabPanels>
            <TabPanel p={0} bg={"#F3F4F6"}>
              {proposals?.length > 0 ? (
                proposals?.map(() => {
                  const details = proposals?.[0].user_details?.[0];
                  return (
                    <div className="h-auto px-8 pt-8 pb-4 border-b-2 ">
                      <div className="flex gap-4">
                        <div className="w-[90px] h-[85px]  border-4 border-[#D1D5DB] rounded-full">
                          <img
                            src={AvatarImg}
                            className="w-full h-full rounded-full"
                            alt="" />
                        </div>
                        <div className="w-full space-y-3 ">
                          <div className="flex justify-between ">
                            <div>
                              <h2 className="font-semibold text-fg-brand">
                                {details?.firstName + " " + details?.lastName}
                              </h2>
                              <p className="text-sm font-medium text-[#6B7280]">
                                Skilled UI/UX Product Designer
                              </p>
                            </div>
                            <div>
                              <Stack direction="row" spacing={4} align="center">
                                <Button
                                  size="sm"
                                  colorScheme="#16A34A"
                                  variant="outline"
                                  color={"#16A34A"}
                                >
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
                              </Stack>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-[#6B7280]">
                              {details?.country}
                            </p>
                          </div>
                          <div className="flex gap-10">
                            <p className="text-sm font-medium text-[#6B7280]">
                              ${proposals?.[0]?.desiredPrice}
                            </p>
                            <p className="text-sm font-medium text-[#6B7280]">
                              $3M+ earned
                            </p>
                            <p className="text-sm font-medium text-[#6B7280] border-b-2 block border-fg-brand">
                              100% job success
                              {details?.professional_role}
                            </p>
                          </div>
                          <div>
                            <h6 className="text-sm font-medium text-[#6B7280]">
                              Cover letter
                            </h6>
                            <p className="mt-1 text-sm font-normal leading-6">
                              Hello there, are you seeking a talented UX/UI
                              designer? to refine and optimize our existing
                              platform's user experience and visuals. Previous
                              experience preferred. Share your portfolio
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <Stack spacing={4} direction="row" align="center">
                              {btnArray.map(item=>
                                <Button
                                size={item.size}
                                colorScheme={item.colorScheme}
                                color={item.color}
                                >
                                  {item.name}
                                </Button>)}
                              {/* <Button
                                size="sm"
                                colorScheme="gray"
                                color={"#6B7280"}
                              >
                                Web design
                              </Button>
                              <Button
                                size="sm"
                                colorScheme="gray"
                                color={"#6B7280"}
                              >
                                Mobile App Design
                              </Button>
                              <Button
                                size="sm"
                                colorScheme="gray"
                                color={"#6B7280"}
                              >
                                Button text
                              </Button>
                              <Button
                                size="sm"
                                colorScheme="gray"
                                color={"#6B7280"}
                              >
                                Button text
                              </Button> */}
                              {/* <Button
                                size="sm"
                                colorScheme="gray"
                                color={"#6B7280"}
                              >
                                Button text
                              </Button>
                              <Button
                                size="sm"
                                colorScheme="gray"
                                color={"#6B7280"}
                              >
                                Button text
                              </Button>
                              <Button
                                size="sm"
                                colorScheme="gray"
                                color={"#6B7280"}
                              >
                                Button text
                              </Button> */}
                            </Stack>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#6B7280]">
                            {details?.country}
                          </p>
                        </div>
                        <div className="flex gap-10">
                          <p className="text-sm font-medium text-[#6B7280]">
                            ${proposals?.[0]?.desiredPrice}
                          </p>
                          <p className="text-sm font-medium text-[#6B7280]">
                            $3M+ earned
                          </p>
                          <p className="text-sm font-medium text-[#6B7280] border-b-2 block border-fg-brand">
                            100% job success
                          </p>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-[#6B7280]">
                            Cover letter
                          </h6>
                          <p className="mt-1 text-sm font-normal leading-6">
                            {proposals?.[0]?.coverLetter}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Stack spacing={4} direction="row" align="center">
                            {details?.skills?.map((skill) => {
                              return <Button size="sm" colorScheme="gray" color={"#6B7280"}>
                                {skill}
                              </Button>;
                            })}
                          </Stack>
                          <div>
                            <IoIosArrowForward
                              size={24}
                              className="text-fg-brand" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <Box>
                  <Text>There is no proposals for this job!!!</Text>
                </Box>
              )}
            </TabPanel>
            <TabPanel>
              <p>Messaged!</p>
            </TabPanel>
            {/* <TabPanel>
              <p>Archived!</p>
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};
