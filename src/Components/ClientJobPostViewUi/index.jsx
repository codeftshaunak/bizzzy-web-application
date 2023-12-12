import {
  HStack,
  Image
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CTAButton from "../CTAButton";
import { ClientHire } from "./ClientHire";
import { ReviewProposal } from "./ReviewProposal";
import { InviteFreelancer } from "./InviteFreelancer";
import { JobPostView } from "./JobPostView";

export const ClientJobPostViewComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const jobDetails = location.state && location.state.jobDetails;
  return (
    <div className="w-full md:px-8 md:py-6">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-[#374151] ">
            Your Dashboard
          </h2>
          <p className="text-lg font-normal text-[#374151] ">Joe doe</p>
        </div>
        <div className="mt-4">
          <CTAButton
            text={"Post a new job"}
            bg={"#16A34A"}
            color={"#ffff"}
            fontSize="1rem"
            height="2.5rem"
            onClick={() => navigate("/create-job")}
          ></CTAButton>
        </div>
      </div>

      <div className="my-10">
        <div className="grid gap-4 md:grid-cols-12">
          <div className="col-span-2">
            <div
              className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center"
              onClick={() => {
                setPage(0);
              }}
            >
              <p>View Job Post</p>
            </div>
          </div>
          <div className="col-span-2">
            <div
              className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center"
              onClick={() => setPage(1)}
            >
              <p>Invite Freelancers</p>
            </div>
          </div>
          <div className="col-span-2">
            <div
              className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center"
              onClick={() => setPage(2)}
            >
              <p>
                Review Proposals{" "}
                <span>
                  (
                  {jobDetails?.proposal_details
                    ? jobDetails?.proposal_details?.length
                    : ""}
                  )
                </span>
              </p>
            </div>
          </div>
          <div className="col-span-2">
            <div
              className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center"
              onClick={() => setPage(3)}
            >
              <p>
                Hire <span>(0)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {page === 0 && <JobPostView />}
      {page === 1 && <InviteFreelancer />}
      {page === 2 && <ReviewProposal />}
      {page === 3 && <ClientHire />}
    </div>
  );
};


