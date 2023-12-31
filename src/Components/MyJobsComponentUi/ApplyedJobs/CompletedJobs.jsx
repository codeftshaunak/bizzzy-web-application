import {
    Table,
    TableContainer,
    Tbody,
    Th,
    Tr,
    VStack,
    Text,
    Button,
    Flex,
    Box,
    Image
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const CompletedJobs = ({ completedJobs }) => {
    const navigate = useNavigate();
    return (
        <div className="my-3 space-y-4">
            <h2 className="my-3 text-2xl font-medium">Completed Jobs</h2>
            {completedJobs?.length > 0 ? (
                <div className="m-auto w-[100%] border p-5 shadow-md rounded-lg">
                    <VStack>
                        {completedJobs?.map((item, index) => (
                            <VStack key={index} className="border p-4 m-2 rounded h-[200px] w-[280px] my-auto mx-auto relative shadow-lg">
                                <Image src="./images/complete_job.png" width="50px" height="50px" />
                                <Box textAlign="center" my={2} width="100%">
                                    <Text width="100%" fontSize="1rem">
                                        {item.title}
                                    </Text>
                                    <VStack justifyContent="space-around" width="200px" margin="auto" gap="1px">
                                        <Text fontSize="1rem" color="gray.700" fontWeight="600">
                                            Budget: ${item?.amount}
                                        </Text>
                                    </VStack>
                                </Box>
                                <Box position="absolute" fontWeight="600" backgroundColor="var(--primarycolor)" padding="1px 8px" color="white" top="10px" borderRadius="5px" right="10px">
                                    <Text>{item.experience}</Text>
                                </Box>
                            </VStack>
                        ))}
                    </VStack>
                </div>
            ) : (
                <VStack alignItems="center" justifyContent="center" border="0.1px solid var(--bordersecondary)" className="shadow-md" height="10rem">
                    <Text fontSize="1.2rem" textTransform="capitalize" fontWeight="600">
                        You haven't any completed job
                    </Text>
                    <Button
                        borderRadius="25px"
                        fontWeight="500"
                        backgroundColor="var(--primarycolor)"
                        color="white"
                        _hover={{
                            border: "1px solid var(--primarycolor)",
                            backgroundColor: "white",
                            color: "black"
                        }}
                        onClick={() => navigate("/find-job")}
                    >
                        Visit For New Opportunities
                    </Button>
                </VStack>
            )}
        </div>
    );
};

export default CompletedJobs;
