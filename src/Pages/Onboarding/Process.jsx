import React, { useEffect, useState } from "react";
import OnboardingProcess from "../../Layouts/CardLayout/OnboardingProcess";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CiUser } from "react-icons/ci";
import { TbClick, TbReceipt } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";
import CTAButton from "../../Components/CTAButton";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  getAllDetailsOfUser,
  updateFreelancerProfile,
} from "../../helpers/userApis";
import { BsBack, BsBackspaceFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategories, getSkills } from "../../helpers/freelancerApis";

const animatedComponents = makeAnimated();

const Process = () => {
  const [page, setPage] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [userDetails, setUserDetails] = useState([]);
  const [options, setOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);

  const [skillSelectedOptions, setSkillSelectedOptions] = useState([]);
  const role = useSelector((state) => state.auth.role);

  const getUserInformation = async () => {
    try {
      const res = await getAllDetailsOfUser();
      const data = res;
      setUserDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInformation();
    autoProcess();
  }, [page]);

  // const openModal = () => {
  //     setIsModalOpen(true);
  // };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValues, setInputValues] = useState({
    professional_role: "",
    hourly_rate: "",
    description: "",
  });
  const [businessDetails, setBusinessDetails] = useState({
    business_name: "",
    brief_description: "",
  });

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues || []);
  };

  const autoProcess = () => {
    if (
      userDetails?.categories?.length > 0 &&
      userDetails?.skills?.length > 0 &&
      userDetails?.professional_role?.length > 0
    ) {
      navigate("/freelancer");
    }
    if (
      userDetails?.briefDescription?.length > 0 &&
      userDetails?.businessName?.length > 0
    ) {
      navigate("/client");
    }
    if (userDetails?.categories?.length == 0) {
      setPage(2);
    }
    if (userDetails?.professional_role?.length == 0) {
      setPage(3);
    }
    if (userDetails?.skills?.length == 0) {
      setPage(4);
    }
  };
  // changes some
  const handleSaveAndContinue = async (data) => {
    autoProcess();
    try {
      if (role == 1) {
        if (data === "category") {
          if (selectedOptions.length <= 0) {
            toast({
              title: "Atleast Select A Category",
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
          } else {
            const selectedCategories = selectedOptions?.map((option) => ({
              value: option.value,
              _id: option._id,
            }));
            const response = await updateFreelancerProfile({
              categories: selectedCategories,
            });
            console.log(response);
            if (response.code === 405) {
              toast({
                title: response.msg,
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
              setSelectedOptions([]);
              setPage(3);
            } else if (response.code === 200) {
              toast({
                title: "Category Added Successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
              setSelectedOptions([]);
              setPage(3);
            }
          }
        } else if (data === "info") {
          if (inputValues.professional_role.length <= 0) {
            toast({
              title: "Add your professional role",
              status: "warning",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          } else if (inputValues.hourly_rate.length <= 0) {
            toast({
              title: "Add your hourly rate",
              status: "warning",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          } else if (inputValues.description.length <= 0) {
            toast({
              title: "Add your profile overview",
              status: "warning",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          } else {
            const response = await updateFreelancerProfile({
              professional_role: inputValues.professional_role,
              hourly_rate: inputValues.hourly_rate,
              description: inputValues.description,
            });
            if (response.code === 405) {
              toast({
                title: response.msg,
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
              setPage(4);
            } else if (response.code === 200) {
              toast({
                title: "Basic Information Added Successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
              setPage(4);
            }
          }
        } else if (data == "skills") {
          if (selectedOptions.length <= 0) {
            toast({
              title: "Select Minimum Five Skills",
              status: "warning",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          } else {
            const selectedCategories = selectedOptions?.map(
              (option) => option.value
            );
            const response = await updateFreelancerProfile({
              skills: selectedCategories,
            });
            if (response.code == 405) {
              toast({
                title: response.msg,
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
              setSelectedOptions([]);
              navigate("/freelancer");
            } else if (response.code === 200) {
              toast({
                title: "Skils Added Successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
              setSelectedOptions([]);
              navigate("/freelancer");
            }
          }
        }
      } else if (role == 2) {
        if (data === "business_details") {
          if (businessDetails.business_name.length <= 0) {
            toast({
              title: "Add your business name please",
              status: "warning",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          } else if (businessDetails.brief_description.length <= 0) {
            toast({
              title: "Add your business details",
              status: "warning",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          } else {
            const response = await updateFreelancerProfile({
              business_name: businessDetails.business_name,
              brief_description: businessDetails.brief_description,
            });
            if (response.code === 405) {
              toast({
                title: response.msg,
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
            } else if (response.code === 200) {
              toast({
                title: "Your Details Added Successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
              navigate("/client-dashboard");
            }
          }
        }
      } else {
        toast({
          title: "You're Login Expire Kinldy Login Again!",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Category
  const getCategory = async () => {
    const categories = await getCategories();
    setOptions(
      categories?.map((item) => ({
        value: item.category_name,
        label: item.category_name,
        _id: item._id,
      }))
    );
  };
  useEffect(() => {
    getCategory();
  }, []);

  // Handle Skills Options Category Wise
  const getCategorySkills = async (categoryIds) => {
    try {
      const validCategoryIds = categoryIds.filter((category) => category._id);

      const promises = validCategoryIds?.map(async ({ _id }) => {
        try {
          const skills = await getSkills(_id);
          if (skills) {
            return skills.map((item) => ({
              value: item?.skill_name,
              label: item?.skill_name,
              category_id: item?.category_id,
              _id: item?._id,
            }));
          } else {
            return [];
          }
        } catch (error) {
          console.error(`Error fetching skills for category ID ${_id}:`, error);
          return [];
        }
      });

      const results = await Promise.all(promises);
      const newSkillOptions = results.flat();

      setSkillOptions(newSkillOptions);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    if (userDetails.categories?.length > 0 && page === 4) {
      getCategorySkills(userDetails?.categories);
    }
  }, [userDetails, page]);

  return (
    <OnboardingProcess>
      <>
        {(page !== 0 || page != 1) && (
          <Box
            position={"absolute"}
            top={"-0px"}
            left={"50px"}
            cursor={"pointer"}
            display={page == 0 ? "none" || (page == 1 && "none") : "block"}
          >
            <BsBackspaceFill
              color="var(--primarycolor)"
              size={"1.2rem"}
              onClick={() => setPage(page === 0 ? 0 : page - 1)}
            />
          </Box>
        )}

        {(page === 0 || page === 1) && (
          <VStack
            justifyContent="start"
            alignItems="start"
            width="530px"
            gap="10"
            color="var(--primarytext)"
          >
            <Box>
              <Text fontSize="40px" fontWeight="500">
                Hey Jane. Ready for your next big opportunity?
              </Text>
            </Box>
            <HStack>
              <CiUser color="var(--primarycolor)" fontSize="1.4rem" />
              <Text fontWeight="400" fontSize="1.2rem">
                Apply for open roles or list services for clients to buy
              </Text>
            </HStack>
            <HStack>
              <TbClick color="var(--primarycolor)" fontSize="1.4rem" />
              <Text fontWeight="400" fontSize="1.2rem">
                Apply for open roles or list services for clients to buy
              </Text>
            </HStack>
            <HStack>
              <TbReceipt color="var(--primarycolor)" fontSize="1.4rem" />
              <Text fontWeight="400" fontSize="1.2rem">
                Get paid safely and know we’re there to help
              </Text>
            </HStack>
            <Button
              fontWeight="500"
              color="#fff"
              fontSize="1rem"
              bg="var(--primarycolor)"
              height="2.5rem"
              transition={"0.3s ease-in-out"}
              _hover={{
                border: "1px solid var(--primarycolor)",
                backgroundColor: "var(--primarysoftbg)",
                color: "var(--primarytext)",
              }}
              onClick={() => setPage(2)}
            >
              Get Started
            </Button>
          </VStack>
        )}

        {(role == 1 && (
          <>
            {page === 2 && (
              <VStack
                justifyContent="start"
                alignItems="start"
                width="630px"
                gap="10"
                color="var(--primarytext)"
              >
                <Box
                  backgroundColor="var(--primarysoftbg)"
                  color="var(--primarytextcolor)"
                  padding="0rem 0.8rem"
                  borderRadius="5px"
                >
                  Create your Profile
                </Box>
                <Box>
                  <Text fontSize="40px" fontWeight="500">
                    How would you like to tell us about yourself?
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="15px" fontWeight="400">
                    We need to get a sense of your education, experience and
                    categories. It’s quickest to import your information, you
                    can edit it before your profile goes live.
                  </Text>
                </Box>
                <Select
                  placeholder="Select Your Category"
                  className="w-[400px]"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={options}
                  onChange={handleSelectChange}
                  value={selectedOptions}
                />
                <Button
                  fontWeight="500"
                  color="#fff"
                  fontSize="1rem"
                  bg="var(--primarycolor)"
                  height="2.5rem"
                  transition="0.3s ease-in-out"
                  _hover={{
                    border: "1px solid var(--primarycolor)",
                    backgroundColor: "var(--primarysoftbg)",
                    color: "var(--primarytext)",
                  }}
                  onClick={() => handleSaveAndContinue("category")}
                >
                  Save & Continue
                </Button>
              </VStack>
            )}
            {page === 3 && (
              <VStack
                justifyContent="start"
                alignItems="start"
                width="630px"
                gap="30px"
                color="var(--primarytext)"
              >
                <Box
                  backgroundColor="var(--primarysoftbg)"
                  color="var(--primarytextcolor)"
                  padding="0rem 0.8rem"
                  borderRadius="5px"
                >
                  Create your Profile
                </Box>
                <Box>
                  <Text fontSize="40px" fontWeight="500">
                    How would you like to tell us about yourself?
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="15px" fontWeight="400">
                    We need to get a sense of your education, experience and
                    categories. It’s quickest to import your information, you
                    can edit it before your profile goes live.
                  </Text>
                </Box>
                <VStack width={"full"} alignItems={"start"}>
                  <Text mb="0px">{"Your Professional Role"}</Text>
                  <Input
                    variant="outline"
                    required
                    placeholder="Professional Virtual Assistant"
                    width={"100%"}
                    value={inputValues.professional_role}
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        professional_role: e.target.value,
                      })
                    }
                  />
                </VStack>
                <VStack width={"full"} alignItems={"start"}>
                  <Text mb="0px">{"Your Hourly Rate"}</Text>
                  <Input
                    variant="outline"
                    placeholder="$ Your Hourly Rate"
                    width={"100%"}
                    type="number"
                    value={inputValues.hourly_rate}
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        hourly_rate: e.target.value,
                      })
                    }
                  />
                </VStack>

                <VStack width={"full"} alignItems={"start"}>
                  <Text mb="0px">{"Profile Overview"}</Text>
                  <Textarea
                    required
                    variant="outline"
                    placeholder="Write About Yourself"
                    width={"100%"}
                    style={{ resize: "none" }}
                    rows={5}
                    value={inputValues.description}
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        description: e.target.value,
                      })
                    }
                  />
                </VStack>
                <Button
                  fontWeight="500"
                  color="#fff"
                  fontSize="1rem"
                  bg="var(--primarycolor)"
                  height="2.5rem"
                  transition={"0.3s ease-in-out"}
                  _hover={{
                    border: "1px solid var(--primarycolor)",
                    backgroundColor: "var(--primarysoftbg)",
                    color: "var(--primarytext)",
                  }}
                  onClick={() => handleSaveAndContinue("info")}
                >
                  Save & Continue
                </Button>
              </VStack>
            )}
            {page === 4 && (
              <VStack
                justifyContent="start"
                alignItems="start"
                width="630px"
                gap="10"
                color="var(--primarytext)"
              >
                <Box
                  backgroundColor="var(--primarysoftbg)"
                  color="var(--primarytextcolor)"
                  padding="0rem 0.8rem"
                  borderRadius="5px"
                >
                  Create your Profile
                </Box>
                <Box>
                  <Text fontSize="40px" fontWeight="500">
                    How would you like to tell us more about your skills.
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="15px" fontWeight="400">
                    We need to get a sense of your skills, experience and
                    categories. It’s quickest to import your information, you
                    can edit it before your profile goes live.
                  </Text>
                </Box>
                <Select
                  placeholder="Select Your Skills"
                  className="w-[400px]"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={skillOptions}
                  onChange={handleSelectChange}
                  value={selectedOptions}
                />
                <Button
                  fontWeight="500"
                  color="#fff"
                  fontSize="1rem"
                  bg="var(--primarycolor)"
                  height="2.5rem"
                  transition="0.3s ease-in-out"
                  _hover={{
                    border: "1px solid var(--primarycolor)",
                    backgroundColor: "var(--primarysoftbg)",
                    color: "var(--primarytext)",
                  }}
                  onClick={() => handleSaveAndContinue("skills")}
                >
                  Save & Continue
                </Button>
              </VStack>
            )}
          </>
        )) || (
          <>
            {role == 2 && page == 2 && (
              <VStack
                justifyContent="start"
                alignItems="start"
                width="630px"
                gap="30px"
                color="var(--primarytext)"
              >
                <Box
                  backgroundColor="var(--primarysoftbg)"
                  color="var(--primarytextcolor)"
                  padding="0rem 0.8rem"
                  borderRadius="5px"
                >
                  Create your Profile
                </Box>
                <Box>
                  <Text fontSize="40px" fontWeight="500">
                    How would you like to tell us about yourself?
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="15px" fontWeight="400">
                    We need to get a sense of your education, experience and
                    categories. It’s quickest to import your information, you
                    can edit it before your profile goes live.
                  </Text>
                </Box>
                <VStack width={"full"} alignItems={"start"}>
                  <Text mb="0px">{"Write Your Business Name"}</Text>
                  <Input
                    variant="outline"
                    required
                    placeholder="Write Your Business Name"
                    width={"100%"}
                    value={businessDetails?.business_name}
                    onChange={(e) =>
                      setBusinessDetails({
                        ...businessDetails,
                        business_name: e.target.value,
                      })
                    }
                  />
                </VStack>

                <VStack width={"full"} alignItems={"start"}>
                  <Text mb="0px">{"Write Your Business Details"}</Text>
                  <Textarea
                    required
                    variant="outline"
                    placeholder="Write Your Business Details"
                    width={"100%"}
                    style={{ resize: "none" }}
                    rows={5}
                    value={businessDetails?.brief_description}
                    onChange={(e) =>
                      setBusinessDetails({
                        ...businessDetails,
                        brief_description: e.target.value,
                      })
                    }
                  />
                </VStack>
                <Button
                  fontWeight="500"
                  color="#fff"
                  fontSize="1rem"
                  bg="var(--primarycolor)"
                  height="2.5rem"
                  transition={"0.3s ease-in-out"}
                  _hover={{
                    border: "1px solid var(--primarycolor)",
                    backgroundColor: "var(--primarysoftbg)",
                    color: "var(--primarytext)",
                  }}
                  onClick={() => handleSaveAndContinue("business_details")}
                >
                  Save & Continue
                </Button>
              </VStack>
            )}
          </>
        )}
      </>
    </OnboardingProcess>
  );
};

export default Process;
