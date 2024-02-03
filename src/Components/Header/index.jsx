import { Box, Avatar } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CTAButton from "../CTAButton";

import { BsBell, BsCommand, BsSearch, BsSend } from "react-icons/bs";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { AiFillSetting } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData } from "../../redux/authSlice/authSlice";
import { clearProfileData } from "../../redux/authSlice/profileSlice";

export const Header = () => {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);
  const { profile_image } = profile.profile || [];
  const boxStyle = {
    display: "flex",
    alignItems: "center",
    color: "#374151",
    fontSize: "1rem",
  };

  const navigation = [
    { title: "Find Work", href: "/find-job" },
    { title: "My Jobs", href: "/my-jobs" },
    { title: "My Stats", href: "/my-stats" },
  ];

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const [selectedRole, setSelectedRole] = useState("job");
  const [searchTerm, setSearchTerm] = useState(null);

  // ======= search for jobs and talent

  const handelSelectedValue = (event) => {
    setSelectedRole(event.target.value);
  };

  const handelSearch = () => {
    const searchTermEncoded = encodeURIComponent(searchTerm);

    if (selectedRole === "job") {
      console.log("im form jobs");
      navigate(`/search-job?squery=${searchTermEncoded}`);
    } else if (selectedRole === "talent") {
      navigate(`/search-freelancers?squery=${searchTermEncoded}`);
    }
  };

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
              {/* ========== search ======= */}
              <div className="flex w-[350px] items-center  rounded-lg border-[#D1D5DB] border-[1px] py-1 px-2 justify-between">
                <div className="flex items-center gap-4">
                  <BsSearch />
                  <input
                    placeholder="Search here..."
                    type="text"
                    className=" border-none outline-none text-[14px] bg-transparent"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handelSearch();
                      }
                    }}
                    value={searchTerm || ""}
                  />
                </div>
                <div>
                  <select
                    className="bg-transparent"
                    value={selectedRole}
                    onChange={handelSelectedValue}
                  >
                    <option value={"job"} selected>
                      Jobs
                    </option>
                    <option value={"talent"}>Talent</option>
                  </select>
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
  const [cookie, setCookie] = useCookies(["activeagency"]);

  const profile = useSelector((state) => state.profile);
  const { profile_image, firstName, lastName } = profile.profile || [];
  const handleProfileButton = () => {
    setOpenInfo(!openInfo);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    setCookie("activeagency", false);
    dispatch(clearAuthData()); // Dispatch the clearAuthData action to reset the state
    dispatch(clearProfileData()); // Dispatch the clearAuthData action to reset the state
  };

  const handleUserProfile = () => {
    navigate("/profile");
  };

  const navigate = useNavigate();
  const navigation = [
    { title: "Find Work", href: "/find-a-dentist" },
    { title: "My Jobs", href: "/my-jobs" },
    { title: "My Stats", href: "/my-stats" },
    { title: "Message", href: "/faq" },
  ];
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [selectedRole, setSelectedRole] = useState("job");
  const [searchTerm, setSearchTerm] = useState(null);

  // ======= search for jobs and talent

  const handelSelectedValue = (event) => {
    setSelectedRole(event.target.value);
  };

  const handelSearch = () => {
    const searchTermEncoded = encodeURIComponent(searchTerm);

    if (selectedRole === "job") {
      console.log("im form jobs");
      navigate(`/search-job?squery=${searchTermEncoded}`);
    } else if (selectedRole === "talent") {
      navigate(`/search-freelancers?squery=${searchTermEncoded}`);
    }
  };

  return (
    <nav className="bg-white w-full shadow-slate-700 border-b-[1px] h-[80px] items-center flex justify-between">
      <div className="w-full mx-auto px-2 sm:px-6 lg:px-8 justify-between">
        <div className=" flex w-full items-center md:justify-between justify-between h-16">
          <div className="inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            {openMobileMenu ? (
              <button
                className="flex items-center justify-between p-2 rounded-md hover:text-white focus:outline-none  focus:text-white transition duration-150 ease-in-out"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
              >
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
          <div className="flex items-center">
            <div className="flex md:w-[100px] items-center">
              <p
                className="text-[22px] font-bold text-green-500 cursor-pointer text-right mb-0 pb-0"
                onClick={() => navigate("/")}
              >
                <img
                  src="/images/bizzzy_logo.png"
                  style={{
                    width: "80px",
                    marginTop: "3px",
                    margin: "auto",
                  }}
                />
              </p>
            </div>
            <div className="hidden sm:block sm:ml-6 mt-2">
              <div className="flex gap-9">
                <NavItem
                  title={role == 1 ? "Find Work" : "Dashboard"}
                  url={role == 1 ? "/find-job" : "/client-dashboard"}
                />
                {role == 1 && <NavItem title={"My Jobs"} url={"/my-jobs"} />}
                <NavItem title={"My Stats"} url="/my-stats" />
                <NavItem noIcon={true} title={"Messages"} url="/message" />
              </div>
            </div>
          </div>
          <div className=" right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:hidden md:flex whitespace-no-wrap items-center justify-center my-2 px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md  focus:outline-none focus:shadow-outline-indigo transition ease-in-out duration-150">
              <div className="flex w-[350px] mr-3">
                {/* ========== search ======= */}
                <div className="flex w-[350px] items-center  rounded-lg border-[#D1D5DB] border-[1px] py-1 px-2 justify-between">
                  <div className="flex items-center gap-4">
                    <BsSearch />
                    <input
                      placeholder="Search here..."
                      type="text"
                      className=" border-none outline-none text-[14px] bg-transparent"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handelSearch();
                        }
                      }}
                      value={searchTerm || ""}
                    />
                  </div>
                  <div>
                    <select
                      className="bg-transparent"
                      value={selectedRole}
                      onChange={handelSelectedValue}
                    >
                      <option value={"job"} selected>
                        Jobs
                      </option>
                      <option value={"talent"}>Talent</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 relative">
                <div
                  className="flex items-center justify-center rounded-full w-[36px] h-[36px] cursor-pointer"
                  onClick={() => handleProfileButton()}
                >
                  {profile_image != "null" && profile_image != null ? (
                    <img src={profile_image} style={{ borderRadius: "20px" }} />
                  ) : (
                    <Avatar name={firstName + " " + lastName} boxSize="40px" />
                  )}
                </div>

                {openInfo && (
                  <div className="absolute bg-white p-2 rounded-lg right-[36px] top-3 w-[120px] gap-5 border-slate-200 border transition-all z-50">
                    <div
                      className="flex justify-around items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                      onClick={handleUserProfile}
                    >
                      <CgProfile />
                      <p className="text-sm">Profile</p>
                    </div>
                    <div className="flex justify-around items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded">
                      <AiFillSetting />
                      <p className="text-sm">Setting</p>
                    </div>

                    <div
                      className="flex justify-around items-center w-full cursor-pointer my-1 hover:bg-gray-200/20 py-1 px-2 rounded"
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
                          placeholder="Search here ..."
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
                  <div className="flex items-center justify-center rounded-full w-[36px] h-[36px] ">
                    <img
                      src={profile_image}
                      width={"60px"}
                      style={{ borderRadius: "20px" }}
                    />
                  </div>
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
        <p className="text-[16px] font-[500] text-[#374151] ">{title}</p>
        {/* {!noIcon && <BsChevronDown />} */}
      </div>
    </Link>
  );
};
