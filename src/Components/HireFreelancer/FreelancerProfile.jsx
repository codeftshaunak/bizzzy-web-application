import { Heading, Box, Flex } from "@chakra-ui/react";
import { MdOutlineRecommend } from "react-icons/md";
import { useSelector } from "react-redux";

const FreelancerProfile = () => {
  const { firstName, lastName, professional_role, profile_image } = useSelector(
    (state) => state?.HireFreelancer?.targetedFreelancer
  );

  return (
    <Flex
      marginTop="25"
      width="100%"
      gap="2"
      border="1px solid lightgray"
      rounded="10"
      paddingY="5"
      paddingX="8"
    >
      <img className="h-10 w-10 rounded-full" src={profile_image} alt="" />
      <Box>
        <Heading as="h4" size="md" color="green">
          {firstName} {lastName.slice(0, 1)}.
        </Heading>
        <Heading as="h6" size="sm">
          {professional_role}
        </Heading>
        <Box display="flex" gap="100px" marginTop="20px">
          <Box>
            <Heading as="h6" size="sm">
              Madaripur, Bangladesh
            </Heading>
          </Box>
          <Box>
            <Heading
              as="h6"
              size="sm"
              display="flex"
              alignItems="center"
              gap="1"
            >
              <MdOutlineRecommend /> 94% JOB SUCCESS
            </Heading>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default FreelancerProfile;
