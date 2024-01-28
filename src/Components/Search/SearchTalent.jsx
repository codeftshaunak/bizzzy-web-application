import {
  Box,
  Checkbox,
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
import { useEffect, useState } from "react";
import {
  getCategories,
  getFreelancers,
  getSkills,
  getSubCategory,
} from "../../helpers/freelancerApis";
import Select from "react-select";

const CategoryOption = [
  { value: "programming", label: "programming" },
  { value: "markating", label: "markating" },
  { value: "Frontend", label: "Frontend" },
  { value: "Angoler", label: "Angoler" },
  { value: "HTML", label: "HTML" },
];



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

  // hourly rate

  // Expriences
  const handleExperienceChange = (experienceLevel) => {
    setSelectedTalents((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(experienceLevel);

      if (isAlreadySelected) {
        return prevSelected.filter((selected) => selected !== experienceLevel);
      } else {
        return [...prevSelected, experienceLevel];
      }
    });
  };
  // category function
  const handleCategoryChange = (value) => {
    setSelectedCategories(value);
  };

  const handleSelectChange = (selectedOptions) => {
    setSkills(selectedOptions);
  };

  // search function
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.searchText.value;
    setSearchText(searchText);
  };

  // calling freelancers API
  useEffect(() => {
    const fetchFreelancers = async () => {
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
    fetchFreelancers();
  }, [skills, searchText, hourlyRateMin, hourlyRateMax, selectedSubCategory]);


  // Calling Category ApI

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const category = await getCategories();
        setCategoryData(category);
      } catch (error) {
        console.error("Error fetching freelancer data:", error);
      } finally {
        setLoading(false);
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

  // handel subcategory
  const handleSubCategoryChange = (value) => {
    setSelectedSubCategory(value)
  };

  console.log(freelancerData, "freelancerData==============}}'")

  console.log(selectedSubCategory, "selectedSubCategory")

  const options = Array.isArray(categorySkills)
    ? categorySkills.map((skill) => ({
      value: skill?.skill_name,
      label: skill?.skill_name,
    }))
    : [];

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

            {categorySkills?.length && (
              <VStack alignItems={"flex-start"} w={"full"}>
                <Text fontWeight={"600"} className="mb-3">
                  Skills
                </Text>
                <Select
                  className="w-full"
                  isMulti
                  options={options}
                  onChange={handleSelectChange}
                  value={skills}
                />
              </VStack>
            )}

            <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
              <Text fontWeight={"600"}>Category</Text>
              <VStack padding={"0 0.5rem 0"} alignItems={"flex-start"} mt={1}>
                <RadioGroup
                  defaultValue="2"
                  onChange={(value) => handleCategoryChange(value)}
                >
                  <Stack spacing={2} direction="column">
                    {categoryData?.map((category) => (
                      <VStack key={category?._id} spacing={2} align="start">
                        <Radio colorScheme="green" value={category?._id}>
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

            {/* <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
              <Text fontWeight={"600"}>Experience</Text>
              <VStack padding={"0 0.5rem 0"} alignItems={"flex-start"}>
                <Checkbox onChange={() => handleExperienceChange("Entry")}>
                  Entry Level
                </Checkbox>
                <Checkbox
                  onChange={() => handleExperienceChange("Intermediate")}
                >
                  Intermediate
                </Checkbox>
                <Checkbox onChange={() => handleExperienceChange("Expert")}>
                  Expert
                </Checkbox>
              </VStack>
            </VStack> */}

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
          {/* <div className="text-xl font-semibold mb-4">Latest Job Posts</div> */}
          <div className=" mt-10 w-[100%]">
            <TalentCard freelancerData={freelancerData} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};
