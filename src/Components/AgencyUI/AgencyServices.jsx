import React, { useEffect, useState } from "react";
import { VStack, Text, HStack } from "@chakra-ui/react";
import AgencyTitle from "./AgencyTitle";
import { getCategories, getSubCategory } from "../../helpers/freelancerApis";
import { RiDeleteBin6Fill, RiEdit2Fill } from "react-icons/ri";

const AgencyServices = ({ agency_services }) => {
  const { category, subCategory } = agency_services || {};
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  console.log({ categoryList, subCategoryList });
  const getCategory = async () => {
    try {
      const resp = await getCategories();
      setCategoryList(resp);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getSubCategoryList = async () => {
    try {
      if (category) {
        const resp = await getSubCategory(category);
        setSubCategoryList(resp);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const selectedCategory =
    categoryList?.find((item) => item._id === category) || {};
  const selectedSubCategory =
    subCategoryList?.find((item) => item._id === subCategory) || {};
  console.log({ selectedCategory, selectedSubCategory });

  useEffect(() => {
    getCategory();
  }, [agency_services]);

  useEffect(() => {
    getSubCategoryList();
  }, [category]);

  return (
    <>
      {" "}
      <VStack alignItems="flex-start" gap={5} width="95%">
        <AgencyTitle isValue={false}>Services</AgencyTitle>
        {selectedCategory && (
          <HStack
            className="border p-4 rounded-md"
            width="100%"
            justifyContent="space-between"
          >
            <Text marginBottom="0" fontSize="1.2rem">
              {selectedCategory.category_name} /{" "}
              {selectedSubCategory.sub_category_name}
            </Text>
            <HStack>
              <VStack
                backgroundColor="white"
                borderRadius="50%"
                width="30px"
                border="1px solid var(--primarycolor)"
                height="30px"
                alignItems="center"
                justifyContent="center"
                transition="0.6s ease-in-out"
                cursor="pointer"
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
              >
                <RiEdit2Fill fontSize="15px" />
              </VStack>
              <VStack
                backgroundColor="white"
                borderRadius="50%"
                width="30px"
                border="1px solid var(--primarycolor)"
                height="30px"
                alignItems="center"
                justifyContent="center"
                transition="0.6s ease-in-out"
                cursor="pointer"
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
              >
                <RiDeleteBin6Fill fontSize="15px" />
              </VStack>
            </HStack>
          </HStack>
        )}

        <AgencyTitle isValue={false}>Skills</AgencyTitle>
      </VStack>
      {/* Updated Information */}
    </>
  );
};

export default AgencyServices;
