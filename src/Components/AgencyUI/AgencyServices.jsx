import { useEffect, useState } from "react";
import { VStack, Text, HStack } from "@chakra-ui/react";
import AgencyTitle from "./AgencyTitle";
import { getCategories, getSubCategory } from "../../helpers/freelancerApis";
import { RiDeleteBin6Fill, RiEdit2Fill } from "react-icons/ri";
import { AgencyUpdatedModal } from "./ProfileUpdated";

const AgencyServices = ({ agency, setAgency }) => {
  const { agency_services, agency_skills } = agency || {};
  const { category, subCategory } = agency_services || {};
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [isModal, setIsModal] = useState(false);

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

  useEffect(() => {
    getCategory();
  }, [agency_services]);

  useEffect(() => {
    getSubCategoryList();
  }, [category]);

  const handleUpdateService = () => {
    setIsModal(true);
  };
  return (
    <>
      {" "}
      <VStack alignItems="flex-start" gap={5} width="95%">
        <AgencyTitle
          data={agency_services}
          setAgency={setAgency}
          isValue={!!agency_services}
        >
          Services
        </AgencyTitle>
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
                onClick={handleUpdateService}
              >
                <RiEdit2Fill fontSize="15px" />
              </VStack>
            </HStack>
          </HStack>
        )}

        <AgencyTitle
          isValue={!!agency_skills}
          data={agency_services}
          setAgency={setAgency}
        >
          Skills
        </AgencyTitle>
        <div className="flex gap-2">
          {agency_skills?.map((item) => (
            <span
              key={item}
              className="px-2 h-fit bg-gray-50 border rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      </VStack>
      {/* Updated Information */}
      {isModal && (
        <AgencyUpdatedModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={"Sub Category"}
          setAgency={setAgency}
          data={subCategoryList}
        />
      )}
    </>
  );
};

export default AgencyServices;
