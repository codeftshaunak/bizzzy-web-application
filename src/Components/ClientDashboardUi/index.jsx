import { Button, HStack, Progress, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiDotsThreeBold } from "react-icons/pi";
import { formatDistanceToNow } from 'date-fns';
import ClientProfileCard from "./ClientProfileCard";
import { getClientJobs, getHiredListByClient } from "../../helpers/clientApis";
import CTAButton from "../CTAButton";

const ClientDashboardComponent = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [hiredList, setHiredList] = useState([]);
  const uniqueHired = [];
  const seenFreelancerIds = new Set();
  if (hiredList?.length > 0) {
    hiredList?.forEach((item) => {
      // Check if the freelancer_id is already in the Set
      if (!seenFreelancerIds.has(item.freelencer_id)) {
        // If not, add it to the Set and push the item to the result array
        seenFreelancerIds.add(item.freelencer_id);
        uniqueHired.push(item);
      }
    });
  }


  const getClientPostedJob = async () => {
    try {
      const respoonse = await getClientJobs();
      setJobs(respoonse);
      console.log(respoonse);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    console.log(id);
  }

  const getHiredFreelancer = async () => {
    const response = await getHiredListByClient();
    setHiredList(response.body)
  }

  useEffect(() => {
    getClientPostedJob();
    getHiredFreelancer();
  }, []);



  return (
    <div className="w-[90%]">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-9">
          <h2 className="text-[25px] mb-2">Your Dashboard</h2>
          {/* <h6 className="text-[16px]">My Team</h6> */}
          {
            uniqueHired?.length > 0 ? <div className="grid grid-cols-12 gap-4 mt-4">
              {
                uniqueHired?.length > 0 && uniqueHired.map((data, index) => {
                  return <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-[#D1D5DB] p-4 rounded-lg" key={index}>
                    <ClientProfileCard data={data.freelancerDetails[0]} />
                  </div>
                })
              }
            </div> :
              <div className="border-2 mt-4 rounded-md">
                <div className="flex justify-between border-b border-[#D1D5DB] p-4">
                  <div className=" text-2xl font-medium text-[#374151]">My Team</div>
                </div>
                <div className=" h-[200px] bg-[#f4f5f787] text-center py-4">
                  <div className="w-[70%] m-auto flex flex-col justify-center items-center gap-2 h-full">
                    <h2 className="font-bold text-xl">Welcome to Bizzzy!</h2>
                    <p className="py-3">Ready to start building your team online? Explore our vast database of programmers, designers, marketers, builders & more. Click below to make your first hire & bring your project live.</p>
                    <Button bg={"#16A34A"} color={'#fff'} border={"1px solid #16A34A"} fontSize={'sm'} height={"2rem"} w={"12rem"} textTransform={"capitalize"} transition={"0.3s ease-in-out"} _hover={{
                      bg: '#36af63',
                      color: "#fff"
                    }}>
                      Post a new job
                    </Button>
                  </div>
                </div>
              </div>
          }

          <div className="border-2 mt-4 rounded-md">
            <div className="flex justify-between border-b border-[#D1D5DB] p-4">
              <div className=" text-2xl font-medium text-[#374151]">Packages</div>
            </div>
            <div className=" h-[200px] bg-[#f4f5f787] text-center py-4">
              <div className="w-[70%] m-auto flex flex-col justify-center items-center gap-2 h-full">
                <h2 className="font-bold text-xl">Remumber Packages</h2>
                <p className="py-3">Ready to start building your team online? Explore our vast database of programmers, designers, marketers, builders & more. Click below to make your first hire & bring your project live.</p>
                <Button bg={"#16A34A"} color={'#fff'} border={"1px solid #16A34A"} fontSize={'sm'} height={"2rem"} w={"12rem"} textTransform={"capitalize"} transition={"0.3s ease-in-out"} _hover={{
                  bg: '#36af63',
                  color: "#fff"
                }}>
                  Post a new job
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 border border-[#D1D5DB]  rounded-md w-full">
            <div className=" flex items-center justify-between border-b border-[#D1D5DB] p-4 ">
              <div className=" text-2xl font-medium text-[#374151]">Your Job Posting</div>
            </div>
            <div className="px-4 w-full">
              {
                jobs?.length > 0 && (
                  jobs?.slice()?.reverse().map((job, index) => {
                    const formattedDate = formatDistanceToNow(new Date(job?.created_at), { addSuffix: true });
                    return <div className="flex items-center justify-between w-full" key={index} style={{
                      borderBottom: "0.1px solid #6b7280",
                      padding: "20px"
                    }}>
                      <VStack alignItems={"start"} justifyContent={"center"} cursor={"pointer"} onClick={() => {
                        navigate(`/client-jobdetails/${job?._id}`, {
                          state: { jobDetails: job },
                        })
                      }}>
                        <h5 className="text-lg text-[#374151] font-medium capitalize">
                          {job?.title}
                        </h5>
                        <div className="text-sm text-[#6B7280]">
                          <div className="mb-1 text-[#6B7280] ">Public - {job?.budget == 1 ? "Fixed" : "Hourly"}</div>
                          <div>Posted {formattedDate} ago by you</div>
                        </div>
                      </VStack>

                      <VStack width={"200px"} justifyContent={"space-between"} alignItems={"end"}>
                        <HStack>
                          <div className=" text-[#6B7280] font-bold text-base">{job?.proposal_details?.length === 0 ? "No" : job?.proposal_details?.length} New</div>
                          <div className=" text-[#6B7280] text-base font-bold">Applicants</div>
                        </HStack>
                        {/* <PiDotsThreeBold className="w-[24px] h-[26px] border border-black rounded-full" /> */}
                        <Button colorScheme="16A34A" color={'#000'} border={"1px solid #16A34A"} size="sm" fontSize={'sm'} w={"10rem"} textTransform={"capitalize"} transition={"0.3s ease-in-out"} _hover={{
                          bg: '#16A34A',
                          color: "#fff"
                        }} onClick={() => {
                          navigate(`/client-jobdetails/${job._id}`, {
                            state: { jobDetails: job },
                          })
                        }}>
                          Go to job post
                        </Button>
                        <Button colorScheme="16A34A" color={'#000'} border={"1px solid #16A34A"} size="sm" fontSize={'sm'} w={"10rem"} textTransform={"capitalize"} transition={"0.3s ease-in-out"} _hover={{
                          bg: '#16A34A',
                          color: "#fff"
                        }} onClick={() => {
                          navigate(`/client-jobdetails/${job._id}`, {
                            state: { jobDetails: job },
                          });
                        }}>
                          Find Applicants
                        </Button>
                        {/* <Button colorScheme="16A34A" color={'#000'} border={"1px solid #16A34A"} size="sm" fontSize={'sm'} w={"10rem"} textTransform={"capitalize"} transition={"0.3s ease-in-out"} _hover={{
                          bg: '#16A34A',
                          color: "#fff"
                        }} onClick={() => handleDelete(job._id)}>
                          Delete job post
                        </Button> */}
                      </VStack>
                    </div>
                  })
                )
              }

            </div>
          </div>
          {/* end position */}

          {/* start draft  */}
          {/* <div className=" mt-6 border border-[#D1D5DB]  rounded-md">
            <div className=" flex items-center justify-between border-b border-[#D1D5DB] p-4 ">
              <div className=" text-2xl font-medium text-[#374151]">Your Drafts</div>
              <div>
                <Link to="#" className=" text-lg font-medium text-fg-brand">
                  See All Postings
                </Link>
              </div>
            </div>
            <div className=" p-4 border-b border-[#D1D5DB]">
              <div className=" flex items-center justify-between ">
                <div className="space-y-2">
                  <h5 className="text-lg text-[#374151] font-medium">
                    NFT artist (2D, 3D, or pixel art)
                  </h5>
                  <p className=" text-sm font-medium text-[#6B7280]">
                    Saved 13 hours ago
                  </p>
                </div>
                <div>
                  <PiDotsThreeBold className="w-[24px] h-[26px] border border-black rounded-full" />
                </div>
              </div>
            </div>
            <div className=" p-4 border-b border-[#D1D5DB]">
              <div className=" flex items-center justify-between ">
                <div className="space-y-2">
                  <h5 className="text-lg text-[#374151] font-medium">
                    NFT artist (2D, 3D, or pixel art)
                  </h5>
                  <p className=" text-sm font-medium text-[#6B7280]">
                    Saved 13 hours ago
                  </p>
                </div>
                <div>
                  <PiDotsThreeBold className="w-[24px] h-[26px] border border-black rounded-full" />
                </div>
              </div>
            </div>
          </div> */}
          {/* end draft */}
        </div>

        <div className=" col-span-12 md:col-span-3">
          <VStack gap={"5"} w="100%">
            <Button colorScheme="green" size="sm" w={"100%"} onClick={() => {
              navigate("/create-job")
            }}>
              Post a new job
            </Button>
            <div className=" w-full border border-[#D1D5DB] rounded-md p-4 h-[700px]">
              <h4 className=" text-[18px] mb-4 font-bold">Getting Started</h4>
              <div className=" my-6">
                <Progress value={60} colorScheme="green" size={"sm"} />
              </div>
              <div className=" flex items-center justify-between border border-[#D1D5DB] rounded-md py-2 px-4 mb-4">
                <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                  <img src="images/dashboard/proposals.png" alt="proposals" />
                </div>
                <p>Invite talent to apply</p>
              </div>
              <div className=" flex items-center justify-between border border-[#D1D5DB] rounded-md py-2 px-4 mb-4">
                <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                  <img src="images/dashboard/proposals.png" alt="proposals" />
                </div>
                <p>Add Billing method</p>
              </div>
              <div className=" flex items-center justify-between border border-[#D1D5DB] rounded-md py-2 px-4 mb-4">
                <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                  <img src="images/dashboard/proposals.png" alt="proposals" />
                </div>
                <p>Review proposals</p>
              </div>
            </div>
          </VStack>
        </div>
      </div>
    </div >
  );
};

export default ClientDashboardComponent;
