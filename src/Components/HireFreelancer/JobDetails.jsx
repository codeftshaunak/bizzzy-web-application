import { Heading, Text, Box, Select, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobDetails } from "../../redux/features/HireFreelancerSlice";
import { getClientJobs } from "../../helpers/clientApis";

const JobDetails = () => {
  const [jobsTitle, setJobsTitle] = useState([]);
  const profile = useSelector((state) => state?.profile?.profile);
<<<<<<< HEAD

=======
  console.log(profile);
>>>>>>> parent of db37502 (seperating the git create steps)
  const [formData, setFormData] = useState({
    hiring_team: "",
    job_title: "",
    contract_title: "",
  });

  // Fetch Job Title
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await getClientJobs();
        setJobsTitle(jobsData);
      } catch (error) {
        console.error("Error fetching job titles:", error);
      }
    };

    fetchData();
  }, []);

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
      paddingY="6"
      paddingX="10"
    >
      <Heading as="h4" size="md">
        Job Details
      </Heading>
      <Box marginTop="30">
        <Heading as="h5" size="sm">
          Hiring Team
        </Heading>
        <Select
          placeholder="Select Team"
          marginTop="8px"
          maxWidth="2xl"
          value={formData.hiring_team}
          onChange={(e) => handleFormDataChange("hiring_team", e.target.value)}
          required
        >
          <option
<<<<<<< HEAD
            value={`${profile?.business_name && profile?.business_name !== "null"
              ? profile.business_name
              : profile?.name
              }
=======
            value={`${
              profile?.business_name && profile?.business_name !== "null"
                ? profile.business_name
                : profile?.name
            }
>>>>>>> parent of db37502 (seperating the git create steps)
            &apos;s Team`}
          >
            {profile?.business_name && profile?.business_name !== "null"
              ? profile.business_name
              : profile?.name}
            &apos;s Team
          </option>
        </Select>
      </Box>
      <Box marginTop="30">
        <Heading as="h5" size="sm" display="flex" gap="1">
          Related Job Posting <Text color="gray">(Optional)</Text>
        </Heading>
        <Select
          placeholder="Select an open job post"
          marginTop="8px"
          maxWidth="2xl"
          onChange={(e) => handleFormDataChange("job_title", e.target.value)}
          required
        >
          {jobsTitle &&
            jobsTitle.map((job) => (
              <option
                key={job?._id}
                value={job?.title}
                className="px-2 tracking-wide"
              >
                {job?.title}
              </option>
            ))}
        </Select>
      </Box>
      <Box marginTop="30">
        <Heading as="h5" size="sm">
          Contract Title
        </Heading>
        <Input
          placeholder="Basic usage"
          marginTop="8px"
          maxWidth="2xl"
          onChange={(e) =>
            handleFormDataChange("contract_title", e.target.value)
          }
          required
        />
      </Box>
    </Box>
  );
};

export default JobDetails;
<<<<<<< HEAD

=======
>>>>>>> parent of db37502 (seperating the git create steps)
