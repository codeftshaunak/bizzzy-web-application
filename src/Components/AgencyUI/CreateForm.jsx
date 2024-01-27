import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HStack, Box, Input, Textarea, Button, FormControl, FormLabel, Select, useToast } from '@chakra-ui/react';
import { getCategories, getCountries } from '../../helpers/clientApis';
import { getSubCategory } from '../../helpers/freelancerApis';
import { createAgency } from '../../helpers/agencyApis';
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {
    const { handleSubmit, watch, register } = useForm();
    const selectedCategory = watch('agency_services.category');
    const [countries, setCountries] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();

    const getCountriesList = async () => {
        try {
            const response = await getCountries();
            setCountries(response)
        } catch (error) {
            console.log(error);
        }
    }

    const getCategoryList = async () => {
        try {
            const response = await getCategories();
            setCategory(response)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const getSubCategoryList = async (category_id) => {
        console.log({ category_id });
        try {
            const response = await getSubCategory(category_id);
            setSubCategories(response)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCountriesList();
        getCategoryList();
    }, []);

    useEffect(() => {
        getSubCategoryList(selectedCategory)
    }, [selectedCategory])

    const onSubmit = async (data) => {
        try {
            const response = await createAgency(data);
            if (response.isError) {
                toast({
                    title: response.message,
                    status: 'error',
                    duration: 9000,
                    position: 'top',
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Your agency profile created successfully.',
                    status: 'success',
                    duration: 9000,
                    position: 'top',
                    isClosable: true,
                })
                navigate("/agency-profile");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <HStack width={"100%"} margin={"auto"} alignItems={"center"}>
            <Box p={4} width={["90%", "60%"]} margin={"auto"} padding={"20px 40px"} borderRadius={"15px"}>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full shadow p-9 rounded-lg bg-[var(--secondarycolor)]'>
                    <FormControl mb={4}>
                        <FormLabel fontSize={"xl"}>Agency Name</FormLabel>
                        <Input {...register('agency_name')} placeholder='Bizzzy' fontSize={"1.1rem"} required />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel fontSize={"xl"}>Agency Overview</FormLabel>
                        <Textarea {...register('agency_overview')} fontSize={"1.1rem"} placeholder='This is an agency with highly creating value. We provide services to people who need to start there business.' required />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel fontSize={"xl"}>Agency Tagline</FormLabel>
                        <Input {...register('agency_tagline')} fontSize={"1.1rem"} placeholder='We are working for create impact on the world' required />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel fontSize={"xl"}>Agency Location</FormLabel>
                        <Select {...register('agency_location')} fontSize={"1.1rem"} placeholder='Select Your Category' required >
                            {countries?.map((country, index) => (
                                <option key={index} value={country}>
                                    {country.name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel fontSize={"xl"}>Services Category</FormLabel>
                        <Select {...register('agency_services.category')} fontSize={"1.1rem"} placeholder='Select Your Category' required>
                            {category?.map((country, index) => (
                                <option key={index} value={country._id}>
                                    {country?.category_name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    {subCategories.length > 0 && (
                        <FormControl mb={4}>
                            <FormLabel fontSize={"xl"}>Services Sub-Category</FormLabel>
                            <Select {...register('agency_services.subCategory')} placeholder='Select Your Sub-Category' fontSize={"1.1rem"} required>
                                {subCategories?.map((subCategory) => (
                                    <option key={subCategory._id} value={subCategory._id}>
                                        {subCategory.sub_category_name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <Button type="submit" backgroundColor="var(--primarycolor)" color={"white"} borderRadius={"25px"} border={"2px solid white"} transition={"0.5s ease-in-out"} _hover={{
                        border: "2px solid var(--primarycolor)",
                        background: "white",
                        color: "var(--primarycolor)"
                    }}>Continue</Button>
                </form>
            </Box>
        </HStack>
    )
}

export default CreateForm
