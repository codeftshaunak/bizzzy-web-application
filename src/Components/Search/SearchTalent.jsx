
import React, { useEffect, useState } from 'react'
import { getAllJobs, searchJobs } from '../../helpers/jobApis';
import { useNavigate } from 'react-router-dom'
import { Box, Checkbox, HStack, Image, Input, Select, Text, VStack, Avatar } from '@chakra-ui/react';
import { BiSearchAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux'
import JobCard from '../FindJobUi/JobCard';

export const Talents = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const reverseJob = jobs?.slice().reverse();
    const leatestJob = reverseJob.slice(0, 4)
    const navigate = useNavigate();
    const profile = useSelector((state) => state.profile);
    const { name, profile_image, professional_role, id } = profile.profile || [];
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
                                <div className="text-sm text-gray-300">Search & apply to your next <br /> job now</div>
                            </div>
                        </HStack>
                        <HStack border={"1px solid #D1D5DA"} width={"32%"} borderRadius={"10px"} justifyContent={"center"} cursor={"pointer"} transition={"0.3s ease-in-out"} padding={"1rem 0.5rem"} _hover={{
                            borderColor: "#22c55e"
                        }}>                            <img src="/images/dashboard/stats.png" alt="proposals" />
                            <div onClick={() => {
                                navigate("/my-stats")
                            }}>
                                <div className="text-sm font-semibold">My Stats</div>
                                <div className="text-sm text-gray-300">Check your earnings & time spent working</div>
                            </div>
                        </HStack>
                        <HStack border={"1px solid #D1D5DA"} width={"32%"} borderRadius={"10px"} justifyContent={"center"} cursor={"pointer"} transition={"0.3s ease-in-out"} padding={"1rem 0.5rem"} _hover={{
                            borderColor: "#22c55e"
                        }}>                            <img src="/images/dashboard/jobs.png" alt="proposals" />
                            <div onClick={() => {
                                navigate("/my-jobs")
                            }}>
                                <div className="text-sm font-semibold">My Jobs</div>
                                <div className="text-sm text-gray-300">View your active jobs & proposals</div>
                            </div>
                        </HStack>
                    </div>
                    <div className="text-xl font-semibold mt-4 capitalize">Here are jobs for you</div>
                    <div className="flex gap-6 px-6 mt-4">
                        <div className="text-sm font-medium text-primary border-b-2 border-primary p-2">Most Recent Jobs</div>
                        {/* <div className="text-sm font-medium text-primary border-b-2 border-primary p-2">Best Matches</div> */}
                        {/* <div className="text-sm font-medium text-gray-300 p-2">Most Recent Jobs</div> */}
                    </div>
                    <div className="border border-tertiary rounded-2xl overflow-auto">
                        <JobCard jobs={leatestJob} />
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
                            {profile_image == null ? (
                                <Avatar name={name} />
                            ) : (
                                <img
                                    src={profile_image}
                                    alt="avatar"
                                    className="h-[90px] w-[90px] rounded-full border-4 border-tertiary"
                                />
                            )}
                            <div className="text-2xl font-medium cursor-pointer" onClick={() => navigate(`/freelancer`)}>{name}</div>
                            <div className="text-sm text-gray-300">{professional_role}</div>
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
                            <div className="text-3xl text-secondary font-bold">Earn Hourly</div>
                            <div className="text-sm text-secondary">Download the Bizzzy time tracker app to start working hourly contracts.</div>
                            <button className="bg-primary text-secondary rounded h-[36px] w-[130px]">Download Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SearchTalents = () => {
    const [jobs, setJobs] = useState([]);
    const leatestJob = jobs?.slice().reverse();
    const [allJobs, setAllJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [experience, setExperience] = useState([]);
    const [contractType, setContractType] = useState([]);
    const navigate = useNavigate();
    const profile = useSelector((state) => state.profile);
    const { name, profile_image, professional_role, id } = profile.profile || [];


    const handleSearch = () => {
        const lowerCaseSearchTerm = searchTerm?.toLowerCase();
        const filteredJobs = jobs?.filter(job => {
            const titleMatch = job?.title?.toLowerCase()?.includes(lowerCaseSearchTerm);
            const tagsMatch = job?.tags?.some(tag => tag?.toLowerCase()?.includes(lowerCaseSearchTerm));
            const skillsMatch = job?.skills?.some(skill => skill?.toLowerCase()?.includes(lowerCaseSearchTerm));

            return titleMatch || tagsMatch || skillsMatch;
        });

        setJobs(filteredJobs);

    };

    const getAllJobList = async () => {
        try {
            const fetchedJobs = await getAllJobs();
            setAllJobs(fetchedJobs);
            setJobs(fetchedJobs);
        } catch (error) {
            console.error("Error fetching job list:", error);
        }
    };

    useEffect(() => {
        getAllJobList();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let filteredJobs = allJobs;

            if (searchTerm) {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                filteredJobs = filteredJobs.filter(job => {
                    const titleMatch = job?.title?.toLowerCase()?.includes(lowerCaseSearchTerm);
                    const tagsMatch = job?.tags?.some(tag => tag?.toLowerCase()?.includes(lowerCaseSearchTerm));
                    const skillsMatch = job?.skills?.some(skill => skill?.toLowerCase()?.includes(lowerCaseSearchTerm));
                    return titleMatch || tagsMatch || skillsMatch;
                });
            }

            if (category) {
                filteredJobs = filteredJobs.filter(job => job.category === category);
            }

            if (experience.length > 0) {
                filteredJobs = filteredJobs.filter(job => experience.includes(job?.experience));
            }

            if (contractType.length > 0) {
                filteredJobs = filteredJobs.filter(job => contractType.includes(job?.job_type));
            }

            setJobs(filteredJobs);
        };

        applyFilters();
    }, [searchTerm, category, experience, contractType, allJobs]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleExperienceChange = (experienceLevel) => {
        setExperience(prev => {
            const updatedExperience = prev.includes(experienceLevel)
                ? prev.filter(level => level !== experienceLevel)
                : [...prev, experienceLevel];
            return updatedExperience;
        });
    };

    const handleContractTypeChange = (contractTypeValue) => {
        setContractType(prev => {
            const updatedContractType = prev.includes(contractTypeValue)
                ? prev.filter(type => type !== contractTypeValue)
                : [...prev, contractTypeValue];
            return updatedContractType;
        });
    };



    return (
        <div className='w-full mx-auto'>
            <div className="py-6 px-8 flex w-full">
                <div className="w-[40%] pr-6">
                    <div className="h-[296px] border border-tertiary rounded-2xl">
                        <div className="flex flex-col items-center gap-1 pt-6 pb-4 border-b border-tertiary">
                            {profile_image == null ? (
                                <Avatar name={name} />
                            ) : (
                                <img
                                    src={profile_image}
                                    alt="avatar"
                                    className="h-[90px] w-[90px] rounded-full border-4 border-tertiary"
                                />
                            )}
                            <div className="text-2xl font-medium cursor-pointer" onClick={() => navigate("/freelancer")}>{name}</div>
                            <div className="text-sm text-gray-300">{professional_role}</div>
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
                            <button className="bg-primary text-secondary rounded h-[36px] w-full" onClick={() => navigate("/freelancer")}>View Your Profile</button>
                        </div>
                    </div>
                    <Filter
                        handleCategoryChange={handleCategoryChange}
                        handleContractTypeChange={handleContractTypeChange}
                        handleExperienceChange={handleExperienceChange}
                    />
                    <div className="mt-6 relative">
                        <img className="w-full" src="/images/dashboard/banner.png" alt="banner" />
                        <div className="flex flex-col gap-3 absolute bottom-3 left-3">
                            <div className="text-3xl text-secondary font-bold">Earn Hourly</div>
                            <div className="text-sm text-secondary">Download the Bizzzy time tracker app to start working hourly contracts.</div>
                            <button className="bg-primary text-secondary rounded h-[36px] w-[130px]">Download Now</button>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <HStack width={"100%"} justifyContent={"space-evenly"} marginBottom={"0.9rem"} borderRadius={"5px"} className='border border-tertiary rounded-2xl'>
                        <Image src='/images/banner_bizzzy.jpg' />
                    </HStack>
                    <div className="text-xl font-semibold mb-4">Search For Your Next Job</div>
                    <HStack width={"100%"} justifyContent={"space-evenly"} marginX={"auto"} marginBottom={"0.9rem"}>
                        <Input
                            placeholder='Search for open positions...'
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                        <Box fontWeight={"800"} fontSize={"1.5rem"} border={"1px solid var(--primarycolor)"} padding={"5px 10px"} borderRadius={"5px"} backgroundColor={"var(--primarycolor)"} cursor={"pointer"} color={"white"} transition={"0.3s ease-in-out"} _hover={{
                            backgroundColor: "#fff",
                            color: "#000"
                        }}
                            onClick={handleSearch}
                        >
                            <BiSearchAlt />
                        </Box>
                    </HStack>
                    <div className="text-xl font-semibold mb-4">Latest Job Posts</div>
                    <div className="border border-tertiary rounded-2xl overflow-auto w-[100%]">
                        <JobCard jobs={leatestJob} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export const Filter = ({ handleContractTypeChange, handleExperienceChange, handleCategoryChange }) => {
    return (
        <VStack marginTop={"1rem"} alignItems={"start"} padding={"0.5rem"} gap={"5"}>
            <Text fontWeight={"500"} fontSize={"1.5rem"}>Search Filters</Text>

            <VStack alignItems={"flex-start"} w={"full"}>
                <Text fontWeight={"600"}>Category</Text>
                <Select placeholder='Search By Category' onChange={handleCategoryChange}>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
            </VStack>

            <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
                <Text fontWeight={"600"}>Experience Required</Text>
                <VStack padding={"0 0.5rem 0"} alignItems={"flex-start"}>
                    <Checkbox onChange={() => handleExperienceChange('Entry')}>Entry Level</Checkbox>
                    <Checkbox onChange={() => handleExperienceChange('Intermediate')}>Intermediate</Checkbox>
                    <Checkbox onChange={() => handleExperienceChange('Expert')}>Expert</Checkbox>
                </VStack>
            </VStack>

            <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
                <Text fontWeight={"600"}>Contract Type</Text>
                <VStack padding={"0 0.5rem 0"} alignItems={"flex-start"}>
                    <Checkbox onChange={() => handleContractTypeChange('hourly')}>Hourly Rate</Checkbox>
                    <Checkbox onChange={() => handleContractTypeChange('fixed')}>Fixed Price</Checkbox>
                </VStack>
            </VStack>
        </VStack>
    );
};
