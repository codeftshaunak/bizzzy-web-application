import {
  HStack,
  Input,
  Text,
  VStack,
  Flex,
  Box,
  FormControl,
  InputRightElement,
  Button,
  IconButton,
  InputGroup,
  Checkbox,
  Image,
  useToast,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import CTAButton from "../../Components/CTAButton";
import { BsFacebook, BsApple, BsEyeSlash, BsEye } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { BiChevronDown } from "react-icons/bi";
import Divider from "../../Components/Divider/Divider";
import OnbardingCardLayout from "../../Layouts/CardLayout/OnbardingCardLayout";
import { signUp } from "../../helpers/apiRequest";
import { useNavigate } from "react-router-dom";
import { resendEmailVerification } from "../../helpers/clientApis";
import { getCountries } from "../../helpers/freelancerApis";

export const SignUp = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const buttonText =
    selectedOption === "freelancer"
      ? "Apply as a freelancer"
      : selectedOption === "client"
      ? "Join as a client"
      : "Create Account";

  return (
    <>
      {(isFreelancer && <FreelancerSignUp />) ||
        (isClient && <ClientSignUp />) || (
          <OnbardingCardLayout
            title="Join as a client or freelancer"
            width="550px"
            gap="10"
          >
            <HStack>
              <Box
                border="1px solid var(--bordersecondary)"
                padding={"1rem"}
                width={"250px"}
                position={"relative"}
                borderRadius={"10px"}
                cursor={"pointer"}
                onClick={() => setSelectedOption("client")}
              >
                <HStack justifyContent={"space-between"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M39.6745 29.5039H0.325517C0.144552 29.5039 0 29.6487 0 29.8294C0 30.0104 0.144552 30.1549 0.325517 30.1549H39.6745C39.8554 30.1549 40 30.0104 40 29.8294C40 29.6487 39.8554 29.5039 39.6745 29.5039Z"
                      fill="url(#paint0_linear_3410_40533)"
                    />
                    <path
                      d="M36.7451 30.1898C36.9984 30.1898 37.2155 29.973 37.2155 29.7197V8.1647C37.2155 7.83918 36.9984 7.58594 36.709 7.58594H3.61656C3.32746 7.58594 3.11035 7.83918 3.11035 8.1647V29.6836C3.11035 29.9368 3.32745 30.1537 3.5807 30.1537H36.7448V30.1898H36.7451Z"
                      fill="#9AAA97"
                    />
                    <path
                      d="M36.4199 30.1898C36.6729 30.1898 36.89 29.973 36.89 29.7197V8.1647C36.89 7.83918 36.6729 7.58594 36.3835 7.58594H3.29136C3.00198 7.58594 2.78516 7.83918 2.78516 8.1647V29.6836C2.78516 29.9368 3.00198 30.1537 3.25523 30.1537H36.4199V30.1898Z"
                      fill="url(#paint1_linear_3410_40533)"
                    />
                    <path
                      d="M36.3835 7.58594H3.29136C3.00198 7.58594 2.78516 7.80304 2.78516 8.09214V8.88801H36.9261V8.09214C36.89 7.83918 36.6729 7.58594 36.3835 7.58594Z"
                      fill="#C5D1C3"
                    />
                    <path
                      d="M23.7256 23.6446H15.9498C15.6605 23.6446 15.4434 23.4277 15.4434 23.1384V21.764C15.4434 21.4746 15.6605 21.2578 15.9498 21.2578H23.7256C24.0149 21.2578 24.2318 21.4746 24.2318 21.764V23.1384C24.2318 23.4277 24.0149 23.6446 23.7256 23.6446Z"
                      fill="url(#paint2_linear_3410_40533)"
                    />
                    <path
                      d="M12.9844 23.6427H5.17222C4.88312 23.6427 4.66602 23.4259 4.66602 23.1365V21.7622C4.66602 21.4728 4.88312 21.256 5.17222 21.256H12.9482C13.2373 21.256 13.4544 21.4728 13.4544 21.7622V23.1365C13.4906 23.4259 13.2373 23.6427 12.9844 23.6427ZM34.8285 23.6427H27.0166C26.7273 23.6427 26.5104 23.4259 26.5104 23.1365V21.7622C26.5104 21.4728 26.7273 21.256 27.0166 21.256H34.8285C35.1179 21.256 35.335 21.4728 35.335 21.7622V23.1365C35.2988 23.4259 35.0817 23.6427 34.8285 23.6427ZM19.8197 19.8444C22.3364 19.8444 24.3769 17.8044 24.3769 15.2874C24.3769 12.7707 22.3364 10.7305 19.8197 10.7305C17.303 10.7305 15.2627 12.7707 15.2627 15.2877C15.2627 17.8044 17.3027 19.8444 19.8197 19.8444Z"
                      fill="#C3D2C3"
                    />
                    <path
                      d="M20.9043 16.1204L20.6872 14.7461H18.9876L18.7705 16.1204H20.9043Z"
                      fill="url(#paint3_linear_3410_40533)"
                    />
                    <path
                      d="M19.8196 15.5784C20.362 15.5784 20.832 15.8314 20.832 15.8314L20.7598 15.2891H19.6748L19.8196 15.5784Z"
                      fill="url(#paint4_linear_3410_40533)"
                    />
                    <path
                      d="M18.7705 15.2532L18.8063 15.2894C19.096 15.4703 19.4574 15.6149 19.819 15.6149C20.2171 15.6149 20.5787 15.4703 20.9043 15.2532C21.3743 14.9277 21.6637 14.3851 21.6637 13.7705C21.6637 12.7578 20.8679 11.9258 19.8554 11.9258C18.8427 11.9258 18.0107 12.7216 17.9746 13.7343C17.9746 14.349 18.3001 14.8916 18.7705 15.2532Z"
                      fill="url(#paint5_radial_3410_40533)"
                    />
                    <path
                      d="M23.7614 16.6269C23.4 16.0482 22.749 15.7227 22.0618 15.7227C21.8808 15.7227 21.6999 15.7588 21.5192 15.7949L21.0491 15.9398C20.2682 16.1568 19.443 16.1568 18.6621 15.9398L18.1917 15.7949C18.011 15.7591 17.8304 15.7227 17.6494 15.7227C16.9622 15.7227 16.3115 16.0843 15.9495 16.6269C15.8411 16.7715 15.7688 16.9524 15.6963 17.1331C16.4199 18.7246 18.011 19.8457 19.8916 19.8457C21.7724 19.8457 23.3636 18.7246 24.0869 17.1331C23.9424 16.9524 23.8701 16.7715 23.7614 16.6269Z"
                      fill="url(#paint6_radial_3410_40533)"
                    />
                    <path
                      d="M9.07747 19.8444C11.5942 19.8444 13.6344 17.8044 13.6344 15.2874C13.6344 12.7707 11.5942 10.7305 9.0772 10.7305C6.56078 10.7305 4.52051 12.7707 4.52051 15.2877C4.52051 17.8044 6.56051 19.8444 9.07747 19.8444Z"
                      fill="#C3D2C3"
                    />
                    <path
                      d="M10.1272 16.1204L9.94626 14.7461H8.20999L8.0293 16.1204H10.1267H10.1272Z"
                      fill="url(#paint7_linear_3410_40533)"
                    />
                    <path
                      d="M9.07815 15.5784C9.62077 15.5784 10.0908 15.8314 10.0908 15.8314L10.0186 15.2891H8.93359L9.07815 15.5784Z"
                      fill="url(#paint8_linear_3410_40533)"
                    />
                    <path
                      d="M8.02898 15.2532L8.06512 15.2894C8.3545 15.4703 8.71616 15.6149 9.07781 15.6149C9.47561 15.6149 9.83726 15.4703 10.1628 15.2532C10.6328 14.9277 10.9222 14.3851 10.9222 13.7705C10.9222 12.7578 10.1266 11.9258 9.11395 11.9258C8.10154 11.9258 7.26954 12.7216 7.2334 13.7343C7.2334 14.349 7.52278 14.8916 8.02898 15.2532Z"
                      fill="url(#paint9_radial_3410_40533)"
                    />
                    <path
                      d="M13.0202 16.6269C12.6585 16.0482 12.0075 15.7227 11.3203 15.7227C11.1396 15.7227 10.9587 15.7588 10.778 15.7949L10.3076 15.9398C9.52675 16.1568 8.70148 16.1568 7.9206 15.9398L7.45053 15.7949C7.26984 15.7591 7.08887 15.7227 6.90818 15.7227C6.22073 15.7227 5.56997 16.0843 5.20832 16.6269C5.09963 16.7715 5.02735 16.9524 4.95508 17.1331C5.67839 18.7246 7.26956 19.8457 9.15039 19.8457C11.0309 19.8457 12.6224 18.7246 13.3457 17.1331C13.2009 16.9524 13.1286 16.7715 13.0202 16.6269Z"
                      fill="url(#paint10_radial_3410_40533)"
                    />
                    <path
                      d="M30.9222 19.8444C33.4389 19.8444 35.4792 17.8044 35.4792 15.2874C35.4792 12.7707 33.4389 10.7305 30.9222 10.7305C28.4055 10.7305 26.3652 12.7707 26.3652 15.2877C26.3652 17.8044 28.4055 19.8444 30.9222 19.8444Z"
                      fill="#C3D2C3"
                    />
                    <path
                      d="M31.9717 16.1204L31.7907 14.7461H30.055L29.874 16.1204H31.9717Z"
                      fill="url(#paint11_linear_3410_40533)"
                    />
                    <path
                      d="M30.9222 15.5784C31.4645 15.5784 31.9349 15.8314 31.9349 15.8314L31.8623 15.2891H30.7773L30.9222 15.5784Z"
                      fill="url(#paint12_linear_3410_40533)"
                    />
                    <path
                      d="M29.8379 15.2532L29.874 15.2894C30.1634 15.4703 30.525 15.6149 30.8867 15.6149C31.2845 15.6149 31.6461 15.4703 31.9716 15.2532C32.4417 14.9277 32.7311 14.3851 32.7311 13.7705C32.7311 12.7578 31.9355 11.9258 30.9228 11.9258C29.9101 11.9258 29.0781 12.7216 29.042 13.7343C29.0781 14.349 29.3675 14.8916 29.8379 15.2532Z"
                      fill="url(#paint13_radial_3410_40533)"
                    />
                    <path
                      d="M34.8649 16.6269C34.5033 16.0482 33.8525 15.7227 33.1653 15.7227C32.9844 15.7227 32.8037 15.7588 32.6227 15.7949L32.1526 15.9398C31.3717 16.1567 30.5465 16.1567 29.7656 15.9398L29.2955 15.7949C29.1146 15.7591 28.9339 15.7227 28.7529 15.7227C28.0657 15.7227 27.415 16.0843 27.053 16.6269C26.9446 16.7715 26.8724 16.9524 26.7998 17.1331C27.5234 18.7246 29.1146 19.8457 30.9951 19.8457C32.8759 19.8457 34.4671 18.7246 35.1904 17.1331C35.0459 16.9524 34.9736 16.7715 34.8649 16.6269Z"
                      fill="url(#paint14_radial_3410_40533)"
                    />
                    <path
                      d="M4.6654 8.27375C4.6654 8.41858 4.55698 8.56341 4.37602 8.56341C4.23147 8.56341 4.08691 8.45472 4.08691 8.27375C4.08691 8.09306 4.19533 7.98438 4.37602 7.98438C4.52085 7.98438 4.66567 8.09306 4.66567 8.27403L4.6654 8.27375Z"
                      fill="url(#paint15_radial_3410_40533)"
                    />
                    <path
                      d="M3.76138 8.27375C3.76138 8.41858 3.65269 8.56341 3.47172 8.56341C3.32717 8.56341 3.18262 8.45472 3.18262 8.27375C3.18262 8.09306 3.29103 7.98438 3.472 7.98438C3.65269 7.98438 3.76138 8.09279 3.76138 8.27375Z"
                      fill="url(#paint16_radial_3410_40533)"
                    />
                    <path
                      d="M21.6269 29.2149H22.097V30.1191H22.5312V31.0231H23.0013V31.9274H23.9053V31.0231H23.4713V30.1191H23.0013V29.2149H22.5312V27.8405H23.9053V27.3705H23.4713V26.9365H23.0013V26.4662H22.5312V26.0323H22.097V25.5622H21.6272V25.1283H21.1933V24.6579H20.7224V24.224H20.2884V23.7539H19.8184V29.6485H20.2884V29.2146H20.7224V28.7445H21.1927V28.3106H21.6266V29.2146L21.6269 29.2149Z"
                      fill="white"
                    />
                    <path
                      d="M19.8197 29.6471H20.2897V30.1172H19.8197V30.5872H19.3496V22.8477H19.8197V23.318H20.2897V23.7881H19.8197V29.6471ZM20.724 23.7519H20.2536V24.222H20.7237L20.724 23.7519ZM21.194 24.6559V24.1859H20.724V24.6559H21.194ZM21.628 24.6559H21.1579V25.1263H21.628V24.6559ZM21.628 25.5602H22.098V25.0901H21.628V25.5602ZM23.4724 26.9346V27.4046H23.9427V26.9348L23.4724 26.9346ZM22.5322 25.5602H22.0619V26.0303H22.5322V25.5602ZM23.4724 26.9346V26.4645H23.0023V26.9346H23.4724ZM22.5322 26.0303V26.4642L23.0023 26.4645V25.9941H22.5322V26.0303ZM22.0983 30.4066V31.0215H22.5322V30.081H22.0619V30.4066H22.0983ZM23.9066 30.1172H23.4362V31.0576H23.9066V30.1172ZM20.2897 29.6471H20.724V29.1768H20.2536V29.6471H20.2897ZM23.4724 29.6471V29.1768H23.0023V30.1172H23.4724V29.6471ZM24.3766 27.8386V27.3685H23.9066V27.8386H22.5322V29.2493H23.0023V28.3092H24.8106V27.8388L24.3766 27.8386ZM23.9066 31.3106V31.9616H24.3766V31.0215H23.9066V31.3106ZM21.194 28.7428H20.724V29.2129H21.6641V28.2728H21.194V28.7428ZM22.0983 29.5384V29.2129H21.628V30.1172H22.098V29.5384H22.0983ZM23.0023 31.9255V32.3955H23.9427V31.9255H23.0023ZM23.0023 31.3831V31.0215H22.5322V31.9616H23.0023V31.3831Z"
                      fill="#13544E"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_3410_40533"
                        x1="-0.00606897"
                        y1="29.8402"
                        x2="40.0061"
                        y2="29.8402"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#C3D2C3" stopOpacity="0" />
                        <stop offset="0.309" stopColor="#C3D2C3" />
                        <stop offset="0.374" stopColor="#C3D2C3" />
                        <stop offset="0.75" stopColor="#C3D2C3" />
                        <stop
                          offset="1"
                          stopColor="#C3D2C3"
                          stopOpacity="0.014"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_3410_40533"
                        x1="19.8276"
                        y1="30.2226"
                        x2="19.8276"
                        y2="7.59807"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E4EBE4" />
                        <stop offset="0.61" stopColor="#E2E9E2" />
                        <stop offset="0.89" stopColor="#DBE4DB" />
                        <stop offset="1" stopColor="#D5E0D5" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_3410_40533"
                        x1="15.44"
                        y1="22.465"
                        x2="24.2276"
                        y2="22.465"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F7B0B2" />
                        <stop offset="1" stopColor="#F66DBC" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_3410_40533"
                        x1="18.7791"
                        y1="15.4264"
                        x2="20.8877"
                        y2="15.4264"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.52" stopColor="#F7B0B2" />
                        <stop offset="0.642" stopColor="#EEA5A8" />
                        <stop offset="0.856" stopColor="#D5878D" />
                        <stop offset="1" stopColor="#C17078" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_3410_40533"
                        x1="20.2729"
                        y1="15.8576"
                        x2="20.2729"
                        y2="15.3263"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#A06069" stopOpacity="0" />
                        <stop offset="1" stopColor="#A06069" />
                      </linearGradient>
                      <radialGradient
                        id="paint5_radial_3410_40533"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(19.411 13.1445) scale(2.1864)"
                      >
                        <stop offset="0.677" stopColor="#F7B0B2" />
                        <stop offset="0.797" stopColor="#E69B9F" />
                        <stop offset="1" stopColor="#C17078" />
                      </radialGradient>
                      <radialGradient
                        id="paint6_radial_3410_40533"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(19.5793 15.7218) scale(5.54077 5.54077)"
                      >
                        <stop offset="0.677" stopColor="#14A800" />
                        <stop offset="0.802" stopColor="#139300" />
                        <stop offset="1" stopColor="#126B00" />
                      </radialGradient>
                      <linearGradient
                        id="paint7_linear_3410_40533"
                        x1="8.02764"
                        y1="15.4264"
                        x2="10.1363"
                        y2="15.4264"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.52" stopColor="#D5E0D5" />
                        <stop offset="0.645" stopColor="#CAD6CA" />
                        <stop offset="0.865" stopColor="#AEBDAC" />
                        <stop offset="1" stopColor="#9AAA97" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_3410_40533"
                        x1="9.52118"
                        y1="15.8576"
                        x2="9.52118"
                        y2="15.3263"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#65735B" stopOpacity="0" />
                        <stop offset="1" stopColor="#65735B" />
                      </linearGradient>
                      <radialGradient
                        id="paint9_radial_3410_40533"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(8.65933 13.1445) scale(2.1864)"
                      >
                        <stop offset="0.677" stopColor="#D5E0D5" />
                        <stop offset="0.801" stopColor="#C1CEC0" />
                        <stop offset="1" stopColor="#9AAA97" />
                      </radialGradient>
                      <radialGradient
                        id="paint10_radial_3410_40533"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(8.82791 15.7218) scale(5.54077)"
                      >
                        <stop offset="0.677" stopColor="#9AAA97" />
                        <stop offset="0.804" stopColor="#889782" />
                        <stop offset="1" stopColor="#65735B" />
                      </radialGradient>
                      <linearGradient
                        id="paint11_linear_3410_40533"
                        x1="29.8644"
                        y1="15.4264"
                        x2="31.9731"
                        y2="15.4264"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.52" stopColor="#D5E0D5" />
                        <stop offset="0.645" stopColor="#CAD6CA" />
                        <stop offset="0.865" stopColor="#AEBDAC" />
                        <stop offset="1" stopColor="#9AAA97" />
                      </linearGradient>
                      <linearGradient
                        id="paint12_linear_3410_40533"
                        x1="31.3572"
                        y1="15.8576"
                        x2="31.3572"
                        y2="15.3263"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#65735B" stopOpacity="0" />
                        <stop offset="1" stopColor="#65735B" />
                      </linearGradient>
                      <radialGradient
                        id="paint13_radial_3410_40533"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(30.4966 13.1445) scale(2.1864)"
                      >
                        <stop offset="0.677" stopColor="#D5E0D5" />
                        <stop offset="0.801" stopColor="#C1CEC0" />
                        <stop offset="1" stopColor="#9AAA97" />
                      </radialGradient>
                      <radialGradient
                        id="paint14_radial_3410_40533"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(30.6646 15.7218) scale(5.54075 5.54074)"
                      >
                        <stop offset="0.677" stopColor="#9AAA97" />
                        <stop offset="0.804" stopColor="#889782" />
                        <stop offset="1" stopColor="#65735B" />
                      </radialGradient>
                      <radialGradient
                        id="paint15_radial_3410_40533"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(4.30898 8.18769) scale(0.282135)"
                      >
                        <stop stopColor="#14A800" />
                        <stop offset="0.334" stopColor="#14A500" />
                        <stop offset="0.557" stopColor="#149C00" />
                        <stop offset="0.747" stopColor="#138D00" />
                        <stop offset="0.918" stopColor="#127800" />
                        <stop offset="1" stopColor="#126B00" />
                      </radialGradient>
                      <radialGradient
                        id="paint16_radial_3410_40533"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(3.43696 8.18769) scale(0.282135)"
                      >
                        <stop stopColor="#01CDBE" />
                        <stop offset="0.265" stopColor="#02CABE" />
                        <stop offset="0.441" stopColor="#04C1BE" />
                        <stop offset="0.592" stopColor="#08B2BF" />
                        <stop offset="0.728" stopColor="#0D9DC0" />
                        <stop offset="0.855" stopColor="#1481C1" />
                        <stop offset="0.972" stopColor="#1D60C3" />
                        <stop offset="1" stopColor="#1F57C3" />
                      </radialGradient>
                    </defs>
                  </svg>
                  <input
                    type="radio"
                    name="signup-option"
                    id="freelancer"
                    value="freelancer"
                    checked={selectedOption === "client"}
                    onChange={() => handleOptionChange("client")}
                    className="cursor-pointer"
                  />
                </HStack>
                <Text
                  color={"var(--primarytext)"}
                  fontSize={"18px"}
                  fontWeight={"500"}
                >
                  I’m a client, <br />
                  hiring for a project
                </Text>
              </Box>
              <Box
                border="1px solid var(--bordersecondary)"
                padding={"1rem"}
                width={"250px"}
                position={"relative"}
                borderRadius={"10px"}
                cursor={"pointer"}
                onClick={() => setSelectedOption("freelancer")}
              >
                <HStack justifyContent={"space-between"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="41"
                    height="40"
                    viewBox="0 0 41 40"
                    fill="none"
                  >
                    <path
                      d="M38.7878 14.957C37.9039 15.037 37.2212 15.7603 37.1812 16.6439L37.1006 18.3311L37.0203 16.6439C36.9803 15.7603 36.2973 15.0373 35.4137 14.957C36.2973 14.8767 36.9803 14.1537 37.0203 13.2698L37.1006 11.7838L37.1812 13.2698C37.2212 14.1537 37.9039 14.8767 38.7878 14.957ZM34.1687 10.418L34.209 10.7393C34.2493 11.0205 34.5304 11.181 34.7715 11.0605L35.0926 10.8999L34.8115 11.1007C34.5704 11.2613 34.5704 11.5827 34.8115 11.7435L35.0926 11.9443L34.7715 11.7835C34.5304 11.6629 34.209 11.8238 34.209 12.1049L34.1687 12.5468V12.1854C34.1287 11.904 33.8476 11.7435 33.6065 11.864L33.2852 12.0246L33.5663 11.8238C33.8074 11.6632 33.8074 11.3418 33.5663 11.181L33.2852 10.9402L33.6065 11.1007C33.8476 11.2213 34.1687 11.0605 34.1687 10.7793V10.418Z"
                      fill="#D5E0D5"
                    />
                    <path
                      d="M11.0326 18.8542C8.78319 19.2962 6.61408 20.0592 4.60581 21.1439C3.20001 21.9069 2.1556 23.1522 1.63339 24.6382C0.830082 26.9279 1.35229 29.4584 3.03946 31.2258C4.40498 32.6716 6.21243 33.5955 8.22098 33.7963C10.5906 34.0777 12.9606 33.9971 15.3305 33.5555L13.6433 18.332L11.0326 18.8542Z"
                      fill="url(#paint0_radial_3410_40566)"
                    />
                    <path
                      d="M11.0326 18.8542C8.78319 19.2962 6.61408 20.0592 4.60581 21.1439C3.20001 21.9069 2.1556 23.1522 1.63339 24.6382C0.830082 26.9279 1.35229 29.4584 3.03946 31.2258C4.40498 32.6716 6.21243 33.5955 8.22098 33.7963C10.5906 34.0777 12.9606 33.9971 15.3305 33.5555L13.6433 18.332L11.0326 18.8542Z"
                      fill="url(#paint1_radial_3410_40566)"
                    />
                    <path
                      d="M31.6381 4.19203C29.789 3.53984 27.9413 2.88384 26.0949 2.22403C25.2113 1.94266 24.2875 2.10348 23.5244 2.26403L7.25684 5.357L13.4825 37.9324L38.0246 33.2329L32.6825 5.27672C32.6422 4.99534 32.4817 4.63397 32.0397 4.35259C31.9192 4.31259 31.7986 4.23231 31.6381 4.19203Z"
                      fill="url(#paint2_linear_3410_40566)"
                    />
                    <path
                      d="M11.5952 28.2931C11.9565 27.8111 12.2779 27.3292 12.559 26.807L12.6396 26.6864L17.2989 25.1601C18.303 24.8387 18.8252 23.7543 18.5441 22.7904C18.2227 21.8263 17.2586 21.2638 16.2545 21.5049C14.447 21.9468 12.5993 22.3485 10.7516 22.6296L10.5107 22.6696L11.5952 28.2931Z"
                      fill="#9AAA97"
                    />
                    <path
                      d="M31.6386 4.19066C29.55 3.4679 26.6179 2.38321 26.0957 2.22266C27.0998 2.58404 29.3892 5.79755 29.3892 5.79755C29.9517 5.51617 30.7147 3.66845 32.0805 4.39148C31.9197 4.31148 31.7994 4.23093 31.6386 4.19066Z"
                      fill="url(#paint3_linear_3410_40566)"
                    />
                    <path
                      d="M23.0423 10.9395L14.2456 12.6267C14.1251 12.6667 14.0045 12.5864 14.0045 12.4658C13.9645 12.3453 14.0448 12.225 14.1653 12.225L22.9618 10.5378C23.0823 10.4975 23.2029 10.5781 23.2029 10.6984C23.2429 10.8189 23.1626 10.8995 23.0423 10.9395ZM28.8266 17.1657L15.6117 19.6964C15.4911 19.7364 15.3709 19.6562 15.3709 19.5356C15.3306 19.4151 15.4109 19.2948 15.5314 19.2948L28.7463 16.764C28.8669 16.724 28.9874 16.8043 28.9874 16.9249C28.9874 17.0454 28.9471 17.1657 28.8266 17.1657ZM29.228 19.3351L16.0131 21.8655C15.8925 21.9055 15.7722 21.8253 15.7722 21.7047C15.732 21.5844 15.8122 21.4639 15.9328 21.4639L29.1477 18.9334C29.2682 18.8931 29.3888 18.9734 29.3888 19.094C29.4288 19.2145 29.3485 19.3351 29.228 19.3351ZM29.6296 21.5442L16.4147 24.0747C16.2942 24.1147 16.1739 24.0344 16.1739 23.9138C16.1336 23.7933 16.2139 23.673 16.3345 23.673L29.5493 21.1422C29.6699 21.1022 29.7905 21.1825 29.7905 21.3031C29.8305 21.3833 29.7502 21.5039 29.6296 21.5442ZM30.0716 23.7133L16.8567 26.2438C16.7361 26.284 16.6156 26.2035 16.6156 26.0832C16.5756 25.9627 16.6558 25.8421 16.7764 25.8421L29.9913 23.3113C30.1118 23.2711 30.2321 23.3513 30.2321 23.4719C30.2321 23.5924 30.1921 23.673 30.0716 23.7133ZM30.4729 25.8818L17.258 28.4123C17.1375 28.4526 17.0169 28.3723 17.0169 28.2518C16.9769 28.1312 17.0572 28.0107 17.1778 28.0107L30.3927 25.4802C30.5132 25.4402 30.6335 25.5204 30.6335 25.641C30.6738 25.7613 30.5935 25.8818 30.4729 25.8818Z"
                      fill="#BDA1E7"
                    />
                    <path
                      d="M7.29711 29.9806C9.26538 29.2176 10.9926 27.8518 12.1978 26.0846L12.2778 25.9641L17.0979 24.9999C18.1423 24.7991 18.7851 23.795 18.5843 22.7908C18.3835 21.7867 17.4596 21.1439 16.4955 21.2645C14.6423 21.5065 12.7795 21.6673 10.9123 21.7464L9.38593 21.8267L6.29297 21.9875"
                      fill="url(#paint4_radial_3410_40566)"
                    />
                    <path
                      d="M7.29711 29.9806C9.26538 29.2176 10.9926 27.8518 12.1978 26.0846L12.2778 25.9641L17.0979 24.9999C18.1423 24.7991 18.7851 23.795 18.5843 22.7908C18.3835 21.7867 17.4596 21.1439 16.4955 21.2645C14.6423 21.5065 12.7795 21.6673 10.9123 21.7464L9.38593 21.8267L6.29297 21.9875"
                      fill="url(#paint5_radial_3410_40566)"
                    />
                    <path
                      opacity="0.5"
                      d="M17.1373 21.6243C17.0973 21.4635 16.9365 21.3029 16.7357 21.2227H16.5349C16.0529 21.3027 15.5307 21.3432 15.0488 21.3832C14.7274 21.544 14.5266 21.7849 14.5666 22.026C14.6471 22.3873 15.2496 22.5882 15.9726 22.4679C16.6554 22.3873 17.1776 21.9857 17.1373 21.6243Z"
                      fill="url(#paint6_radial_3410_40566)"
                    />
                    <path
                      opacity="0.5"
                      d="M17.1379 21.6245C17.1379 21.5845 17.0979 21.5442 17.0979 21.5039C17.1781 21.8653 16.6157 22.2672 15.9329 22.3878C15.2901 22.508 14.7279 22.3475 14.5674 22.0664C14.6474 22.4278 15.2501 22.6286 15.9732 22.508C16.6559 22.3878 17.1781 21.9861 17.1379 21.6245Z"
                      fill="url(#paint7_radial_3410_40566)"
                    />
                    <path
                      d="M38.4272 14.6367C37.5437 14.7167 36.8609 15.44 36.8206 16.3236L36.7403 18.0108L36.6601 16.3236C36.6198 15.44 35.937 14.717 35.0532 14.6367C35.937 14.5564 36.6198 13.8334 36.6601 12.9495L36.7403 11.4634L36.8206 12.9495C36.8609 13.8334 37.5437 14.5161 38.4272 14.6367ZM33.8077 10.0977L33.8479 10.419C33.8879 10.7001 34.169 10.8607 34.4101 10.7401L34.7315 10.5796L34.4504 10.7804C34.2093 10.941 34.2093 11.2623 34.4504 11.4232L34.7315 11.624L34.4101 11.4632C34.169 11.3426 33.8479 11.5034 33.8479 11.7846L33.8077 12.1059L33.7674 11.8648C33.7274 11.5837 33.4463 11.4232 33.2052 11.5434L32.8838 11.7043L33.1649 11.5034C33.406 11.3426 33.406 11.0215 33.1649 10.8607L32.8838 10.6599L33.2052 10.8207C33.4463 10.941 33.7674 10.7804 33.7674 10.4993L33.8077 10.0977Z"
                      fill="#FCCD81"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_3410_40566"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(10.7192 24.8071) rotate(-16.7388) scale(12.5496 8.67173)"
                      >
                        <stop offset="0.613" stopColor="#A18085" />
                        <stop offset="1" stopColor="#6D565B" />
                      </radialGradient>
                      <radialGradient
                        id="paint1_radial_3410_40566"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(15.8475 23.5991) rotate(-16.739) scale(9.47572 4.77443)"
                      >
                        <stop offset="0.72" stopColor="#6D565B" />
                        <stop offset="1" stopColor="#6D565B" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient
                        id="paint2_linear_3410_40566"
                        x1="19.1606"
                        y1="34.6028"
                        x2="27.424"
                        y2="6.11865"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.35" stopColor="#F2F7F2" />
                        <stop offset="0.79" stopColor="#DDE6DD" />
                        <stop offset="0.93" stopColor="#D5E0D5" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_3410_40566"
                        x1="27.6152"
                        y1="5.64721"
                        x2="28.6723"
                        y2="3.32252"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.264" stopColor="#E4EBE4" />
                        <stop offset="1" stopColor="#F2F7F2" />
                      </linearGradient>
                      <radialGradient
                        id="paint4_radial_3410_40566"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(6.25269 26.2201) rotate(-51.5898) scale(8.70792 5.31189)"
                      >
                        <stop offset="0.613" stopColor="#A18085" />
                        <stop offset="1" stopColor="#6D565B" />
                      </radialGradient>
                      <radialGradient
                        id="paint5_radial_3410_40566"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(14.6324 19.7078) rotate(-9.735) scale(11.3672 6.20604)"
                      >
                        <stop offset="0.613" stopColor="#A18085" />
                        <stop offset="1" stopColor="#A18085" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient
                        id="paint6_radial_3410_40566"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(15.0389 21.1217) scale(2.6562)"
                      >
                        <stop offset="0.426" stopColor="#E4EBE4" />
                        <stop offset="1" stopColor="#D5E0D5" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient
                        id="paint7_radial_3410_40566"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(15.0432 21.4101) scale(2.49465)"
                      >
                        <stop offset="0.426" stopColor="#E4EBE4" />
                        <stop offset="1" stopColor="#D5E0D5" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                  <input
                    type="radio"
                    name="signup-option"
                    id="client"
                    value="client"
                    checked={selectedOption === "freelancer"}
                    onChange={() => handleOptionChange("freelancer")}
                    className="cursor-pointer"
                  />
                </HStack>
                <Text
                  color={"var(--primarytext)"}
                  fontSize={"18px"}
                  fontWeight={"500"}
                >
                  I’m a freelancer, <br />
                  looking for work
                </Text>
              </Box>
            </HStack>
            <VStack width={"100%"} gap={"5"}>
              <Button
                fontWeight="500"
                color="#fff"
                fontSize="1rem"
                bg="var(--primarycolor)"
                width="100%"
                height="2.5rem"
                onClick={() =>
                  (selectedOption === "freelancer" && setIsFreelancer(true)) ||
                  (selectedOption === "client" && setIsClient(true))
                }
              >
                {buttonText}
              </Button>
              <Text onClick={() => navigate("/login")} fontWeight={"500"}>
                Already Have Account?{" "}
                <span className="text-[var(--primarytextcolor)] cursor-pointer">
                  Login
                </span>
              </Text>
            </VStack>
          </OnbardingCardLayout>
        )}
    </>
  );
};

export const FreelancerSignUp = () => {
  const navigate = useNavigate();
  const [verifyShow, setVerifyShow] = useState(false);
  const [countries, setCountries] = useState([]);
  const toast = useToast();
  const iconsStyle = {
    fontSize: "1.5rem",
    padding: "0.4rem",
    width: "110px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    border: "1px solid var(--bordersecondary)",
    borderRadius: "6px",
    backgroundColor: "var(--secondarycolor)",
  };

  const [show, setShow] = React.useState(false);
  const email = sessionStorage.getItem("email");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    sendEmails: false,
    has_accepted_terms: false,
    role: 1,
  });

  // Get Countries List
  const getVerifiedCountries = async () => {
    const countries = await getCountries();
    setCountries(countries);
  };
  useEffect(() => {
    getVerifiedCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signUp(formData);
    if (response.code === 200) {
      toast({
        title: response.msg,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setVerifyShow(true);
      sessionStorage.setItem("email", response.body.email);
    } else if (response.code === 403) {
      toast({
        title: response.msg,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleClick = () => {
    setShow(!show);
  };

  const handleResendVerification = async () => {
    try {
      const response = await resendEmailVerification({ email });
      if (response?.code === 200) {
        toast({
          title: response.msg,
          duration: 3000,
          isClosable: true,
          colorScheme: "green",
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: error?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.error("Error fetching search results:", error);
    }
  };

  const handleOpenGmailBox = () => {
    const gmailInboxURL = "https://mail.google.com/mail/u/0/";
    window.open(gmailInboxURL, "_blank");
  };

  return (
    <>
      {verifyShow ? (
        <>
          <OnbardingCardLayout width="600px">
            <VStack gap={"5"}>
              <VStack gap={"5"}>
                <Box
                  backgroundColor={"#F0FDF4"}
                  padding={"1rem"}
                  borderRadius={"50%"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <rect
                      x="6"
                      y="10"
                      width="36"
                      height="28"
                      rx="2.66667"
                      stroke="#16A34A"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 14L24 26L42 14"
                      stroke="#16A34A"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
                <Text
                  color={"var(--primarytext)"}
                  fontSize={"25px"}
                  fontWeight={"500"}
                >
                  Verify your email to proceed
                </Text>
                <Text textAlign="center">
                  We just sent an email to the address{" "}
                  <span className="font-bold text-[var(--primarytextcolor)]">
                    {email}
                  </span>
                  <br />
                  Please check your email and click on the link provided to
                  verify your address
                </Text>
              </VStack>
              <HStack justifyContent={"space-evenly"} width={"100%"} gap={"5"}>
                <CTAButton
                  fontWeight="500"
                  text="Resend Verification Email"
                  color="var(--primarytext)"
                  border="1px solid var(--bordersecondary)"
                  fontSize="1rem"
                  bg="var(--secondarycolor)"
                  width="100%"
                  height="2.5rem"
                  onClick={handleResendVerification}
                />
                <CTAButton
                  fontWeight="500"
                  text="Go to Gmail Inbox"
                  color="#fff"
                  fontSize="1rem"
                  bg="var(--primarycolor)"
                  width="100%"
                  height="2.5rem"
                  onClick={handleOpenGmailBox}
                />
              </HStack>
            </VStack>
          </OnbardingCardLayout>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <OnbardingCardLayout
            title="Sign Up To Find Your Dream Job"
            width="500px"
          >
            <br />
            <VStack width="100%" gap={"8"}>
              <HStack justifyContent={"space-between"} width={"100%"}>
                <Box style={iconsStyle} color="#3789f4">
                  <BsFacebook />
                </Box>
                <Box style={iconsStyle}>
                  <FcGoogle />
                </Box>
                <Box style={iconsStyle}>
                  <BsApple />
                </Box>
              </HStack>
              <Divider text="Or" dwidth="180px" />
              <FormControl display={"grid"} gap={"5"} isRequired>
                <InputGroup gap={"5"}>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </InputGroup>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <InputGroup size="md">
                  <Input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="2.8rem">
                    <IconButton
                      aria-label={show ? "Hide Password" : "Show Password"}
                      icon={show ? <BsEyeSlash /> : <BsEye />}
                      onClick={() => handleClick()}
                    />
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <Select
                    placeholder="Select Country"
                    name="country"
                    onChange={handleChange}
                  >
                    {countries?.map((country) => (
                      <option key={country?._id} value={country?.name}>
                        {country?.name}
                      </option>
                    ))}
                  </Select>
                  <InputRightElement>
                    <BiChevronDown color="green.500" fontSize={"1.4rem"} />
                  </InputRightElement>
                </InputGroup>
                <Box display={"grid"} gap={"5"}>
                  <Checkbox
                    name="sendEmails"
                    checked={formData.sendEmails}
                    onChange={handleChange}
                    size="md"
                    colorScheme="green"
                  >
                    Send me emails with on how to find talent my feeds
                  </Checkbox>
                  <Checkbox
                    name="has_accepted_terms"
                    checked={formData.has_accepted_terms}
                    onChange={handleChange}
                    size="md"
                    colorScheme="green"
                  >
                    Yes, I understand & agree to the Bizzzy{" "}
                    <span className="font-[600] text-[var(--primarytextcolor)]">
                      Terms of Service
                    </span>
                  </Checkbox>
                </Box>
              </FormControl>
              <VStack width={"100%"} gap={"5"}>
                <CTAButton
                  type="submit"
                  fontWeight="500"
                  text="Create Account"
                  color="#fff"
                  fontSize="1rem"
                  bg="var(--primarycolor)"
                  width="100%"
                  height="2.5rem"
                />
                <Text fontWeight={"500"}>
                  Already Have an Account?{" "}
                  <span
                    className="text-[var(--primarytextcolor)] cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </Text>
              </VStack>
            </VStack>
          </OnbardingCardLayout>
        </form>
      )}
    </>
  );
};

export const ClientSignUp = () => {
  const navigate = useNavigate();
  const [verifyShow, setVerifyShow] = useState(false);
  const [countries, setCountries] = useState([]);

  const getVerifiedCountries = async () => {
    const countries = await getCountries();
    setCountries(countries);
  };
  useEffect(() => {
    getVerifiedCountries();
  }, []);

  const toast = useToast();
  const iconsStyle = {
    fontSize: "1.5rem",
    padding: "0.4rem",
    width: "110px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    border: "1px solid var(--bordersecondary)",
    borderRadius: "6px",
    backgroundColor: "var(--secondarycolor)",
  };

  const [show, setShow] = React.useState(false);
  const email = sessionStorage.getItem("email");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    sendEmails: false,
    has_accepted_terms: false,
    role: 2,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sendEmails) {
      toast({
        title: "You've to agree with send mail",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else if (!formData.has_accepted_terms) {
      toast({
        title: "You've accept the tarms and conditions",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      const response = await signUp(formData);
      if (response.code === 200) {
        toast({
          title: response.msg,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setVerifyShow(true);
        sessionStorage.setItem("email", response.body.email);
      } else if (response.code === 403) {
        toast({
          title: response.msg,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  };

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <>
      {verifyShow ? (
        <>
          <OnbardingCardLayout width="600px">
            <VStack gap={"5"}>
              <VStack gap={"5"}>
                <Box
                  backgroundColor={"#F0FDF4"}
                  padding={"1rem"}
                  borderRadius={"50%"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <rect
                      x="6"
                      y="10"
                      width="36"
                      height="28"
                      rx="2.66667"
                      stroke="#16A34A"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 14L24 26L42 14"
                      stroke="#16A34A"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
                <Text
                  color={"var(--primarytext)"}
                  fontSize={"25px"}
                  fontWeight={"500"}
                >
                  Verify your email to proceed
                </Text>
                <Text textAlign="center">
                  We just sent an email to the address{" "}
                  <span className="font-bold text-[var(--primarytextcolor)]">
                    {email}
                  </span>
                  <br />
                  Please check your email and click on the link provided to
                  verify your address
                </Text>
              </VStack>
              <HStack justifyContent={"space-evenly"} width={"100%"} gap={"5"}>
                <CTAButton
                  fontWeight="500"
                  text="Resend Verification Email"
                  color="var(--primarytext)"
                  border="1px solid var(--bordersecondary)"
                  fontSize="1rem"
                  bg="var(--secondarycolor)"
                  width="100%"
                  height="2.5rem"
                />
                <CTAButton
                  fontWeight="500"
                  text="Go to Gmail Inbox"
                  color="#fff"
                  fontSize="1rem"
                  bg="var(--primarycolor)"
                  width="100%"
                  height="2.5rem"
                />
              </HStack>
            </VStack>
          </OnbardingCardLayout>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <OnbardingCardLayout title="Sign Up To Hire Talent" width="500px">
            <br />
            <VStack width="100%" gap={"8"}>
              <HStack justifyContent={"space-between"} width={"100%"}>
                <Box style={iconsStyle} color="#3789f4">
                  <BsFacebook />
                </Box>
                <Box style={iconsStyle}>
                  <FcGoogle />
                </Box>
                <Box style={iconsStyle}>
                  <BsApple />
                </Box>
              </HStack>
              <Divider text="Or" dwidth="180px" />
              <FormControl display={"grid"} gap={"5"} isRequired>
                <InputGroup gap={"5"}>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </InputGroup>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <InputGroup size="md">
                  <Input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => handleClick()}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <Select
                    placeholder="Select Country"
                    name="country"
                    onChange={handleChange}
                  >
                    {countries?.map((country) => (
                      <option key={country?._id} value={country?.name}>
                        {country?.name}
                      </option>
                    ))}
                  </Select>
                  <InputRightElement>
                    <BiChevronDown color="green.500" fontSize={"1.4rem"} />
                  </InputRightElement>
                </InputGroup>
                <Box display={"grid"} gap={"5"}>
                  <Checkbox
                    name="sendEmails"
                    checked={formData.sendEmails}
                    onChange={handleChange}
                    size="md"
                    colorScheme="green"
                  >
                    Send me emails with on how to find talent my feeds
                  </Checkbox>
                  <Checkbox
                    name="has_accepted_terms"
                    checked={formData.has_accepted_terms}
                    onChange={handleChange}
                    size="md"
                    colorScheme="green"
                  >
                    Yes, I understand & agree to the Bizzzy{" "}
                    <span className="font-[600] text-[var(--primarytextcolor)]">
                      Terms of Service
                    </span>
                  </Checkbox>
                </Box>
              </FormControl>
              <VStack width={"100%"} gap={"5"}>
                <CTAButton
                  type="submit"
                  fontWeight="500"
                  text="Create Account"
                  color="#fff"
                  fontSize="1rem"
                  bg="var(--primarycolor)"
                  width="100%"
                  height="2.5rem"
                />
                <Text fontWeight={"500"}>
                  Already Have an Account?{" "}
                  <span className="text-[var(--primarytextcolor)]">Login</span>
                </Text>
              </VStack>
            </VStack>
          </OnbardingCardLayout>
        </form>
      )}
    </>
  );
};

export const verifyMail = async () => {
  return (
    <OnbardingCardLayout width="600px">
      <VStack gap={"5"}>
        <VStack gap={"5"}>
          <Box
            backgroundColor={"#F0FDF4"}
            padding={"1rem"}
            borderRadius={"50%"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <rect
                x="6"
                y="10"
                width="36"
                height="28"
                rx="2.66667"
                stroke="#16A34A"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 14L24 26L42 14"
                stroke="#16A34A"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Text
            color={"var(--primarytext)"}
            fontSize={"25px"}
            fontWeight={"500"}
          >
            Verify your email to proceed
          </Text>
          <Text textAlign="center">
            We just sent an email to the address{" "}
            <span className="font-bold text-[var(--primarytextcolor)]">
              john@me.com
            </span>
            <br />
            Please check your email and click on the link provided to verify
            your address
          </Text>
        </VStack>

        {/* <VStack gap={"5"}>
                            <HStack color="var(--primarytextcolor)">
                                <BsChevronDown />
                                <Text>Change email</Text>
                            </HStack>
                            <HStack color="var(--primarytextcolor)">
                                <BsChevronDown />
                                <Text>I need help verifying my email</Text>
                            </HStack>
                        </VStack> */}

        <HStack justifyContent={"space-evenly"} width={"100%"} gap={"5"}>
          <CTAButton
            fontWeight="500"
            text="Resend Verification Email"
            color="var(--primarytext)"
            border="1px solid var(--bordersecondary)"
            fontSize="1rem"
            bg="var(--secondarycolor)"
            width="100%"
            height="2.5rem"
          />
          <CTAButton
            fontWeight="500"
            text="Go to Gmail Inbox"
            color="#fff"
            fontSize="1rem"
            bg="var(--primarycolor)"
            width="100%"
            height="2.5rem"
          />
        </HStack>
      </VStack>
    </OnbardingCardLayout>
  );
};
