// import {
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   Flex,
//   Popover,
//   PopoverArrow,
//   PopoverBody,
//   PopoverCloseButton,
//   PopoverContent,
//   PopoverHeader,
//   PopoverTrigger,
//   Progress,
//   Spacer,
//   Step,
//   StepDescription,
//   StepIcon,
//   StepIndicator,
//   StepNumber,
//   StepSeparator,
//   StepStatus,
//   StepTitle,
//   Stepper,
//   Tab,
//   TabIndicator,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Text,
// } from "@chakra-ui/react";
// import { FaCalendarAlt, FaPlus } from "react-icons/fa";
// import { BsThreeDots } from "react-icons/bs";
// import { LuBadgeDollarSign } from "react-icons/lu";
// import { MdCancel } from "react-icons/md";
// import { Link, useLocation } from 'react-router-dom';

// const ActiveJobDetailsComponent = () => {
//   const location = useLocation();
//   const jobState = location.state;
//   const clientDetails = jobState?.client_profile[0];

//   console.log({ "----": clientDetails });
//   const jobDetails = jobState.job_details[0]
//   console.log({ "job-state": jobDetails });


//   return (
//     <div className="w-full">
//       <div className="flex justify-between gap-4">
//         <div>
//           <Flex>
//             <Avatar src={clientDetails.profile_image !== "null" ? clientDetails.profile_image : clientDetails.firstName} name={clientDetails.profile_image !== "null" ? clientDetails.profile_image : clientDetails.firstName} />
//             <Box ml="3">
//               <Text fontWeight="bold">
//                 {clientDetails.firstName} {clientDetails.lastName}
//                 <Badge ml="1" colorScheme="green">
//                   New
//                 </Badge>
//               </Text>
//               <Text fontSize="sm">{clientDetails.location}</Text>
//             </Box>
//           </Flex>
//         </div>

//         <div>
//           <Popover>
//             <PopoverTrigger>
//               <Button>
//                 <BsThreeDots className="text-green-500 text-[1.5rem]" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent>
//               <PopoverArrow />
//               <PopoverBody padding={"4"}>
//                 <div className="flex flex-col gap-3">
//                   <button className="flex items-center font-400 gap-2 text-[1.2rem]">
//                     <MdCancel className="text-[1.5rem]" /> End contract
//                   </button>
//                 </div>
//               </PopoverBody>
//             </PopoverContent>
//           </Popover>
//         </div>

//       </div>

//       <div className="top-profile-section my-6">
//         <div className="my-4">
//           <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
//             {jobDetails.title}
//           </h2>
//         </div>

//         <div className="mt-[3rem]">
//           <Tabs position="relative" variant="unstyled">
//             <TabList>
//               <Tab className="font-semibold text-[1.5rem]">Overview</Tab>
//               <Tab className="font-semibold text-[1.5rem]">Details</Tab>
//             </TabList>
//             <TabIndicator
//               mt="1.5px"
//               height="2px"
//               bg="var(--primarytextcolor)"
//               borderRadius="1px"
//             />
//             <TabPanels>
//               <TabPanel>
//                 <div>
//                   <div className="flex mt-[1.2rem]  gap-4 justify-between">
//                     <div className="border rounded-xl md:px-[2rem] md:py-[2.2rem] w-[60%] shadow-md">
//                       <div>
//                         <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">
//                           Milestone timeline
//                         </h1>
//                       </div>
//                       <div>
//                         <Stepper
//                           orientation="vertical"
//                           height="340px"
//                           colorScheme="green"
//                           gap="0"
//                         >
//                           <Step>
//                             <StepIndicator borderColor="var(--primarytextcolor)">
//                               <StepStatus
//                                 borderColor="var(--primarytextcolor)"
//                                 active={
//                                   <StepNumber />
//                                 }
//                               />
//                             </StepIndicator>

//                             <Box flexShrink="0">
//                               <StepTitle>
//                                 <h1 className="text-[1.4rem] mx-2 font-500">
//                                   {jobDetails.title}
//                                 </h1>
//                               </StepTitle>
//                               <StepDescription>
//                                 <div className="flex items-center gap-x-4 my-2">
//                                   <h1 className="font-bold text-[1.6rem]">
//                                     ${jobDetails.amount}
//                                   </h1>
//                                   <Text borderColor="var(--primarytextcolor)" color="var(--primarytextcolor)" className="border-2 px-3 py-1 text-[1.2rem] rounded-full">
//                                     Active & funded
//                                   </Text>
//                                 </div>
//                                 <div>
//                                   <h1 className="flex gap-x-2 items-center text-[1.2rem]">
//                                     <FaCalendarAlt className="text-[1.5rem]" />{" "}
//                                     Due Dec 1
//                                   </h1>

//                                   <Button className="my-6 font-semibold text-[1rem] rounded-full px-8 py-2 cursor-pointer" backgroundColor={"var(--primarytextcolor)"} borderRadius={"25px"} color={"var(--secondarycolor)"} _hover={{
//                                     color: "black",
//                                     backgroundColor: "var(--primarysoftbg)"
//                                   }}>
//                                     Submit Work
//                                   </Button>
//                                 </div>
//                               </StepDescription>
//                             </Box>
//                             <StepSeparator />
//                           </Step>
//                           <Step>
//                             <StepIndicator className="bg-green-500">
//                               <StepStatus
//                                 active={<FaPlus className="text-white" />}
//                               />
//                             </StepIndicator>

//                             <Box flexShrink="0">
//                               <StepTitle>
//                                 <Text className="text-[1rem] mx-2 font-500" color={"var(--primarytext)"}>
//                                   Propose new milestone
//                                 </Text>
//                               </StepTitle>
//                               <StepDescription>
//                                 <Button className="my-6 font-semibold text-[1rem] rounded-full px-8 py-2 cursor-pointer" backgroundColor={"var(--primarytextcolor)"} borderRadius={"25px"} color={"var(--secondarycolor)"} _hover={{
//                                   color: "black",
//                                   backgroundColor: "var(--primarysoftbg)"
//                                 }}>
//                                   Manage Milestone
//                                 </Button>
//                               </StepDescription>
//                             </Box>
//                           </Step>
//                         </Stepper>
//                       </div>
//                     </div>
//                     <div className="border h-[60%] rounded-xl md:px-[2rem] md:py-[2.2rem] w-[40%] shadow-md">
//                       <div>
//                         <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">
//                           Earnings
//                         </h1>
//                       </div>
//                       <div>
//                         <div className="my-[1.5rem]">
//                           <Progress
//                             hasStripe
//                             value={100}
//                             colorScheme="green"
//                             className="rounded-lg"
//                           />
//                         </div>
//                         <div className="flex flex-col gap-4">
//                           <div className="flex justify-between">
//                             <div className="flex items-center gap-2 text-[1.2rem]">
//                               <div className="bg-[black] w-[1.3rem] h-[1.3rem] rounded-full"></div>
//                               Received
//                             </div>
//                             <h1 className="font-bold text-[1.2rem]">$0.00</h1>
//                           </div>

//                           <div className="flex justify-between">
//                             <div className="flex items-center gap-2 text-[1.2rem]">
//                               <div className="bg-[green] w-[1.3rem] h-[1.3rem] rounded-full"></div>
//                               Funded (Escrow Protection)
//                             </div>
//                             <h1 className="font-bold text-[1.2rem]">${jobDetails.amount}</h1>
//                           </div>

//                           <div className="flex justify-between">
//                             <div className="flex items-center gap-2 text-[1.2rem]">
//                               <div className="bg-[#bfbfbf] w-[1.3rem] h-[1.3rem] rounded-full"></div>
//                               Project Price
//                             </div>
//                             <h1 className="font-bold text-[1.2rem]">${jobDetails.amount}</h1>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </TabPanel>
//               <TabPanel>
//                 <div>
//                   <div className="flex mt-[1.2rem]  gap-4 justify-between">
//                     <div className="border rounded-xl md:px-[2rem] md:py-[2.2rem] w-[60%] shadow-md">
//                       <div>
//                         <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">
//                           Details
//                         </h1>
//                       </div>
//                       <Stepper
//                         orientation="vertical"
//                         height="340px"
//                         colorScheme="green"
//                         gap="0"
//                       >
//                         <Step>
//                           <StepIndicator borderColor="var(--primarytextcolor)">
//                             <StepStatus
//                               borderColor="var(--primarytextcolor)"
//                               active={
//                                 <StepNumber />
//                               }
//                             />
//                           </StepIndicator>

//                           <Box flexShrink="0">
//                             <StepTitle>
//                               <h1 className="text-[1.4rem] mx-2 font-500">
//                                 {jobDetails.title}
//                               </h1>
//                             </StepTitle>
//                             <StepDescription>
//                               <div className="flex items-center gap-x-4 my-2">
//                                 <h1 className="font-bold text-[1.6rem]">
//                                   ${jobDetails.amount}
//                                 </h1>
//                                 <Text borderColor="var(--primarytextcolor)" color="var(--primarytextcolor)" className="border-2 px-3 py-1 text-[1.2rem] rounded-full">
//                                   Active & funded
//                                 </Text>
//                               </div>
//                               <div>
//                                 <Text className="flex gap-x-2 items-center text-[1.2rem]">
//                                   <FaCalendarAlt className="text-[1.5rem]" />{" "}
//                                   Due Dec 1
//                                 </Text>

//                                 <Button className="my-6 font-semibold text-[1rem] rounded-full px-8 py-2 cursor-pointer" backgroundColor={"var(--primarytextcolor)"} borderRadius={"25px"} color={"var(--secondarycolor)"} _hover={{
//                                   color: "black",
//                                   backgroundColor: "var(--primarysoftbg)"
//                                 }}>
//                                   Submit Work
//                                 </Button>
//                               </div>
//                             </StepDescription>
//                           </Box>
//                           <StepSeparator />
//                         </Step>
//                         <Step>
//                           <StepIndicator className="bg-green-500">
//                             <StepStatus
//                               active={<FaPlus className="text-white" />}
//                             />
//                           </StepIndicator>

//                           <Box flexShrink="0">
//                             <StepTitle>
//                               <Text className="text-[1rem] mx-2 font-500" color={"var(--primarytext)"}>
//                                 Propose new milestone
//                               </Text>
//                             </StepTitle>
//                             <StepDescription>
//                               <Button className="my-6 font-semibold text-[1rem] rounded-full px-8 py-2 cursor-pointer" backgroundColor={"var(--primarytextcolor)"} borderRadius={"25px"} color={"var(--secondarycolor)"} _hover={{
//                                 color: "black",
//                                 backgroundColor: "var(--primarysoftbg)"
//                               }}>
//                                 Manage Milestone
//                               </Button>
//                             </StepDescription>
//                           </Box>
//                         </Step>
//                       </Stepper>
//                     </div>
//                     <div className="border h-[60%] rounded-xl md:px-[2rem] md:py-[2.2rem] w-[40%] shadow-md">
//                       <div>
//                         <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">
//                           Earnings
//                         </h1>
//                       </div>
//                       <div>
//                         <div className="my-[1.5rem]">
//                           <Progress
//                             hasStripe
//                             value={100}
//                             colorScheme="green"
//                             className="rounded-lg"
//                           />
//                         </div>
//                         <div className="flex flex-col gap-4">
//                           <div className="flex justify-between">
//                             <div className="flex items-center gap-2 text-[1.2rem]">
//                               <div className="bg-[black] w-[1.3rem] h-[1.3rem] rounded-full"></div>
//                               Received
//                             </div>
//                             <h1 className="font-bold text-[1.2rem]">$0.00</h1>
//                           </div>

//                           <div className="flex justify-between">
//                             <div className="flex items-center gap-2 text-[1.2rem]">
//                               <div className="bg-[green] w-[1.3rem] h-[1.3rem] rounded-full"></div>
//                               Funded (Escrow Protection)
//                             </div>
//                             <h1 className="font-bold text-[1.2rem]">${jobDetails.amount}</h1>
//                           </div>

//                           <div className="flex justify-between">
//                             <div className="flex items-center gap-2 text-[1.2rem]">
//                               <div className="bg-[#bfbfbf] w-[1.3rem] h-[1.3rem] rounded-full"></div>
//                               Project Price
//                             </div>
//                             <h1 className="font-bold text-[1.2rem]">${jobDetails.amount}</h1>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActiveJobDetailsComponent;



import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Text,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { FaCalendarAlt, FaPlus } from 'react-icons/fa';
import {
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
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import SubmitModal from './SubmitModal';
import { workSubmit } from '../../../helpers/freelancerApis';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../ConfirmationModal/ConfirmModal';

const ClientInfo = ({ clientDetails }) => (
  <Flex>
    <Avatar src={clientDetails.profile_image !== 'null' ? clientDetails.profile_image : clientDetails.firstName} name={clientDetails.profile_image !== 'null' ? clientDetails.profile_image : clientDetails.firstName} />
    <Box ml="3">
      <Text fontWeight="bold">
        {clientDetails.firstName} {clientDetails.lastName}
        <Badge ml="1" colorScheme="green">
          New
        </Badge>
      </Text>
      <Text fontSize="sm">{clientDetails.location}</Text>
    </Box>
  </Flex>
);

const OptionsPopover = ({ setOpenModal }) => (
  <Popover>
    <PopoverTrigger>
      <Button>
        <BsThreeDots className="text-green-500 text-[1.5rem]" />
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverBody padding="4">
        <div className="flex flex-col gap-3">
          <button className="flex items-center font-400 gap-2 text-[1.2rem]" onClick={() => setOpenModal(true)}>
            <MdCancel className="text-[1.5rem]" /> End contract
          </button>
        </div>
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

const MilestoneStepper = ({ jobDetails }) => {
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const jobState = location.state;
  const toast = useToast();
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async (data) => {
    setLoadingSubmit(true);
    try {
      console.log(data.file); // Check if file data is available

      const formData = new FormData();
      formData.append('job_id', jobState.job_id);
      formData.append('client_id', jobState.client_id);
      formData.append('message', data.messages);

      // Check if file data is available before appending
      if (data.file) {
        formData.append('file', data.file);
      }
      const response = await workSubmit(formData);
      if (response.code == 200) {
        toast({
          title: "Your work submited successfully!",
          colorScheme: "green",
          position: 'top-right'
        })
        navigate(`/submit-review/${jobState.job_id}`)
      }
      setLoadingSubmit(false);
      console.log(response);
    } catch (error) {
      console.error('Error submitting work:', error);
      setLoadingSubmit(false);
    }
    setLoadingSubmit(false);
  };


  const acceptInvite = (data) => handleSubmit(data);

  return <Stepper orientation="vertical" height="340px" colorScheme="green" gap="0">
    <Step>
      <StepIndicator borderColor="var(--primarytextcolor)">
        <StepStatus
          borderColor="var(--primarytextcolor)"
          active={<StepNumber />}
        />
      </StepIndicator>
      <Box flexShrink="0">
        <StepTitle>
          <h1 className="text-[1.4rem] mx-2 font-500">
            {jobDetails.title}
          </h1>
        </StepTitle>
        <StepDescription>
          <div className="flex items-center gap-x-4 my-2">
            <h1 className="font-bold text-[1.6rem]">
              ${jobDetails.amount}
            </h1>
            <Text
              borderColor="var(--primarytextcolor)"
              color="var(--primarytextcolor)"
              className="border-2 px-3 py-1 text-[1.2rem] rounded-full"
            >
              Active & funded
            </Text>
          </div>
          <div>
            <h1 className="flex gap-x-2 items-center text-[1.2rem]">
              <FaCalendarAlt className="text-[1.5rem]" /> Due Dec 1
            </h1>
            <Button
              className="my-6 font-semibold text-[1rem] rounded-full px-8 py-2 cursor-pointer"
              backgroundColor={'var(--primarytextcolor)'}
              borderRadius={'25px'}
              color={'var(--secondarycolor)'}
              onClick={() => setOpenModal(true)}
              _hover={{
                color: 'black',
                backgroundColor: 'var(--primarysoftbg)',
              }}
            >
              Submit Work
            </Button>
          </div>
        </StepDescription>
      </Box>

      {/* Define Modal */}
      {
        openModal && <SubmitModal setOpenModal={setOpenModal} acceptInvite={acceptInvite} jobdetails={jobDetails} loadingSubmit={loadingSubmit} setLoadingSubmit={setLoadingSubmit} />
      }

      <StepSeparator />
    </Step>
    <Step>
      <StepIndicator className="bg-green-500">
        <StepStatus active={<FaPlus className="text-white" />} />
      </StepIndicator>
      <Box flexShrink="0">
        <StepTitle>
          <Text className="text-[1rem] mx-2 font-500" color={'var(--primarytext)'}>
            Propose new milestone
          </Text>
        </StepTitle>
        <StepDescription>
          <Button
            className="my-6 font-semibold text-[1rem] rounded-full px-8 py-2 cursor-pointer"
            backgroundColor={'var(--primarytextcolor)'}
            borderRadius={'25px'}
            color={'var(--secondarycolor)'}
            _hover={{
              color: 'black',
              backgroundColor: 'var(--primarysoftbg)',
            }}
          >
            Manage Milestone
          </Button>
        </StepDescription>
      </Box>
    </Step>
  </Stepper>
};

const EarningsDetails = ({ jobDetails }) => (
  <div className="border h-[60%] rounded-xl md:px-[2rem] md:py-[2.2rem] w-[40%] shadow-md">
    <div>
      <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">Earnings</h1>
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
          <h1 className="font-bold text-[1.2rem]">${jobDetails.amount}</h1>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-[1.2rem]">
            <div className="bg-[#bfbfbf] w-[1.3rem] h-[1.3rem] rounded-full"></div>
            Project Price
          </div>
          <h1 className="font-bold text-[1.2rem]">${jobDetails.amount}</h1>
        </div>
      </div>
    </div>

  </div>
);

const ActiveJobDetailsComponent = () => {
  const location = useLocation();
  const jobState = location.state;
  const job_id = jobState.job_id;
  const client_id = jobState.client_id;

  const clientDetails = jobState?.client_profile[0];
  const jobDetails = jobState.job_details[0];

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between gap-4">
        <div>
          <ClientInfo clientDetails={clientDetails} />
        </div>

        <div>
          <OptionsPopover setOpenModal={setOpenModal} />
        </div>
      </div>

      <div className="top-profile-section my-6">
        <div className="my-4">
          <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
            {jobDetails.title}
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
                  <div className="flex mt-[1.2rem] gap-4 justify-between">
                    <div className="border rounded-xl md:px-[2rem] md:py-[2.2rem] w-[60%] shadow-md">
                      <div>
                        <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">
                          Milestone timeline
                        </h1>
                      </div>
                      <MilestoneStepper jobDetails={jobDetails} />
                    </div>
                    <EarningsDetails jobDetails={jobDetails} />
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <div className="flex mt-[1.2rem] gap-4 justify-between">
                    <div className="border rounded-xl md:px-[2rem] md:py-[2.2rem] w-[60%] shadow-md">
                      <div>
                        <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">
                          Details
                        </h1>
                      </div>
                      <MilestoneStepper jobDetails={jobDetails} job_id={job_id} client_id={client_id} />
                    </div>
                    <EarningsDetails jobDetails={jobDetails} />
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      {
        openModal && <ConfirmModal setOpenModal={setOpenModal} job_id={job_id} clientDetails={clientDetails} jobDetails={jobDetails} />
      }

    </div>
  );
};

export default ActiveJobDetailsComponent;
