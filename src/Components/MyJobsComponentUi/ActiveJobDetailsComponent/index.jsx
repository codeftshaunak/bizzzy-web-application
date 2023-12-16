import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Progress,
  Spacer,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { LuBadgeDollarSign } from "react-icons/lu";
import { MdCancel } from "react-icons/md";

const ActiveJobDetailsComponent = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between gap-4">
        <div>
          <Flex>
            <Avatar src="https://bit.ly/sage-adebayo" />
            <Box ml="3">
              <Text fontWeight="bold">
                Ashim Rudra Paul
                <Badge ml="1" colorScheme="green">
                  New
                </Badge>
              </Text>
              <Text fontSize="sm">Bangladesh</Text>
            </Box>
          </Flex>
        </div>
        <div>
          <Popover>
            <PopoverTrigger>
              <Button>
                <BsThreeDots className="text-green-500 text-[1.5rem]" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody padding={"4"}>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center font-400 gap-2 text-[1.2rem]">
                    <LuBadgeDollarSign className="text-[1.5rem]" /> Give a
                    refund
                  </button>
                  <button className="flex items-center font-400 gap-2 text-[1.2rem]">
                    <MdCancel className="text-[1.5rem]" /> End contract
                  </button>
                </div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="top-profile-section my-6">
        <div className="my-4">
          <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
            Creatomate Timeline Implementation
          </h2>
        </div>

        <div className="mt-[3rem]">
          <Tabs position="relative" variant="unstyled">
            <TabList>
              <Tab className="font-semibold text-[1.5rem]">Overview</Tab>
              <Tab className="font-semibold text-[1.5rem]">Details</Tab>
            </TabList>
            <TabIndicator
              mt="1.5px"
              height="2px"
              bg="var(--primarytextcolor)"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <div>
                  <div className="flex mt-[1.2rem]  gap-4 justify-between">
                    <div className="border rounded-xl md:px-[2rem] md:py-[2.2rem] w-[60%] shadow-md">
                      <div>
                        <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">
                          Milestone timeline
                        </h1>
                      </div>
                      <div>
                        <Stepper
                          orientation="vertical"
                          height="340px"
                          colorScheme="green"
                          gap="0"
                        >
                          <Step>
                            <StepIndicator borderColor="var(--primarytextcolor)">
                              <StepStatus
                                borderColor="var(--primarytextcolor)"
                                active={
                                  <StepNumber />
                                }
                              />
                            </StepIndicator>

                            <Box flexShrink="0">
                              <StepTitle>
                                <h1 className="text-[1.4rem] mx-2 font-500">
                                  Creatomate Timeline Implementation
                                </h1>
                              </StepTitle>
                              <StepDescription>
                                <div className="flex items-center gap-x-4 my-2">
                                  <h1 className="font-bold text-[1.6rem]">
                                    $400.00
                                  </h1>
                                  <Text borderColor="var(--primarytextcolor)" color="var(--primarytextcolor)" className="border-2 px-3 py-1 text-[1.2rem] rounded-full">
                                    Active & funded
                                  </Text>
                                </div>
                                <div>
                                  <h1 className="flex gap-x-2 items-center text-[1.2rem]">
                                    <FaCalendarAlt className="text-[1.5rem]" />{" "}
                                    Due Dec 1
                                  </h1>

                                  <Button className="my-6 font-semibold text-[1rem] rounded-full px-8 py-2 cursor-pointer" backgroundColor={"var(--primarytextcolor)"} borderRadius={"25px"} color={"var(--secondarycolor)"} _hover={{
                                    color: "black",
                                    backgroundColor: "var(--primarysoftbg)"
                                  }}>
                                    Submit Work
                                  </Button>
                                </div>
                              </StepDescription>
                            </Box>
                            <StepSeparator />
                          </Step>
                          <Step>
                            <StepIndicator className="bg-green-500">
                              <StepStatus
                                active={<FaPlus className="text-white" />}
                              />
                            </StepIndicator>

                            <Box flexShrink="0">
                              <StepTitle>
                                <Text className="text-[1rem] mx-2 font-500" color={"var(--primarytext)"}>
                                  Propose new milestone
                                </Text>
                              </StepTitle>
                              <StepDescription>
                                <Button className="my-6 font-semibold text-[1rem] rounded-full px-8 py-2 cursor-pointer" backgroundColor={"var(--primarytextcolor)"} borderRadius={"25px"} color={"var(--secondarycolor)"} _hover={{
                                  color: "black",
                                  backgroundColor: "var(--primarysoftbg)"
                                }}>
                                  Manage Milestone
                                </Button>
                              </StepDescription>
                            </Box>
                          </Step>
                        </Stepper>
                      </div>
                    </div>
                    <div className="border h-[60%] rounded-xl md:px-[2rem] md:py-[2.2rem] w-[40%] shadow-md">
                      <div>
                        <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">
                          Earnings
                        </h1>
                      </div>
                      <div>
                        <div className="my-[1.5rem]">
                          <Progress
                            hasStripe
                            value={100}
                            colorScheme="green"
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2 text-[1.2rem]">
                              <div className="bg-[black] w-[1.3rem] h-[1.3rem] rounded-full"></div>
                              Received
                            </div>
                            <h1 className="font-bold text-[1.2rem]">$0.00</h1>
                          </div>

                          <div className="flex justify-between">
                            <div className="flex items-center gap-2 text-[1.2rem]">
                              <div className="bg-[green] w-[1.3rem] h-[1.3rem] rounded-full"></div>
                              Funded (Escrow Protection)
                            </div>
                            <h1 className="font-bold text-[1.2rem]">$400.00</h1>
                          </div>

                          <div className="flex justify-between">
                            <div className="flex items-center gap-2 text-[1.2rem]">
                              <div className="bg-[#bfbfbf] w-[1.3rem] h-[1.3rem] rounded-full"></div>
                              Project Price
                            </div>
                            <h1 className="font-bold text-[1.2rem]">$400.00</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <div className="flex mt-[1.2rem]  gap-4 justify-between">
                    <div className="border rounded-xl md:px-[2rem] md:py-[2.2rem] w-[60%] shadow-md">
                      <div>
                        <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">
                          Details
                        </h1>
                      </div>
                      <Stepper
                        orientation="vertical"
                        height="340px"
                        colorScheme="green"
                        gap="0"
                      >
                        <Step>
                          <StepIndicator borderColor="var(--primarytextcolor)">
                            <StepStatus
                              borderColor="var(--primarytextcolor)"
                              active={
                                <StepNumber />
                              }
                            />
                          </StepIndicator>

                          <Box flexShrink="0">
                            <StepTitle>
                              <h1 className="text-[1.4rem] mx-2 font-500">
                                Creatomate Timeline Implementation
                              </h1>
                            </StepTitle>
                            <StepDescription>
                              <div className="flex items-center gap-x-4 my-2">
                                <h1 className="font-bold text-[1.6rem]">
                                  $400.00
                                </h1>
                                <Text borderColor="var(--primarytextcolor)" color="var(--primarytextcolor)" className="border-2 px-3 py-1 text-[1.2rem] rounded-full">
                                  Active & funded
                                </Text>
                              </div>
                              <div>
                                <h1 className="flex gap-x-2 items-center text-[1.2rem]">
                                  <FaCalendarAlt className="text-[1.5rem]" />{" "}
                                  Due Dec 1
                                </h1>

                                <Button className="my-6 font-semibold text-[1rem] rounded-full px-8 py-2 cursor-pointer" backgroundColor={"var(--primarytextcolor)"} borderRadius={"25px"} color={"var(--secondarycolor)"} _hover={{
                                  color: "black",
                                  backgroundColor: "var(--primarysoftbg)"
                                }}>
                                  Submit Work
                                </Button>
                              </div>
                            </StepDescription>
                          </Box>
                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator className="bg-green-500">
                            <StepStatus
                              active={<FaPlus className="text-white" />}
                            />
                          </StepIndicator>

                          <Box flexShrink="0">
                            <StepTitle>
                              <Text className="text-[1rem] mx-2 font-500" color={"var(--primarytext)"}>
                                Propose new milestone
                              </Text>
                            </StepTitle>
                            <StepDescription>
                              <Button className="my-6 font-semibold text-[1rem] rounded-full px-8 py-2 cursor-pointer" backgroundColor={"var(--primarytextcolor)"} borderRadius={"25px"} color={"var(--secondarycolor)"} _hover={{
                                color: "black",
                                backgroundColor: "var(--primarysoftbg)"
                              }}>
                                Manage Milestone
                              </Button>
                            </StepDescription>
                          </Box>
                        </Step>
                      </Stepper>
                    </div>
                    <div className="border h-[60%] rounded-xl md:px-[2rem] md:py-[2.2rem] w-[40%] shadow-md">
                      <div>
                        <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">
                          Earnings
                        </h1>
                      </div>
                      <div>
                        <div className="my-[1.5rem]">
                          <Progress
                            hasStripe
                            value={100}
                            colorScheme="green"
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2 text-[1.2rem]">
                              <div className="bg-[black] w-[1.3rem] h-[1.3rem] rounded-full"></div>
                              Received
                            </div>
                            <h1 className="font-bold text-[1.2rem]">$0.00</h1>
                          </div>

                          <div className="flex justify-between">
                            <div className="flex items-center gap-2 text-[1.2rem]">
                              <div className="bg-[green] w-[1.3rem] h-[1.3rem] rounded-full"></div>
                              Funded (Escrow Protection)
                            </div>
                            <h1 className="font-bold text-[1.2rem]">$400.00</h1>
                          </div>

                          <div className="flex justify-between">
                            <div className="flex items-center gap-2 text-[1.2rem]">
                              <div className="bg-[#bfbfbf] w-[1.3rem] h-[1.3rem] rounded-full"></div>
                              Project Price
                            </div>
                            <h1 className="font-bold text-[1.2rem]">$400.00</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ActiveJobDetailsComponent;
