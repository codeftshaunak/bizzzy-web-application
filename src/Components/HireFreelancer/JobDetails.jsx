import { Heading, Text, Box, Select, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setJobDetails } from "../../redux/features/HireFreelancerSlice";

const JobDetails = () => {
  const [formData, setFormData] = useState({
    selectedTeam: "",
    relatedJob: "",
    contractTitle: "",
  });

  // update form data and dispatch to Redux
  const dispatch = useDispatch();
  const handleFormDataChange = (key, value) => {
    const updatedFormData = {
      ...formData,
      [key]: value,
    };

    setFormData(updatedFormData);
    dispatch(setJobDetails(updatedFormData));
  };
  return (
    <Box
      marginTop="8"
      width="100%"
      gap="2"
      border="1px solid lightgray"
      rounded="10"
      paddingY="5"
      paddingX="8"
    >
      <Heading as="h4" size="md">
        Job Details
      </Heading>
      <Box marginTop="30">
        <Heading as="h5" size="sm">
          Hiring Team
        </Heading>
        <Select
          placeholder="CoFounderLab"
          marginTop="15"
          width="md"
          value={formData.selectedTeam}
          onChange={(e) => handleFormDataChange("selectedTeam", e.target.value)}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Box>
      <Box marginTop="30">
        <Heading as="h5" size="sm" display="flex" gap="1">
          Related Job Posting <Text color="gray">(Optional)</Text>
        </Heading>
        <Select
          placeholder="Select an open job poet.."
          marginTop="15"
          width="md"
          onChange={(e) => handleFormDataChange("relatedJob", e.target.value)}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Box>
      <Box marginTop="30">
        <Heading as="h5" size="sm">
          Contract Title
        </Heading>
        <Input
          placeholder="Basic usage"
          marginTop="15"
          onChange={(e) =>
            handleFormDataChange("contractTitle", e.target.value)
          }
        />
      </Box>
    </Box>
  );
};

export default JobDetails;
