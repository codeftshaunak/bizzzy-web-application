import React, { useEffect, useState } from "react";
import ProfileContainer from "./ProfileContainer";
import bg from "../../assets/avatar.jpeg";
import { BsLink45Deg } from "react-icons/bs";
import ReviewCard from "./ReviewCard";
import { HStack, Avatar } from "@chakra-ui/react";
import { getAllDetailsOfUser } from "../../helpers/userApis";
import { CiLocationOn } from "react-icons/ci";
import { formatTime, getUserLocation } from "../../helpers/formet";
import { ProfileModal } from "./ProfileModal";

export const ClientProfilePage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPage, setModalPage] = useState("");
  const [details, setDetails] = useState([]);
  console.log(details);
  const {
    firstName, lastName, location, profile_image, professional_role, hourly_rate, description, skills, experience, briefDescription, businessName,
  } = details || [];
  const [localTime, setLocalTime] = useState();
  function openModal() {
    setModalIsOpen(true);
  }
  async function getCurrentTimeAndLocation() {
    try {
      const currentDate = new Date();
      const currentTime = formatTime(currentDate);
      const location = await getUserLocation();
      setLocalTime(currentTime);
      return console.log(
        `${location.latitude}, ${location.longitude} - ${currentTime} local time`
      );
    } catch (error) {
      return error;
    }
  }
  setTimeout(() => {
    getCurrentTimeAndLocation();
  }, 1000);
  const getProfileInformation = async () => {
    try {
      const resp = await getAllDetailsOfUser();
<<<<<<< HEAD
      setDetails(resp);
=======
      setDetails(resp.body);
>>>>>>> parent of db37502 (seperating the git create steps)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileInformation();
  }, [modalIsOpen]);
  const handleInputChange = (name, value) => {
    selectedEducation(pre => ({ ...pre, [name]: value }))
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <ProfileContainer>
      <div className="w-[90%] flex flex-col gap-[24px] m-auto">
        <div className=" w-full flex items-center justify-between border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
          <div className="flex gap-[14px] items-center">
            <div style={{ position: "relative", padding: "10px" }}>
              <div style={{ position: "absolute", top: "0px", left: "0px", cursor: "pointer", zIndex: "50" }}>
                <div className="flex items-center justify-center w-[36px] h-[36px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                      stroke="#6B7280"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round" />
                    <path
                      d="M9 4.33301L11.6667 6.99967"
                      stroke="#6B7280"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              {
                !profile_image || profile_image == "null" || profile_image === null ? <Avatar name={firstName + " " + lastName} width={"60px"} height={"60px"} /> : <img src={profile_image} className="w-[60px] rounded-full" />
              }
            </div>
            <div className="flex flex-col justify-start gap-[10px]">
              <p className="text-[24px] text-[#374151] font-semibold">
                {businessName}
              </p>
              <HStack className="text-[16px] text-[#374151] font-[400]">
                <CiLocationOn />{" "}
                <p className="capitalize">
                  {" "}
                  {location}, {localTime} local time
                </p>
              </HStack>
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center justify-center w-[36px] h-[36px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB]">
              <BsLink45Deg width={"20px"} height={"20px"} />
            </div>
            <button className="py-[8px] px-[12px] rounded-[6px] text-[14px] font-500 text-[#fff] bg-[#22C55E]">
              Profile Settings
            </button>
          </div>
        </div>
        <div className="flex gap-[24px]">
          <div className="flex flex-1 gap-[24px]  flex-col ">
            <div className="flex w-[full]  flex-col gap-[24px] border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <p className="text-[20px] text-[#374151] font-[600] ">
                Comming Soon...
              </p>
              <hr className="  border-t-[#D1D5DB] " />
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-start gap-[8px]">
                  <p className="text-[18px] text-[#374151] font-[600]">
                    $400K+
                  </p>
                  <p className="text-[12px] text-[#374151] font-[500]">
                    Total Earnings
                  </p>
                </div>
                <div className="flex flex-col items-start gap-[8px]">
                  <p className="text-[18px] text-[#374151] font-[600]">145 </p>
                  <p className="text-[12px] text-[#374151] font-[500]">
                    Total Jobs
                  </p>
                </div>
                <div className="flex flex-col items-start gap-[8px]">
                  <p className="text-[18px] text-[#374151] font-[600]">680</p>
                  <p className="text-[12px] text-[#374151] font-[500]">
                    Total Hours
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[2] flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[24px]  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <div className="flex gap-[16px] justify-between">
                <div className="">
                  <p className="text-[20px] text-[#374151] font-[600] w-[480px]">
                    Client Description
                  </p>
                </div>
                <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                      stroke="#6B7280"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round" />
                    <path
                      d="M9 4.33301L11.6667 6.99967"
                      stroke="#6B7280"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <p className="text-[14px] text-[#374151] font-[400] w-[400px]">
                {briefDescription}
              </p>
            </div>
            <div className="flex flex-col gap-[24px]  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-[16px] text-[#374151] font-[600]">
                  Work History
                </p>
              </div>
              <div className="flex flex-col gap-[6px]">
                <p className="text-[14px] text-[#16A34A] font-[600] cursor-pointer">
                  Completed Jobs
                </p>
                <div className="h-[2px] w-[60px] bg-[#16A34A]"></div>
              </div>
              {details?.work_history?.map((item, index) => (
                <ReviewCard key={index} workDetails={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD

      {/* Initial profile modal */}
=======
>>>>>>> parent of db37502 (seperating the git create steps)
      <ProfileModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalPage={modalPage}
        handleInputChange={handleInputChange} />
    </ProfileContainer>
  );
};
