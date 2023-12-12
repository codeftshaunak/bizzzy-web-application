import { formatDistanceToNow } from "date-fns";
import { AiFillStar } from "react-icons/ai";
import { FiEdit2, FiEye, FiUser } from "react-icons/fi";
import { LiaRetweetSolid } from "react-icons/lia";
import { RxCross1 } from "react-icons/rx";
import { TbFileDollar } from "react-icons/tb";
import { useLocation } from "react-router-dom";


export const JobPostView = () => {
  const location = useLocation();
  const jobDetails = location.state && location?.state?.jobDetails;
  const {
    amount, budget, client_detail, created_at, description, experience, file, proposal_details, skills, tags, title, updated_at,
  } = jobDetails || [];

  const createdAtAgo = jobDetails &&
    formatDistanceToNow(new Date(jobDetails.created_at), { addSuffix: true });

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="border rounded-lg basis-full md:basis-3/4 border-slate-300">
        <div className="border-b">
          <div className="p-6 space-y-2">
            <h2 className="text-base font-semibold text-[#374151]">
              {title}
              <span className="text-sm ml-3 font-medium text-[#6B7280]">
                Posted {createdAtAgo}
              </span>
            </h2>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <TbFileDollar />
                <p>${amount}.00</p>
              </div>
              <div className="flex items-center gap-2">
                <FiUser />
                <p>{experience}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 border rounded-lg basis-full md:mt-0 md:basis-1/4 border-slate-300">
        <div className="p-6 border-b ">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FiEdit2 className="text-[#16A34A]" />
              <p className="text-sm">Edit posting</p>
            </div>
            <div className="flex items-center gap-2">
              <FiEye className="text-[#16A34A]" />
              <p className="text-sm">View posting</p>
            </div>
            <div className="flex items-center gap-2">
              <LiaRetweetSolid className="text-[#16A34A]" />
              <p className="text-sm">Reuse posting</p>
            </div>
            <div className="flex items-center gap-2">
              <RxCross1 className="text-[#16A34A]" />
              <p className="text-sm">Remove posting</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-3">
          <div>
            <h2 className="text-[#374151] text-base font-semibold ">
              About the client
            </h2>
          </div>
          <div>
            <h2 className="text-[#374151] text-base font-semibold ">
              Payment method verified
            </h2>
            <div className="text-[#374151] text-sm flex items-center gap-1">
              <AiFillStar className="text-[#16A34A]" />
              <AiFillStar className="text-[#16A34A]" />
              <AiFillStar className="text-[#16A34A]" />
              <AiFillStar className="text-[#16A34A]" />
              <AiFillStar className="text-[#16A34A]" />
              <span className="ml-2">5.0 of 30 reviews</span>
            </div>
          </div>
          <div>
            <h2 className="text-[#374151] text-base font-semibold ">
              United States
            </h2>
            <p className="text-[#374151] text-sm">1:18 am</p>
          </div>
          <div>
            <h2 className="text-[#374151] text-base font-semibold ">
              6 jobs posted
            </h2>
            <p className="text-[#374151] text-sm">50% hire rate, 1 open job</p>
          </div>
          <div>
            <h2 className="text-[#374151] text-base font-semibold ">
              $6.3K total spent
            </h2>
            <p>1 hire, 1 active</p>
          </div>
        </div>
      </div>
    </div>
  );
};
