import React, { useState, useEffect, useContext } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import {
  Box,
  Button,
  HStack,
  Select,
  useToast,
  Radio,
  Stack,
  RadioGroup,
} from "@chakra-ui/react";
import { applyJob } from "../../helpers/jobApis";
import { useNavigate, useParams } from "react-router-dom";
import { CurrentUserContext } from "../../Contexts/CurrentUser";
import { useSelector } from "react-redux";
import {
  FaFile,
  FaFileExcel,
  FaFileImage,
  FaFilePowerpoint,
  FaFileVideo,
  FaRegFilePdf,
  FaRegFileWord,
} from "react-icons/fa";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link"],
    [{ color: [] }, { background: [] }],

    ["clean"],
  ],
};

const JobApply = ({ setPage, details }) => {
  const [isLoading, setIsLoading] = useState(false);
  const details_new = details[0];
  const profile = useSelector((state) => state?.profile);
  const { quill, quillRef } = useQuill({ modules });
  const [isApplicant, setIsApplicant] = useState("freelancer");
  const [coverLetter, setCoverLetter] = useState("");
  const { hasAgency, currentUser } = useContext(CurrentUserContext);
  const { hourly_rate } = profile.profile || [];

  const [desireHourlyRate, setDesireHourlyRate] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [bidDetails, setBidDetails] = useState({
    amount: details_new?.amount,
    type: details_new?.job_type == "fixed" ? "milestone" : "project",
    customBidAmount: null,
    coverLetter: "",
  });

  useEffect(() => {
    setDesireHourlyRate(
      isApplicant === "freelancer"
        ? profile?.profile?.hourly_rate
        : profile?.agency?.agency_hourlyRate
    );
  }, [isApplicant]);

  const handleBudgetTypeChange = (value) => {
    setBidDetails((prev) => ({
      ...prev,
      type: value,
      customBidAmount: value === "milestone" ? null : prev.customBidAmount,
    }));
  };

  const calculateServiceFee = () => {
    const bidAmount =
      bidDetails.type === "project"
        ? bidDetails.amount
        : bidDetails.customBidAmount;
    return bidAmount - bidAmount * 0.05;
  };

  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const jobData = {
        jobId: id,
        desiredPrice:
          bidDetails.type === "project"
            ? bidDetails.amount
            : bidDetails.customBidAmount,
        jobType: bidDetails.type,
        coverLetter: coverLetter,
        file: selectedFile,
      };

      // if applicant has been agency member then add agency_id
      if (isApplicant !== "freelancer") {
        jobData.agency_id = profile.agency._id;
      }

      const response = await applyJob(jobData);
      handleSubmissionResponse(response);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleHourlyJobSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await applyJob({
        jobId: id,
        desiredPrice: desireHourlyRate,
        jobType: bidDetails.type,
        coverLetter: coverLetter,
        file: selectedFile,
      });

      handleSubmissionResponse(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleSubmissionResponse = (response) => {
    console.log(response);
    // console.log(response);
    // if (response?.code === 400) {
    //   return toast({
    //     title: response.msg,
    //     position: "top",
    //     status: "warning",
    //     isClosable: true,
    //     duration: 2000,
    //   });
    // }

    const isSuccess = response?.code === 200;
    const toastMessage = isSuccess ? "Job Applied Successfully" : response?.msg;

    toast({
      title: toastMessage,
      position: "top",
      status: isSuccess ? "success" : "error",
      isClosable: true,
      duration: 2000,
    });

    if (isSuccess) {
      navigate("/find-job");
    }
  };

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setCoverLetter(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // check file types and generate file icon
  const getFileTypeIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();

    switch (extension) {
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "svg":
        return <FaFileImage className="text-5xl text-green-300" />;
      case "mp4":
      case "avi":
      case "mov":
      case "mkv":
        return <FaFileVideo className="text-5xl text-green-300" />;
      case "pdf":
        return <FaRegFilePdf className="text-5xl text-green-300" />;
      case "doc":
      case "docx":
        return <FaRegFileWord className="text-5xl text-green-300" />;
      case "xls":
      case "xlsx":
        return <FaFileExcel className="text-5xl text-green-300" />;
      case "ppt":
      case "pptx":
        return <FaFilePowerpoint className="text-5xl text-green-300" />;
      default:
        return <FaFile className="text-5xl text-green-300" />;
    }
  };
  const fileIcon = selectedFile ? getFileTypeIcon(selectedFile.name) : null;

  return (
    <Box w="90%" py={2} mx="auto">
      <Box className="flex gap-2 py-6">
        <img src="/icons/home.svg" alt="home" />
        <img src="/icons/chevron-right.svg" alt="arrow right" />
        <Box className="cursor-pointer" onClick={() => setPage(1)}>
          {details_new?.title}
        </Box>
        <img src="/icons/chevron-right.svg" alt="arrow right" />
        <Box>Submit Proposal</Box>
      </Box>

      <Box className="w-full flex justify-between">
        <Box w="100%">
          {hasAgency && (
            <Box className="w-[96%] border border-tertiary rounded-2xl p-6 mb-4">
              <Box fontWeight="semibold" marginBottom="1" className="text-xl">
                Proposal Type
              </Box>
              <Box fontWeight="semibold">
                Do you want to submit the proposal as a freelancer or as an
                agency member?
              </Box>
              <RadioGroup
                onChange={setIsApplicant}
                value={isApplicant}
                marginTop="4"
              >
                <Stack>
                  <Radio size="lg" value="freelancer" colorScheme="green">
                    As a freelancer
                  </Radio>
                  <Radio size="lg" value="agency_member" colorScheme="green">
                    As an agency member
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}
          <Box className="w-[96%] border border-tertiary rounded-2xl p-6">
            <Box fontWeight="semibold" marginBottom="1" className="text-xl">
              Job details
            </Box>
            <br />
            <Box
              className="capitalize"
              dangerouslySetInnerHTML={{ __html: details_new?.description }}
            />
          </Box>
        </Box>

        <Box w="60%">
          {details_new?.job_type == "fixed" && (
            <Box w="full" className="w-full">
              <Box className="w-full">
                <Box className="border border-tertiary rounded-2xl p-6 mb-4">
                  <Box fontWeight="semibold" mb={2}>
                    Select Budget Type
                  </Box>
                  <Select
                    value={bidDetails.type}
                    onChange={(e) => handleBudgetTypeChange(e.target.value)}
                  >
                    <option value="project">Project</option>
                    <option value="milestone">Milestone</option>
                  </Select>
                </Box>

                {bidDetails.type === "milestone" && (
                  <BidDetailsSection
                    label="Write Your Amount For Milestone."
                    placeholder="$100.00"
                    details={details_new}
                    bidAmount={bidDetails.customBidAmount}
                    setBidAmount={(value) =>
                      setBidDetails((prev) => ({
                        ...prev,
                        customBidAmount: value,
                      }))
                    }
                    serviceFee={calculateServiceFee()}
                  />
                )}

                {bidDetails.type === "project" && (
                  <BidDetailsSection
                    label="Write Desire Bid Amount If You Want."
                    placeholder="$100.00"
                    bidAmount={bidDetails.amount}
                    setBidAmount={(value) =>
                      setBidDetails((prev) => ({ ...prev, amount: value }))
                    }
                    details={details_new}
                    serviceFee={calculateServiceFee()}
                  />
                )}

                <Box className="border border-tertiary rounded-2xl p-6">
                  <Box fontWeight="semibold" mb={2}>
                    Additional details
                  </Box>
                  <Box>Cover Letter</Box>
                  <Box w="100%" h={300} ref={quillRef} />

                  <Box textAlign="right" color="gray.300" mt={4}>
                    (0/500)
                  </Box>
                  <Box fontWeight="semibold" mt={4}>
                    Attachments
                  </Box>
                  <Box className="max-w-xl">
                    <label className="flex justify-center w-full h-20 px-4 transition bg-green-200 border-2 border-green-600 border-dashed rounded-md appearance-none cursor-pointer">
                      <span className="flex items-center space-x-2">
                        <span>
                          Drag or&nbsp;
                          <span className="text-green-600 underline">
                            upload
                          </span>
                          &nbsp;project files
                        </span>
                      </span>
                      <input
                        type="file"
                        name="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </Box>

                  <Button
                    isLoading={isLoading}
                    loadingText="Submitting"
                    colorScheme="whatsapp"
                    type="submit"
                    marginTop={10}
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          {details_new?.job_type == "hourly" && (
            <Box w="full">
              <Box className="border border-tertiary rounded-2xl p-6 mb-4">
                <Box fontWeight="semibold" mb={2}>
                  What is the rate you'd like to bid for this job?
                </Box>
                <HStack justifyContent="space-between" fontSize="0.9rem">
                  <Box>Your Profile Rate: ${hourly_rate}/hr</Box>
                  <Box>Client Budget: ${details_new?.amount}/hr</Box>
                </HStack>

                <Box mt={4}>What is the hourly rate for bid in this job?</Box>
                <input
                  className="rounded-md border border-tertiary p-1 w-full"
                  type="number"
                  defaultValue={desireHourlyRate}
                  onChange={(e) => setDesireHourlyRate(e.target.value)}
                />

                <HStack justify="space-between" mt={4}>
                  <Box fontWeight="semibold">5% Freelancer Service Fee</Box>
                  <Box fontWeight="semibold">
                    $
                    {desireHourlyRate
                      ? (desireHourlyRate * 0.05).toFixed(2)
                      : "0.00"}
                  </Box>
                </HStack>

                <HStack justify="space-between" mt={4}>
                  <Box fontWeight="semibold">You'll Receive</Box>
                  <Box fontWeight="semibold">
                    $
                    {desireHourlyRate
                      ? (desireHourlyRate * 0.95).toFixed(2)
                      : "0.00"}
                  </Box>
                </HStack>
              </Box>

              <Box className="border border-tertiary rounded-2xl p-6">
                <Box fontWeight="semibold" mb={2}>
                  Additional details
                </Box>
                <Box>Cover Letter</Box>
                <Box w="100%" h={300} ref={quillRef} />

                <Box textAlign="right" color="gray.300" mt={4}>
                  (0/500)
                </Box>
                <Box fontWeight="semibold" mt={4}>
                  Attachments:
                </Box>
                <Box className="max-w-xl">
                  {selectedFile && (
                    <div className="bg-white w-full p-3 rounded-lg shadow my-4 flex items-center justify-start gap-3">
                      {fileIcon}
                      <p>{selectedFile?.name}</p>
                    </div>
                  )}
                  <label className="flex justify-center w-full h-20 px-4 transition bg-green-200 border-2 border-green-600 border-dashed rounded-md appearance-none cursor-pointer">
                    <span className="flex items-center space-x-2">
                      <span>
                        Drag or&nbsp;
                        <span className="text-green-600 underline">upload</span>
                        &nbsp;project files
                      </span>
                    </span>
                    <input
                      type="file"
                      name="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </Box>

                <Button
                  isLoading={isLoading}
                  loadingText="Submitting"
                  colorScheme="whatsapp"
                  type="submit"
                  marginTop={10}
                  onClick={() => handleHourlyJobSubmit()}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const BidDetailsSection = ({
  label,
  placeholder,
  bidAmount,
  setBidAmount,
  serviceFee,
  details_new,
}) => (
  <Box className="border border-tertiary rounded-2xl p-6 mb-4">
    <Box fontWeight="semibold" mb={2} textTransform="capitalize">
      {label}
    </Box>
    <p className="mb-2">Client Budget: ${details_new?.amount}</p>

    <input
      className="rounded-md border border-tertiary p-1 w-full"
      type="number"
      placeholder={placeholder}
      value={bidAmount}
      onChange={(e) => setBidAmount(e.target.value)}
    />

    <HStack margin="5px 0" justify="space-between">
      <Box fontWeight="semibold">5% Freelancer Service Fee</Box>
      <Box fontWeight="semibold">-${(bidAmount - serviceFee).toFixed(2)}</Box>
    </HStack>

    <HStack marginBottom="5px" justify="space-between">
      <Box fontWeight="semibold">You'll receive</Box>
      <Box fontWeight="semibold">${serviceFee.toFixed(2)}</Box>
    </HStack>
  </Box>
);

export default JobApply;
