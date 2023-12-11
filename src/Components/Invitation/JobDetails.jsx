
import { FaHeadSideVirus } from 'react-icons/fa6';
import { BsCalendar2Month } from 'react-icons/bs';
import { Box, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import { IoMdTime } from 'react-icons/io';

export const JobDetailsSection = ({ jobdetails }) => {
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return `Posted ${formattedDate}`;
    };

    return (
        <VStack alignItems="start" width="full" border="1px solid var(--bordersecondary)" padding="2rem 2rem" borderRadius="10px">
            <Text fontSize="2xl" fontWeight="500">Job Details</Text>
            <HStack marginTop="1rem" alignItems="start">
                <VStack alignItems="start">
                    <Text fontSize="1.5rem" fontWeight="500">{jobdetails?.job_details[0]?.title}</Text>
                    <HStack>
                        <Text backgroundColor="var(--bordersecondary)" padding="0.2rem 1rem" borderRadius="15px" fontWeight="300">Scription & Automation</Text>
                        <Text padding="0.2rem 1rem" borderRadius="15px" fontWeight="300">{formatDate(new Date(jobdetails?.job_details[0]?.created_at))}</Text>
                    </HStack>
                    <Text fontSize="0.9rem">{jobdetails?.job_details[0]?.description}</Text>
                    <Text color="var(--primarytextcolor)" fontWeight="600" cursor="pointer" mb="0">View Job Post</Text>
                </VStack>
                <VStack paddingLeft="1rem" borderLeft="1px solid var(--bordersecondary)" marginTop="3rem" marginLeft="1rem" gap="5">
                    <HStack width="180px" alignItems="start">
                        <Text mt="0.5rem"><FaHeadSideVirus /></Text>
                        <div gap="0">
                            <Text mb="0" fontWeight="600">{jobdetails?.job_details[0]?.experience}</Text>
                            <Text mb="0" fontSize="0.8rem">Experience Level</Text>
                        </div>
                    </HStack>
                    {jobdetails?.job_details[0]?.budget == 1 && (
                        <HStack width="180px" alignItems="start">
                            <Text mt="0.5rem"><IoMdTime fontSize="20px" /></Text>
                            <div gap="0">
                                <Text mb="0" fontWeight="600">${jobdetails?.job_details[0]?.amount}</Text>
                                <Text mb="0" fontSize="0.8rem">Fixed Budget</Text>
                            </div>
                        </HStack>
                    )}
                    {jobdetails?.job_details[0]?.budget == 2 && (
                        <HStack width="180px" alignItems="start">
                            <Text mt="0.5rem"><IoMdTime fontSize="20px" /></Text>
                            <div gap="0">
                                <Text mb="0" fontWeight="600">${jobdetails?.job_details[0]?.amount}</Text>
                                <Text mb="0" fontSize="0.8rem">Hourly Range</Text>
                            </div>
                        </HStack>
                    )}
                    <HStack width="180px" alignItems="start">
                        <Text mt="0.5rem"><BsCalendar2Month /></Text>
                        <div gap="0">
                            <Text mb="0" fontWeight="600">6 Months</Text>
                            <Text mb="0" fontSize="0.8rem">Duration</Text>
                        </div>
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    );
};