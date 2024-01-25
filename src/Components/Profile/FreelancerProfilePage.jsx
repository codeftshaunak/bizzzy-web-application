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
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { ProfileGigCards } from "../Gigs/SingleGig/ProfileGigCards";

export const FreelancerProfilePage = () => {
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

  // const updatedEducationInfo = async () => {
  //   axios
  //     .put(
  //       "http://localhost:5002/api/v1/edit-profile",
  //       {
  //         education: {
  //           educationId: "65a2d4a62f6ce5b5ef6ca6f6",
  //           degree_name: "Honors",
  //           institution: "National University ",
  //           start_date: "2024-01-12",
  //           end_date: "2024-01-20",
  //         },
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           token:
  //             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTJhMzY5MmY2Y2U1YjVlZjZjYTRlZSIsImVtYWlsIjoieWVoZWppNTU4OEB0ZWx2ZXR0by5jb20iLCJyb2xlIjoxLCJpYXQiOjE3MDUxNTc1MTgsImV4cCI6MTcwNTI0MzkxOH0.n5YpJDSLcArH9IRPXQxQJjJTQMFxwhXUFXgfGkwQQFY"
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // useEffect(() => {
  //   updatedEducationInfo()
  // })

  const HandleDeleteEducation = (id, type) => {
    setId({ id, type });
    setDeleteModalPage("exprience");
    setDeleteModalOpen(true);
  };

  return (
    <ProfileContainer>
      <div className="w-[90%] justify-center m-auto flex flex-col gap-[24px]">
        <div className="w-full flex items-center justify-between border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
          <div className="flex gap-[14px] items-center">
            <div style={{ position: "relative", padding: "10px" }}>
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  zIndex: "50",
                  cursor: "pointer",
                }}
              >
                <div className="flex items-center justify-center w-[36px] h-[36px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    onClick={() => {
                      setModalPage("editProfile");
                      openModal();
                    }}
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
              {/* <div
                className="flex items-center justify-center rounded-full w-[70px] h-[70px] !bg-cover !bg-top"
                style={{
                  background: `url(${profile_image})`,
                }}
              ></div> */}
              {!profile_image ||
              profile_image == "null" ||
              profile_image === null ? (
                <Avatar
                  name={firstName + " " + lastName}
                  width={"60px"}
                  height={"60px"}
                />
              ) : (
                <img src={profile_image} className="w-[60px] rounded-full" />
              )}
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-[24px] text-[#374151] font-semibold pl-3">
                {firstName + ' ' + lastName.slice(0, 1) + '.'}
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
            <div className="flex items-center justify-center w-[36px] h-[36px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB]">
              <BsLink45Deg width={"20px"} height={"20px"} />
            </div>
            <button className="py-[8px] px-[12px] rounded-[6px] text-[14px] font-500 text-[#fff] bg-[#22C55E]">
              Profile Settings
            </button>
          </div>
        </div>
        <div className="flex gap-[24px]">
          <div className="flex flex-1 gap-[24px]  flex-col w-full">
            {/* ==================== Freelance Stats ====================== */}
            <div className="flex w-[full] relative flex-col gap-[24px] border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <p className="text-[20px] text-[#374151] font-[600] ">
                Freelance Stats
              </p>
              {/* <hr className="  border-t-[#D1D5DB] " /> */}
              {/* <div className="flex items-center justify-between">
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
              </div> */}

              <VStack
                backgroundColor={"#f4f5f787"}
                height={"80px"}
                shadow={"sm"}
                justifyContent={"center"}
              >
                <Text fontWeight={"600"} top={"8rem"} textAlign={"center"}>
                  Updated Freelancer Stats <br /> Coming Soon
                </Text>

                {/* <div className="flex items-center justify-between">
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-lg font-semibold">$400K+</p>
                    <p className="text-sm font-medium">Total Earnings</p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-lg font-semibold">145</p>
                    <p className="text-sm font-medium">Total Jobs</p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-lg font-semibold">680</p>
                    <p className="text-sm font-medium">Total Hours</p>
                  </div>
                </div> */}
              </VStack>
            </div>
            {/* ==================== Freelance Stats ====================== */}
            {/* ==================== Education ====================== */}
            <div className="flex  flex-col gap-[24px] border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-[16px] text-[#374151] font-[600]">
                  Education
                </p>
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
              </div>
              {education?.length > 0 &&
                education?.map((edu) => (
                  <div className="flex flex-col gap-[8px]" key={edu?._id}>
                    <div className="flex items-center justify-between">
                      <p className="text-[16px] text-[#374151] font-[600]">
                        {edu?.institution}
                      </p>
                      <div className="flex items-center gap-[12px]">
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
                        <div
                          className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB] cursor-pointer"
                          onClick={() =>
                            HandleDeleteEducation(edu._id, "education")
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
            <div className="flex flex-col gap-[24px] border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-[16px] text-[#374151] font-[600]">
                  Experience
                </p>
                <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB]">
                  <BsPlus
                    width={"16px"}
                    height={"16px"}
                    cursor={"pointer"}
                    onClick={() => {
                      setModalPage("exprience");
                      openModal();
                    }}
                  />
                </div>
              </div>
              {experience?.length > 0 &&
                experience?.map((exprience) => {
                  const startDate = new Date(exprience.start_date);
                  const endDate = new Date(exprience.end_date);
                  const startYear = startDate.getFullYear();
                  const endYear = endDate.getFullYear();
                  return (
                    <>
                      <div className="flex flex-col gap-[8px]">
                        <div className="flex items-center justify-between">
                          <p className="text-[16px] text-[#374151] font-[600]">
                            {exprience?.company_name}
                          </p>
                          <div className="flex items-center gap-[12px]">
                            <div
                              className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB] cursor-pointer"
                              onClick={() => {
                                openExperienceEditModal(exprience);
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
                            <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB] cursor-pointer">
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
                          </div>
                        </div>
                        <p className="text-[14px] text-[#374151]  font-bold">
                          {exprience?.position}
                        </p>
                        <p className="text-[14px] text-[#374151] font-[400]">
                          {exprience?.job_location} | {startYear} to {endYear}
                        </p>
                        <p className="text-[14px] text-[#374151] font-[400]">
                          {exprience?.job_description}
                        </p>
                      </div>
                    </>
                  );
                })}
            </div>
            {/* ==================== Basic info ====================== */}
          </div>
          <div className="flex-[2] flex flex-col gap-[24px]">
            <div className="flex flex-col gap-5  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <div className="flex gap-[16px] justify-between">
                <p className="text-[20px] text-[#374151] font-[600] w-[480px]">
                  {professional_role}
                </p>

                <div className="flex gap-5">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    ${hourly_rate}/hr
                  </p>
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
                </div>
              </div>
              <p className="text-[14px] text-[#374151] font-[400]">
                {description}
              </p>
            </div>
            {/* ===================== skills ============= */}
            <div className="flex flex-col gap-[24px]  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <div
                className="flex items-center justify-between"
                onClick={() => {
                  setModalPage("skills");
                  openModal();
                }}
              >
                <p className="text-[16px] text-[#374151] font-[600]">Skills</p>
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
              <div className="grid grid-cols-3 gap-4">
                {skills?.length > 0 &&
                  skills?.map((skill, idx) => {
                    return <SkillCard title={skill} key={idx} />;
                  })}
              </div>
            </div>
            {/* ======================= portfolio =============== */}
            <div className="flex flex-col gap-[24px]  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <div
                className="flex items-center justify-between"
                onClick={() => {
                  setModalPage("portfolio");
                  openModal();
                }}
              >
                <p className="text-[16px] text-[#374151] font-[600]">
                  Portfolio
                </p>
                <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB] cursor-pointer">
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
              </div>
              <div className="grid grid-cols-3 gap-4">
                {portfolio?.length > 0 &&
                  portfolio?.map((port, idx) => (
                    <PortfolioCard key={idx} portfolio={port} />
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-[24px]  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
              <div>
                <p className="text-[16px] text-[#374151] font-[600] pb-3">
                  Your Gigs
                </p>
                <hr />
                <p className="mt-3">
                  Projects are a new way to earn on Upwork that helps you do
                  more of the work you love to do. Create project offerings that
                  highlight your strengths and attract more clients.
                </p>
                <Button
                  className="mt-3 border"
                  backgroundColor={"white"}
                  height={"34px"}
                  fontWeight={"400"}
                  borderRadius={"25px"}
                  border={"2px solid  var(--primarytextcolor)"}
                  transition={"0.3s ease-in-out"}
                  _hover={{
                    color: "white",
                    backgroundColor: "var(--primarytextcolor)",
                  }}
                  onClick={() => navigate("/freelancer/gig")}
                >
                  Manage Gigs
                </Button>
                <div className="mt-10">
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
