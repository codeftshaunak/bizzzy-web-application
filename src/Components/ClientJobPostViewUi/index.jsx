import React, { useState } from "react";
import CTAButton from "../CTAButton";
import { FiUser, FiEdit2, FiEye } from "react-icons/fi";
import { TbFileDollar } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar } from "react-icons/ai";
import { LiaRetweetSolid } from "react-icons/lia";
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
import { Link, useNavigate } from "react-router-dom";

export const ClientJobPostViewComponent = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  console.log(page);
  return (
    <div className="w-full md:px-8 md:py-6">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-[#374151] ">
            Your Dashboard
          </h2>
          <p className="text-lg font-normal text-[#374151] ">Joe doe</p>
        </div>
        <div className="mt-4">
          <CTAButton
            text={"Post a new job"}
            bg={"#16A34A"}
            color={"#ffff"}
            fontSize="1rem"
            height="2.5rem"
            onClick={() => navigate("/create-job")}
          ></CTAButton>
        </div>
      </div>

      <div className="my-10">
        <div className="grid gap-4 md:grid-cols-12">
          <div className="col-span-2">
            <div className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center" onClick={() => {
              setPage(0)
            }}>
              <p>View Job Post</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center" onClick={() => setPage(1)}>
              <p>Invite Freelancers</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center" onClick={() => setPage(2)}>
              <p>
                Review Proposals <span>(13)</span>
              </p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center" onClick={() => setPage(3)}>
              <p>
                Hire <span>(0)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {
        page === 0 && <JobPostView />
      }
      {
        page === 1 && <InviteFreelancer />
      }
      {
        page === 2 && <ReviewProposal />
      }
      {
        page === 3 && <ClientHire />
      }
    </div>
  );
};


export const JobPostView = () => {
  return <div className="flex flex-col gap-8 md:flex-row">
    <div className="border rounded-lg basis-full md:basis-3/4 border-slate-300">
      <div className="border-b">
        <div className="p-6 space-y-2">
          <h2 className="text-base font-semibold text-[#374151]">
            Update our site design with a figma
            <span className="text-sm ml-3 font-medium text-[#6B7280]">
              Posted 2mins ago
            </span>
          </h2>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <TbFileDollar />
              <p>$100.00</p>
            </div>
            <div className="flex items-center gap-2">
              <FiUser />
              <p>Expert</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <p>
            We have a fully functional website with all the features in
            place. Now, we're looking for a talented Logo and UI Designer to
            enhance the website's visual appeal and user-friendliness.
          </p>
        </div>
        <div>
          <p>Responsibilities:</p>
          <div className="py-4">
            <p>
              - Design a modern and visually appealing logo that aligns with
              our brand identity.
            </p>
            <p>
              - Create a user-friendly and modern UI design in Figma,
              providing clear instructions for implementation.
            </p>
            <p>
              - Ensure that the UI design is responsive and compatible with
              various devices.
            </p>
          </div>
        </div>
        <div>
          <p>Requirements:</p>
          <div className="py-4">
            <p>- Proven experience in logo design and UI/UX design.</p>-
            Proficiency in Figma or similar design tools.
            <p>
              - Strong understanding of modern design principles and trends.
            </p>
          </div>
        </div>
        <div>
          <p>Additional Information:</p>
          <div className="py-4">
            <p>
              - This is not a coding job; the website and its features are
              already developed.
            </p>
            <p>
              - You will be responsible for the visual aspects and user
              experience improvements.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-4 border rounded-lg basis-full md:mt-0 md:basis-1/4 border-slate-300">
      <div className="p-6 border-b ">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FiEdit2 className="text-[#16A34A]" />
            <p className="text-sm">Edit posting</p>
          </div>
          <div className="flex items-center gap-2">
            <FiEye className="text-[#16A34A]" />
            <p className="text-sm">View posting</p>
          </div>
          <div className="flex items-center gap-2">
            <LiaRetweetSolid className="text-[#16A34A]" />
            <p className="text-sm">Reuse posting</p>
          </div>
          <div className="flex items-center gap-2">
            <RxCross1 className="text-[#16A34A]" />
            <p className="text-sm">Remove posting</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-3">
        <div>
          <h2 className="text-[#374151] text-base font-semibold ">
            About the client
          </h2>
        </div>
        <div>
          <h2 className="text-[#374151] text-base font-semibold ">
            Payment method verified
          </h2>
          <div className="text-[#374151] text-sm flex items-center gap-1">
            <AiFillStar className="text-[#16A34A]" />
            <AiFillStar className="text-[#16A34A]" />
            <AiFillStar className="text-[#16A34A]" />
            <AiFillStar className="text-[#16A34A]" />
            <AiFillStar className="text-[#16A34A]" />
            <span className="ml-2">5.0 of 30 reviews</span>
          </div>
        </div>
        <div>
          <h2 className="text-[#374151] text-base font-semibold ">
            United States
          </h2>
          <p className="text-[#374151] text-sm">1:18 am</p>
        </div>
        <div>
          <h2 className="text-[#374151] text-base font-semibold ">
            6 jobs posted
          </h2>
          <p className="text-[#374151] text-sm">
            50% hire rate, 1 open job
          </p>
        </div>
        <div>
          <h2 className="text-[#374151] text-base font-semibold ">
            $6.3K total spent
          </h2>
          <p>1 hire, 1 active</p>
        </div>
      </div>
    </div>
  </div>
}

export const InviteFreelancer = () => {
  return <div className="flex flex-col gap-8 md:flex-row">
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
}

export const ReviewProposal = () => {
  return <div className="flex flex-col gap-8 md:flex-row">
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
}

export const ClientHire = () => {
  return <div className="flex flex-col gap-8 md:flex-row">
    <div className="overflow-hidden border rounded-lg basis-full md:basis-4/5 border-slate-300">
      <Tabs variant="unstyled">
        <TabList className="px-6 pt-4 border-b">
          <Tab className="px-0 text-black">Offers</Tab>
          <Tab className="px-0 text-black">Hired</Tab>
        </TabList>
        <TabIndicator
          height="2px"
          borderRadius="1px"
          color={"#000"}
          className=" bg-fg-brand"
        />
        <TabPanels>
          <TabPanel>
            <div className="h-[196px] px-8 pt-8 pb-4 flex justify-center items-center ">
              <p>You don’t have any hires yet</p>
            </div>
          </TabPanel>
          <TabPanel>
            <p>Hired!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
}
