import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import AvatarImg from "../../assets/img/avatar-placeholder.jpg";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Button,
  Stack,
} from "@chakra-ui/react";
export const ReviewProposalComponent = () => {
  return (
    <div className="w-full md:px-8 md:py-6">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-[#374151] ">
            Your Dashboard
          </h2>
          <p className="text-lg font-normal text-[#374151] ">Joe doe</p>
        </div>
      </div>

      <div className="my-10">
        <div className="grid gap-4 md:grid-cols-12">
          <div className="col-span-2">
            <div className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center">
              <p>View Job Post</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center">
              <p>Invite Freelancers</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="border rounded-lg bg-[#F0FDF4] hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center">
              <p>
                Review Proposals <span>(13)</span>
              </p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center">
              <p>
                Hire <span>(0)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="overflow-hidden border rounded-lg basis-full md:basis-4/5 border-slate-300">
          <Tabs variant="unstyled">
            <TabList className="px-6 pt-4 border-b">
              <Tab className="px-0 text-black">All Proposals</Tab>
              <Tab>Messaged</Tab>
              <Tab>Archived</Tab>
            </TabList>
            <TabIndicator
              height="2px"
              borderRadius="1px"
              color={"#000"}
              className=" bg-fg-brand"
            />
            <TabPanels>
              <TabPanel p={0} bg={"#F3F4F6"}>
                <div className="h-auto px-8 pt-8 pb-4 border-b-2 ">
                  <div className="flex gap-4">
                    <div className="w-[90px] h-[85px]  border-4 border-[#D1D5DB] rounded-full">
                      <img
                        src={AvatarImg}
                        className="w-full h-full rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="w-full space-y-3 ">
                      <div className="flex justify-between ">
                        <div>
                          <h2 className="font-semibold text-fg-brand">
                            SHUSHANT
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
                          India
                        </p>
                      </div>
                      <div className="flex gap-10">
                        <p className="text-sm font-medium text-[#6B7280]">
                          $450.00
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
                          Hello there, are you seeking a talented UX/UI
                          designer? to refine and optimize our existing
                          platform's user experience and visuals. Previous
                          experience preferred. Share your portfolio
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Stack spacing={4} direction="row" align="center">
                          <Button
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
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="gray"
                            color={"#6B7280"}
                          >
                            Button text
                          </Button>
                        </Stack>
                        <div>
                          <IoIosArrowForward
                            size={24}
                            className="text-fg-brand"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-auto px-8 pt-8 pb-4 last:border-b-0">
                  <div className="flex gap-4">
                    <div className="w-[90px] h-[85px]  border-4 border-[#D1D5DB] rounded-full">
                      <img
                        src={AvatarImg}
                        className="w-full h-full rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="w-full space-y-3 ">
                      <div className="flex justify-between ">
                        <div>
                          <h2 className="font-semibold text-fg-brand">
                            SHUSHANT
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
                          India
                        </p>
                      </div>
                      <div className="flex gap-10">
                        <p className="text-sm font-medium text-[#6B7280]">
                          $450.00
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
                          Hello there, are you seeking a talented UX/UI
                          designer? to refine and optimize our existing
                          platform's user experience and visuals. Previous
                          experience preferred. Share your portfolio
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Stack spacing={4} direction="row" align="center">
                          <Button
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
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="gray"
                            color={"#6B7280"}
                          >
                            Button text
                          </Button>
                        </Stack>
                        <div>
                          <IoIosArrowForward
                            size={24}
                            className="text-fg-brand"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <p>Messaged!</p>
              </TabPanel>
              <TabPanel>
                <p>Archived!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ReviewProposalComponent;
