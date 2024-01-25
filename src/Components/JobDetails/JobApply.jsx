import React, { useState, useEffect, useContext } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Box, Button, HStack, Select, useToast } from '@chakra-ui/react';
import { applyJob } from '../../helpers/jobApis';
import { useNavigate, useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../Contexts/CurrentUser';

const JobApply = ({ setPage, details }) => {
    console.log({ details });

    const { quill, quillRef } = useQuill();
    const [coverLetter, setCoverLetter] = useState('');
    const currentUser = useContext(CurrentUserContext);
    const { hourly_rate } = currentUser.profile || [];
    const [desireHourlyRate, setDesireHourlyRate] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [bidDetails, setBidDetails] = useState({
        amount: details?.amount,
        type: details?.job_type == "fixed" ? 'milestone' : 'project',
        customBidAmount: null,
        coverLetter: '',
    });

    const handleBudgetTypeChange = (value) => {
        setBidDetails((prev) => ({
            ...prev,
            type: value,
            customBidAmount: value === 'milestone' ? null : prev.customBidAmount,
        }));
    };

    const calculateServiceFee = () => {
        const bidAmount = bidDetails.type === 'project' ? bidDetails.amount : bidDetails.customBidAmount;
        return bidAmount - bidAmount * 0.1;
    };

    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await applyJob({
                jobId: id,
                desiredPrice: bidDetails.type === 'project' ? bidDetails.amount : bidDetails.customBidAmount,
                jobType: bidDetails.type,
                coverLetter: coverLetter,
                file: selectedFile,
            });

            handleSubmissionResponse(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleHourlyJobSubmit = async () => {
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
    };

    const handleSubmissionResponse = (response) => {
        const isSuccess = response.code === 200;
        const toastMessage = isSuccess ? 'Job Applied Successfully' : response.message;

        toast({
            title: toastMessage,
            position: 'top',
            status: isSuccess ? 'success' : 'error',
            isClosable: true,
            duration: 2000,
        });

        if (isSuccess) {
            navigate('/find-job');
        }
    };

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (_, __, source) => {
                setCoverLetter(quill.root.innerHTML);
            });
        }
    }, [quill]);

    useEffect(() => {
        setDesireHourlyRate(hourly_rate);
    }, [hourly_rate]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    return (
        <Box w="90%" py={2} mx="auto">
            <Box className="flex gap-2 py-6">
                <img src="/icons/home.svg" alt="home" />
                <img src="/icons/chevron-right.svg" alt="arrow right" />
                <Box className='cursor-pointer' onClick={() => setPage(1)}>{details?.title}</Box>
                <img src="/icons/chevron-right.svg" alt="arrow right" />
                <Box>Submit Proposal</Box>
            </Box>

            <Box className="w-full flex justify-between">
                <Box w="100%">
                    <Box className="w-[96%] border border-tertiary rounded-2xl p-6">
                        <Box fontWeight="semibold">Job details</Box>
                        <br />
                        <Box className="capitalize" dangerouslySetInnerHTML={{ __html: details?.description }} />
                    </Box>
                </Box>

                <Box w="60%">
                    {details?.job_type == "fixed" && (
                        <Box w="full" className="w-full">
                            <Box className="w-full">
                                <Box className="border border-tertiary rounded-2xl p-6 mb-4">
                                    <Box fontWeight="semibold" mb={2}>Select Budget Type</Box>
                                    <Select value={bidDetails.type} onChange={(e) => handleBudgetTypeChange(e.target.value)}>
                                        <option value="project">Project</option>
                                        <option value="milestone">Milestone</option>
                                    </Select>
                                </Box>

                                {bidDetails.type === 'milestone' && (
                                    <BidDetailsSection
                                        label="Write Your Amount For Milestone."
                                        placeholder="$100.00"
                                        details={details}
                                        bidAmount={bidDetails.customBidAmount}
                                        setBidAmount={(value) => setBidDetails((prev) => ({ ...prev, customBidAmount: value }))}
                                        serviceFee={calculateServiceFee()}
                                    />
                                )}

                                {bidDetails.type === 'project' && (
                                    <BidDetailsSection
                                        label="Write Desire Bid Amount If You Want."
                                        placeholder="$100.00"
                                        bidAmount={bidDetails.amount}
                                        setBidAmount={(value) => setBidDetails((prev) => ({ ...prev, amount: value }))}
                                        details={details}
                                        serviceFee={calculateServiceFee()}
                                    />
                                )}

                                <Box className="border border-tertiary rounded-2xl p-6">
                                    <Box fontWeight="semibold" mb={2}>Additional details</Box>
                                    <Box>Cover Letter</Box>
                                    <Box w="100%" h={300} ref={quillRef} />

                                    <Box textAlign="right" color="gray.300" mt={4}>(0/500)</Box>
                                    <Box fontWeight="semibold" mt={4}>Attachments</Box>
                                    <Box className="max-w-xl">
                                        <label className="flex justify-center w-full h-20 px-4 transition bg-green-200 border-2 border-green-600 border-dashed rounded-md appearance-none cursor-pointer">
                                            <span className="flex items-center space-x-2">
                                                <span>
                                                    Drag or&nbsp;
                                                    <span className="text-green-600 underline">upload</span>
                                                    &nbsp;project files
                                                </span>
                                            </span>
                                            <input type="file" name="file" className="hidden" onChange={handleFileChange} />
                                        </label>
                                    </Box>
                                    <Button className="bg-primary text-secondary rounded h-[36px] px-4 mt-4" onClick={() => handleSubmit()}>
                                        Submit Proposal
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {details?.job_type == "hourly" && (
                        <Box w="full">
                            <Box className="border border-tertiary rounded-2xl p-6 mb-4">
                                <Box fontWeight="semibold" mb={2}>What is the rate you'd like to bid for this job?</Box>
                                <HStack justifyContent="space-between" fontSize="0.9rem">
                                    <Box>Your Profile Rate: ${hourly_rate}/hr</Box>
                                    <Box>Client Budget: ${details?.amount}/hr</Box>
                                </HStack>

                                <Box mt={4}>What is the hourly rate for bid in this job?</Box>
                                <input className="rounded-md border border-tertiary p-1 w-full" type="number" defaultValue={desireHourlyRate} onChange={(e) => setDesireHourlyRate(e.target.value)} />

                                <HStack justify="space-between" mt={4}>
                                    <Box fontWeight="semibold">10% Freelancer Service Fee</Box>
                                    <Box fontWeight="semibold">-$10.00</Box>
                                </HStack>

                                <HStack justify="space-between" mt={4}>
                                    <Box fontWeight="semibold">You'll Receive</Box>
                                    <Box fontWeight="semibold">$90.00</Box>
                                </HStack>
                            </Box>

                            <Box className="border border-tertiary rounded-2xl p-6">
                                <Box fontWeight="semibold" mb={2}>Additional details</Box>
                                <Box>Cover Letter</Box>
                                <Box w="100%" h={300} ref={quillRef} />

                                <Box textAlign="right" color="gray.300" mt={4}>(0/500)</Box>
                                <Box fontWeight="semibold" mt={4}>Attachments</Box>
                                <Box className="max-w-xl">
                                    <label className="flex justify-center w-full h-20 px-4 transition bg-green-200 border-2 border-green-600 border-dashed rounded-md appearance-none cursor-pointer">
                                        <span className="flex items-center space-x-2">
                                            <span>
                                                Drag or&nbsp;
                                                <span className="text-green-600 underline">upload</span>
                                                &nbsp;project files
                                            </span>
                                        </span>
                                        <input type="file" name="file" className="hidden" onChange={handleFileChange} />
                                    </label>
                                </Box>

                                <Button className="bg-primary text-secondary rounded h-[36px] px-4 mt-4" onClick={() => handleHourlyJobSubmit()}>
                                    Submit Proposal
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

const BidDetailsSection = ({ label, placeholder, bidAmount, setBidAmount, serviceFee, details }) => (
    <Box className="border border-tertiary rounded-2xl p-6 mb-4">
        <Box fontWeight="semibold" mb={2} textTransform="capitalize">{label}</Box>
        <p className="mb-2">Client Budget: ${details?.amount}</p>

        <input
            className="rounded-md border border-tertiary p-1 w-full"
            type="number"
            placeholder={placeholder}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
        />

        <HStack margin="5px 0" justify="space-between">
            <Box fontWeight="semibold">10% Freelancer Service Fee</Box>
            <Box fontWeight="semibold">-${(bidAmount - serviceFee).toFixed(2)}</Box>
        </HStack>

        <HStack marginBottom="5px" justify="space-between">
            <Box fontWeight="semibold">You'll receive</Box>
            <Box fontWeight="semibold">${(serviceFee).toFixed(2)}</Box>
        </HStack>
    </Box>
);

export default JobApply;


