import { useCallback, useContext, useEffect, useState } from "react";
import { getAllJobs, getJobs } from "../../helpers/jobApis";
import JobCard from "./JobCard";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Checkbox,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import Select from "react-select";
import { BiSearchAlt, BiXCircle } from "react-icons/bi";
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
  const { hasAgency, activeAgency, profile } = useContext(CurrentUserContext);
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState();
  const [showHighlightedSearchTerm, setShowHighlightedSearchTerm] =
    useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [hourlyRateMin, setHourlyRateMin] = useState(null);
  const [hourlyRateMax, setHourlyRateMax] = useState(null);

  const [hourlyRateShow, setHourlyRateShow] = useState(false);
  const [fixedRateShow, setFixedRateShow] = useState(false);
  const [sQueryValue, setSQueryValue] = useState(null);
  const [fixedRateMin, setFixedRateMin] = useState(null);
  const [fixRateMax, setFixRateMax] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(profile, "profile===")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchWithSQuery = async (sQuery) => {
    try {
      setLoading(true);

      const jobs = await getJobs(
        null,
        sQuery,
        experience,
        contractType,
        hourlyRateMin,
        hourlyRateMax,
        fixedRateMin,
        fixRateMax
      );

      setJobsData(jobs);
      setShowHighlightedSearchTerm(true);
      setSearchTerm(sQuery);
      navigate(`/search-job?searchTerm=${encodeURIComponent(sQuery)}`);
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const squery = searchParams.get("squery");

    setSQueryValue(squery);
    console.log(squery);

    // If sQueryValue is not null, call handleSearch with sQueryValue
    if (squery !== null) {
      handleSearchWithSQuery(squery);
    }
  }, [handleSearchWithSQuery, location.search]);

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
        const jobs = await getJobs(
          category,
          sQueryValue,
          experience,
          contractType,
          hourlyRateMin,
          hourlyRateMax,
          fixedRateMin,
          fixRateMax
        );
        setJobsData(jobs);
      } else {
        const jobs = await getJobs(
          null,
          sQueryValue,
          experience,
          contractType,
          hourlyRateMin,
          hourlyRateMax,
          fixedRateMin,
          fixRateMax
        );
        setJobsData(jobs);
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  }, [
    category,
    contractType,
    experience,
    fixRateMax,
    fixedRateMin,
    hourlyRateMax,
    hourlyRateMin,
    sQueryValue,
  ]);

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
          contractType,
          hourlyRateMin,
          hourlyRateMax,
          fixedRateMin,
          fixRateMax
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

  const handleHourlyRateChange = (value) => {
    // Handle hourly rate changes
    switch (value) {
      case "1":
        // Any hourly rate
        setHourlyRateMin(null);
        setHourlyRateMax(null);
        break;
      case "2":
        // $10 - 30
        setHourlyRateMin(10);
        setHourlyRateMax(30);
        break;
      case "3":
        // $30 - 50
        setHourlyRateMin(30);
        setHourlyRateMax(50);
        break;
      case "4":
        // $50 - 100
        setHourlyRateMin(50);
        setHourlyRateMax(100);
        break;
      case "5":
        // $100 & above
        setHourlyRateMin(100);
        setHourlyRateMax(null);
        break;
      default:
        break;
    }
  };

  const handleFixedRateChange = (value) => {
    // Handle hourly rate changes
    switch (value) {
      case "1":
        setFixedRateMin(null);
        setFixRateMax(null);
        break;
      case "2":
        setFixedRateMin(100);
        setFixRateMax(300);
        break;
      case "3":
        setFixedRateMin(300);
        setFixRateMax(500);
        break;
      case "4":
        setFixedRateMin(500);
        setFixRateMax(1000);
        break;
      case "5":
        setFixedRateMin(1000);
        setFixRateMax(null);
        break;
      default:
        break;
    }
  };

  // const handleContractTypeChange = (contractTypeValue) => {
  //   setHourlyRateShow(true);
  //   setContractType((prev) => {
  //     const updatedContractType = prev.includes(contractTypeValue)
  //       ? prev.filter((type) => type !== contractTypeValue)
  //       : [...prev, contractTypeValue];
  //     return updatedContractType;
  //   });
  //   navigateWithFilters();
  // };

  const handleContractTypeChange = (contractTypeValue) => {
    if (contractTypeValue === "fixed") {
      setFixedRateShow((prev) => !prev);
      setHourlyRateShow(false);
    } else if (contractTypeValue === "hourly") {
      setHourlyRateShow((prev) => !prev);
      setFixedRateShow(false);
    }

    setContractType((prev) => {
      const updatedContractType = prev.includes(contractTypeValue)
        ? prev.filter((type) => type !== contractTypeValue)
        : [...prev, contractTypeValue];
      return updatedContractType;
    });

    navigateWithFilters();
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
          {!profile.agency.isError && (
            <div>
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
            </div>
          )}

          <Filter
            handleCategoryChange={handleCategoryChange}
            handleContractTypeChange={handleContractTypeChange}
            handleExperienceChange={handleExperienceChange}
            categoryOptions={categoryOptions}
            setCategory={setCategory}
            setCategoryOptions={setCategoryOptions}
            category={category}
            handleHourlyRateChange={handleHourlyRateChange}
            handleFixedRateChange={handleFixedRateChange}
            hourlyRateShow={hourlyRateShow}
            fixedRateShow={fixedRateShow}
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
              // onChange={(e) => setSearchTerm(e.target.value)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowHighlightedSearchTerm(false); // or false, depending on your logic
              }}
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
  handleHourlyRateChange,
  handleFixedRateChange,
  hourlyRateShow,
  fixedRateShow,
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
          {hourlyRateShow && (
            <VStack
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              w={"full"}
            >
              <RadioGroup
                padding={"0 0.5rem 0"}
                defaultValue="1"
                mt={1}
                onChange={(value) => handleHourlyRateChange(value)}
              >
                <Stack spacing={4} direction="column">
                  <Radio colorScheme="green" value="1">
                    Any hourly rate
                  </Radio>
                  <Radio colorScheme="green" value="2">
                    $10 - 30$
                  </Radio>
                  <Radio colorScheme="green" value="3">
                    $30 - 50$
                  </Radio>
                  <Radio colorScheme="green" value="4">
                    $50 - 100$
                  </Radio>
                  <Radio colorScheme="green" value="5">
                    $100 & above
                  </Radio>
                </Stack>
              </RadioGroup>
            </VStack>
          )}

          <Checkbox onChange={() => handleContractTypeChange("fixed")}>
            Fixed Price
          </Checkbox>
          {fixedRateShow && (
            <VStack
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              w={"full"}
            >
              <RadioGroup
                padding={"0 0.5rem 0"}
                defaultValue="1"
                mt={1}
                onChange={(value) => handleFixedRateChange(value)}
              >
                <Stack spacing={4} direction="column">
                  <Radio colorScheme="green" value="1">
                    Any rate
                  </Radio>
                  <Radio colorScheme="green" value="2">
                    $100 - 300$
                  </Radio>
                  <Radio colorScheme="green" value="3">
                    $300 - 500$
                  </Radio>
                  <Radio colorScheme="green" value="4">
                    $500 - 1000$
                  </Radio>
                  <Radio colorScheme="green" value="5">
                    $1000 & above
                  </Radio>
                </Stack>
              </RadioGroup>
            </VStack>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
};
