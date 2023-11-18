// import { formatDistanceToNow } from 'date-fns';
// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const JobCard = ({ jobs }) => {
//     const navigate = useNavigate();

//     return (
//         <div>
//             {
//                 jobs?.length > 0 ?
//                     jobs?.slice().reverse().map((job, index) => {
//                         const formattedDate = formatDistanceToNow(new Date(job?.created_at), { addSuffix: true });

//                         return <div key={index}>
//                             <div className="p-4 border-b border-tertiary">
//                                 <div className="text-gray-300 text-sm">{job?.budget == 1 && " Fixed Budget " || job?.budget == 2 && "Hourly"}/ {job?.experience} / Est. Budget:<span className='text-black'>${job?.amount}</span>  / {formattedDate}</div>
//                                 <div className="font-semibold mt-2 mb-2 cursor-pointer text-xl"
//                                     onClick={() => {
//                                         navigate(`/find-job/${job?._id}`)
//                                     }}
//                                 >{job?.title}</div>
//                                 <div className="text-gray-300 text-sm mb-2">
//                                     {job?.description}
//                                 </div>
//                                 <div className="flex items-center ">
//                                     <div className="star-filled">★</div>
//                                     <div className="star-filled">★</div>
//                                     <div className="star-filled">★</div>
//                                     <div className="star-filled">★</div>
//                                     <div className="star-filled">★</div>
//                                     <div className="text-sm font-medium text-gray-400 pl-2">5.0 300K+ Spent / United States</div>
//                                 </div>
//                             </div>
//                         </div>
//                     }) : <>
//                         <div className='text-center p-5'>
//                             <h3>No Jobs Available For Now🎁</h3>
//                         </div>
//                     </>
//             }

//         </div >
//     )
// }

// export default JobCard;

import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ jobs }) => {
    const navigate = useNavigate();
    const [visibleJobs, setVisibleJobs] = useState(4);
    return (
        <>
            <div>
                {jobs?.length > 0 ? (
                    jobs.slice(0, visibleJobs).reverse().map((job, index) => {
                    
                        const formattedDate = formatDistanceToNow(new Date(job?.created_at), {
                            addSuffix: true,
                        });

                        return (
                          <div key={index}>
                            <div className="p-4 border-b border-tertiary">
                              <div className="text-gray-300 text-sm">
                                {(job?.budget == 1 && " Fixed Budget ") ||
                                  (job?.budget == 2 && "Hourly")}
                                / {job?.experience} / Est. Budget:
                                <span className="text-black">
                                  ${job?.amount}
                                </span>{" "}
                                / {formattedDate}
                              </div>
                              <div
                                className="font-semibold mt-2 mb-2 cursor-pointer text-xl"
                                onClick={() => {
                                  navigate(`/find-job/${job?._id}`);
                                }}
                              >
                                {job?.title}
                              </div>
                              <div className="text-gray-300 text-sm mb-2">
                                {job?.description}
                              </div>
                              <div className="flex items-center ">
                                <div className="star-filled">★</div>
                                <div className="star-filled">★</div>
                                <div className="star-filled">★</div>
                                <div className="star-filled">★</div>
                                <div className="star-filled">★</div>
                                <div className="text-sm font-medium text-gray-400 pl-2">
                                  5.0 300K+ Spent / United States
                                </div>
                              </div>
                              <div>
                                <b>Skills</b>
                                {job?.skills.map((skill, indx) => (
                                  <p key={indx}>{skill}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                    })
                ) : (
                    <>
                        <div className="text-center p-5">
                            <h3>No Jobs Available For Now🎁</h3>
                        </div>
                    </>
                )}
            </div>
        </>

    );
};

export default JobCard;

