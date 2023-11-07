import React from "react";

export const ClientNavbar = () => {
  return (
    <div className="my-10">
      <div className="grid gap-4 md:grid-cols-12">
        <div className="col-span-2">
          <div className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center">
            <p>View Job Post</p>
          </div>
        </div>
        <div className="col-span-2">
          <div className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center">
            <p>Invite Freelancers</p>
          </div>
        </div>
        <div className="col-span-2">
          <div className="border rounded-lg bg-[#F0FDF4] hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center">
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
  );
};

export default ClientNavbar;
