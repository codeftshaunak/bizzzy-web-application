import { useEffect, useState } from "react";
import { userAllJobs } from "../../helpers/jobApis";
import ActiveJobSlider from "./ActiveJobSlider";
import ApplyedJobs from "./ApplyedJobs/ApplyedJobs";
import CompletedJobs from "./ApplyedJobs/CompletedJobs";
import { HStack, VStack, Text, Button, Stack, Skeleton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const MyJobsComponentUi = () => {
    const [userJobs, setUserJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { active_jobs, completed_jobs, applied_jobs } = userJobs || [];
    const navigate = useNavigate();

    const getUserJobs = async () => {
        setLoading(true)
        try {
            const response = await userAllJobs();
<<<<<<< HEAD
            setUserJobs(response);
=======
            setUserJobs(response.body);
>>>>>>> parent of db37502 (seperating the git create steps)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        getUserJobs()
    }, []);


    return (
        <div className="w-full">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-12">
                    <div>
                        <h2 className="my-3 text-2xl font-medium">Active Jobs</h2>
                    </div>

                    {
                        loading ? <Stack padding={"10px 0"}>
                            <Skeleton height='20px' />
                            <Skeleton height='20px' />
                            <Skeleton height='20px' />
                            <Skeleton height='20px' />
                            <Skeleton height='20px' />
                        </Stack> : active_jobs?.length > 0 ? <div className="my-4">
                            <ActiveJobSlider activeJobList={active_jobs} />
                        </div> : <VStack alignItems={"center"} justifyContent={"center"} border={"0.1px solid var(--bordersecondary)"} className="shadow-md" height={"10rem"}>
                            <Text fontSize={"1.2rem"} textTransform={"capitalize"} fontWeight={"600"}>You haven't any active job.</Text>
                            <Button borderRadius={"25px"} fontWeight={"500"} backgroundColor={"var(--primarycolor)"} color={"white"} _hover={{
                                border: "1px solid var(--primarycolor)",
                                backgroundColor: "white",
                                color: "black"
                            }}
                                onClick={() => navigate("/find-job")}
<<<<<<< HEAD
                            >Visit For New Opportunity</Button>
=======
                            >Vist For New Opportunity</Button>
>>>>>>> parent of db37502 (seperating the git create steps)
                        </VStack>
                    }


                    {/* {
                        active_jobs?.length > 0 ? <div className="my-4">
                            <ActiveJobSlider activeJobList={active_jobs} />
                        </div> : <VStack alignItems={"center"} justifyContent={"center"} border={"0.1px solid var(--bordersecondary)"} className="shadow-md" height={"10rem"}>
                            <Text fontSize={"1.2rem"} textTransform={"capitalize"} fontWeight={"600"}>You haven't any active job.</Text>
                            <Button borderRadius={"25px"} fontWeight={"500"} backgroundColor={"var(--primarycolor)"} color={"white"} _hover={{
                                border: "1px solid var(--primarycolor)",
                                backgroundColor: "white",
                                color: "black"
                            }}
                                onClick={() => navigate("/find-job")}
<<<<<<< HEAD
                            >Visit For New Opportunity</Button>
=======
                            >Vist For New Opportunity</Button>
>>>>>>> parent of db37502 (seperating the git create steps)
                        </VStack>
                    } */}

                </div>
            </div>
            <div>
                <ApplyedJobs applyJobs={applied_jobs} loading={loading} />
                <CompletedJobs completedJobs={completed_jobs} loading={loading} />
            </div>
        </div>
    )
}

export default MyJobsComponentUi