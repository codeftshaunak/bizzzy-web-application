


import React, { useEffect, useState } from "react";
import ProfileContainer from "./ProfileContainer";
import SkillCard from "./SkillCard";
import bg from "../../assets/avatar.jpeg";
import { BsLink45Deg, BsPlus } from "react-icons/bs";
import PortfolioCard from "./PortfolioCard";
import ReviewCard from "./ReviewCard";
import Modal from "react-modal";
import { Box, HStack, Select, useToast } from "@chakra-ui/react";
import { getAllDetailsOfUser, updateFreelancerProfile } from "../../helpers/userApis";
import { CiLocationOn } from "react-icons/ci";
import { formatTime, getUserLocation } from '../../helpers/formet'
import { useSelector } from "react-redux";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: " 0",
        borderRadius: "12px",
    },
};


export const UserProfile = () => {
    const role = useSelector((state) => state.auth.role);
    console.log(role);
    return (
        <div>
            {
                role == 1 && <FreelancerProfilePage /> || role == 2 && <ClientProfilePage />

            }
        </div>
    )
}
export const ClientProfilePage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalPage, setModalPage] = useState("");
    const [details, setDetails] = useState([]);
    const { firstName, lastName, location, professional_role, hourly_rate, description, skills, experience } = details || [];
    const [localTime, setLocalTime] = useState();

    function openModal() {
        setModalIsOpen(true);
    }

    async function getCurrentTimeAndLocation() {
        try {
            const currentDate = new Date();
            const currentTime = formatTime(currentDate);
            const location = await getUserLocation();
            setLocalTime(currentTime)
            return console.log(`${location.latitude}, ${location.longitude} - ${currentTime} local time`);
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
            setDetails(resp.body)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getProfileInformation();
    }, [])

    //   function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = "#f00";
    //   }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <ProfileContainer>
            <div className="w-full flex flex-col gap-[24px] ">
                <div className=" w-full flex items-center justify-between border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
                    <div className="flex gap-[14px] items-center">
                        <div style={{ position: "relative", padding: "10px" }}>
                            <div style={{ position: "absolute", top: "0px", left: "0px" }}>
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
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M9 4.33301L11.6667 6.99967"
                                            stroke="#6B7280"
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-center rounded-full w-[70px] h-[70px] "
                                style={{ background: `url(${bg})`, backgroundSize: "contain" }}
                            ></div>
                        </div>

                        <div className="flex flex-col justify-start gap-[10px]">
                            <p className="text-[24px] text-[#374151] font-semibold">
                                Business Name
                            </p>
                            <HStack className="text-[16px] text-[#374151] font-[400]">
                                <CiLocationOn /> <p className='capitalize'> {location}, {localTime} local time</p>
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
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M9 4.33301L11.6667 6.99967"
                                            stroke="#6B7280"
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-[14px] text-[#374151] font-[400]">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cupiditate iste unde qui at eligendi in tenetur laudantium quos, porro quod voluptate sint, odio saepe dolore ea, nostrum animi. Qui velit aut fuga ut tempora harum et neque voluptatem unde ipsa quos, autem quas. Veniam rerum, excepturi sequi reiciendis corrupti sit velit.
                            </p>
                            <p className="text-[14px] text-[#16A34A] font-[600] cursor-pointer">
                                View More
                            </p>
                        </div>


                        <div className="flex flex-col gap-[24px]  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
                            <div className="flex items-center justify-between">
                                <p className="text-[16px] text-[#374151] font-[600]">
                                    Work History
                                </p>
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
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M9 4.33301L11.6667 6.99967"
                                            stroke="#6B7280"
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[6px]">
                                <p className="text-[14px] text-[#16A34A] font-[600] cursor-pointer">
                                    Completed Jobs
                                </p>
                                <div className="h-[2px] w-[60px] bg-[#16A34A]"></div>
                            </div>
                            <ReviewCard />
                            <ReviewCard />
                            <p className="text-[14px] text-[#16A34A] font-[600] cursor-pointer">
                                View More
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileModal
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                modalPage={modalPage}
            />
        </ProfileContainer>
    );
};

export const FreelancerProfilePage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalPage, setModalPage] = useState("");
    const [details, setDetails] = useState([]);
    const { firstName, lastName, location, professional_role, hourly_rate, description, skills, experience } = details || [];
    const [localTime, setLocalTime] = useState();

    function openModal() {
        setModalIsOpen(true);
    }

    async function getCurrentTimeAndLocation() {
        try {
            const currentDate = new Date();
            const currentTime = formatTime(currentDate);
            const location = await getUserLocation();
            setLocalTime(currentTime)
            return console.log(`${location.latitude}, ${location.longitude} - ${currentTime} local time`);
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
            setDetails(resp.body)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getProfileInformation();
    }, [])

    //   function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = "#f00";
    //   }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <ProfileContainer>
            <div className="w-full flex flex-col gap-[24px] ">
                <div className=" w-full flex items-center justify-between border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
                    <div className="flex gap-[14px] items-center">
                        <div style={{ position: "relative", padding: "10px" }}>
                            <div style={{ position: "absolute", top: "0px", left: "0px" }}>
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
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M9 4.33301L11.6667 6.99967"
                                            stroke="#6B7280"
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-center rounded-full w-[70px] h-[70px] "
                                style={{ background: `url(${bg})`, backgroundSize: "contain" }}
                            ></div>
                        </div>

                        <div className="flex flex-col justify-start gap-[10px]">
                            <p className="text-[24px] text-[#374151] font-semibold">
                                {firstName + (lastName ? " " + lastName.split(" ")[0] : "")}
                            </p>
                            <HStack className="text-[16px] text-[#374151] font-[400]">
                                <CiLocationOn /> <p className='capitalize'> {location}, {localTime} local time</p>
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
                                Freelance Stats
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
                            <div className="flex flex-col gap-[8px]">
                                <div className="flex items-center justify-between">
                                    <p className="text-[16px] text-[#374151] font-[600]">
                                        Google
                                    </p>
                                    <div className="flex items-center gap-[12px]">
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
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M9 4.33301L11.6667 6.99967"
                                                    stroke="#6B7280"
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
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
                                                    d="M9.33333 7.33301V11.333"
                                                    stroke="#6B7280"
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M6.66634 7.33301V11.333"
                                                    stroke="#6B7280"
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M2.66699 4.66634H13.3337"
                                                    stroke="#6B7280"
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M3.33301 4.66699L3.99967 12.667C3.99967 13.4034 4.59663 14.0003 5.33301 14.0003H10.6663C11.4027 14.0003 11.9997 13.4034 11.9997 12.667L12.6663 4.66699"
                                                    stroke="#6B7280"
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M6 4.66667V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4.66667"
                                                    stroke="#6B7280"
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] text-[#374151] font-[400]">
                                    Other, Google UX Design Professional Certificate
                                </p>
                                <p className="text-[14px] text-[#374151] font-[400]">
                                    2022-2022
                                </p>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <div className="flex items-center justify-between">
                                    <p className="text-[16px] text-[#374151] font-[600]">
                                        Google
                                    </p>
                                    <div className="flex items-center gap-[12px]">
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
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M9 4.33301L11.6667 6.99967"
                                                    stroke="#6B7280"
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
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
                                                    d="M9.33333 7.33301V11.333"
                                                    stroke="#6B7280"
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M6.66634 7.33301V11.333"
                                                    stroke="#6B7280"
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M2.66699 4.66634H13.3337"
                                                    stroke="#6B7280"
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M3.33301 4.66699L3.99967 12.667C3.99967 13.4034 4.59663 14.0003 5.33301 14.0003H10.6663C11.4027 14.0003 11.9997 13.4034 11.9997 12.667L12.6663 4.66699"
                                                    stroke="#6B7280"
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M6 4.66667V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4.66667"
                                                    stroke="#6B7280"
                                                    stroke-width="1.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] text-[#374151] font-[400]">
                                    Other, Google UX Design Professional Certificate
                                </p>
                                <p className="text-[14px] text-[#374151] font-[400]">
                                    2022-2022
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[24px] border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
                            <div className="flex items-center justify-between">
                                <p className="text-[16px] text-[#374151] font-[600]">
                                    Exprience
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
                            {
                                experience?.length > 0 && experience?.map((exprience) => {
                                    const startDate = new Date(exprience.start_date);
                                    const endDate = new Date(exprience.end_date);
                                    const startYear = startDate.getFullYear();
                                    const endYear = endDate.getFullYear();
                                    return <>
                                        <div className="flex flex-col gap-[8px] w-[300px]">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[16px] text-[#374151] font-[600]">
                                                    {exprience?.company_name}
                                                </p>
                                                <div className="flex items-center gap-[12px]">
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
                                                                stroke-width="1.25"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                            <path
                                                                d="M9 4.33301L11.6667 6.99967"
                                                                stroke="#6B7280"
                                                                stroke-width="1.25"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                        </svg>
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
                                                                d="M9.33333 7.33301V11.333"
                                                                stroke="#6B7280"
                                                                stroke-width="1.25"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                            <path
                                                                d="M6.66634 7.33301V11.333"
                                                                stroke="#6B7280"
                                                                stroke-width="1.25"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                            <path
                                                                d="M2.66699 4.66634H13.3337"
                                                                stroke="#6B7280"
                                                                stroke-width="1.25"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                            <path
                                                                d="M3.33301 4.66699L3.99967 12.667C3.99967 13.4034 4.59663 14.0003 5.33301 14.0003H10.6663C11.4027 14.0003 11.9997 13.4034 11.9997 12.667L12.6663 4.66699"
                                                                stroke="#6B7280"
                                                                stroke-width="1.25"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                            <path
                                                                d="M6 4.66667V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4.66667"
                                                                stroke="#6B7280"
                                                                stroke-width="1.25"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
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
                                })
                            }
                        </div>
                    </div>
                    <div className="flex-[2] flex flex-col gap-[24px]">
                        <div className="flex flex-col gap-[24px]  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
                            <div className="flex gap-[16px] justify-between">
                                <div className="">
                                    <p className="text-[20px] text-[#374151] font-[600] w-[480px]">
                                        {professional_role}
                                    </p>
                                </div>
                                <p className="text-[20px] text-[#374151] font-[600]">
                                    ${hourly_rate}/hr
                                </p>
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
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M9 4.33301L11.6667 6.99967"
                                            stroke="#6B7280"
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-[14px] text-[#374151] font-[400]">
                                {
                                    description
                                }
                            </p>
                            <p className="text-[14px] text-[#16A34A] font-[600] cursor-pointer">
                                View More
                            </p>
                        </div>
                        <div className="flex flex-col gap-[24px]  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
                            <div
                                className="flex items-center justify-between"
                                onClick={() => {
                                    setModalPage("skills");
                                    openModal();
                                }}
                            >
                                <p className="text-[16px] text-[#374151] font-[600]">Skills</p>
                                <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB] cursor-pointer">
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
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M9 4.33301L11.6667 6.99967"
                                            stroke="#6B7280"
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {
                                    skills?.length > 0 && skills?.map((skill) => {
                                        return <SkillCard title={skill.skill_name} />

                                    })
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-[24px]  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
                            <div className="flex items-center justify-between">
                                <p className="text-[16px] text-[#374151] font-[600]">
                                    Portfolio
                                </p>
                                <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[#D1D5DB]">
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
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M3.33301 8.00033H12.6663"
                                            stroke="#6B7280"
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <PortfolioCard />
                                <PortfolioCard />
                                <PortfolioCard />
                            </div>
                            <p className="text-[14px] text-[#16A34A] font-[600] cursor-pointer">
                                View More
                            </p>
                        </div>
                        <div className="flex flex-col gap-[24px]  border-[1px] py-[20px] px-[24px] border-[#D1D5DB] rounded-lg">
                            <div className="flex items-center justify-between">
                                <p className="text-[16px] text-[#374151] font-[600]">
                                    Work History
                                </p>
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
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M9 4.33301L11.6667 6.99967"
                                            stroke="#6B7280"
                                            stroke-width="1.25"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[6px]">
                                <p className="text-[14px] text-[#16A34A] font-[600] cursor-pointer">
                                    Completed Jobs
                                </p>
                                <div className="h-[2px] w-[60px] bg-[#16A34A]"></div>
                            </div>
                            <ReviewCard />
                            <ReviewCard />
                            <p className="text-[14px] text-[#16A34A] font-[600] cursor-pointer">
                                View More
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileModal
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                modalPage={modalPage}
            />
        </ProfileContainer>
    );
};

const ProfileModal = ({ modalIsOpen, closeModal, modalPage }) => {
    const toast = useToast();
    const options = [
        { value: 'programming', label: 'Programming' },
        { value: 'markating', label: 'Digital Marketing' },
        { value: 'design', label: 'Graphic Design' },
        { value: 'design1', label: 'Graphic Design' },
        { value: 'design2', label: 'Graphic Design' },
        { value: 'design3', label: 'Graphic Design' },
    ]

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValues, setInputValues] = useState({
        professional_role: "",
        hourly_rate: "",
        description: "",
    });
    const [experienceInput, setExperienceInput] = useState({
        company_name: "",
        position: "",
        start_date: "",
        end_date: "",
        job_description: "",
        job_location: "",
    });


    const handleSelectChange = (selectedValues) => {
        setSelectedOptions(selectedValues || []);
    };

    const handleSaveAndContinue = async (data) => {
        console.log(data);
        try {
            if (data === "category") {
                // Handle saving categories
                const selectedCategories = selectedOptions.map((option) => ({
                    category_name: option.value,
                }));
                const response = await updateFreelancerProfile({ categories: selectedCategories });
                if (response.code === 405) {
                    toast({
                        title: response.msg,
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    closeModal();
                    setSelectedOptions([]);
                } else if (response.code === 200) {
                    toast({
                        title: "Category Added Successfully",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    closeModal();
                    setSelectedOptions([]);
                }
            } else if (data === "info") {
                const response = await updateFreelancerProfile({
                    professional_role: inputValues.professional_role,
                    hourly_rate: inputValues.hourly_rate,
                    description: inputValues.description,
                });

                if (response.code === 405) {
                    toast({
                        title: response.msg,
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    closeModal();
                    setSelectedOptions([]);
                } else if (response.code === 200) {
                    toast({
                        title: "Basic Information Added Successfully",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    closeModal();
                }
            } else if (data == "skills") {
                const selectedCategories = selectedOptions.map((option) => ({
                    skill_name: option.value,
                }));
                const response = await updateFreelancerProfile({ skills: selectedCategories });
                console.log({ skills: response });
                if (response.code == 405) {
                    toast({
                        title: response.msg,
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    closeModal();
                    setSelectedOptions([]);
                } else if (response.code === 200) {
                    toast({
                        title: "Skils Added Successfully",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    setSelectedOptions([]);
                    closeModal();
                }
            } else if (data == "experience") {
                const response = await updateFreelancerProfile({
                    experience: {
                        company_name: experienceInput.company_name,
                        job_description: experienceInput.job_description,
                        start_date: experienceInput.start_date,
                        end_date: experienceInput.end_date,
                        job_location: experienceInput.job_location,
                        position: experienceInput.position
                    }
                });
                if (response.code == 405 || response.code == 500) {
                    toast({
                        title: response.msg,
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    setExperienceInput({
                        company_name: "",
                        job_description: "",
                        start_date: "",
                        end_date: "",
                        job_location: "",
                        position: ""
                    });
                    closeModal();

                } else if (response.code === 200) {
                    // Handle category added successfully
                    toast({
                        title: "Exprience Added Successfully",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    setExperienceInput({
                        company_name: "",
                        job_description: "",
                        start_date: "",
                        end_date: "",
                        job_location: "",
                        position: ""
                    });
                    closeModal();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            //   onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="w-[500px] flex flex-col gap-[20px] ">
                <div className="flex items-center justify-between p-[24px] w-full border-b-[1px] border-b-[#F3F4F6] ">
                    <p className="text-[16px] capitalize text-[#374151] ">{modalPage}</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        cursor={"pointer"}
                        onClick={closeModal}
                    >
                        <path
                            d="M18 6L6 18"
                            stroke="#6B7280"
                            stroke-width="1.75"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M6 6L18 18"
                            stroke="#6B7280"
                            stroke-width="1.75"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
                {modalPage === "skills" && (
                    <form className="flex flex-col gap-[16px]">
                        <div className="flex flex-col px-[24px]  pb ">
                            <div className="w-[100%] py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                                <select
                                    className="w-full  text-[14px] text-[#000] font-[400] border-[#D1D5DB] rounded-"
                                    placeholder="Select Skill"
                                >
                                    <option>Select Skills</option>
                                </select>{" "}
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
                            {/* <button className="text-[14px] text-[#374151] font-[500] border-[1px] border-[#D1D5DB] py-[4px] px-[20px] rounded-md">
                                Cancel
                            </button> */}
                            <button className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[4px] px-[20px] rounded-md ">
                                Submit
                            </button>
                        </div>
                    </form>
                )}
                {modalPage === "education" && (
                    <form className="flex flex-col gap-[16px]">
                        <div className="flex flex-col px-[24px]  pb ">
                            <div className="flex flex-col gap-[2px]">
                                <p className="text-[14px] font-[500] text-[#374151]">
                                    Degree Name
                                </p>
                                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                                    <input
                                        type="text"
                                        className="w-full  text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                                        placeholder="Degree"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-[2px]">
                                <p className="text-[14px] font-[500] text-[#374151]">
                                    Institution
                                </p>
                                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                                    <input
                                        type="text"
                                        className="w-full  text-[14px] text-[#9CA3AF] font-[400] border-[#D1D5DB] "
                                        placeholder="Institution"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-[2px]">
                                <p className="text-[14px] font-[500] text-[#374151]">
                                    Degree Name
                                </p>
                                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                                    <input
                                        type="text"
                                        className="w-full  text-[14px] text-[#9CA3AF] font-[400] border-[#D1D5DB] "
                                        placeholder="Degree"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
                            {/* <button className="text-[14px] text-[#374151] font-[500] border-[1px] border-[#D1D5DB] py-[4px] px-[20px] rounded-md ">
                                Cancel
                            </button> */}
                            <button className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[4px] px-[20px] rounded-md ">
                                Submit
                            </button>
                        </div>
                    </form>
                )}
                {modalPage === "exprience" && (
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col px-[24px] pb">
                            <div className="flex flex-col gap-[2px]">
                                <p className="text-[14px] font-[500] text-[#374151]">
                                    Your Company Name
                                </p>
                                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                                    <input
                                        type="text"
                                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                                        placeholder="Your Company Name"
                                        onChange={(e) => setExperienceInput({ ...experienceInput, company_name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <br />
                            <HStack justifyContent={"space-between"}>
                                <div className="flex flex-col gap-[2px] w-[49%]">
                                    <p className="text-[14px] font-[500] text-[#374151]">
                                        Start Year
                                    </p>
                                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                                        <input
                                            type="date"
                                            className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                                            placeholder="Institution"
                                            onChange={(e) => setExperienceInput({ ...experienceInput, start_date: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <br />
                                <div className="flex flex-col gap-[2px] w-[49%]">
                                    <p className="text-[14px] font-[500] text-[#374151]">
                                        End Year
                                    </p>
                                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                                        <input
                                            type="date"
                                            className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                                            placeholder="Position"
                                            onChange={(e) => setExperienceInput({ ...experienceInput, end_date: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </HStack>
                            <br />
                            <div className="flex flex-col gap-[2px]">
                                <p className="text-[14px] font-[500] text-[#374151]">
                                    Position
                                </p>
                                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                                    <input
                                        type="text"
                                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                                        placeholder="Position"
                                        onChange={(e) => setExperienceInput({ ...experienceInput, position: e.target.value })}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="flex flex-col gap-[2px]">
                                <p className="text-[14px] font-[500] text-[#374151]">
                                    Location
                                </p>
                                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                                    <input
                                        type="text"
                                        value={experienceInput.job_location}
                                        onChange={(e) => setExperienceInput({ ...experienceInput, job_location: e.target.value })}
                                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                                        placeholder="Location"
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="flex flex-col gap-[2px]">
                                <p className="text-[14px] font-[500] text-[#374151]">
                                    Description
                                </p>
                                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                                    <textarea
                                        type="text"
                                        value={experienceInput.job_description}
                                        onChange={(e) => setExperienceInput({ ...experienceInput, job_description: e.target.value })}
                                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                                        placeholder="Description"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
                            <button
                                className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[8px] px-[20px] rounded-md "
                                onClick={() => handleSaveAndContinue("experience")}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

