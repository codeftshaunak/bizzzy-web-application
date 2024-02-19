import LinkArrowIcon from "../../assets/icons/link-arrow";
import { Link, useNavigate } from "react-router-dom";
import { Image, HStack } from "@chakra-ui/react";
import { FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa6";

export const HomeFooter = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-green-50 mt-20 py-[2.62rem]">
        <div className="max-w-[1300px] mx-auto">
          <div className="w-[1300px] h-[253px] flex-col justify-start items-start gap-9 inline-flex">
            <div className="w-[1300px]">
              <span className="text-black text-5xl font-['SF Pro']">
                Important{" "}
              </span>
              <span className="text-green-600 text-5xl font-['SF Pro']">
                links
              </span>
              <span className="text-black text-5xl font-['SF Pro']">.</span>
            </div>
            <div className="justify-start items-start gap-5 inline-flex">
              <div className="h-40 flex-col justify-between items-start inline-flex">
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    About
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Contact Us
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    About
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
              </div>
              <div className="h-40 flex-col justify-between items-start inline-flex">
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Casestudies
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Blogs
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Events
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Community
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
              </div>
              <div className="h-40 flex-col justify-between items-start inline-flex">
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    One Pager
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Multi Pager
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    E-commerce Pages
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Dynamic Content Pages
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
              </div>
              <div className="h-40 flex-col justify-between items-start inline-flex">
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Privacy
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Terms & Conditions
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Leadership
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Team
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-600">
        <div className="w-[1300px] mx-auto px-2 py-[13px] text-center">
          <div className="text-white text-base font-normal font-['Lato'] leading-tight">
            Bizzzy © 2023. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export const MVPFooter = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-green-50 py-[2.62rem]">
        <div className="max-w-[1300px] mx-auto">
          <div className="w-[1300px] h-[23px] flex-col justify-start items-start gap-9 inline-flex">
            <div className="flex justify-between w-full items-center">
              <Image src="/images/bizzzy_logo.png" width={"150px"} />

              <HStack width={"75%"} justifyContent={"space-between"}>
                <div className="justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg f cursor-pointer"
                    onClick={() => navigate()}
                  >
                    About Us
                  </div>
                </div>

                <div className="justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    Facebook
                  </div>
                </div>

                <div className="justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    Facebook
                  </div>
                </div>

                <div className="justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Contact Us
                  </div>
                </div>

                <div className="justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Privacy Policy
                  </div>
                </div>

                <div className="justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => navigate()}
                  >
                    Terms of Service
                  </div>
                </div>
                <div className="text-gray-700 text-base leading-tight">
                  Bizzzy © 2023. All Rights Reserved
                </div>
              </HStack>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='bg-green-600'>
                <div className='w-[1300px] mx-auto px-2 py-[13px] text-center'>
                    <div className="text-white text-base font-normal font-['Lato'] leading-tight">
                        Bizzzy © 2023. All Rights Reserved
                    </div>
                </div>
            </div> */}
    </div>
  );
};

export const Footer = () => {
  return (
    <div>
      <div className="bg-[#F4FAF6]  lg:py-[2.62rem]">
        <div className="max-w-[1300px] mx-auto p-6">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            <div className="md:w-[300px]">
              <div>
                <img src="./icons/Bizzzy.png" alt="Bizzy" />
              </div>
              <div className="my-4">
                <p className="w-fit text-[1.2rem] py-2">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                </p>
                <div className="flex  gap-4 text-[22px] py-3">
                  <div className="text-[#35AD41] bg-white p-4 rounded-full">
                    <FaFacebookF className="text-[#35AD41] " />
                  </div>
                  <div className="text-[#35AD41] bg-white p-4 rounded-full">
                    <CiTwitter />
                  </div>
                  <div className="text-[#35AD41] bg-white p-4 rounded-full">
                    <FaLinkedinIn />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3">
              <div>
                <h1 className="font-bold">Quick Links</h1>
                <div className="my-3 flex flex-col gap-2">
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                </div>
              </div>

              <div>
                <h1 className="font-bold">Solutions</h1>
                <div className="my-3 flex flex-col gap-2">
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                </div>
              </div>

              <div>
                <h1 className="font-bold">Customers</h1>
                <div className="my-3 flex flex-col gap-2">
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                  <Link to="/" className="text-[1.2rem]">
                    Link 1
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="font-semibold text-[1.3rem] text-center md:text-start">Link Up</h1>
              <p className="text-[1.1rem] font-medium text-center md:text-start">
                New product drops, discounts & promotions, contests & more
              </p>
              <div className="bg-white flex rounded-xl">
                <input
                  className="text-balck w-full bg-transparent p-4"
                  placeholder="Your email"
                />
                <button className="px-4 py-3 text-white bg-[#35AD41] rounded-xl">
                  Subscribe
                </button>
              </div>
              <h1 className="font-semibold text-center md:text-start">
                Sign up for the Bizzzy Newsletter
              </h1>
            </div>
          </div>

          <div className="flex my-3 items-center justify-between font-medium lg:flex-row flex-col">
            <p>© 2024 Bizzzy. All rights reserved.</p>
            <Link to="/">Terms of Use & Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
