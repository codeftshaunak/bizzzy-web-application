
import React, { useEffect, useState } from 'react'
import { getAllJobs } from '../../helpers/jobApis'
import JobCard from './JobCard';
import { useNavigate } from 'react-router-dom'
import { Box, Checkbox, HStack, Image, Input, Select, Text, VStack } from '@chakra-ui/react';
import { BiSearchAlt } from 'react-icons/bi';

export const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const getAllJobList = async () => {
        try {
            const response = await getAllJobs();
            setJobs(response);
        } catch (error) {
            console.error("Error fetching job list:", error);
        }
    }

    useEffect(() => {
        getAllJobList();
    }, []);

    return (
        <div>
            <div className="py-6 px-8 flex">
                <div className="w-[75%]">
                    <div className="flex justify-between">
                        <HStack border={"1px solid #D1D5DA"} width={"32%"} borderRadius={"10px"} justifyContent={"center"} cursor={"pointer"} transition={"0.3s ease-in-out"} padding={"1rem 0.5rem"} _hover={{
                            borderColor: "#22c55e"
                        }}>
                            <img src="/images/dashboard/proposals.png" alt="proposals" />
                            <div>
                                <div className="text-sm font-semibold">Find A Job</div>
                                <div className="text-sm text-gray-300">Search & apply to your next job now</div>
                            </div>
                        </HStack>
                        <HStack border={"1px solid #D1D5DA"} width={"32%"} borderRadius={"10px"} justifyContent={"center"} cursor={"pointer"} transition={"0.3s ease-in-out"} padding={"1rem 0.5rem"} _hover={{
                            borderColor: "#22c55e"
                        }}>                            <img src="/images/dashboard/stats.png" alt="proposals" />
                            <div>
                                <div className="text-sm font-semibold">My Stats</div>
                                <div className="text-sm text-gray-300">Check your earnings & time spent working</div>
                            </div>
                        </HStack>
                        <HStack border={"1px solid #D1D5DA"} width={"32%"} borderRadius={"10px"} justifyContent={"center"} cursor={"pointer"} transition={"0.3s ease-in-out"} padding={"1rem 0.5rem"} _hover={{
                            borderColor: "#22c55e"
                        }}>                            <img src="/images/dashboard/jobs.png" alt="proposals" />
                            <div>
                                <div className="text-sm font-semibold">My Jobs</div>
                                <div className="text-sm text-gray-300">View your active jobs & proposals</div>
                            </div>
                        </HStack>
                    </div>
                    <div className="text-xl font-semibold mt-4">Here are jobs for you.</div>
                    <div className="flex gap-6 px-6 mt-4">
                        <div className="text-sm font-medium text-primary border-b-2 border-primary p-2">Most Recent Jobs</div>
                        {/* <div className="text-sm font-medium text-primary border-b-2 border-primary p-2">Best Matches</div> */}
                        {/* <div className="text-sm font-medium text-gray-300 p-2">Most Recent Jobs</div> */}
                    </div>
                    <div className="border border-tertiary rounded-2xl overflow-auto">
                        <JobCard jobs={jobs} />
                    </div>
                    <div className="text-center p-5">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/search-job")}>
                            See More
                        </button>
                    </div>
                </div>
                <div className="w-[25%] pl-6">
                    <div className="h-[296px] border border-tertiary rounded-2xl">
                        <div className="flex flex-col items-center gap-1 pt-6 pb-4 border-b border-tertiary">
                            <img src="/images/user.jpeg" alt="avatar" className="h-[90px] w-[90px] rounded-full border-4 border-tertiary" />
                            <div className="text-2xl font-medium">Sasheen M.</div>
                            <div className="text-sm text-gray-300">Customer Experience Consultant</div>
                            <div className="flex items-center">
                                <div className="star-filled"></div>
                                <div className="star-filled"></div>
                                <div className="star-filled"></div>
                                <div className="star-filled"></div>
                                <div className="star-filled"></div>
                                <div className="text-sm font-medium">5.0 of 4 Reviews</div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="text-sm text-gray-400">Complete your Profile</div>
                            <div className="flex gap-4 items-center mt-3">
                                <div className="w-[80%] h-[5px] bg-green-600 rounded-2xl"></div>
                                <div className="text-xs font-semibold">100%</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 relative">
                        <img className="w-full" src="/images/dashboard/banner.png" alt="banner" />
                        <div className="flex flex-col gap-3 absolute bottom-3 left-3">
                            <div className="text-3xl text-secondary font-bold">Get Discount</div>
                            <div className="text-sm text-secondary">Analyze your performance to improve your success</div>
                            <button className="bg-primary text-secondary rounded h-[36px] w-[90px]">Let's Join</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SearchJobPage = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const getAllJobList = async () => {
        try {
            const response = await getAllJobs();
            setJobs(response);
        } catch (error) {
            console.error("Error fetching job list:", error);
        }
    }

    useEffect(() => {
        getAllJobList();
    }, []);

    return (
        <div className='w-full mx-auto'>
            <div className="py-6 px-8 flex w-full">
                <div className="w-[40%] pr-6">
                    <div className="h-[296px] border border-tertiary rounded-2xl">
                        <div className="flex flex-col items-center gap-1 pt-6 pb-4 border-b border-tertiary">
                            <img src="/images/user.jpeg" alt="avatar" className="h-[90px] w-[90px] rounded-full border-4 border-tertiary" />
                            <div className="text-2xl font-medium">Sasheen M.</div>
                            <div className="text-sm text-gray-300">Customer Experience Consultant</div>
                            <div className="flex items-center">
                                <div className="star-filled"></div>
                                <div className="star-filled"></div>
                                <div className="star-filled"></div>
                                <div className="star-filled"></div>
                                <div className="star-filled"></div>
                                <div className="text-sm font-medium">5.0 of 4 Reviews</div>
                            </div>
                        </div>
                        <div className="p-4">
                            <button className="bg-primary text-secondary rounded h-[36px] w-full">View Your Profile</button>
                        </div>
                    </div>
                    <Filter />
                    <div className="mt-6 relative">
                        <img className="w-full" src="/images/dashboard/banner.png" alt="banner" />
                        <div className="flex flex-col gap-3 absolute bottom-3 left-3">
                            <div className="text-3xl text-secondary font-bold">Get Discount</div>
                            <div className="text-sm text-secondary">Analyze your performance to improve your success</div>
                            <button className="bg-primary text-secondary rounded h-[36px] w-[90px]">Let's Join</button>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <HStack width={"100%"} justifyContent={"space-evenly"} marginBottom={"0.9rem"} borderRadius={"5px"} className='border border-tertiary rounded-2xl'>
                        <Image src='/images/banner_bizzzy.jpg' />
                    </HStack>
                    <div className="text-xl font-semibold mb-4">Search For Your Next Job</div>
                    <HStack width={"100%"} justifyContent={"space-evenly"} marginX={"auto"} marginBottom={"0.9rem"}>
                        <Input placeholder='Search for open positions...' />
                        ,<Box fontWeight={"800"} fontSize={"1.5rem"} border={"1px solid var(--primarycolor)"} padding={"5px 10px"} borderRadius={"5px"} backgroundColor={"var(--primarycolor)"} cursor={"pointer"} color={"white"} transition={"0.3s ease-in-out"} _hover={{
                            backgroundColor: "#fff",
                            color: "#000"
                        }}>
                            <BiSearchAlt />
                        </Box>
                    </HStack>
                    <div className="text-xl font-semibold mb-4">Latest Job Posts</div>
                    <div className="border border-tertiary rounded-2xl overflow-auto w-[100%]">
                        <JobCard jobs={jobs} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export const Filter = () => {
    return <VStack marginTop={"1rem"} alignItems={"start"} padding={"0.5rem"} gap={"5"}>
        <Text fontWeight={"500"} fontSize={"1.5rem"}>Search Filters</Text>

        <VStack alignItems={"flex-start"} w={"full"}>
            <Text fontWeight={"600"}>Category</Text>
            <Select placeholder='Search By Category'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select>
        </VStack>

        <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
            <Text fontWeight={"600"}>Experience Required</Text>
            <VStack padding={"0 0.5rem 0"} alignItems={"flex-start"}>
                <Checkbox >Entry Lavel</Checkbox>
                <Checkbox >Intermediate</Checkbox>
                <Checkbox >Expert</Checkbox>
            </VStack>
        </VStack>

        <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
            <Text fontWeight={"600"}>Contract Type</Text>
            <VStack padding={"0 0.5rem 0"} alignItems={"flex-start"}>
                <Checkbox>Hourly Rate</Checkbox>
                <Checkbox>Fixed Price</Checkbox>
            </VStack>
        </VStack>
    </VStack>
}






