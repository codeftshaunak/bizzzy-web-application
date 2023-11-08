import { Button, Progress, VStack } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiDotsThreeBold } from "react-icons/pi";

import ClientProfileCard from "./ClientProfileCard";

const ClientDashboardComponent = () => {
  const navigate = useNavigate();
  return (
    <div className=" max-w-screen-xl mx-auto">
      <div className=" grid grid-cols-12 gap-4">
        <div className=" col-span-12 md:col-span-9">
          <h2 className=" text-[25px] mb-2">Your Dashboard</h2>
          <h6 className=" text-[16px]">My Team</h6>
          {/* card area start */}
          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-[#D1D5DB] p-4 rounded-lg">
              <ClientProfileCard />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-[#D1D5DB] p-4 rounded-lg">
              <ClientProfileCard />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-[#D1D5DB] p-4 rounded-lg">
              <ClientProfileCard />
            </div>
          </div>
          {/* card area end */}
          {/* start position  */}
          <div className=" mt-6 border border-[#D1D5DB]  rounded-md">
            <div className=" flex items-center justify-between border-b border-[#D1D5DB] p-4 ">
              <div className=" text-2xl font-medium text-[#374151]">Your Postings</div>
              <div>
                <Link to="#" className=" text-lg font-medium text-fg-brand">
                  See All Postings
                </Link>
              </div>
            </div>
            <div className=" p-4">
              <div className=" flex items-center justify-between mb-4">
                <h5 className="text-lg text-[#374151] font-medium">
                  NFT artist (2D, 3D, or pixel art)
                </h5>
                <div>
                  <PiDotsThreeBold className="w-[24px] h-[26px] border border-black rounded-full" />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4 text-sm text-[#6B7280]">
                  <div className="mb-1 text-[#6B7280] ">Public - Hourly</div>
                  <div>Posted 14 hours ago by you</div>
                </div>
                <div className="col-span-8">
                  <div className=" grid grid-cols-12 gap-4 text-sm text-[#6B7280]">
                    <div className="col-span-4">
                      <div className=" text-fg-brand mb-1">(14) New</div>
                      <div className="text-[#6B7280]">Proposals</div>
                    </div>
                    <div className="col-span-4 text-sm text-[#6B7280]">
                      <div className=" text-fg-brand mb-1">2</div>
                      <div className="text-[#6B7280]">Messaged</div>
                    </div>
                    <div className="col-span-4 text-sm text-[#6B7280]">
                      <div className=" mb-1">0</div>
                      <div className="text-[#6B7280]">Hired</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end position */}

          {/* start draft  */}
          <div className=" mt-6 border border-[#D1D5DB]  rounded-md">
            <div className=" flex items-center justify-between border-b border-[#D1D5DB] p-4 ">
              <div className=" text-2xl font-medium text-[#374151]">Your Drafts</div>
              <div>
                <Link to="#" className=" text-lg font-medium text-fg-brand">
                  See All Postings
                </Link>
              </div>
            </div>
            <div className=" p-4 border-b border-[#D1D5DB]">
              <div className=" flex items-center justify-between ">
                <div className="space-y-2">
                  <h5 className="text-lg text-[#374151] font-medium">
                    NFT artist (2D, 3D, or pixel art)
                  </h5>
                  <p className=" text-sm font-medium text-[#6B7280]">
                    Saved 13 hours ago
                  </p>
                </div>
                <div>
                <PiDotsThreeBold className="w-[24px] h-[26px] border border-black rounded-full" />
                </div>
              </div>
            </div>
            <div className=" p-4 border-b border-[#D1D5DB]">
              <div className=" flex items-center justify-between ">
              <div className="space-y-2">
                  <h5 className="text-lg text-[#374151] font-medium">
                    NFT artist (2D, 3D, or pixel art)
                  </h5>
                  <p className=" text-sm font-medium text-[#6B7280]">
                    Saved 13 hours ago
                  </p>
                </div>
                <div>
                <PiDotsThreeBold className="w-[24px] h-[26px] border border-black rounded-full" />
                </div>
              </div>
            </div>
          </div>
          {/* end draft */}
        </div>

        <div className=" col-span-12 md:col-span-3">
          <VStack gap={"5"} w="100%">
            <Button colorScheme="green" size="sm" isFullWidth w={"100%"} onClick={() => {
              navigate("/create-job")
            }}>
              Post a new job
            </Button>
            <div className=" w-full border border-[#D1D5DB] rounded-md p-4 h-[700px]">
              <h4 className=" text-[18px] mb-4 font-bold">Getting Started</h4>
              <div className=" my-6">
                <Progress value={60} colorScheme="green" size={"sm"} />
              </div>
              <div className=" flex items-center justify-between border border-[#D1D5DB] rounded-md py-2 px-4 mb-4">
                <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                  <img src="images/dashboard/proposals.png" alt="proposals" />
                </div>
                <p>Invite talent to apply</p>
              </div>    
              <div className=" flex items-center justify-between border border-[#D1D5DB] rounded-md py-2 px-4 mb-4">
                <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                  <img src="images/dashboard/proposals.png" alt="proposals" />
                </div>
                <p>Add Billing method</p>
              </div>
              <div className=" flex items-center justify-between border border-[#D1D5DB] rounded-md py-2 px-4 mb-4">
                <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                  <img src="images/dashboard/proposals.png" alt="proposals" />
                </div>
                <p>Review proposals</p>
              </div>
            </div>
          </VStack>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardComponent;
