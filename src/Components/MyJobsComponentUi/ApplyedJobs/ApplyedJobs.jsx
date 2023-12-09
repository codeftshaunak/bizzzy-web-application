import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllJobsProposal } from "../../../helpers/jobProposalApi";
import { Link } from "react-router-dom";

const ApplyedJobs = () => {
    const [jobProposal, setJobProposal] = useState(null)
    const getAllJobProposalList = async () => {
        try {
            const response = await getAllJobsProposal();
            setJobProposal(response);
        } catch (error) {
            console.error("Error fetching job list:", error);
        }
    }

    useEffect(() => {
        getAllJobProposalList();
    }, []);

    console.log(jobProposal, "jobProposal]]]]]]")

    return (
        <div className="my-3 space-y-4">
            <h2 className="my-3 text-2xl font-medium text-[#374151]">
                Applied Job
            </h2>
            <div className="my-5">
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th className="capitalize" >Date</Th>
                                <Th className="capitalize" >Action</Th>
                                <Th className="capitalize" >Contacts</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {jobProposal?.map((item, index) => {
                                const { createdAt, jobId } = item;
                                const dateObject = new Date(createdAt);

                                const formattedDate = dateObject.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                });


                                return (
                                    <Tr key={index}>
                                        <Td className="text-2xl font-normal text-[#6B7280]">{formattedDate}</Td>
                                        <Td>
                                            <div className="text-[#6B7280]">{item.job_title}</div>
                                            <div className="text-[#16A34A] text-lg font-medium">
                                                <Link to={`/find-job/${jobId?._id}`}>{jobId?.title}</Link>
                                            </div>
                                        </Td>
                                        <Td className="text-[#6B7280] font-normal text-lg">{-16}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default ApplyedJobs