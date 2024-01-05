import { Heading, Box, Flex, Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const FreelancerProfile = () => {
  const { firstName, lastName, professional_role, profile_image } = useSelector(
    (state) => state?.HireFreelancer?.targetedFreelancer
  );

  return (
    <Flex
      marginTop="25"
      width="100%"
      gap="3"
      border="1px solid lightgray"
      rounded="10"
      paddingY="6"
      paddingX="10"
    >
      {profile_image ? (
        <img className="h-10 w-10 rounded-full" src={profile_image} alt="" />
      ) : (
        <Avatar name={`${firstName} ${lastName}`} boxSize="40px" />
      )}
      <Box>
        <Heading as="h4" size="md" className="text-green-600">
          {firstName} {lastName.slice(0, 1)}.
        </Heading>
        <Heading as="h5" size="sm">
          {professional_role}
        </Heading>
        <Box display="flex" gap="100px" marginTop="10px">
          <Box>
            <Heading as="h6" size="xs" className="text-gray-600">
              Dhaka, Bangladesh
            </Heading>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default FreelancerProfile;
