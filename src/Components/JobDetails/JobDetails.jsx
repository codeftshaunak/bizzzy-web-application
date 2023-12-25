import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getJobById } from '../../helpers/jobApis';

const JobDetails = ({ setPage, setDetails }) => {
    const { id } = useParams();
    const [job, setJob] = useState();

    const dateObject = new Date(job?.created_at);
    const currentTime = new Date();
    const timeDifference = currentTime - dateObject;

    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Construct the string representation
    const formattedTimeElapsed =
        days > 0
            ? `${days} day${days !== 1 ? "s" : ""} ago`
            : hours > 0
                ? `${hours} hour${hours !== 1 ? "s" : ""} ago`
                : `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;



    const getJobDetails = async () => {
        try {
            const getJob = await getJobById(id);
            setJob(getJob);
            setDetails(getJob);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getJobDetails();
    }, [id])

    return (
        <div className="w-full">
            <div className="py-2 w-full">
                <div className="flex gap-2 py-6">
                    <img src="/icons/home.svg" alt="home" />
                    <img src="/icons/chevron-right.svg" alt="arrow right" />
                    <div className="capitalize">{job?.title}</div>
                </div>
                <div className="w-full border border-tertiary rounded-2xl p-6 mb-4">
                    <div className="flex justify-between items-center">
                        <div className='flex flex-col gap-2'>
                            <div className='flex'>
                                <div className="font-semibold mr-2 capitalize">{job?.title} </div>
                                <div className="text-gray-300">{formattedTimeElapsed}</div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex gap-2"><img src="/icons/receipt.svg" alt="receipt" /> <div className='text-gray-300'>${job?.amount}</div></div>
                                <div className="flex gap-2"><img src="/icons/user.svg" alt="user" /> <div className='text-gray-300 capitalize'>{job?.experience}</div></div>
                            </div>
                        </div>
                        <button className="bg-primary text-secondary rounded h-[36px] px-4" onClick={() => setPage(2)}>Apply for this Job</button>
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <div className="w-[68%] border border-tertiary rounded-2xl p-6 capitalize">
                        {job?.description}
                    </div>
                    <div className="w-[30%] border border-tertiary rounded-2xl p-6">
                        <div className="font-semibold mb2">About the client</div>
                        <div className="font-semibold">Payment method verified</div>
                        <div className="flex items-center mb-4">
                            <div className="star-filled"></div>
                            <div className="star-filled"></div>
                            <div className="star-filled"></div>
                            <div className="star-filled"></div>
                            <div className="star-filled"></div>
                            5.0 of 30 reviews
                        </div>
                        <div className="font-semibold">United States</div>
                        <div className="mb-4">1:18 am</div>
                        <div className="font-semibold">6 jobs posted</div>
                        <div className="mb-4">50% hire rate, 1 open job</div>
                        <div className="font-semibold">$6.3K total spent</div>
                        <div className="mb-4">1 hire, 1 active</div>
                        <div className="font-semibold">1 hire, 1 active</div>
                        <div>298 hours</div>
                    </div>
                </div>
                <div className="w-[68%] border border-tertiary rounded-2xl mt-4">
                    <div className="font-semibold p-6">Clients History</div>
                    <div className="border-b border-tertiary px-6 mb-4">
                        <div className="font-semibold">Update our site design with a figma</div>
                        <div className='text-gray-200'>Job in progress</div>
                        <div className="w-full flex justify-between mb-4">
                            <div className='text-gray-300'>Budget: $100</div>
                            <div className='text-gray-300'>298 hrs @ $20.00</div>
                        </div>
                    </div>
                    <div className="border-b border-tertiary px-6">
                        <div className="font-semibold mt-4">Update our site design with a figma</div>
                        <div className='text-gray-200'>Job in progress</div>
                        <div className="w-full flex justify-between mb-4">
                            <div className='text-gray-300'>Budget: $100</div>
                            <div className='text-gray-300'>298 hrs @ $20.00</div>
                        </div>
                    </div>
                    <div className="px-6">
                        <div className="font-semibold mt-4">Update our site design with a figma</div>
                        <div className='text-gray-200'>Job in progress</div>
                        <div className="w-full flex justify-between mb-4">
                            <div className='text-gray-300'>Budget: $100</div>
                            <div className='text-gray-300'>298 hrs @ $20.00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails
