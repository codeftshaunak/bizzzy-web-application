import { Box, Flex, Text, HStack, Image, VStack } from "@chakra-ui/react";
import { IoBagOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const ActiveJobCard = ({ job }) => {
  const { _id, job_type, contract_title, hourly_rate, experience } = job || [];
  const navigate = useNavigate()
  return (
    <VStack
      className="border p-4 m-2 rounded h-[200px] w-[280px] my-auto mx-auto relative shadow-lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      onClick={() => {
        navigate(`/active-job/submit/${_id}`, { state: { job } });
      }}
    >
      <Flex alignItems="center" justifyContent="center">
        <Image src="./images/active_job.png" width={"50px"} height={"50px"} />
      </Flex>
      <Box textAlign="center" my={2}>
        <Link to={`/active-job/submit/${_id}`} className="text-[1.2rem] font-bold capitalize" >
          {contract_title?.length > 20 ? contract_title.slice(0, 20) + "..." : contract_title}

        </Link>
        <VStack justifyContent={"space-around"} width={"200px"} margin={"auto"} gap={"1px"}>
          <Text fontSize="1rem" color="gray.700" fontWeight={"600"} marginBottom={"0"}>
            Job Type: {job_type == "fixed"
              ? "Fixed Rate"
              : job_type == "hourly"
                ? "Hourly"
                : ""}
          </Text>
          <Text fontSize="1rem" color="gray.700" fontWeight={"600"}>
            Rate/Budget: ${hourly_rate}
          </Text>
        </VStack>
      </Box>
      {/* <Box position={"absolute"} fontWeight={"600"} backgroundColor={"var(--primarycolor)"} padding={"1px 8px"} color={"white"} top={"10px"} borderRadius={"5px"} right={"10px"}>
        <Text>{experience}</Text>
      </Box> */}
    </VStack>
  );
};

export default ActiveJobCard;
