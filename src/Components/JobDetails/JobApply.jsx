import { Box, HStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const JobApply = ({ setPage, details }) => {
    console.log({ "---detailspage": details });
    const [bidAmount, setBidAmount] = useState('');
    const [customeBidAmount, setCustomBidAmount] = useState(0);
    const [coverLetter, setCoverLetter] = useState('');
    const [selectedBudgetType, setSelectedBudgetType] = useState(details?.budget === 1 ? 'project' : 'milestone');

    const handleBudgetTypeChange = (e) => {
        setSelectedBudgetType(e.target.value);
    };


    const handleSubmit = () => {
        // Handle form submission
        console.log('Selected Budget Type:', selectedBudgetType);
        console.log('Bid Amount:', bidAmount);
        console.log('Cover Letter:', coverLetter);

        try {

        } catch (error) {

        }

        // You can perform further actions, such as sending data to an API
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
                            <p>
                                {details?.description}
                            </p>
                        </div>
                    </div>
                    <div className="w-full">

                        {
                            details?.budget == 1 &&
                            <div className="w-full flex justify-between">
                                <div className="w-full">
                                    <div className="border border-tertiary rounded-2xl p-6 mb-4">
                                        <div className="font-semibold mb-2">Select Budget Type</div>
                                        <div>
                                            <input
                                                type="radio"
                                                value="project"
                                                onChange={handleBudgetTypeChange}
                                                checked={selectedBudgetType === 'project'}
                                            />
                                            <label className="text-base font-medium">Project</label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                value="milestone"
                                                onChange={handleBudgetTypeChange}
                                                checked={selectedBudgetType === 'milestone'}
                                            />
                                            <label className="text-base font-medium">Milestone</label>
                                        </div>

                                    </div>
                                    {/* Render sections based on the selected budget type */}
                                    {selectedBudgetType === 'milestone' && (
                                        <div className="border border-tertiary rounded-2xl p-6 mb-4">
                                            <div className="font-semibold mb-2">Write Your Amount For Milestone.</div>
                                            <p className="mb-2">Client Budget: ${details?.amount}</p>
                                            <input className="rounded-md border border-tertiary p-1 w-full" type="number" placeholder="$100.00" onChange={(e) => setBidAmount(e.target.value)} />
                                            <HStack margin={"5px 0"} justifyContent={"space-between"}>
                                                <div className="font-semibold">10% Freelancer Service Fee</div>
                                                <div className="font-semibold">-$10.00</div>
                                            </HStack>
                                            <HStack marginBottom={"5px"} justifyContent={"space-between"}>
                                                <div className="font-semibold">You'll recieve</div>
                                                <div className="font-semibold">${bidAmount - (bidAmount * 10) / 100}</div>
                                            </HStack>
                                        </div>
                                    )}
                                    {selectedBudgetType === 'project' && (
                                        <div className="border border-tertiary rounded-2xl p-6 mb-4">
                                            <div className="font-semibold mb-2">Write Desire Bid Amount If You Want.</div>
                                            <input className="rounded-md border border-tertiary p-1 w-full" type="number" placeholder="$100.00" defaultValue={details?.amount} onChange={(e) => setCustomBidAmount(e.target.value)} />
                                            <HStack margin={"5px 0"} justifyContent={"space-between"}>
                                                <div className="font-semibold">10% Freelancer Service Fee</div>
                                                <div className="font-semibold">-$10.00</div>
                                            </HStack>
                                            <HStack marginBottom={"5px"} justifyContent={"space-between"}>
                                                <div className="font-semibold">You'll recieve</div>
                                                <div className="font-semibold">${customeBidAmount === 0 ? (details?.amount - (details?.amount * 10) / 100) : customeBidAmount - (customeBidAmount * 10) / 100}</div>
                                            </HStack>
                                        </div>

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
                                        <button className="bg-primary text-secondary rounded h-[36px] px-4 mt-4" onClick={handleSubmit}>
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
                                    <textarea rows="10" className="border border-tertiary w-full rounded"></textarea>
                                    <div className="text-right text-gray-300">(0/500)</div>
                                    <div className="font-semibold mt-4">Attachments</div>
                                    <div class="max-w-xl">
                                        <label
                                            class="flex justify-center w-full h-20 px-4 transition bg-green-200 border-2 border-green-600 border-dashed rounded-md appearance-none cursor-pointer">
                                            <span class="flex items-center space-x-2">
                                                <span>
                                                    Drag or&nbsp;
                                                    <span class="text-green-600 underline">upload</span>
                                                    &nbsp;project files
                                                </span>
                                            </span>
                                            <input type="file" name="file_upload" class="hidden" />
                                        </label>
                                    </div>
                                    <button className="bg-primary text-secondary rounded h-[36px] px-4 mt-4" onClick={() => setPage(1)}>Submit Proposal</button>
                                </div>
                            </>


                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default JobApply
