import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, Progress, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import ClientProfileCard from "./ClientProfileCard";

const ClientDashboardComponent = () => {
  return (
    <div className=" max-w-screen-xl mx-auto">
      <div className=" grid grid-cols-12 gap-4">
        <div className=" col-span-12 md:col-span-9">
          <h2 className=" text-[25px] mb-2">Your Dashboard</h2>
          <h6 className=" text-[16px]">My Team</h6>
          {/* card area start */}
          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-gray-200 p-4 rounded-md">
              <ClientProfileCard />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-gray-200 p-4 rounded-md">
              <ClientProfileCard />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-gray-200 p-4 rounded-md">
              <ClientProfileCard />
            </div>
          </div>
          {/* card area end */}
          {/* start position  */}
          <div className=" mt-6 border border-gray-200  rounded-md">
            <div className=" flex items-center justify-between border-b border-gray-200 p-4 ">
              <div className=" text-[20px]">Your Postings</div>
              <div>
                <Link to="#" className=" text-[14px] text-[green]">
                  See All Postings
                </Link>
              </div>
            </div>
            <div className=" p-4">
              <div className=" flex items-center justify-between mb-4">
                <h5 className=" text-[16px]">
                  NFT artist (2D, 3D, or pixel art)
                </h5>
                <div>
                  <HamburgerIcon />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4 text-sm text-gray-600">
                  <div className=" mb-1">Public - Hourly</div>
                  <div>Posted 14 hours ago by you</div>
                </div>
                <div className="col-span-8">
                  <div className=" grid grid-cols-12 gap-4 text-sm text-gray-600">
                    <div className="col-span-4">
                      <div className=" text-[green] mb-1">(14) New</div>
                      <div>Proposals</div>
                    </div>
                    <div className="col-span-4 text-sm text-gray-600">
                      <div className=" text-[green] mb-1">2</div>
                      <div>Messaged</div>
                    </div>
                    <div className="col-span-4 text-sm text-gray-600">
                      <div className=" mb-1">0</div>
                      <div>Hired</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end position */}

          {/* start draft  */}
          <div className=" mt-6 border border-gray-200  rounded-md">
            <div className=" flex items-center justify-between border-b border-gray-200 p-4 ">
              <div className=" text-[20px]">Your Drafts</div>
              <div>
                <Link to="#" className=" text-[14px] text-[green]">
                  See All Postings
                </Link>
              </div>
            </div>
            <div className=" p-4 border-b border-gray-200">
              <div className=" flex items-center justify-between ">
                <div>
                  <h5 className=" text-[16px] mb-2">
                    NFT artist (2D, 3D, or pixel art)
                  </h5>
                  <p className=" text-[14px] text-gray-600">
                    Saved 13 hours ago
                  </p>
                </div>
                <div>
                  <HamburgerIcon />
                </div>
              </div>
            </div>
            <div className=" p-4 border-b border-gray-200">
              <div className=" flex items-center justify-between ">
                <div>
                  <h5 className=" text-[16px] mb-2">
                    NFT artist (2D, 3D, or pixel art)
                  </h5>
                  <p className=" text-[14px] text-gray-600">
                    Saved 13 hours ago
                  </p>
                </div>
                <div>
                  <HamburgerIcon />
                </div>
              </div>
            </div>
          </div>
          {/* end draft */}
        </div>
        <div className=" col-span-12 md:col-span-3">
          <VStack gap={"5"} w="100%">
            <Button colorScheme="green" size="sm" isFullWidth w={"100%"}>
              Post a new job
            </Button>
            <div className=" w-full border border-gray-200 rounded-md p-2 h-[700px]">
              <h4 className=" text-[18px] mb-4 font-bold">Getting Started</h4>
              <div className=" my-6">
                <Progress value={60} colorScheme="green" size={"sm"} />
              </div>
              <div className=" flex items-center justify-between border border-gray-200 rounded-md py-2 px-4 mb-4">
              <img src="images/dashboard/proposals.png" alt="proposals" />
                <p>Invite talent to apply</p>
              </div>
              <div className=" flex items-center justify-between border border-gray-200 rounded-md py-2 px-4 mb-4">
              <img src="images/dashboard/proposals.png" alt="proposals" />
                <p>Add Billing method</p>
              </div>
              <div className=" flex items-center justify-between border border-gray-200 rounded-md py-2 px-4 mb-4">
              <img src="images/dashboard/proposals.png" alt="proposals" />
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
