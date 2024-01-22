import React, { useEffect, useState } from 'react';
import { VStack, Box, Text, HStack } from '@chakra-ui/react';
import AgencyTitle from './AgencyTitle';
import { getCategories, getSubCategory } from '../../helpers/freelancerApis';
import { RiDeleteBin6Fill, RiEdit2Fill } from 'react-icons/ri';

const AgencyServices = ({ services }) => {
    const { category, subCategory } = services || [];
    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);

    const getCategory = async () => {
        try {
            const resp = await getCategories();
            setCategoryList(resp);
        } catch (error) {
            console.log(error);
        }
    }

    const getSubCategoryList = async () => {
        try {
            const resp = await getSubCategory(category);
            setSubCategoryList(resp)
        } catch (error) {
            console.log(error);
        }
    }

    const selectedCategory = categoryList.filter((item) => item._id === category);
    const selectedSubCategory = subCategoryList.filter((item) => item._id === subCategory);

    useEffect(() => {
        getCategory();
        getSubCategoryList();
    }, [])

    return (
        <VStack alignItems={"flex-start"} gap={"5"} width={"95%"}>
            <AgencyTitle isValue={false}>Services</AgencyTitle>
            {
                selectedCategory && <HStack className="border p-4 rounded-md" width={"100%"} justifyContent={"space-between"}>
                    <Text marginBottom={"0"} fontSize={"1.2rem"}>{selectedCategory[0].category_name} / {selectedSubCategory[0].sub_category_name}</Text>
                    <HStack>
                        <VStack backgroundColor={"white"} borderRadius={"50%"} width={"30px"} border={"1px solid var(--primarycolor)"} height={"30px"} alignItems={"center"} justifyContent={"center"} transition={"0.6s ease-in-out"} cursor={"pointer"} _hover={{
                            border: "2px solid var(--primarycolor)",
                            backgroundColor: "transparent",
                            color: "var(--primarycolor)"
                        }}>
                            <RiEdit2Fill fontSize={"15px"} />
                        </VStack>
                        <VStack backgroundColor={"white"} borderRadius={"50%"} width={"30px"} border={"1px solid var(--primarycolor)"} height={"30px"} alignItems={"center"} justifyContent={"center"} transition={"0.6s ease-in-out"} cursor={"pointer"} _hover={{
                            border: "2px solid var(--primarycolor)",
                            backgroundColor: "transparent",
                            color: "var(--primarycolor)"
                        }}>
                            <RiDeleteBin6Fill fontSize={"15px"} />
                        </VStack>
                    </HStack>
                </HStack>

            }

            <AgencyTitle isValue={false}>Skills</AgencyTitle>
        </VStack>
    )
}

export default AgencyServices
