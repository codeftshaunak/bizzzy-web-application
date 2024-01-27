import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllJobsProposal } from "../../helpers/jobApis";
import { getSingleJobDetails } from "../../helpers/jobApis";
import StarRatings from "react-star-ratings";

const JobDetails = ({ setPage, setDetails }) => {
  const { id } = useParams();
  const [job, setJob] = useState();
  const [applyJob, setApplyJob] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);

  const getAppliedJobs = async () => {
    const response = await getAllJobsProposal();
    setApplyJob(response);
  };

  const getDetails = async () => {
    try {
      const response = await getSingleJobDetails(id);
      setJobDetails(response);
    } catch (error) {
      console.error("Error fetching job Details:", error);
    }
  };

  const alreadyApplied = applyJob.filter((item) => item?.jobId?._id === id);

  useEffect(() => {
    getAppliedJobs();
    getDetails();
  }, []);

  const dateObject = new Date(jobDetails[0]?.created_at);
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
      const getJob = await getSingleJobDetails(id);
      setJob(getJob);
      setDetails(getJob);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobDetails();
  }, []);

  const clientDetails = jobDetails[0]?.client_details[0];
  const hiredPercentage =
    (clientDetails?.hired_freelancers / clientDetails?.job_open) * 100;
  const clientHistory = jobDetails[0]?.client_history;

  return (
    <div className="w-[90%]">
      {jobDetails.length > 0 && (
        <div className="py-2 w-full">
          <div className="flex gap-2 py-6">
            <img src="/icons/home.svg" alt="home" />
            <img src="/icons/chevron-right.svg" alt="arrow right" />
            <div className="capitalize">{jobDetails[0]?.title}</div>
          </div>
          <div className="w-full border border-tertiary rounded-2xl p-6 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="flex">
                  <div className="font-semibold mr-2 capitalize">
                    {jobDetails[0]?.title}{" "}
                  </div>
                  <div className="text-gray-300">{formattedTimeElapsed}</div>
                </div>
                <div className="flex gap-3">
                  <div className="flex gap-2">
                    <img src="/icons/receipt.svg" alt="receipt" />{" "}
                    <div className="text-gray-300">
                      ${jobDetails[0]?.amount}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <img src="/icons/user.svg" alt="user" />{" "}
                    <div className="text-gray-300 capitalize">
                      {jobDetails[0]?.experience}
                    </div>
                  </div>
                </div>
              </div>
              {alreadyApplied.length > 0 ? (
                <button className="bg-primary text-secondary font-semibold rounded h-[36px] px-4 disabled">
                  Already Applied
                </button>
              ) : (
                <button
                  className="bg-primary text-secondary rounded font-semibold h-[36px] px-4"
                  onClick={() => setPage(2)}
                >
                  Apply for this Job
                </button>
              )}
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="w-[68%] border border-tertiary rounded-2xl p-6 capitalize">
              <div
                dangerouslySetInnerHTML={{ __html: jobDetails[0]?.description }}
              />
            </div>
            <div className="w-[30%] border border-tertiary rounded-2xl p-6">
              <div className="font-semibold mb2">About the client</div>
              <div className="font-semibold">Payment method verified</div>
              <div className="flex items-center mb-4">
                {jobDetails.length > 0 && (
                  <StarRatings
                    rating={Number(
                      jobDetails[0]?.client_details[0]?.avg_review
                    )}
                    starDimension="18px"
                    starSpacing="1px"
                    starRatedColor="#16A34A"
                    starEmptyColor="#8ab89b"
                  />
                )}
                {clientDetails?.avg_review} of{" "}
                {clientDetails?.hired_freelancers} reviews
              </div>
              <div className="font-semibold">United States</div>
              <div className="mb-4">1:18 am</div>
              <div className="font-semibold">
                {clientDetails?.job_posted} jobs posted
              </div>
              <div className="mb-4">
                {hiredPercentage.toFixed()}% hire rate,{" "}
                {clientDetails?.job_open} open job
              </div>
              <div className="font-semibold">$6.3K total spent</div>
              <div className="mb-4">1 hire, 1 active</div>
              <div className="font-semibold">
                {clientDetails?.hired_freelancers} hire,{" "}
                {clientDetails?.active_freelancers} active
              </div>
              <div>{clientDetails?.total_hours} hours</div>
            </div>
          </div>
          <div className="w-[68%] border border-tertiary rounded-2xl mt-4">
            <div className="font-semibold p-6">Clients History</div>
            {clientHistory?.map(({ _id, title, amount, status }) => (
              <div key={_id} className="border-b border-tertiary px-6 mb-4">
                <div className="font-semibold">{title}</div>
                <div className="text-gray-200">
                  {status === "open" ? "Job in progress" : "Already done"}
                </div>
                <div className="w-full flex justify-between mb-4">
                  <div className="text-gray-300">Budget: ${amount}</div>
                  {/* <div className="text-gray-300">298 hrs @ $20.00</div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
