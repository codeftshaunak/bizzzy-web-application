import React, { useCallback, useContext, useEffect, useState } from "react";
import { getAllJobs, getJobs } from "../../helpers/jobApis";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Box,
  Checkbox,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import Select from "react-select";
import { BiSearchAlt, BiXCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import UserProfileCard from "./UserCard";
import AgencyUserCard from "./AgencyUserCard";
import { CurrentUserContext } from "../../Contexts/CurrentUser";
import { getCategories } from "../../helpers/freelancerApis";
// import { makeAnimated } from 'react-select/animated';


// const animatedComponents = makeAnimated();

export const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const reverseJob = jobs?.slice().reverse();
  const leatestJob = reverseJob.slice(0, 4);
  const navigate = useNavigate();
  const { hasAgency, activeAgency } = useContext(CurrentUserContext);

  const getAllJobList = async () => {
    try {
      const response = await getAllJobs();
      setJobs(response);
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  };

  useEffect(() => {
    getAllJobList();
  }, []);

  return (
    <div>
      <div className="py-6 px-8 flex">
        <div className="w-[75%]">
          <div className="flex justify-between">
            <HStack
              border={"1px solid #D1D5DA"}
              width={"32%"}
              borderRadius={"10px"}
              justifyContent={"center"}
              cursor={"pointer"}
              transition={"0.3s ease-in-out"}
              padding={"1rem 0.5rem"}
              _hover={{
                borderColor: "#22c55e",
              }}
            >
              <img src="/images/dashboard/proposals.png" alt="proposals" />
              <div>
                <div className="text-sm font-semibold">Find A Job</div>
                <div className="text-sm text-gray-300">
                  Search & apply to your next <br /> job now
                </div>
              </div>
            </HStack>
            <HStack
              border={"1px solid #D1D5DA"}
              width={"32%"}
              borderRadius={"10px"}
              justifyContent={"center"}
              cursor={"pointer"}
              transition={"0.3s ease-in-out"}
              padding={"1rem 0.5rem"}
              _hover={{
                borderColor: "#22c55e",
              }}
            >
              {" "}
              <img src="/images/dashboard/stats.png" alt="proposals" />
              <div
                onClick={() => {
                  navigate("/my-stats");
                }}
              >
                <div className="text-sm font-semibold">My Stats</div>
                <div className="text-sm text-gray-300">
                  Check your earnings & time spent working
                </div>
              </div>
            </HStack>
            <HStack
              border={"1px solid #D1D5DA"}
              width={"32%"}
              borderRadius={"10px"}
              justifyContent={"center"}
              cursor={"pointer"}
              transition={"0.3s ease-in-out"}
              padding={"1rem 0.5rem"}
              _hover={{
                borderColor: "#22c55e",
              }}
            >
              {" "}
              <img src="/images/dashboard/jobs.png" alt="proposals" />
              <div
                onClick={() => {
                  navigate("/my-jobs");
                }}
              >
                <div className="text-sm font-semibold">My Jobs</div>
                <div className="text-sm text-gray-300">
                  View your active jobs & proposals
                </div>
              </div>
            </HStack>
          </div>
          <div className="text-xl font-semibold mt-4 capitalize">
            Here are jobs for you
          </div>
          <div className="flex gap-6 px-6 mt-4">
            <div className="text-sm font-medium text-primary border-b-2 border-primary p-2">
              Most Recent Jobs
            </div>
            {/* <div className="text-sm font-medium text-primary border-b-2 border-primary p-2">Best Matches</div> */}
            {/* <div className="text-sm font-medium text-gray-300 p-2">Most Recent Jobs</div> */}
          </div>
          <div className="border border-tertiary rounded-2xl overflow-auto">
            <JobCard jobs={leatestJob} />
          </div>
          {leatestJob?.length > 0 && (
            <div className="text-center p-5">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => navigate("/search-job")}
              >
                See More
              </button>
            </div>
          )}
        </div>
        <div className="w-[25%] pl-6">
          {hasAgency && activeAgency ? (
            <>
              <AgencyUserCard />
              <br />
              <UserProfileCard />
            </>
          ) : (
            <>
              <UserProfileCard />
              <br />
              <AgencyUserCard />
            </>
          )}
          <div className="mt-6 relative">
            <img
              className="w-full"
              src="/images/dashboard/banner.png"
              alt="banner"
            />
            <div className="flex flex-col gap-3 absolute bottom-3 left-3">
              <div className="text-3xl text-secondary font-bold">
                Earn Hourly
              </div>
              <div className="text-sm text-secondary">
                Download the Bizzzy time tracker app to start working hourly
                contracts.
              </div>
              <button className="bg-primary text-secondary rounded h-[36px] w-[130px]">
                Download Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SearchJobPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(null);
  const [experience, setExperience] = useState([]);
  const [contractType, setContractType] = useState([]);
  const { hasAgency, activeAgency } = useContext(CurrentUserContext);
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState();
  const [showHighlightedSearchTerm, setShowHighlightedSearchTerm] =
    useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const navigate = useNavigate();

  // Handle Category
  const getCategory = async () => {
    const categories = await getCategories();
    setCategoryOptions(
      categories?.map((item) => ({
        value: item._id,
        label: item.category_name,
      }))
    );
  };
  useEffect(() => {
    getCategory();
  }, []);



  //  ====== search job
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      if (category) {
        const jobs = await getJobs(category,null, experience, contractType);
        setJobsData(jobs);
      } else {
        const jobs = await getJobs(null,null, experience, contractType);
        setJobsData(jobs);
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  }, [category, contractType, experience]);
 
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (searchTerm.trim() !== "") {
        const jobs = await getJobs(
          null,
          searchTerm,
          experience,
          contractType
        );
        setJobsData(jobs);
        setShowHighlightedSearchTerm(true);
        navigate(`/search-job?searchTerm=${encodeURIComponent(searchTerm)}`);
      } else {
        setShowHighlightedSearchTerm(false);
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
      // setShowHighlightedSearchTerm(false);
    }
  };

  // const handleCategoryChange = (value) => {
  //   setCategory(value);
  // };


  // const handleExperienceChange = (experienceLevel) => {
  //   setExperience((prev) => {
  //     const updatedExperience = prev.includes(experienceLevel)
  //       ? prev.filter((level) => level !== experienceLevel)
  //       : [...prev, experienceLevel];
  //     return updatedExperience;
  //   });
  // };

  // const handleContractTypeChange = (contractTypeValue) => {
  //   setContractType((prev) => {
  //     const updatedContractType = prev.includes(contractTypeValue)
  //       ? prev.filter((type) => type !== contractTypeValue)
  //       : [...prev, contractTypeValue];
  //     return updatedContractType;
  //   });
  // };

  const handleCategoryChange = (value) => {
    setCategory(value);
    navigateWithFilters();
};

const handleExperienceChange = (experienceLevel) => {
    setExperience((prev) => {
        const updatedExperience = prev.includes(experienceLevel)
            ? prev.filter((level) => level !== experienceLevel)
            : [...prev, experienceLevel];
        return updatedExperience;
    });
    navigateWithFilters();
};

const handleContractTypeChange = (contractTypeValue) => {
    setContractType((prev) => {
        const updatedContractType = prev.includes(contractTypeValue)
            ? prev.filter((type) => type !== contractTypeValue)
            : [...prev, contractTypeValue];
        return updatedContractType;
    });
    navigateWithFilters();
};

const navigateWithFilters = async () => {
    try {
        setLoading(true);

        const params = new URLSearchParams();

        // Append search term to URL parameters
        if (searchTerm.trim() !== "") {
            params.append("searchTerm", searchTerm);
        }

        // Append category to URL parameters
        if (category) {
            params.append("category", category.map((cat) => cat.value).join(","));
        }

        // Append experience to URL parameters
        if (experience.length > 0) {
            params.append("experience", experience.join(","));
        }

        // Append contractType to URL parameters
        if (contractType.length > 0) {
            params.append("contractType", contractType.join(","));
        }

        // Fetch jobs using the updated parameters
        const jobs = await getJobs(
            category,
            searchTerm,
            experience,
            contractType
        );

        // Update state with fetched jobs
        setJobsData(jobs);
        setShowHighlightedSearchTerm(true);

        // Append the search parameters to the URL and navigate
        navigate(`/search-job?${params.toString()}`);
    } catch (error) {
        console.error("Error fetching job data:", error);
    } finally {
        setLoading(false);
    }
};
  

  const clearSearch = () => {
    setSearchTerm("");
    fetchJobs();
    setShowHighlightedSearchTerm(false);
    navigate("/search-job");
  };

  return (
    <div className="w-full mx-auto">
      <div className="py-6 px-8 flex w-full">
        <div className="w-[40%] pr-6">
          {hasAgency && activeAgency ? (
            <>
              <AgencyUserCard />
              <br />
              <UserProfileCard />
            </>
          ) : (
            <>
              <UserProfileCard />
              <br />
              <AgencyUserCard />
            </>
          )}
          <Filter
            handleCategoryChange={handleCategoryChange}
            handleContractTypeChange={handleContractTypeChange}
            handleExperienceChange={handleExperienceChange}
            categoryOptions={categoryOptions}
            setCategory={setCategory}
            setCategoryOptions={setCategoryOptions}
            category={category}
          />
          <div className="mt-6 relative">
            <img
              className="w-full"
              src="/images/dashboard/banner.png"
              alt="banner"
            />
            <div className="flex flex-col gap-3 absolute bottom-3 left-3">
              <div className="text-3xl text-secondary font-bold">
                Earn Hourly
              </div>
              <div className="text-sm text-secondary">
                Download the Bizzzy time tracker app to start working hourly
                contracts.
              </div>
              <button className="bg-primary text-secondary rounded h-[36px] w-[130px]">
                Download Now
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <HStack
            width={"100%"}
            justifyContent={"space-evenly"}
            marginBottom={"0.9rem"}
            borderRadius={"5px"}
            className="border border-tertiary rounded-2xl"
          >
            <Image src="/images/banner_bizzzy.jpg" />
          </HStack>
          <div className="text-xl font-semibold mb-4">
            Search For Your Next Job
          </div>
          <HStack
            width={"100%"}
            justifyContent={"space-evenly"}
            marginX={"auto"}
            marginBottom={"0.9rem"}
            className="relative"
          >
            <Input
              placeholder="Search for open positions..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            {searchTerm && (
              <Box
                as={BiXCircle}
                fontSize={"1.5rem"}
                cursor={"pointer"}
                color={"var(--primarycolor)"}
                transition={"0.3s ease-in-out"}
                onClick={clearSearch}
                className="absolute right-[8%] z-50"
              />
            )}
            <Box
              fontWeight={"800"}
              fontSize={"1.5rem"}
              border={"1px solid var(--primarycolor)"}
              padding={"5px 10px"}
              borderRadius={"5px"}
              backgroundColor={"var(--primarycolor)"}
              cursor={"pointer"}
              color={"white"}
              transition={"0.3s ease-in-out"}
              _hover={{
                backgroundColor: "#fff",
                color: "#000",
              }}
              onClick={handleSearch}
            >
              <BiSearchAlt />
            </Box>
          </HStack>
          <div className="text-xl font-semibold mb-4">Latest Job Posts</div>
          <div className="border border-tertiary rounded-2xl overflow-auto w-[100%]">
            <JobCard
              jobs={jobsData}
              searchTerm={searchTerm}
              showHighlightedSearchTerm={showHighlightedSearchTerm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Filter = ({
  handleContractTypeChange,
  handleExperienceChange,
  handleCategoryChange,
  categoryOptions,
  category,
}) => {


  return (
    <VStack
      marginTop={"1rem"}
      alignItems={"start"}
      padding={"0.5rem"}
      gap={"5"}
    >
      <Text fontWeight={"500"} fontSize={"1.5rem"}>
        Search Filters
      </Text>

      <VStack alignItems={"flex-start"} w={"full"}>
        <Text fontWeight={"600"}>Category</Text>
        <Select
          placeholder="Select Your Category"
          className="w-[400px]"
          isMulti
          closeMenuOnSelect={true}
          options={categoryOptions}
          onChange={handleCategoryChange}
          value={category}
        />
      </VStack>

      <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
        <Text fontWeight={"600"}>Experience Required</Text>
        <VStack padding={"0 0.5rem 0"} alignItems={"flex-start"}>
          <Checkbox onChange={() => handleExperienceChange("Entry")}>
            Entry Level
          </Checkbox>
          <Checkbox onChange={() => handleExperienceChange("Intermediate")}>
            Intermediate
          </Checkbox>
          <Checkbox onChange={() => handleExperienceChange("Expert")}>
            Expert
          </Checkbox>
        </VStack>
      </VStack>

      <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
        <Text fontWeight={"600"}>Contract Type</Text>
        <VStack padding={"0 0.5rem 0"} alignItems={"flex-start"}>
          <Checkbox onChange={() => handleContractTypeChange("hourly")}>
            Hourly Rate
          </Checkbox>
          <Checkbox onChange={() => handleContractTypeChange("fixed")}>
            Fixed Price
          </Checkbox>
        </VStack>
      </VStack>
    </VStack>
  );
};
