import React from "react";
import CTAButton from "../CTAButton";
import { FiUser, FiEdit2, FiEye } from "react-icons/fi";
import { TbFileDollar } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar } from "react-icons/ai";
import { LiaRetweetSolid } from "react-icons/lia";
const ClientJobPostViewComponent = () => {
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
          ></CTAButton>
        </div>
      </div>

      <div className="my-10">
        <div className="grid gap-4 md:grid-cols-12">

          <div className="col-span-2">
            <div className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center">
              <p>Invite Freelancers</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center">
              <p>
                Review Proposals <span>(13)</span>
              </p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center">
              <p>
                Hire <span>(0)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="border rounded-lg basis-full md:basis-3/4 border-slate-300">
          <div className="border-b">
            <div className="p-6 space-y-2">
              <h2 className="text-base font-semibold text-[#374151]">
                Update our site design with a figma
                <span className="text-sm ml-3 font-medium text-[#6B7280]">
                  Posted 2mins ago
                </span>
              </h2>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <TbFileDollar />
                  <p>$100.00</p>
                </div>
                <div className="flex items-center gap-2">
                  <FiUser />
                  <p>Expert</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <p>
                We have a fully functional website with all the features in
                place. Now, we're looking for a talented Logo and UI Designer to
                enhance the website's visual appeal and user-friendliness.
              </p>
            </div>
            <div>
              <p>Responsibilities:</p>
              <div className="py-4">
                <p>
                  - Design a modern and visually appealing logo that aligns with
                  our brand identity.
                </p>
                <p>
                  - Create a user-friendly and modern UI design in Figma,
                  providing clear instructions for implementation.
                </p>
                <p>
                  - Ensure that the UI design is responsive and compatible with
                  various devices.
                </p>
              </div>
            </div>
            <div>
              <p>Requirements:</p>
              <div className="py-4">
                <p>- Proven experience in logo design and UI/UX design.</p>-
                Proficiency in Figma or similar design tools.
                <p>
                  - Strong understanding of modern design principles and trends.
                </p>
              </div>
            </div>
            <div>
              <p>Additional Information:</p>
              <div className="py-4">
                <p>
                  - This is not a coding job; the website and its features are
                  already developed.
                </p>
                <p>
                  - You will be responsible for the visual aspects and user
                  experience improvements.
                </p>
              </div>
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
              <p className="text-[#374151] text-sm">
                50% hire rate, 1 open job
              </p>
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
    </div>
  );
};

export default ClientJobPostViewComponent;