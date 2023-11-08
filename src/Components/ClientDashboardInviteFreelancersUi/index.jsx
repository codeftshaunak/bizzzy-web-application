import React from "react";
import { Avatar } from "../../assets/components/Avatar";
import { ButtonBase } from "../../assets/components/ButtonBase";
import { Buttons } from "../../assets/components/Buttons";
import { SearchBase } from "../../assets/components/SearchBase";
import { SixteenChevronDown } from "../../assets/icons/SixteenChevronDown";
import { TwentyBell1 } from "../../assets/icons/TwentyBell1";
import { TwentySend1 } from "../../assets/icons/TwentySend1";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillQuestionCircle } from "react-icons/ai";
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
import { Link } from "react-router-dom";

export const ClientDashboardInviteFreelancersComponent = () => {
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
            <TabList className="pt-4 border-b">
              <Tab className="px-0 text-black">Search</Tab>
              <Tab className="px-0 text-black">Invited freelancer</Tab>
              <Tab className="px-0 text-black">My Hire</Tab>
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
                  <div className="flex gap-8">
                    <div className="w-[200px] h-[150px]">
                      <img
                        src="https://c.animaapp.com/LZ3BWujk/img/rectangle-26-1@2x.png"
                        alt=""
                      />
                    </div>
                    <div className="w-full space-y-2 ">
                      <div className="flex justify-between ">
                        <div className="flex gap-3">
                          <div className="w-[36px] h-[36px] rounded-full">
                            <img
                              src={AvatarImg}
                              className="w-full h-full rounded-full"
                              alt=""
                            />
                          </div>
                          <div>
                            <h2 className="text-base font-semibold text-fg-brand">
                              Moyez.k
                            </h2>
                            <p className="text-sm font-medium text-[#6B7280]">
                              Expert graphic designer UI/UX Product Designer
                            </p>
                          </div>
                        </div>
                        <div>
                          <Stack direction="row" spacing={4} align="center">
                            <Button
                              size="sm"
                              colorScheme="#16A34A"
                              variant="outline"
                              color={"#16A34A"}
                            >
                              Hire
                            </Button>
                            <Button
                              colorScheme="#16A34A"
                              variant="outline"
                              size={"sm"}
                              bg={"#16A34A"}
                              color={"#fff"}
                            >
                              Invite to Job
                            </Button>
                          </Stack>
                        </div>
                      </div>

                      <div>
                        <Button
                          colorScheme="#16A34A"
                          variant="outline"
                          size={"xs"}
                          color={"#16A34A"}
                        >
                          Available now
                        </Button>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#6B7280]">
                          $20.00/hr
                        </p>
                      </div>
                      <div>
                        <Link
                          to={"/"}
                          className="mt-1 text-sm font-normal text-[#38BDF8] hover:underline"
                        >
                          Earned $ 1k on adobe illustrator
                        </Link>
                        <Link
                          to={"/"}
                          className="flex items-center gap-2 mt-1 text-sm font-normal text-[#38BDF8] hover:underline "
                        >
                          Has 9 relevant skills to your job
                          <span>
                            <AiFillQuestionCircle className="text-[#6B7280]" />
                          </span>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between">
                        <Stack spacing={4} direction="row" align="center">
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
                  <div className="flex gap-8">
                    <div className="w-[200px] h-[150px]">
                      <img
                        src="https://c.animaapp.com/LZ3BWujk/img/rectangle-26-1@2x.png"
                        alt=""
                      />
                    </div>
                    <div className="w-full space-y-2 ">
                      <div className="flex justify-between ">
                        <div className="flex gap-3">
                          <div className="w-[36px] h-[36px] rounded-full">
                            <img
                              src={AvatarImg}
                              className="w-full h-full rounded-full"
                              alt=""
                            />
                          </div>
                          <div>
                            <h2 className="text-base font-semibold text-fg-brand">
                              Moyez.k
                            </h2>
                            <p className="text-sm font-medium text-[#6B7280]">
                              Expert graphic designer UI/UX Product Designer
                            </p>
                          </div>
                        </div>
                        <div>
                          <Stack direction="row" spacing={4} align="center">
                            <Button
                              size="sm"
                              colorScheme="#16A34A"
                              variant="outline"
                              color={"#16A34A"}
                            >
                              Hire
                            </Button>
                            <Button
                              colorScheme="#16A34A"
                              variant="outline"
                              size={"sm"}
                              bg={"#16A34A"}
                              color={"#fff"}
                            >
                              Invite to Job
                            </Button>
                          </Stack>
                        </div>
                      </div>

                      <div>
                        <Button
                          colorScheme="#16A34A"
                          variant="outline"
                          size={"xs"}
                          color={"#16A34A"}
                        >
                          Available now
                        </Button>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#6B7280]">
                          $20.00/hr
                        </p>
                      </div>
                      <div>
                        <Link
                          to={"/"}
                          className="mt-1 text-sm font-normal text-[#38BDF8] hover:underline"
                        >
                          Earned $ 1k on adobe illustrator
                        </Link>
                        <Link
                          to={"/"}
                          className="flex items-center gap-2 mt-1 text-sm font-normal text-[#38BDF8] hover:underline"
                        >
                          Has 9 relevant skills to your job
                          <span>
                            <AiFillQuestionCircle className="text-[#6B7280]" />
                          </span>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between">
                        <Stack spacing={4} direction="row" align="center">
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
                <p>Invited freelancer!</p>
              </TabPanel>
              <TabPanel>
                <p>My Hire!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardInviteFreelancersComponent;
