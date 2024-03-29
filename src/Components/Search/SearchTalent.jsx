/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  HStack,
  Input,
  Text,
  VStack,
  Avatar,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import TalentCard from "./TalentCard";
import { useCallback, useEffect, useState } from "react";
import {
  getCategories,
  getFreelancers,
  getSkills,
  getSubCategory,
} from "../../helpers/freelancerApis";
import Select from "react-select";
import { useLocation } from "react-router-dom";


export const Talents = () => {
  const profile = useSelector((state) => state.profile);
  const { name, profile_image, professional_role } = profile.profile || [];
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
              <div>
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
              <div>
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
          {/* <div className="border border-tertiary rounded-2xl overflow-auto">
            <JobCard jobs={leatestJob} />
          </div> */}
          <div className="text-center p-5">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">
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
              <div className="text-2xl font-medium cursor-pointer">{name}</div>
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

export const SearchTalents = () => {
  const [selectedTalents, setSelectedTalents] = useState([]);
  const [skills, setSkills] = useState([]);
  const [freelancerData, setFreelancerData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [hourlyRateMin, setHourlyRateMin] = useState(null);
  const [hourlyRateMax, setHourlyRateMax] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [categorySkills, setCategorySkills] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const location = useLocation()

  const handleSearchWithText = async (searchText) => {
    try {
      setLoading(true);

      const freelancers = await getFreelancers(
        skills,
        searchText,
        hourlyRateMin,
        hourlyRateMax,
        selectedSubCategory
      );

      setFreelancerData(freelancers);
    } catch (error) {
      console.error("Error fetching freelancer data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const squery = searchParams.get('squery');

    setSearchText(squery);

    if (squery !== null) {
      handleSearchWithText(squery);
    }
  }, [location.search]);



  // search function
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.searchText.value;
    setSearchText(searchText);
  };

  // Define fetchFreelancers function
  const fetchFreelancers = useCallback(async () => {
    try {
      setLoading(true);
      // Check if a subcategory is selected
      if (selectedSubCategory) {
        const freelancers = await getFreelancers(
          skills,
          searchText,
          hourlyRateMin,
          hourlyRateMax,
          selectedSubCategory
        );
        setFreelancerData(freelancers);
      } else {
        // If no subcategory is selected, fetch all freelancers
        const freelancers = await getFreelancers(
          skills,
          searchText,
          hourlyRateMin,
          hourlyRateMax,
          selectedCategories
        );
        setFreelancerData(freelancers);
      }
    } catch (error) {
      console.error("Error fetching freelancer data:", error);
    } finally {
      setLoading(false);
    }
  }, [
    skills,
    searchText,
    hourlyRateMin,
    hourlyRateMax,
    selectedCategories,
    selectedSubCategory,
  ]);

  useEffect(() => {
    fetchFreelancers();
  }, [fetchFreelancers]);

  // Calling Category ApI

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await getCategories();
        setCategoryData(category);
      } catch (error) {
        console.error("Error fetching freelancer data:", error);
      }
    };
    fetchCategory();
  }, []);

  // ===== get subcategory
  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        setLoading(true);
        const subCategory = await getSubCategory(selectedCategories);
        setSubCategory(subCategory);
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubCategory();
  }, [selectedCategories]);

  // calling skills API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const categorySkills = await getSkills(selectedCategories);
        setCategorySkills(categorySkills);
      } catch (error) {
        console.error("Error fetching freelancer data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [selectedCategories]);

  const handleHourlyRateChange = (value) => {
    switch (value) {
      case "1":
        setHourlyRateMin(null);
        setHourlyRateMax(null);
        break;
      case "2":
        setHourlyRateMin(10);
        setHourlyRateMax(30);
        break;
      case "3":
        setHourlyRateMin(30);
        setHourlyRateMax(50);
        break;
      case "4":
        setHourlyRateMin(50);
        setHourlyRateMax(100);
        break;
      case "5":
        setHourlyRateMin(100);
        setHourlyRateMax(null);
        break;
      default:
        break;
    }
  };

  // category function
  const handleCategoryChange = (value) => {
    if (selectedCategories !== value) {
      setSelectedCategories(value);
      fetchFreelancers(value, null);
      setSelectedSubCategory(null);
    }
  };

  // handel subcategory
  const handleSubCategoryChange = (value) => {
    setSelectedSubCategory(value);
  };

  return (
    <div className="w-full mx-auto">
      <div className="py-6 px-8 flex  w-full">
        <div className="w-[40%] pr-6">
          {/* filtering items */}
          <VStack
            marginTop={"1rem"}
            alignItems={"start"}
            padding={"0.5rem"}
            gap={"5"}
          >
            <Text fontWeight={"500"} fontSize={"1.5rem"}>
              Search Your Talents
            </Text>
            <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
              <Text fontWeight={"600"}>Category</Text>
              <VStack padding={"0 0.5rem 0"} alignItems={"flex-start"} mt={1}>
                <RadioGroup defaultValue="2">
                  <Stack spacing={2} direction="column">
                    {categoryData?.map((category) => (
                      <VStack key={category?._id} spacing={2} align="start">
                        <Radio
                          colorScheme="green"
                          value={category?._id}
                          isChecked={selectedCategories === category?._id}
                          onChange={() => handleCategoryChange(category?._id)}
                        >
                          {category?.category_name}
                        </Radio>
                        {selectedCategories === category?._id &&
                          subCategory.length > 0 && (
                            <VStack
                              spacing={2}
                              paddingLeft={5}
                              direction="column"
                              width={300}
                            >
                              <Select
                                className="w-full"
                                isMulti
                                options={subCategory.map((sub) => ({
                                  value: sub._id,
                                  label: sub.sub_category_name,
                                }))}
                                onChange={(selectedOptions) =>
                                  handleSubCategoryChange(selectedOptions)
                                }
                              />
                            </VStack>
                          )}
                      </VStack>
                    ))}
                  </Stack>
                </RadioGroup>
              </VStack>
            </VStack>

            <VStack
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              w={"full"}
            >
              <Text fontWeight={"600"}>Hourly Rate</Text>
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
          </VStack>
        </div>
        <div className="w-full mt-8">
          <div className="text-xl font-semibold mb-4">
            Search For Your Talents
          </div>
          <form onSubmit={handleSearch}>
            <HStack
              width={"100%"}
              justifyContent={"space-evenly"}
              marginX={"auto"}
              marginBottom={"0.9rem"}
            >
              <Input
                name="searchText"
                placeholder="Search for open positions..."
              />
              <button type="submit">
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
                >
                  <BiSearchAlt />
                </Box>
              </button>
            </HStack>
          </form>
          <div className=" mt-10 w-[100%]">
            <TalentCard freelancerData={freelancerData} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};
