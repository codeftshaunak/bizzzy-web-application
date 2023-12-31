import { useEffect, useState } from "react";
import { userAllJobs } from "../../helpers/jobApis";
import ActiveJobSlider from "./ActiveJobSlider";
import ApplyedJobs from "./ApplyedJobs/ApplyedJobs";
import CompletedJobs from "./ApplyedJobs/CompletedJobs";
import { HStack, VStack, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const MyJobsComponentUi = () => {
    const [userJobs, setUserJobs] = useState([]);
    const { active_jobs, completed_jobs, applied_jobs } = userJobs || [];
    const navigate = useNavigate()
    const getUserJobs = async () => {
        const response = await userAllJobs();
        setUserJobs(response.body)
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
                            >Vist For New Opportunity</Button>
                        </VStack>
                    }

                </div>
            </div>
            <div>
                <ApplyedJobs applyJobs={applied_jobs} />
                <CompletedJobs completedJobs={completed_jobs} />
            </div>
        </div>
    )
}

export default MyJobsComponentUi