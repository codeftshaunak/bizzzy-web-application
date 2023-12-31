import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr, VStack, Text, Button, Box
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const ApplyedJobs = ({ applyJobs }) => {
  const navigate = useNavigate();


  return (
    <div className="my-3 space-y-4">
      <h2 className="my-3 text-2xl font-medium">Applied Jobs</h2>
      {
        applyJobs?.length > 0 ? <div className="m-auto w-[100%] border p-5 shadow-md rounded-lg">
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
                {applyJobs?.map((item, index) => {
                  console.log(item);
                  const { created_at, jobId } = item;

                  const dateObject = new Date(created_at);

                  const formattedDate = dateObject.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <Tr key={index} alignItems={"center"}>
                      <Td className="text-[1.2rem]" textAlign={"center"}>
                        {formattedDate}
                      </Td>
                      <Td>
                        <div className="text-[#16A34A] text-lg font-medium capitalize text-center">
                          <Link to={`/find-job/${item?._id}`}>
                            {item?.title}
                          </Link>
                        </div>
                      </Td>
                      <Td height={"2rem"} className="text-[1.2rem]" textAlign={"center"} >
                        <Box border={"1px solid var(--primarytextcolor)"} height={"2rem"} display={"flex"} alignItems={"center"} justifyContent={"center"} backgroundColor={"var(--primarytextcolor)"} fontWeight={"400"} color={"white"}>
                          {"Applied"}
                        </Box>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div> : <VStack alignItems="center" justifyContent="center" border="0.1px solid var(--bordersecondary)" className="shadow-md" height="10rem">
          <Text fontSize="1.2rem" textTransform="capitalize" fontWeight="600">
            You haven't applied any job.
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
            onClick={() => {
              navigate("/find-job")
            }}
          >
            Visit For New Opportunities
          </Button>
        </VStack>
      }

    </div >
  );
};

export default ApplyedJobs;
