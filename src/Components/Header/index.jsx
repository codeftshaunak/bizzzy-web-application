import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import CTAButton from "../CTAButton";

import {
  BsAlarm,
  BsBell,
  BsChevronDown,
  BsCommand,
  BsSearch,
  BsSend,
} from "react-icons/bs";
import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData } from "../../redux/authSlice/authSlice";

// export const Header = () => {
//     const navigate = useNavigate();
//     const [isHeaderFixed, setIsHeaderFixed] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 0) {
//                 setIsHeaderFixed(true);
//             } else {
//                 setIsHeaderFixed(false);
//             }
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);

//     // Define a CSS class for the fixed header
// const headerStyles = {
//     // position: isHeaderFixed ? "fixed" : "relative",
//     top: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     zIndex: 1000,
//     borderBottom: isHeaderFixed && "1px solid #E5E7EB",
//     transition: "position 0.3s ease-in-out",
// };

// const boxStyle = {
//     display: "flex",
//     alignItems: "center",
//     color: "#374151",
//     fontSize: "1rem"
// }

//     return (
//         <FullContainer borderBottom={"1px solid #E5E7EB"} bg={"#fff"} mg={"auto"}>
//             <HStack
//                 style={headerStyles}
//                 transition={"0.3s ease-in-out"}
//                 height={"76px"}
//                 alignItems={"center"}
//                 justifyContent={"space-between"}
//             >

//                 <HStack justifyContent={"space-between"} width={"40%"}>
//                     <Text color={"#22C55E"} fontWeight={"600"} fontSize={"25px"} onClick={() => navigate("/")} cursor={"pointer"}>Bizzzy</Text>
//                     <HStack justifyContent={"space-around"} width={"80%"}>
//                         <Box style={boxStyle}>
//                             <Text>Find Talent</Text>
//                             <FiChevronDown />
//                         </Box>
//                         <Box style={boxStyle}>
//                             <Text>Find Work</Text>
//                             <FiChevronDown />
//                         </Box>
//                         <Box style={boxStyle}>
//                             <Text>Why Bizzzy</Text>
//                             <FiChevronDown />
//                         </Box>
//                     </HStack>
//                 </HStack>

//                 <HStack width={"45%"} justifyContent={"space-between"}>
//                     <Box style={boxStyle} width={"370px"} border={"1px solid #9CA3AF"} padding={"0.0rem 1rem"} borderRadius={"5px"}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
//                             <circle cx="6.66667" cy="6.66667" r="4.66667" stroke="#6B7280" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M14 14L10 10" stroke="#6B7280" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                         <Input placeholder={"Search here..."} width={"100%"} border={"none"} marginLeft={"0"} />
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
//                             <g clip-path="url(#clip0_3745_2309)">
//                                 <path d="M4.66634 6.00065C4.40263 6.00065 4.14485 5.92245 3.92558 5.77594C3.70632 5.62944 3.53542 5.4212 3.4345 5.17756C3.33359 4.93393 3.30718 4.66584 3.35863 4.4072C3.41007 4.14856 3.53706 3.91098 3.72353 3.72451C3.91 3.53804 4.14758 3.41105 4.40622 3.3596C4.66486 3.30816 4.93295 3.33456 5.17659 3.43548C5.42022 3.5364 5.62846 3.70729 5.77497 3.92656C5.92148 4.14582 5.99968 4.40361 5.99968 4.66732V11.334C5.99968 11.5977 5.92148 11.8555 5.77497 12.0747C5.62846 12.294 5.42022 12.4649 5.17659 12.5658C4.93295 12.6667 4.66486 12.6931 4.40622 12.6417C4.14758 12.5903 3.91 12.4633 3.72353 12.2768C3.53706 12.0903 3.41007 11.8527 3.35863 11.5941C3.30718 11.3355 3.33359 11.0674 3.4345 10.8237C3.53542 10.5801 3.70632 10.3719 3.92558 10.2254C4.14485 10.0789 4.40263 10.0007 4.66634 10.0007H11.333C11.5967 10.0007 11.8545 10.0789 12.0738 10.2254C12.293 10.3719 12.4639 10.5801 12.5648 10.8237C12.6658 11.0674 12.6922 11.3355 12.6407 11.5941C12.5893 11.8527 12.4623 12.0903 12.2758 12.2768C12.0893 12.4633 11.8518 12.5903 11.5931 12.6417C11.3345 12.6931 11.0664 12.6667 10.8228 12.5658C10.5791 12.4649 10.3709 12.294 10.2244 12.0747C10.0779 11.8555 9.99968 11.5977 9.99968 11.334V4.66732C9.99968 4.40361 10.0779 4.14582 10.2244 3.92656C10.3709 3.70729 10.5791 3.5364 10.8228 3.43548C11.0664 3.33456 11.3345 3.30816 11.5931 3.3596C11.8518 3.41105 12.0893 3.53804 12.2758 3.72451C12.4623 3.91098 12.5893 4.14856 12.6407 4.4072C12.6922 4.66584 12.6658 4.93393 12.5648 5.17756C12.4639 5.4212 12.293 5.62944 12.0738 5.77594C11.8545 5.92245 11.5967 6.00065 11.333 6.00065H4.66634Z" stroke="#6B7280" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
//                             </g>
//                             <defs>
//                                 <clipPath id="clip0_3745_2309">
//                                     <rect width="16" height="16" fill="white" />
//                                 </clipPath>
//                             </defs>
//                         </svg>
//                     </Box>
//                     <Box style={boxStyle} justifyContent={"space-between"} width={"210px"}>
//                         <CTAButton
//                             text={"Login"}
//                             fontSize="1rem"
//                             height="2.5rem"
//                         ></CTAButton>
//                         <CTAButton
//                             text={"SignUp"}
//                             bg={"#22C55E"}
//                             color={"#ffff"}
//                             fontSize="1rem"
//                             height="2.5rem"
//                         ></CTAButton>
//                     </Box>
//                 </HStack>
//             </HStack>
//         </FullContainer>
//     );
// };

export const Header = () => {
  const navigate = useNavigate();
  const boxStyle = {
    display: "flex",
    alignItems: "center",
    color: "#374151",
    fontSize: "1rem",
  };

  const login = [
    { href: "/login", label: "Member Login" },
    { href: "", label: "Office Login" },
  ];
  const navigation = [
    { title: "Find Work", href: "/find-job" },
    { title: "My Jobs", href: "/my-jobs" },
    { title: "Reports", href: "/report" },
  ];

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <nav className="bg-white w-full shadow-slate-700 border-b-[1px]">
      <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8">
        <div className=" flex items-center md:justify-between justify-between h-16">
          <div className=" inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            {openMobileMenu ? (
              <button
                className="flex items-center justify-between p-2 rounded-md hover:text-white focus:outline-none  focus:text-white transition duration-150 ease-in-out"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
              >
                {/* <!-- Icon when menu is closed. -->
          <!--
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                    fill="#000000"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="flex items-center justify-between p-2 rounded-md text-gray-400 hover:text-gray-400 focus:outline-none focus:text-gray-400 transition duration-150 ease-in-out"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
              >
                {/* <!-- Icon when menu is closed. -->
          <!--
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* <!-- Icon when menu is open. --> */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flex items-center sm:items-stretch">
            <div className="flex justify-between gap-x-5">
              <div className="flex-shrink-0">
                <p
                  className="text-[22px] font-bold text-green-500 cursor-pointer text-right"
                  onClick={() => navigate("/")}
                >
                  <img
                    src="/images/bizzzy_logo.png"
                    style={{
                      width: "80px",
                      marginTop: "3px",
                    }}
                  />
                </p>
              </div>
            </div>

            <div className="hidden sm:block sm:ml-6 mt-2">
              <div className="flex gap-5">
                {navigation &&
                  navigation.length > 0 &&
                  navigation.map((item, i) => (
                    <NavItem key={i} title={item.title} url={item.href} />
                  ))}
              </div>
            </div>
          </div>
          <div className="right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:hidden md:flex whitespace-no-wrap items-center justify-center my-2 px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md  focus:outline-none focus:shadow-outline-indigo transition ease-in-out duration-150">
              <div className="flex w-[350px]">
                <div className="flex w-[350px] items-center  rounded-lg border-[#D1D5DB] border-[1px] py-1 px-2 justify-between">
                  <div className="flex items-center gap-4">
                    <BsSearch />
                    <input
                      placeholder="Search here..."
                      type="text"
                      className=" border-none outline-none text-[14px] "
                    />
                  </div>

                  <BsCommand />
                </div>
              </div>
              <Box
                className="hidden sm:hidden md:flex whitespace-no-wrap items-center justify-center my-2 py-2 border border-transparent text-base leading-6 font-medium rounded-md  focus:shadow-outline-indigo  transition ease-in-out duration-150"
                width={"210px"}
              >
                <CTAButton
                  onClick={() => navigate("/login")}
                  text={"Login"}
                  fontSize="1rem"
                  height="2.5rem"
                  className="mr-2"
                ></CTAButton>
                <CTAButton
                  onClick={() => navigate("/signup")}
                  text={"SignUp"}
                  bg={"#22C55E"}
                  color={"#ffff"}
                  fontSize="1rem"
                  height="2.5rem"
                ></CTAButton>
              </Box>
            </div>

            {/* <!-- Profile dropdown --> */}
            <div className="ml-3 relative">
              {openSearch && (
                <div className="mt-2 w-full left-0 top-0 rounded-md md:hidden">
                  <div className="flex mt-2">
                    <div className="flex items-center  rounded-lg border-[#D1D5DB] border-[1px] py-1 px-2 justify-between">
                      <div className="flex items-center gap-4">
                        <BsSearch />
                        <input
                          placeholder="Search here..."
                          type="text"
                          className=" border-none outline-none text-[#9CA3AF] text-[14px] "
                        />
                      </div>

                      <BsCommand />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden mt-2">
            <button
              onClick={() => {
                setOpenSearch(!openSearch);
              }}
            >
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  --> */}
      {openMobileMenu && (
        <div className="md:hidden lg:hidden sm:block">
          <div className="px-2 pt-2 pb-3">
            {navigation.map(({ href, title }) => (
              <a
                href={href}
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                key={title}
              >
                {title}
              </a>
            ))}
            <div className="gap-4 w-full">
              <Box
                style={boxStyle}
                className="mt-3 ml-2"
                justifyContent={"space-between"}
                width={"210px"}
              >
                <CTAButton
                  onClick={() => navigate("/login")}
                  text={"Login"}
                  fontSize="1rem"
                  height="2.5rem"
                ></CTAButton>
                <CTAButton
                  onClick={() => navigate("/signup")}
                  text={"SignUp"}
                  bg={"#22C55E"}
                  color={"#ffff"}
                  fontSize="1rem"
                  height="2.5rem"
                ></CTAButton>
              </Box>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export const AuthHeader = ({ role }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  // const  profileDetail  = useSelector((state) => state.profile.profileDetail);
  let profileDetail = JSON.parse(localStorage.getItem('profile'))
  const handleProfileButton = () => {
    setOpenInfo(!openInfo);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuthData()); // Dispatch the clearAuthData action to reset the state
  };

  const navigate = useNavigate();
  const boxStyle = {
    display: "flex",
    alignItems: "center",
    color: "#374151",
    fontSize: "1rem",
  };

  const login = [
    { href: "/login", label: "Member Login" },
    { href: "", label: "Office Login" },
  ];
  const navigation = [
    { title: "Find Work", href: "/find-a-dentist" },
    { title: "My Jobs", href: "/my-jobs" },
    { title: "Reports", href: "/faq" },
    { title: "Message", href: "/faq" },
  ];

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openLoginMenu, setOpenLoginMenu] = useState(false);
  return (
    <nav className="bg-white w-full shadow-slate-700 border-b-[1px]">
      <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8">
        <div className=" flex items-center md:justify-between justify-between h-16">
          <div className=" inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            {openMobileMenu ? (
              <button
                className="flex items-center justify-between p-2 rounded-md hover:text-white focus:outline-none  focus:text-white transition duration-150 ease-in-out"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
              >
                {/* <!-- Icon when menu is closed. -->
          <!--
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                    fill="#000000"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="flex items-center justify-between p-2 rounded-md text-gray-400 hover:text-gray-400 focus:outline-none focus:text-gray-400 transition duration-150 ease-in-out"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
              >
                {/* <!-- Icon when menu is closed. -->
          <!--
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* <!-- Icon when menu is open. --> */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flex items-center sm:items-stretch">
            <div className="flex-shrink-0">
              <p
                className="text-[22px] font-bold text-green-500 cursor-pointer text-right"
                onClick={() => navigate("/")}
              >
                <img
                  src="/images/bizzzy_logo.png"
                  style={{
                    width: "80px",
                    marginTop: "3px",
                  }}
                />
              </p>
            </div>
            <div className="hidden sm:block sm:ml-6 mt-2">
              <div className="flex gap-5">
                <NavItem
                  title={role == 1 ? "Find Work" : "Dashboard"}
                  url={role == 1 ? "/find-job" : "/client-dashboard"}
                />
                {role == 1 && <NavItem title={"My Jobs"} />}
                <NavItem title={"Reports"} url="/report" />
                <NavItem noIcon={true} title={"Messages"} url="/message" />
              </div>
            </div>
          </div>
          <div className=" right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:hidden md:flex whitespace-no-wrap items-center justify-center my-2 px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md  focus:outline-none focus:shadow-outline-indigo transition ease-in-out duration-150">
              <div className="flex w-[350px] mr-3">
                <div className="flex w-[350px] items-center  rounded-lg border-[#D1D5DB] border-[1px] py-1 px-2 justify-between">
                  <div className="flex items-center gap-4">
                    <BsSearch />
                    <input
                      placeholder="Search here..."
                      type="text"
                      className=" border-none outline-none text-[14px] "
                    />
                  </div>

                  <BsCommand />
                </div>
              </div>
              <div className="flex gap-3 relative">
                <div className=" flex items-center justify-center w-[36px] h-[36px] bg-slate-100 rounded-md ">
                  <BsSend width={"20px"} height={"20px"} />
                </div>
                <div className=" flex items-center justify-center w-[36px] h-[36px] bg-slate-100 rounded-md ">
                  <BsBell width={"20px"} height={"20px"} />
                </div>
                <div
                  className="flex items-center justify-center rounded-full w-[36px] h-[36px] cursor-pointer !bg-cover"
                  style={{
                    background: `url(${profileDetail.profile_image!=="null"?profileDetail.profile_image:"./images/user.jpeg"})`,
                    backgroundSize: "contain",
                  }}
                  onClick={() => handleProfileButton()}
                ></div>

                {openInfo && (
                  <div className="absolute bg-white p-2 rounded-lg right-[30px] top-3 w-[120px] gap-5 border-slate-200 border transition-all">
                    <div className="flex justify-around items-center w-full cursor-pointer mt-3">
                      <AiFillSetting />
                      <p className="text-sm">Setting</p>
                    </div>

                    <div
                      className="flex justify-around items-center w-full cursor-pointer my-3"
                      onClick={() => handleLogout()}
                    >
                      <BiExit />
                      <p className="text-sm">Logout</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* <!-- Profile dropdown --> */}
            <div className="ml-3 relative">
              {openSearch && (
                <div className="mt-2 w-full left-0 top-0 rounded-md md:hidden">
                  <div className="flex mt-2">
                    <div className="flex items-center  rounded-lg border-[#D1D5DB] border-[1px] py-1 px-2 justify-between">
                      <div className="flex items-center gap-4">
                        <BsSearch />
                        <input
                          placeholder="Search here..."
                          type="text"
                          className=" border-none outline-none text-[#9CA3AF] text-[14px] "
                        />
                      </div>

                      <BsCommand />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => {
                setOpenSearch(!openSearch);
              }}
            >
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* <!--
  Mobile menu, toggle classes based on menu state.

  Menu open: "block", Menu closed: "hidden"
--> */}
      {openMobileMenu && (
        <div className="md:hidden lg:hidden sm:block">
          <div className="px-2 pt-2 pb-3">
            {navigation.map(({ href, title }) => (
              <a
                href={href}
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                key={title}
              >
                {title}
              </a>
            ))}
            <div className="gap-5 w-full">
              <div>
                <div className="flex justify-between px-3 my-1 items-center">
                  <p className="text-gray-700 font-medium">Direct Contracts</p>
                  <div className=" flex items-center justify-center w-[36px] h-[36px] bg-slate-100 rounded-md ">
                    <BsSend width={"20px"} height={"20px"} />
                  </div>
                </div>
                <div className="flex justify-between px-3 my-1 items-center">
                  <p className="text-gray-700 font-medium">Notifications</p>
                  <div className=" flex items-center justify-center w-[36px] h-[36px] bg-slate-100 rounded-md ">
                    <BsBell width={"20px"} height={"20px"} />
                  </div>
                </div>

                <div className="mx-3 flex gap-3 my-3">
                  <div
                    className="flex items-center justify-center rounded-full w-[36px] h-[36px] "
                    style={{
                      background: `url(${"./images/user.jpeg"})`,
                      backgroundSize: "contain",
                    }}
                  ></div>
                  <div>
                    <p className="text-gray-700 font-medium text-[14px]">
                      Joe Doe
                    </p>
                    <p className="text-gray-700 text-[14px]">
                      Customer Experience Consultant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ title, noIcon, url, onClick }) => {
  const navigate = useNavigate();
  return (
    <Link to={url}>
      <div className="flex items-center gap-[8px] text-[#536e53] cursor-pointer">
        <p className="text-[14px] font-[500] text-[#374151] ">{title}</p>
        {/* {!noIcon && <BsChevronDown />} */}
      </div>
    </Link>
  );
};

// export const AuthHeader = () => {
//     const navigate = useNavigate();
//     const [isHeaderFixed, setIsHeaderFixed] = useState(false);
//     const user_info = useState(localStorage.getItem("cfl_id"));

//     useEffect(() => {
//         // Add an event listener to track scroll position
//         const handleScroll = () => {
//             if (window.scrollY > 0) {
//                 setIsHeaderFixed(true);
//             } else {
//                 setIsHeaderFixed(false);
//             }
//         };

//         window.addEventListener("scroll", handleScroll);

//         // Remove the event listener when the component unmounts
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);

//     // Define a CSS class for the fixed header
//     const headerStyles = {
//         position: isHeaderFixed ? "fixed" : "relative",
//         top: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: "#fff", // Change the background color as needed
//         zIndex: 1000, // Adjust the z-index as needed
//         borderBottom: isHeaderFixed && "1px solid #CEE0FF",
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("cflToken");
//         localStorage.removeItem("username");
//         navigate("/");
//     }

//     return (
//         <FullContainer borderBottom={"1px solid #CEE0FF"} bg={"#fff"}>
//             <HStack style={headerStyles}>
//                 <HStack
//                     alignItems={"center"}
//                     width={isHeaderFixed ? ["97%", "95%", "75%"] : "full"}
//                     justifyContent={"space-between"}
//                     paddingY={"20px"}
//                     margin={"auto"}
//                 >
//                     <Image
//                         src="/assets/images/newLogo.png"
//                         width={["200px", "200px", "200px", "300px"]}
//                         onClick={() => {
//                             navigate("/dashboard");
//                         }}
//                     />

//                     <HStack
//                         alignItems={"center"}
//                         gap={5}
//                         display={["none", "none", "none", "flex"]}
//                     >
//                         {/* <NavLink text={"Dashboard"} link={"/dashboard"} /> */}
//                         <div onClick={() => navigate('/edit-profile/' + user_info[0])}>
//                             <CTAButton
//                                 text={
//                                     <HiOutlineUser />
//                                 }
//                                 bg={"white"}
//                                 border={"1px solid #E2E8f0"}
//                                 fontSize={"1.4rem"}
//                                 padding={"1px"}
//                                 color={"black"}
//                                 borderRadius={"10px"}
//                                 fontWeight={"200"}
//                                 hoverbg={"#E2E8f0"}
//                             />
//                         </div>
//                         <div onClick={() => navigate('/message')}>
//                             <CTAButton
//                                 text={
//                                     <>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
//                                             <path d="M20.25 8.511C21.134 8.795 21.75 9.639 21.75 10.608V14.894C21.75 16.03 20.903 16.994 19.77 17.087C19.43 17.114 19.09 17.139 18.75 17.159V20.25L15.75 17.25C14.396 17.25 13.056 17.195 11.73 17.087C11.4413 17.0637 11.1605 16.9813 10.905 16.845M20.25 8.511C20.0955 8.46127 19.9358 8.42939 19.774 8.416C17.0959 8.19368 14.4041 8.19368 11.726 8.416C10.595 8.51 9.75 9.473 9.75 10.608V14.894C9.75 15.731 10.21 16.474 10.905 16.845M20.25 8.511V6.637C20.25 5.016 19.098 3.611 17.49 3.402C15.4208 3.13379 13.3365 2.99951 11.25 3C9.135 3 7.052 3.137 5.01 3.402C3.402 3.611 2.25 5.016 2.25 6.637V12.863C2.25 14.484 3.402 15.889 5.01 16.098C5.587 16.173 6.167 16.238 6.75 16.292V21L10.905 16.845" stroke="#1E1E1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                         </svg>
//                                     </>
//                                 }
//                                 bg={"white"}
//                                 border={"1px solid #E2E8f0"}
//                                 fontSize={"1.4rem"}
//                                 padding={"1px"}
//                                 color={"black"}
//                                 borderRadius={"10px"}
//                                 fontWeight={"200"}
//                                 hoverbg={"#E2E8f0"}
//                             />
//                         </div>

//                         <div onClick={() => navigate('/notifications')}>
//                             <CTAButton
//                                 text={
//                                     <>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
//                                             <path d="M14.857 17.082C16.7202 16.8614 18.5509 16.4217 20.311 15.772C18.8204 14.1208 17.9967 11.9745 18 9.75V9.05V9C18 7.4087 17.3678 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.88257 3.63214 7.75735 4.75736C6.63213 5.88258 5.99999 7.4087 5.99999 9V9.75C6.00301 11.9746 5.17898 14.121 3.68799 15.772C5.42099 16.412 7.24799 16.857 9.14299 17.082M14.857 17.082C12.959 17.3071 11.041 17.3071 9.14299 17.082M14.857 17.082C15.0011 17.5319 15.0369 18.0094 14.9616 18.4757C14.8862 18.942 14.7018 19.384 14.4234 19.7656C14.1449 20.1472 13.7803 20.4576 13.3592 20.6716C12.9381 20.8856 12.4724 20.9972 12 20.9972C11.5276 20.9972 11.0619 20.8856 10.6408 20.6716C10.2197 20.4576 9.85506 20.1472 9.57661 19.7656C9.29816 19.384 9.11375 18.942 9.0384 18.4757C8.96305 18.0094 8.99889 17.5319 9.14299 17.082" stroke="#1E1E1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                         </svg>
//                                     </>
//                                 }
//                                 bg={"white"}
//                                 border={"1px solid #E2E8f0"}
//                                 fontSize={"1.4rem"}
//                                 padding={"1px"}
//                                 color={"black"}
//                                 borderRadius={"10px"}
//                                 fontWeight={"200"}
//                                 hoverbg={"#E2E8f0"}
//                             />
//                         </div>
//                         <div onClick={() => handleLogout()} className="text-bold">
//                             <CTAButton
//                                 text={
//                                     <>
//                                         Logout
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginLeft: "10px" }}>
//                                             <g clip-path="url(#clip0_26_2554)">
//                                                 <path d="M11.6667 6.66659V4.99992C11.6667 4.55789 11.4911 4.13397 11.1785 3.82141C10.8659 3.50885 10.442 3.33325 10 3.33325H4.16667C3.72464 3.33325 3.30072 3.50885 2.98816 3.82141C2.67559 4.13397 2.5 4.55789 2.5 4.99992V14.9999C2.5 15.4419 2.67559 15.8659 2.98816 16.1784C3.30072 16.491 3.72464 16.6666 4.16667 16.6666H10C10.442 16.6666 10.8659 16.491 11.1785 16.1784C11.4911 15.8659 11.6667 15.4419 11.6667 14.9999V13.3333" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
//                                                 <path d="M7.5 10H17.5L15 7.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
//                                                 <path d="M15 12.5L17.5 10" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
//                                             </g>
//                                             <defs>
//                                                 <clipPath id="clip0_26_2554">
//                                                     <rect width="20" height="20" fill="white" />
//                                                 </clipPath>
//                                             </defs>
//                                         </svg>
//                                     </>
//                                 }
//                                 bg={"#0086ff"}
//                                 fontSize={"md"}
//                                 padding={"5px 30px"}
//                                 color={"white"}
//                                 borderRadius={"2rem"}
//                                 fontWeight={"600"}
//                             />
//                         </div>

//                     </HStack>
//                     <Box display={["block", "block", "block", "none"]}>
//                         <HamburgerIcon fontSize={"24px"} color={"brand.400"} />
//                     </Box>
//                 </HStack>
//             </HStack>
//         </FullContainer>
//     );
// };

// export default Header;

// const NavLink = (props) => {
//     return (
//         <>
//             <Link to={props.link}>
//                 <Text
//                     fontSize={"md"}
//                     color={"white.900"}
//                     _hover={{ color: "brand.300" }}
//                     fontWeight={"600"}
//                     marginBottom={"0px"}
//                 >
//                     {props.text}
//                 </Text>
//             </Link>
//         </>
//     );
// };
