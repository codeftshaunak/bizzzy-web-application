import {
  Button,
  Spinner,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { getInvitedFreelancer, getSearchFreelancer } from "../../helpers/jobApis";
import { useDispatch } from "react-redux";
import { clientService } from "../../redux/clientSlice/clientService";
import { hireFreelancerService } from "../../redux/clientSlice/clientService";
import useCustomToast from "../../hooks/useCustomToast";

export const InviteFreelancer = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [allFreelancers, setAllFreelancers] = useState([]);
  const [invitedFreelancers, setinvitedFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isHire, setIsHire] = useState(false);
  const [isUserId, setIsUserId] = useState('');

  const showToast = useCustomToast();
  const dispatch = useDispatch();
  let params = useParams();
  let { id } = params;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getSearchFreelancer([""]);
      if (response ) {
        setSearchResults(response?.body);
      } else {
        console.error("API Response body is undefined");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFreelancer = async () => {
    try {
      setLoading(true);
      const response = await getSearchFreelancer([""]);
      if (response && response) {
        setAllFreelancers(response);
      } else {
        console.error("API Response body is undefined");
      }
    } catch (error) {
      console.error("Error fetching invited results:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    getFreelancer();
  }, []);

  const invitedFreelancer = async () => {
    try {
      setLoading(true);
      const response = await getInvitedFreelancer();
      if (response) {
        setinvitedFreelancers(response?.body);
      } else {
        console.error("API Response body is undefined");
      }
    } catch (error) {
      console.error("Error fetching invited results:", error);
    } finally {
      setLoading(false);
    }
  };

  // const HandleInviteToJob = async (userId) => {
  //   const formData = {
  //     receiver_id: userId,
  //     message: "hi accept this",
  //     job_id: id,
  //   };
  //   try {
  //     let result = await dispatch(clientService(formData));
  //     if (result?.code === 200) {
  //       toast({
  //         title: "Invite send",
  //         position: "top-right",
  //         status: "success",
  //         isClosable: true,
  //         duration: 2000,
  //       });
  //     }
  //   } catch (error) {
  //     const message = error?.response?.data?.msg;
  //     toast({
  //       title: message,
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //       position: "top-right",
  //     });
  //   }
  // };
  const HandleOpenModal = (item, id) => {
    setIsUserId(id);
    if (item === "hire") {
      setIsHire(true);
    } else {
      setIsHire(false);
    }
    setOpen((prev) => !prev);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const HandleTextValue = (e) => {
    if (e.target.value.trim().length === 0) {
      setErrorMessage("Please enter a message.");
    } else {
      setErrorMessage("");
    }
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (isHire) {
      //call hire api
      const formData = {
        freelencer_id: isUserId,
        job_id: id,
        budget: "$55"
      };
      try {
        let result = await dispatch(hireFreelancerService(formData));
        if (result?.code == 200) {
          setOpen(false);
          setMessage("");
          showToast({
            title: result?.msg,
            status: "success", // or 'error', 'info', etc.
          });
          // toast({
          //   title: result?.msg,
          //   position: "top-right",
          //   status: "success",
          //   isClosable: true,
          //   duration: 2000,
          // });
        }
      } catch (error) {
        setOpen(false);
        setMessage("");
        const message = error?.response?.data?.msg;
        // toast({
        //   title: message,
        //   status: "error",
        //   duration: 3000,
        //   isClosable: true,
        //   position: "top-right",
        // });
        showToast({
          title: message,
          status: "error",
        });
      }
    } else {
      if (message.trim().length === 0) {
        setErrorMessage("Please enter a message.");
      } else {
        const formData = {
          receiver_id: isUserId,
          message: message,
          job_id: id,
        };
        try {
          let result = await dispatch(clientService(formData));
          if (result?.code == 200) {
            fetchData();
            setOpen(false);
            closeModal();
            setMessage("");
            showToast({
              title: "Invite send",
              status: "success",
            });

            // toast({
            //   title: "Invite send",
            //   position: "top-right",
            //   status: "success",
            //   isClosable: true,
            //   duration: 2000,
            // });
          }
        } catch (error) {
          setOpen(false);
          setMessage("");
          const message = error?.response?.data?.msg;
          showToast({
            title: message,
            status: "error",
          });
          // toast({
          //   title: message,
          //   status: "error",
          //   duration: 3000,
          //   isClosable: true,
          //   position: "top-right",
          // });
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="overflow-hidden border rounded-lg basis-full md:basis-4/5 border-slate-300">
        <Tabs variant="unstyled">
          <TabList className="pt-4 border-b">
            <Tab className="px-0 text-black" onClick={() => getFreelancer()}>Search</Tab>
            <Tab
              className="px-0 text-black"
              onClick={() => invitedFreelancer()}
            >
              Invited freelancer
            </Tab>
            {/* <Tab className="px-0 text-black">My Hire</Tab> */}

          </TabList>
          <TabIndicator
            height="2px"
            borderRadius="1px"
            color={"#000"}
            className=" bg-fg-brand" />
          <TabPanels>
            <TabPanel p={0} bg={"#F3F4F6"}>
              <div className="h-auto px-8 pt-8 pb-4 border-b-2 ">
                {loading && (
                  <Spinner
                    backgroundColor={"#"}
                    width={"3rem"}
                    height={"3rem"}
                    color="red" />
                )}
                {!loading &&
                  searchResults?.map((searchResult) => (
                    <div key={searchResult?._id}>
                      <div className="flex gap-8 pb-5">
                        <div className="w-[200px] h-[150px]">
                          <img
                            src="https://c.animaapp.com/LZ3BWujk/img/rectangle-26-1@2x.png"
                            alt="" />
                        </div>
                        <div className="w-full space-y-2 ">
                          <div className="flex justify-between ">
                            <div className="flex gap-3">
                              <div className="w-[36px] h-[36px] rounded-full">
                                <img
                                  src={searchResult?.profile_image}
                                  className="w-full h-full rounded-full"
                                  alt="" />
                              </div>
                              <div>
                                <h2 className="text-base font-semibold text-fg-brand">
                                  {searchResult?.firstName}{" "}
                                  {searchResult?.lastName}
                                </h2>
                                <p className="text-sm font-medium text-[#6B7280]">
                                  {searchResult?.professional_role}
                                </p>
                              </div>
                            </div>
                            <div>
                              <Stack direction="row" spacing={4} align="center">
                                <Button
                                  size="sm"
                                  colorScheme="#16A34A"
                                  variant="outline"
                                  color={"#16A34A"}
                                  onClick={() => HandleOpenModal("hire", searchResult?.user_id)}
                                >
                                  Hire
                                </Button>
                                <Button
                                  colorScheme="#16A34A"
                                  variant="outline"
                                  size={"sm"}
                                  bg={"#16A34A"}
                                  color={"#fff"}
                                  onClick={() => HandleOpenModal("inviteToJob", searchResult?.user_id
                                  )}
                                >
                                  {searchResult?.invitation_status === 0 ? "Invited" :searchResult?.invitation_status === 1 ? "Accepted": "Invite to Job"}
                                </Button>
                              </Stack>
                            </div>
                          </div>

                          <div>
                            <Button
                              colorScheme="#16A34A"
                              variant="outline"
                              size={"xs"}
                              color={"#16A34A"}
                            >
                              Available now
                            </Button>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-[#6B7280]">
                              ${searchResult?.hourly_rate}/hr
                            </p>
                          </div>
                          <div>
                            <Link
                              to={"/"}
                              className="mt-1 text-sm font-normal text-[#38BDF8] hover:underline"
                            >
                              Earned $ 1k on adobe illustrator
                            </Link>
                            <Link
                              to={"/"}
                              className="flex items-center gap-2 mt-1 text-sm font-normal text-[#38BDF8] hover:underline "
                            >
                              Has 9 relevant skills to your job
                              <span>
                                <AiFillQuestionCircle className="text-[#6B7280]" />
                              </span>
                            </Link>
                          </div>

                          <div className="flex items-center justify-between">
                            <Stack spacing={4} direction="row" align="center">
                              {searchResult.length > 0 && searchResult?.skills.map((skill, idx) => (
                                <Button
                                  key={idx}
                                  size="sm"
                                  colorScheme="gray"
                                  color={"#6B7280"}
                                >
                                  {skill}
                                </Button>
                              ))}
                            </Stack>
                            <div>
                              <IoIosArrowForward
                                size={24}
                                className="text-fg-brand" />
                            </div>
                          </div>
                        </div>
                      </div>
                      {open && (
                        <div>
                          <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                              <div className="modal-content py-4 text-left px-6">
                                <div className="flex justify-between items-center pb-3 border-b">
                                  <p className="text-xl font-500">
                                    {isHire
                                      ? "Are you sure !"
                                      : "Enter your message for invite"}
                                  </p>
                                  <button
                                    className="modal-close cursor-pointer z-50"
                                    onClick={closeModal}
                                  >
                                    &times;
                                  </button>
                                </div>
                                {!isHire && (
                                  <div className="my-5">
                                    <textarea
                                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                      placeholder="Enter your message..."
                                      rows="4"
                                      value={message}
                                      onChange={HandleTextValue} />
                                    <p className="text-red-500 text-sm">
                                      {errorMessage}
                                    </p>
                                  </div>
                                )}
                                <div className="flex justify-end pt-2 border-t">
                                  <button
                                    onClick={closeModal}
                                    className="px-4 py-2 mx-4 bg-white border border-black rounded-lg text-black hover:bg-[#F0FDF4]"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="px-4 bg-fg-brand py-2 rounded-lg text-white hover:bg-fg-brand"
                                    onClick={handleSend}
                                  >
                                    {isHire ? "Sure" : "Send"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </TabPanel>
            <TabPanel>
              {/* Invited freelancer */}
              <TabPanel p={0} bg={"#F3F4F6"}>
                <div className="h-auto px-8 pt-8 pb-4 border-b-2 ">
                  {loading && (
                    <Spinner
                      backgroundColor={"#"}
                      width={"3rem"}
                      height={"3rem"}
                      color="red" />
                  )}
                  {!loading &&
                    invitedFreelancers?.map((searchResult) => (
                      <div key={searchResult?._id}>
                        <div className="flex gap-8 pb-5">
                          <div className="w-[200px] h-[150px]">
                            <img
                              src="https://c.animaapp.com/LZ3BWujk/img/rectangle-26-1@2x.png"
                              alt="" />
                          </div>
                          <div className="w-full space-y-2 ">
                            <div className="flex justify-between ">
                              <div className="flex gap-3">
                                <div className="w-[36px] h-[36px] rounded-full">
                                  <img
                                    src={searchResult?.profile_image}
                                    className="w-full h-full rounded-full"
                                    alt="" />
                                </div>
                                <div>
                                  <h2 className="text-base font-semibold text-fg-brand">
                                    {searchResult?.firstName}{" "}
                                    {searchResult?.lastName}
                                  </h2>
                                  <p className="text-sm font-medium text-[#6B7280]">
                                    {searchResult?.professional_role}
                                  </p>
                                </div>
                              </div>
                              <div></div>
                            </div>

                            <div>
                              <Button
                                colorScheme="#16A34A"
                                variant="outline"
                                size={"xs"}
                                color={"#16A34A"}
                              >
                                Available now
                              </Button>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-[#6B7280]">
                                ${searchResult?.hourly_rate}/hr
                              </p>
                            </div>
                            <div>
                              <Link
                                to={"/"}
                                className="mt-1 text-sm font-normal text-[#38BDF8] hover:underline"
                              >
                                Earned $ 1k on adobe illustrator
                              </Link>
                              <Link
                                to={"/"}
                                className="flex items-center gap-2 mt-1 text-sm font-normal text-[#38BDF8] hover:underline "
                              >
                                Has 9 relevant skills to your job
                                <span>
                                  <AiFillQuestionCircle className="text-[#6B7280]" />
                                </span>
                              </Link>
                            </div>

                            <div className="flex items-center justify-between">
                              <Stack spacing={4} direction="row" align="center">
                                {searchResult.length > 0 && searchResult?.skills?.map((skill, idx) => (
                                  <Button
                                    key={idx}
                                    size="sm"
                                    colorScheme="gray"
                                    color={"#6B7280"}
                                  >
                                    {skill}
                                  </Button>
                                ))}
                              </Stack>
                              <div>
                                <IoIosArrowForward
                                  size={24}
                                  className="text-fg-brand" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabPanel>
            </TabPanel>
            {/* <TabPanel>
              <p>My Hire!</p>
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};
