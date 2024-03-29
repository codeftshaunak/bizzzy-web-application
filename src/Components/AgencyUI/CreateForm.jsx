import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import {
  HStack,
  Box,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { getCategories, getCountries } from "../../helpers/freelancerApis";
import { getSubCategory } from "../../helpers/freelancerApis";
import { createAgency } from "../../helpers/agencyApis";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../Contexts/CurrentUser";

const CreateForm = () => {
  const { handleSubmit, watch, register } = useForm();
  const { getUserDetails } = useContext(CurrentUserContext);
  const selectedCategory = watch("agency_services.category");
  const [countries, setCountries] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const navigate = useNavigate();
  const toast = useToast();

  const getCountriesList = async () => {
    try {
      const response = await getCountries();
      setCountries(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryList = async () => {
    try {
      const response = await getCategories();
      setCategory(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategoryList = async (category_id) => {
    try {
      const response = await getSubCategory(category_id);
      setSubCategories(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountriesList();
    getCategoryList();
  }, []);

  useEffect(() => {
    getSubCategoryList(selectedCategory);
  }, [selectedCategory]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await createAgency({
        ...data,
        agency_location: JSON.parse(data.agency_location),
      });
      if (response.isError) {
        toast({
          title: response.message,
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: "Your agency profile created successfully.",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        getUserDetails();

        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <HStack width={"100%"} margin={"auto"} alignItems={"center"}>
      <Box
        p={4}
        width={["90%", "60%"]}
        margin={"auto"}
        padding={"20px 40px"}
        borderRadius={"15px"}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full shadow p-9 rounded-lg bg-[var(--secondarycolor)]"
        >
          <FormControl mb={5}>
            <FormLabel fontSize={"xl"}>Agency Name</FormLabel>
            <Input
              {...register("agency_name")}
              placeholder="Bizzzy"
              fontSize={"1.1rem"}
              required
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel fontSize={"xl"}>Agency Overview</FormLabel>
            <Textarea
              {...register("agency_overview")}
              fontSize={"1.1rem"}
              placeholder="This is an agency with highly creating value. We provide services to people who need to start there business."
              required
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel fontSize={"xl"}>Agency Tagline</FormLabel>
            <Input
              {...register("agency_tagline")}
              fontSize={"1.1rem"}
              placeholder="We are working for create impact on the world"
              required
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel fontSize={"xl"}>Agency Location</FormLabel>
            <Select
              {...register("agency_location")}
              fontSize={"1.1rem"}
              placeholder="Select Your Category"
              required
            >
              {countries?.map((country, index) => (
                <option key={index} value={JSON.stringify(country)}>
                  {country.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={5}>
            <FormLabel fontSize={"xl"}>Services Category</FormLabel>
            <Select
              {...register("agency_services.category")}
              fontSize={"1.1rem"}
              placeholder="Select Your Category"
              required
            >
              {category?.map((country, index) => (
                <option key={index} value={country._id}>
                  {country?.category_name}
                </option>
              ))}
            </Select>
          </FormControl>

          {subCategories.length > 0 && (
            <FormControl mb={5}>
              <FormLabel fontSize={"xl"}>Services Sub-Category</FormLabel>
              <Select
                {...register("agency_services.subCategory")}
                placeholder="Select Your Sub-Category"
                fontSize={"1.1rem"}
                required
              >
                {subCategories?.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.sub_category_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
          <Box textAlign={"right"}>
            <Button
              isLoading={loading}
              loadingText="Submitting"
              colorScheme="whatsapp"
              type="submit"
              marginTop={3}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </HStack>
  );
};

export default CreateForm;
