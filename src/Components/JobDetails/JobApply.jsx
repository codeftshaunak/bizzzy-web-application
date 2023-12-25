import { Box, HStack, Select, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { applyJob } from '../../helpers/jobApis';
import { useNavigate, useParams } from 'react-router-dom';

const JobApply = ({ setPage, details }) => {
    const [coverLetter, setCoverLetter] = useState('');
    const [bidDetails, setBidDetails] = useState({
        amount: details?.amount,
        type: details?.budget === 1 ? 'milestone' : 'project',
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
        return bidAmount - (bidAmount * 0.1);
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
            });
            console.log(response);
            if (response.code === 200) {
                toast({
                    title: 'Job Applied Successfully',
                    position: 'top',
                    status: 'success',
                    isClosable: true,
                    duration: 2000,
                });
                navigate('/find-job');
            } else {
                toast({
                    title: response.message,
                    position: 'top',
                    status: 'success',
                    isClosable: true,
                    duration: 2000,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full">
            <div className="py-2 px-40">
                <div className="flex gap-2 py-6">
                    <img src="/icons/home.svg" alt="home" />
                    <img src="/icons/chevron-right.svg" alt="arrow right" />
                    <div className='cursor-pointer' onClick={() => {
                        setPage(1)
                    }}>{details?.title}</div>
                    <img src="/icons/chevron-right.svg" alt="arrow right" />
                    <div>Submit Proposal</div>
                </div>
                <div className="w-full flex justify-between">
                    <div className='w-full'>
                        <div className="w-[96%] border border-tertiary rounded-2xl p-6">
                            <div className="font-semibold">Job details</div>
                            <br />
                            <p className="capitalize">
                                {details?.description}
                            </p>
                        </div>
                    </div>
                    <div className="w-full">
                        {details?.budget == 1 &&
                            <div className="w-full flex justify-between">
                                <div className="w-full">
                                    <div className="border border-tertiary rounded-2xl p-6 mb-4">
                                        <div className="font-semibold mb-2">Select Budget Type</div>
                                        <Select value={bidDetails.type} onChange={(e) => handleBudgetTypeChange(e.target.value)}>
                                            <option value="project">Project</option>
                                            <option value="milestone">Milestone</option>
                                        </Select>
                                    </div>
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
                                    <div className="border border-tertiary rounded-2xl p-6">
                                        <div className="font-semibold mb-2">Additional details</div>
                                        <div>Cover Letter</div>
                                        <textarea
                                            rows="10"
                                            className="border border-tertiary w-full rounded p-3"
                                            value={coverLetter}
                                            onChange={(e) => setCoverLetter(e.target.value)}
                                        />

                                        <div className="text-right text-gray-300">(0/500)</div>
                                        <div className="font-semibold mt-4">Attachments</div>
                                        <div className="max-w-xl">
                                            <label className="flex justify-center w-full h-20 px-4 transition bg-green-200 border-2 border-green-600 border-dashed rounded-md appearance-none cursor-pointer">
                                                <span className="flex items-center space-x-2">
                                                    <span>
                                                        Drag or&nbsp;
                                                        <span className="text-green-600 underline">upload</span>
                                                        &nbsp;project files
                                                    </span>
                                                </span>
                                                <input type="file" name="file_upload" className="hidden" />
                                            </label>
                                        </div>
                                        <button className="bg-primary text-secondary rounded h-[36px] px-4 mt-4" onClick={() => handleSubmit()}>
                                            Submit Proposal
                                        </button>
                                    </div>
                                </div>
                            </div>
                            || details?.budget == 2 &&
                            <>
                                <div className="border border-tertiary rounded-2xl p-6 mb-4">
                                    <div className="font-semibold mb-2">What is the rate you'd like to bid for this job?</div>
                                    <HStack justifyContent={"space-between"} fontSize={"0.9rem"}>
                                        <p>Your Profile Rate: $9.90/hr</p>
                                        <p >Client Budget: ${details?.amount}/hr</p>
                                    </HStack>
                                    <div className="mt-4">What is the full amount you'd like to bid for this job?</div>
                                    <input className="rounded-md border border-tertiary p-1 w-full" type="number" placeholder="$100.00" />
                                    <div className="flex justify-between mt-4">
                                        <div className="font-semibold">10% Freelancer Service Fee</div>
                                        <div className="font-semibold">-$10.00</div>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <div className="font-semibold">You'll Receive</div>
                                        <div className="font-semibold">$90.00</div>
                                    </div>
                                </div>
                                <div className="border border-tertiary rounded-2xl p-6">
                                    <div className="font-semibold mb-2">Additional details</div>
                                    <div>Cover Letter</div>
                                    <textarea
                                        rows="10"
                                        className="border border-tertiary w-full rounded p-3"
                                        value={coverLetter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                    />                                    <div className="text-right text-gray-300">(0/500)</div>
                                    <div className="font-semibold mt-4">Attachments</div>
                                    <div className="max-w-xl">
                                        <label
                                            className="flex justify-center w-full h-20 px-4 transition bg-green-200 border-2 border-green-600 border-dashed rounded-md appearance-none cursor-pointer">
                                            <span className="flex items-center space-x-2">
                                                <span>
                                                    Drag or&nbsp;
                                                    <span className="text-green-600 underline">upload</span>
                                                    &nbsp;project files
                                                </span>
                                            </span>
                                            <input type="file" name="file_upload" className="hidden" />
                                        </label>
                                    </div>
                                    <button className="bg-primary text-secondary rounded h-[36px] px-4 mt-4" onClick={() => handleSubmit()}>Submit Proposal</button>
                                </div>
                            </>
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

const BidDetailsSection = ({ label, placeholder, bidAmount, setBidAmount, serviceFee, details }) => (
    <div className="border border-tertiary rounded-2xl p-6 mb-4">
        {console.log({ bidAmount, serviceFee })}
        <div className="font-semibold mb-2 capitalize">{label}</div>
        <p className="mb-2">Client Budget: ${details?.amount}</p>
        <input
            className="rounded-md border border-tertiary p-1 w-full"
            type="number"
            placeholder={placeholder}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
        />
        <HStack margin="5px 0" justifyContent="space-between">
            <div className="font-semibold">10% Freelancer Service Fee</div>
            <div className="font-semibold">-${(bidAmount - serviceFee).toFixed(2)}</div>
        </HStack>
        <HStack marginBottom="5px" justifyContent="space-between">
            <div className="font-semibold">You'll receive</div>
            <div className="font-semibold">${(serviceFee).toFixed(2)}</div>
        </HStack>
    </div>
);

export default JobApply
