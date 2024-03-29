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
import { getFreelancerInfo, getProposals } from "../../helpers/clientApis";
import { useEffect, useState } from "react";
import { hireFreelancerService } from "../../redux/clientSlice/clientService";
import { useDispatch } from "react-redux";
import { setTargetedFreelancer } from "../../redux/features/HireFreelancerSlice";

export const ReviewProposal = () => {
  const location = useLocation();
  const jobDetails = location.state && location.state.jobDetails;
  const id = jobDetails?._id;
  const [open, setOpen] = useState(false);
  const [msgIsOpen, setMsgIsOpen] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const proposalsDetails = async () => {
    const resp = await getProposals(id);
    console.log(resp);
    setProposals(resp);
  };

  const handleSend = async (freelancer) => {
    console.log(freelancer);
    const user = await getFreelancerInfo(freelancer?.userId);
    setUserId(freelancer?.userId);
    setOpen(true);
    dispatch(setTargetedFreelancer({ ...user, ...freelancer }));
  };

  useEffect(() => {
    proposalsDetails();
  }, []);

  return (
    <>
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
                  proposals?.map((item) => {
                    console.log("singleProposal", item);
                    const details = proposals?.[0].user_details?.[0];
                    return (
                      <VStack
                        key={details?._id}
                        className="h-auto px-8 pt-8 pb-4 border-b-2 w-full"
                        justifyContent={"start"}
                        width={"100%"}
                      >
                        <VStack width={"100%"}>
                          <HStack
                            justifyContent={"space-between"}
                            width={"100%"}
                            alignItems={"center"}
                            paddingBottom={"20px"}
                          >
                            <Box>
                              <Image
                                src={details?.profile_image}
                                className="w-[50px] h-full rounded-full"
                                alt=""
                              />
                              <Box className="w-full space-y-3">
                                <Box>
                                  <Text className="font-semibold text-fg-brand">
                                    {details?.firstName +
                                      " " +
                                      details?.lastName}
                                  </Text>
                                  <Text className="text-sm font-medium text-[#6B7280]">
                                    {details?.professional_role}
                                  </Text>
                                </Box>
                                <Box>
                                  <HStack spacing={4} align="center">
                                    <Button
                                      size="sm"
                                      colorScheme="#16A34A"
                                      variant="outline"
                                      color={"#16A34A"}
                                      onClick={() => setMsgIsOpen(true)}
                                    >
                                      Message
                                    </Button>
                                    <Button
                                      colorScheme="#16A34A"
                                      variant="outline"
                                      size={"sm"}
                                      bg={"#16A34A"}
                                      color={"#fff"}
                                      onClick={() => handleSend(item)}
                                    >
                                      Hire
                                    </Button>
                                  </HStack>
                                </Box>

                                {open && (
                                  <div>
                                    <div className="fixed inset-0 flex items-center justify-center z-50">
                                      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                                      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                                        <div className="modal-content py-4 text-left px-6">
                                          <div className="flex justify-between items-center pb-3 border-b">
                                            <p className="text-xl font-500">
                                              Are you sure!
                                            </p>
                                            <button
                                              className="modal-close cursor-pointer z-50"
                                              onClick={() => setOpen(false)}
                                            >
                                              &times;
                                            </button>
                                          </div>

                                          <div className="flex justify-end pt-2 border-t">
                                            <button
                                              onClick={() => setOpen(false)}
                                              className="px-4 py-2 mx-4 bg-white border border-black rounded-lg text-black hover:bg-[#F0FDF4]"
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              className="px-4 bg-fg-brand py-2 rounded-lg text-white hover:bg-fg-brand"
                                              onClick={() => {
                                                navigate(
                                                  `/client/hire/${userId}`
                                                );
                                              }}
                                            >
                                              Sure
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
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

                          <VStack
                            justifyContent={"start"}
                            width={"100%"}
                            alignItems={"start"}
                          >
                            <Box>
                              <Text className="text-[20px]">Cover letter</Text>
                              <Text mt={1} className="mt-1 text-sm font-normal">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: proposals?.[0]?.coverLetter,
                                  }}
                                />
                              </Text>
                            </Box>
                            <Stack direction="row" align="center">
                              {details?.skills?.map((skill) => (
                                <Button
                                  key={skill?.skill_name}
                                  size="sm"
                                  color={"black"}
                                  border={"2px solid var(--primarytextcolor))"}
                                >
                                  {skill?.skill_name}
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
      {msgIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 backdrop-filter backdrop-blur-sm"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3 border-b">
                <p className="text-xl font-500">Enter your message</p>
                <button
                  className="modal-close cursor-pointer z-50 text-2xl"
                  onClick={() => setMsgIsOpen(false)}
                >
                  &times;
                </button>
              </div>
              {
                <div className="my-5">
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter your message..."
                    rows="4"
                  />
                  <p className="text-red-500 text-sm">{}</p>
                </div>
              }
              <div className="flex justify-end pt-4 border-t">
                <button
                  onClick={() => setMsgIsOpen(false)}
                  className="px-5 py-1 mx-4 bg-white border  rounded-lg text-black hover:bg-[#F0FDF4]"
                >
                  Cancel
                </button>
                <button
                  className="px-5 bg-fg-brand py-1 rounded-lg text-white hover:bg-fg-brand"
                  onClick={() => setMsgIsOpen(false)}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
