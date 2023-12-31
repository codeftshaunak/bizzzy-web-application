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
import { getAllJobsProposal } from "../../../helpers/jobApis";
import { Link } from "react-router-dom";

const ApplyedJobs = () => {
  const [jobProposal, setJobProposal] = useState(null);
  const getAllJobProposalList = async () => {
    try {
      const response = await getAllJobsProposal();
      setJobProposal(response);
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  };

  useEffect(() => {
    getAllJobProposalList();
  }, []);

  return (
    <div className="my-3 space-y-4">
      <h2 className="my-3 text-2xl font-medium">Applied Jobs</h2>
      <div className="m-auto w-[100%] border p-5 shadow-md rounded-lg">
        <TableContainer>
          <Table variant="simple" justifyContent={"center"} width={"100%"} margin={"auto"} alignItems={"center"} textAlign={"center"}>
            <Thead justifyContent={"center"} textAlign={"center"}>
              <Tr textAlign={"center"}>
                <Th fontSize={"1rem"} textAlign={"center"} className="capitalize">Date</Th>
                <Th fontSize={"1rem"} textAlign={"center"} className="capitalize">Action</Th>
                <Th fontSize={"1rem"} textAlign={"center"} className="capitalize">Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {jobProposal?.map((item, index) => {
                console.log(item);
                const { created_at, jobId } = item;

                const dateObject = new Date(created_at);

                const formattedDate = dateObject.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <Tr key={index}>
                    <Td className="text-[1.2rem]" textAlign={"center"}>
                      {formattedDate}
                    </Td>
                    <Td>
                      <div className="text-[#16A34A] text-lg font-medium capitalize text-center">
                        <Link to={`/find-job/${jobId?._id}`}>
                          {jobId?.title}
                        </Link>
                      </div>
                    </Td>
                    <Td className="text-[1.2rem]" textAlign={"center"}>
                      {item.status == 1 && "Applied"}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ApplyedJobs;
