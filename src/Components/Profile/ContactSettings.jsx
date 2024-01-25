import React from "react";

const ContactSettings = () => {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px] py-[20px] px-[24px] ">
        <p className="text-[#374151] text-[16px] font-[600]">
          Contact Settings
        </p>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[#374151] text-[14px] font-[500]">Email Address</p>
          <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
            <input
              type="text"
              className="w-full focus:outline-none  text-[14px] text-[#9CA3AF] font-[400] border-[#D1D5DB] "
              placeholder="Work Email Address"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[#374151] text-[14px] font-[500]">Name</p>
          <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
            <input
              type="text"
              className="w-full focus:outline-none  text-[14px] text-[#9CA3AF] font-[400] border-[#D1D5DB] "
              placeholder="Full Name"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[#374151] text-[14px] font-[500]">Phone Number</p>
          <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
            <input
              type="text"
              className="w-full focus:outline-none  text-[14px] text-[#9CA3AF] font-[400] border-[#D1D5DB] "
              placeholder="Phone Number"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[#374151] text-[14px] font-[500]">Address</p>
          <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
            <input
              type="text"
              className="w-full focus:outline-none  text-[14px] text-[#9CA3AF] font-[400] border-[#D1D5DB] "
              placeholder="Address"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[#374151] text-[14px] font-[500]">Timezone</p>
          <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
            <input
              type="text"
              className="w-full focus:outline-none  text-[14px] text-[#9CA3AF] font-[400] border-[#D1D5DB] "
              placeholder="Timezone"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
          <button className="text-[14px] text-[#374151] font-[500] border-[1px] border-[#D1D5DB] py-[4px] px-[20px] rounded-md ">
            Cancel
          </button>
          <button className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[4px] px-[20px] rounded-md ">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSettings;
