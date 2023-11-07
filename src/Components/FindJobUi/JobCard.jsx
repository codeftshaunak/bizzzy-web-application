import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ jobs }) => {
    const navigate = useNavigate();

    return (
        <div>
            {
                jobs?.length > 0 ?
                    jobs.map((job, index) => {
                        return <>
                            <div className="p-4 border-b border-tertiary" key={index}>
                                <div className="text-gray-300 text-sm">{job?.budget == 1 && " Fixed Budget " || job?.budget == 2 && "Hourly"}/ {job?.experience} / Est. Budget:<span className='text-black'>${job?.amount}</span>  / {job?.created_at}</div>
                                <div className="font-semibold mt-2 mb-2 cursor-pointer text-xl"
                                    onClick={() => {
                                        navigate(`/find-job/${job?._id}`)
                                    }}
                                >{job?.title}</div>
                                <div className="text-gray-300 text-sm mb-2">
                                    {job?.description}
                                </div>
                                <div class="flex items-center ">
                                    <div class="star-filled">★</div>
                                    <div class="star-filled">★</div>
                                    <div class="star-filled">★</div>
                                    <div class="star-filled">★</div>
                                    <div class="star-filled">★</div>
                                    <div className="text-sm font-medium text-gray-400 pl-2">5.0 300K+ Spent / United States</div>
                                </div>
                            </div>
                        </>
                    }) : <>
                        <div className='text-center p-5'>
                            <h3>No Jobs Available For Now🎁</h3>
                        </div>
                    </>
            }

        </div>
    )
}

export default JobCard
