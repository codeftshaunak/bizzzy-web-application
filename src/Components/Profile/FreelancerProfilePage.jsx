import React, { useEffect, useState } from "react";
import ProfileContainer from "./ProfileContainer";
import SkillCard from "./SkillCard";
import { BsLink45Deg, BsPlus } from "react-icons/bs";
import PortfolioCard from "./PortfolioCard";
import ReviewCard from "./ReviewCard";
import { HStack, VStack, Avatar, Box, Text, Button } from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import { formatTime, getUserLocation } from "../../helpers/formet";
import { ProfileModal } from "./ProfileModal";
import AlertDeleteDialog from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileGigCards } from "../Gigs/SingleGig/ProfileGigCards";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";

export const FreelancerProfilePage = ({ viewAs }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPage, setModalPage] = useState("");
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [deleteModalPage, setDeleteModalPage] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [id, setId] = useState({ id: "", type: "" });

  const profile = useSelector((state) => state.profile);
  const {
    firstName,
    lastName,
    profile_image,
    location,
    professional_role,
    hourly_rate,
    description,
    skills,
    experience,
    education,
    portfolio,
  } = profile.profile || [];

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

  function closeModal() {
    setModalIsOpen(false);
    setModalPage("");
  }

  const [selectedEducation, setSelectedEducation] = useState(null);
  const openEditModal = (edu) => {
    setSelectedEducation(edu);
    setModalPage("educationEdit");
    openModal();
  };

  const openEditBasicModal = (title, rate, desc) => {
    const basicInformation = {
      professional_role: title,
      hourly_rate: rate,
      description: desc,
    };
    setSelectedEducation(basicInformation);
    setModalPage("basicInformation");
    openModal();
  };

  const openExperienceEditModal = (edu) => {
    setSelectedEducation(edu);
    setModalPage("experienceUpdated");
    openModal();
  };

  const openEditSkills = () => {
    setSelectedEducation("");
    setModalPage("skills");
    openModal();
  };

  const handleDelete = (id, type) => {
    setId({ id, type });
    setDeleteModalOpen(true);
    setDeleteModalPage(type);
  };

  return (
    <ProfileContainer>
      <div className="w-[90%] justify-center m-auto flex flex-col gap-[24px]">
        <div className="w-[100%] flex items-center justify-between border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
          <div className="flex gap-[14px] items-center">
            <div style={{ position: "relative", padding: "10px" }}>
              {!viewAs && (
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    cursor: "pointer",
                    zIndex: "1",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB]"
                    onClick={() => {
                      setModalPage("editProfile");
                      openModal();
                    }}
                  >
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
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 4.33301L11.6667 6.99967"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {!profile_image ||
              profile_image == "null" ||
              profile_image === null ? (
                <Avatar
                  name={firstName + " " + lastName}
                  width={"60px"}
                  height={"60px"}
                />
              ) : (
                <img
                  src={profile_image}
                  className="w-[60px] rounded-full shadow-md"
                />
              )}
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-[24px] text-[#374151] font-semibold pl-3">
                {firstName + " " + lastName?.slice(0, 1) + "."}
              </p>
              <HStack className="text-[16px] text-[#374151] font-[400]">
                <CiLocationOn />
                <p className="capitalize">
                  {location}, {localTime} local time
                </p>
              </HStack>
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center cursor-pointer justify-center w-[36px] h-[36px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB]">
              <BsLink45Deg width={"20px"} height={"20px"} />
            </div>
            {!viewAs && (
              <button className="py-[8px] px-[12px] rounded-[6px] text-[14px] font-500 text-[#fff] bg-[#22C55E]">
                Profile Settings
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-[24px]">
          <div className="flex flex-1 gap-[24px] flex-col w-full">
            {/* ==================== Freelance Stats ====================== */}
            <div className="flex w-[400px] relative flex-col gap-[24px] border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <p className="text-[20px] text-[#374151] font-[600] ">
                Freelance Stats
              </p>
              <VStack
                backgroundColor={"#f4f5f787"}
                height={"80px"}
                shadow={"sm"}
                justifyContent={"center"}
              >
                <Text fontWeight={"600"} top={"8rem"} textAlign={"center"}>
                  Updated Freelancer Stats <br /> Coming Soon
                </Text>
              </VStack>
            </div>
            {/* ==================== Freelance Stats ====================== */}

            {/* ==================== Education ====================== */}
            <div className="flex w-[400px] flex-col gap-[24px] border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-[16px] text-[#374151] font-[600]">
                  Education
                </p>
                {!viewAs && (
                  <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB]">
                    <BsPlus
                      width={"16px"}
                      height={"16px"}
                      cursor={"pointer"}
                      onClick={() => {
                        setModalPage("education");
                        openModal();
                      }}
                    />
                  </div>
                )}
              </div>
              {education?.length > 0 &&
                education?.map((edu) => (
                  <div className="flex flex-col gap-[8px]" key={edu?._id}>
                    <div className="flex items-center justify-between">
                      <p className="text-[16px] text-[#374151] font-[600]">
                        {edu?.institution}
                      </p>
                      <div className="flex items-center gap-[12px]">
                        {!viewAs && (
                          <div
                            className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB] cursor-pointer"
                            onClick={() => {
                              openEditModal(edu);
                            }}
                          >
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
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9 4.33301L11.6667 6.99967"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                        {!viewAs && (
                          <div
                            className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB] cursor-pointer"
                            onClick={() => handleDelete(edu._id, "education")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M9.33333 7.33301V11.333"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.66634 7.33301V11.333"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M2.66699 4.66634H13.3337"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M3.33301 4.66699L3.99967 12.667C3.99967 13.4034 4.59663 14.0003 5.33301 14.0003H10.6663C11.4027 14.0003 11.9997 13.4034 11.9997 12.667L12.6663 4.66699"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 4.66667V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4.66667"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-[14px] text-[#374151] font-[400]">
                      {edu?.degree_name}
                    </p>
                    <p className="text-[14px] text-[#374151] font-[400]">
                      {edu?.end_date}
                    </p>
                  </div>
                ))}
            </div>
            {/* ==================== Education ====================== */}
            {/* ==================== Experience ====================== */}
            <div className="flex flex-col gap-[24px] border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg w-[400px]">
              <div className="flex items-center justify-between">
                <p className="text-[16px] text-[#374151] font-[600]">
                  Experience
                </p>
                {!viewAs && (
                  <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB]">
                    <BsPlus
                      width={"16px"}
                      height={"16px"}
                      cursor={"pointer"}
                      onClick={() => {
                        setModalPage("experience");
                        openModal();
                      }}
                    />
                  </div>
                )}
              </div>
              {experience?.length > 0 &&
                experience?.map((experience) => {
                  const startDate = new Date(experience.start_date);
                  const endDate = new Date(experience.end_date);
                  const startYear = startDate.getFullYear();
                  const endYear = endDate.getFullYear();
                  return (
                    <>
                      <div
                        className="flex flex-col gap-[8px]"
                        key={experience._id}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-[16px] text-[#374151] font-[600]">
                            {experience?.company_name}
                          </p>
                          <div className="flex items-center gap-[12px]">
                            {!viewAs && (
                              <div
                                className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB] cursor-pointer"
                                onClick={() => {
                                  openExperienceEditModal(experience);
                                }}
                              >
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
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M9 4.33301L11.6667 6.99967"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                            {!viewAs && (
                              <div
                                className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB] cursor-pointer"
                                onClick={() =>
                                  handleDelete(experience._id, "experience")
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M9.33333 7.33301V11.333"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M6.66634 7.33301V11.333"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2.66699 4.66634H13.3337"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3.33301 4.66699L3.99967 12.667C3.99967 13.4034 4.59663 14.0003 5.33301 14.0003H10.6663C11.4027 14.0003 11.9997 13.4034 11.9997 12.667L12.6663 4.66699"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M6 4.66667V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4.66667"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-[14px] text-[#374151]  font-bold">
                          {experience?.position}
                        </p>
                        <p className="text-[14px] text-[#374151] font-[400]">
                          {experience?.job_location} | {startYear} to {endYear}
                        </p>
                        <p className="text-[14px] text-[#374151] font-[400]">
                          {experience?.job_description}
                        </p>
                      </div>
                    </>
                  );
                })}
            </div>
            {/* ==================== Basic info ====================== */}
          </div>
          <div className="flex-[2] flex flex-col gap-[24px]  w-[860px]">
            <div className="flex flex-col gap-5  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <div className="flex gap-[16px] justify-between">
                <p className="text-[20px] text-[#374151] font-[600] w-[480px]">
                  {professional_role}
                </p>

                <div className="flex gap-5">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    ${hourly_rate}/hr
                  </p>
                  {!viewAs && (
                    <div
                      className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB] cursor-pointer"
                      onClick={() => {
                        openEditBasicModal(
                          professional_role,
                          hourly_rate,
                          description
                        );
                      }}
                    >
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
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 4.33301L11.6667 6.99967"
                          stroke="#6B7280"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[14px] text-[#374151] font-[400]">
                {description}
              </p>
            </div>
            {/* ===================== skills ============= */}
            <div className="flex flex-col gap-[24px]  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              {!viewAs && (
                <div className="flex items-center justify-between">
                  <p className="text-[16px] text-[#374151] font-[600]">
                    Skills
                  </p>
                  <div
                    className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB] cursor-pointer"
                    onClick={() => openEditSkills()}
                  >
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
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 4.33301L11.6667 6.99967"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4">
                {skills?.length > 0 &&
                  skills?.map((skill, idx) => {
                    return <SkillCard title={skill} key={idx} />;
                  })}
              </div>
            </div>
            {/* ======================= portfolio =============== */}
            <div className="flex flex-col gap-[24px]  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-[16px] text-[#374151] font-[600]">
                  Portfolio
                </p>
                {!viewAs && (
                  <div
                    className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB] cursor-pointer"
                    onClick={() => {
                      setModalPage("portfolio");
                      openModal();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8.00033 3.33301V12.6663"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.33301 8.00033H12.6663"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="-z-0">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[FreeMode, Pagination]}
                >
                  {portfolio?.length > 0 &&
                    portfolio?.map((port, idx) => (
                      <SwiperSlide key={idx}>
                        {" "}
                        <PortfolioCard key={idx} portfolio={port} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>

            <div className="flex flex-col gap-[24px]  border-[1px] pt-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <div>
                <p className="text-[16px] text-[#374151] font-[600] pb-3">
                  {viewAs ? "Freelancer Gigs" : "Your Gigs"}
                </p>
                <hr />
                <p className="mt-3">
                  Projects are a new way to earn on Bizzzy that helps you do
                  more of the work you love to do. Create project offerings that
                  highlight your strengths and attract more clients.
                </p>
                {!viewAs && (
                  <button
                    className="text-start px-5 py-1 rounded-full border-2 border-[var(--primarytextcolor)] hover:text-white hover:bg-[var(--primarytextcolor)] transition h-fit w-fit font-semibold mt-3"
                    onClick={() => navigate("/freelancer/gig")}
                  >
                    Manage Gigs
                  </button>
                )}
                <div className="mt-10 w-full">
                  <ProfileGigCards />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4"></div>
            </div>

            {/* ================= work history ====================== */}
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
              {profile?.work_history?.map((item, index) => (
                <ReviewCard key={index} workDetails={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ProfileModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalPage={modalPage}
        selectedEducation={selectedEducation}
        inputChange={setSelectedEducation}
        setModalIsOpen={setModalIsOpen}
      />
      {deleteModalOpen ? (
        <AlertDeleteDialog
          modalIsOpen={setDeleteModalOpen}
          id={id}
          deleteModalPage={modalPage}
          setModalIsOpen={setDeleteModalOpen}
        />
      ) : (
        <></>
      )}
    </ProfileContainer>
  );
};
