import {
  Button,
  Spinner,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  Text,
  useToast,
  HStack,
  VStack,
  Image
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { AiFillQuestionCircle, AiFillStar } from "react-icons/ai";
import { FiEdit2, FiEye, FiUser } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { LiaRetweetSolid } from "react-icons/lia";
import { RxCross1 } from "react-icons/rx";
import { TbFileDollar } from "react-icons/tb";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AvatarImg from "../../assets/img/avatar-placeholder.jpg";
import CTAButton from "../CTAButton";
import { getInvitedFreelancer, getSearchFreelancer } from "../../helpers/jobApis";
import { getProposals } from "../../helpers/clientApis";
import { useDispatch } from "react-redux";
import { clientService } from "../../redux/clientSlice/clientService";
import { hireFreelancerService } from "../../redux/clientSlice/clientService";

export const ClientJobPostViewComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const jobDetails = location.state && location.state.jobDetails;
  return (
    <div className="w-full md:px-8 md:py-6">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-[#374151] ">
            Your Dashboard
          </h2>
          <p className="text-lg font-normal text-[#374151] ">Joe doe</p>
        </div>
        <div className="mt-4">
          <CTAButton
            text={"Post a new job"}
            bg={"#16A34A"}
            color={"#ffff"}
            fontSize="1rem"
            height="2.5rem"
            onClick={() => navigate("/create-job")}
          ></CTAButton>
        </div>
      </div>

      <div className="my-10">
        <div className="grid gap-4 md:grid-cols-12">
          <div className="col-span-2">
            <div
              className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center"
              onClick={() => {
                setPage(0);
              }}
            >
              <p>View Job Post</p>
            </div>
          </div>
          <div className="col-span-2">
            <div
              className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center"
              onClick={() => setPage(1)}
            >
              <p>Invite Freelancers</p>
            </div>
          </div>
          <div className="col-span-2">
            <div
              className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center"
              onClick={() => setPage(2)}
            >
              <p>
                Review Proposals{" "}
                <span>
                  (
                  {jobDetails?.proposal_details
                    ? jobDetails?.proposal_details?.length
                    : ""}
                  )
                </span>
              </p>
            </div>
          </div>
          <div className="col-span-2">
            <div
              className="border rounded-lg  hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center"
              onClick={() => setPage(3)}
            >
              <p>
                Hire <span>(0)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {page === 0 && <JobPostView />}
      {page === 1 && <InviteFreelancer />}
      {page === 2 && <ReviewProposal />}
      {page === 3 && <ClientHire />}
    </div>
  );
};

export const JobPostView = () => {
  const location = useLocation();
  const jobDetails = location.state && location?.state?.jobDetails;
  const {
    amount,
    budget,
    client_detail,
    created_at,
    description,
    experience,
    file,
    proposal_details,
    skills,
    tags,
    title,
    updated_at,
  } = jobDetails || [];

  const createdAtAgo =
    jobDetails &&
    formatDistanceToNow(new Date(jobDetails.created_at), { addSuffix: true });

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="border rounded-lg basis-full md:basis-3/4 border-slate-300">
        <div className="border-b">
          <div className="p-6 space-y-2">
            <h2 className="text-base font-semibold text-[#374151]">
              {title}
              <span className="text-sm ml-3 font-medium text-[#6B7280]">
                Posted {createdAtAgo}
              </span>
            </h2>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <TbFileDollar />
                <p>${amount}.00</p>
              </div>
              <div className="flex items-center gap-2">
                <FiUser />
                <p>{experience}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 border rounded-lg basis-full md:mt-0 md:basis-1/4 border-slate-300">
        <div className="p-6 border-b ">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FiEdit2 className="text-[#16A34A]" />
              <p className="text-sm">Edit posting</p>
            </div>
            <div className="flex items-center gap-2">
              <FiEye className="text-[#16A34A]" />
              <p className="text-sm">View posting</p>
            </div>
            <div className="flex items-center gap-2">
              <LiaRetweetSolid className="text-[#16A34A]" />
              <p className="text-sm">Reuse posting</p>
            </div>
            <div className="flex items-center gap-2">
              <RxCross1 className="text-[#16A34A]" />
              <p className="text-sm">Remove posting</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-3">
          <div>
            <h2 className="text-[#374151] text-base font-semibold ">
              About the client
            </h2>
          </div>
          <div>
            <h2 className="text-[#374151] text-base font-semibold ">
              Payment method verified
            </h2>
            <div className="text-[#374151] text-sm flex items-center gap-1">
              <AiFillStar className="text-[#16A34A]" />
              <AiFillStar className="text-[#16A34A]" />
              <AiFillStar className="text-[#16A34A]" />
              <AiFillStar className="text-[#16A34A]" />
              <AiFillStar className="text-[#16A34A]" />
              <span className="ml-2">5.0 of 30 reviews</span>
            </div>
          </div>
          <div>
            <h2 className="text-[#374151] text-base font-semibold ">
              United States
            </h2>
            <p className="text-[#374151] text-sm">1:18 am</p>
          </div>
          <div>
            <h2 className="text-[#374151] text-base font-semibold ">
              6 jobs posted
            </h2>
            <p className="text-[#374151] text-sm">50% hire rate, 1 open job</p>
          </div>
          <div>
            <h2 className="text-[#374151] text-base font-semibold ">
              $6.3K total spent
            </h2>
            <p>1 hire, 1 active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InviteFreelancer = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [allFreelancers, setAllFreelancers] = useState([]);
  const [invitedFreelancers, setinvitedFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isHire, setIsHire] = useState(false);
  const [isUserId, setIsUserId] = useState('')

  const toast = useToast();
  const location = useLocation();
  const jobDetails = location.state && location?.state?.jobDetails;
  const {
    amount
  } = jobDetails || [];

  let params = useParams();
  let { id } = params;

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getSearchFreelancer([""]);
      if (response && response) {
        setSearchResults(response);
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
      if (response && response) {
        setinvitedFreelancers(response);
      } else {
        console.error("API Response body is undefined");
      }
    } catch (error) {
      console.error("Error fetching invited results:", error);
    } finally {
      setLoading(false);
    }
  }

  // const HandleInviteToJob = async (userId) => {
  //   const formData = {
  //     receiver_id: userId,
  //     message: "hi accept this",
  //     job_id: id,
  //   };
  //   try {
  //     let result = await dispatch(clientService(formData));
  //     if (result?.code === 200) {
  //       // getSearchFreelancer([""])
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
    setIsUserId(id)
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
      const formData = {
        freelencer_id: isUserId,
        job_id: id,
        budget: amount
      }

      try {
        let result = await dispatch(hireFreelancerService(formData));
        if (result?.code == 200) {
          setOpen(false);
          setMessage("");
          toast({
            title: result?.msg,
            position: "top-right",
            status: "success",
            isClosable: true,
            duration: 2000,
          });
        }
      } catch (error) {
        setOpen(false);
        setMessage("");
        const message = error?.response?.data?.msg;
        toast({
          title: message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
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
            fetchData()
            setOpen(false);
            closeModal();
            setMessage("");
            toast({
              title: "Invite send",
              position: "top-right",
              status: "success",
              isClosable: true,
              duration: 2000,
            });
          }
        } catch (error) {
          setOpen(false);
          setMessage("");
          const message = error?.response?.data?.msg;
          toast({
            title: message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
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
            className=" bg-fg-brand"
          />
          <TabPanels>
            <TabPanel p={0} bg={"#F3F4F6"}>
              <div className="h-auto px-8 pt-8 pb-4 border-b-2 ">
                {loading && (
                  <Spinner
                    backgroundColor={"#"}
                    width={"3rem"}
                    height={"3rem"}
                    color="red"
                  />
                )}

                {!loading &&
                  searchResults?.map((searchResult) => (
                    <div key={searchResult?._id}>
                      <div className="flex gap-8 pb-5">
                        <div className="w-[200px] h-[150px]">
                          <img
                            src="https://c.animaapp.com/LZ3BWujk/img/rectangle-26-1@2x.png"
                            alt=""
                          />
                        </div>
                        <div className="w-full space-y-2 ">
                          <div className="flex justify-between ">
                            <div className="flex gap-3">
                              <div className="w-[36px] h-[36px] rounded-full">
                                <img
                                  src={searchResult?.profile_image}
                                  className="w-full h-full rounded-full"
                                  alt=""
                                />
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
                                  {searchResult?.invitation_status === 0 ? "Invited" : "Invite to Job"}
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
                                className="text-fg-brand"
                              />
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
                                      onChange={HandleTextValue}
                                    />
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
                                    onClick={
                                      handleSend
                                    }
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
                      color="red"
                    />
                  )}
                  {!loading &&
                    invitedFreelancers?.map((searchResult) => (
                      <div key={searchResult?._id}>
                        <div className="flex gap-8 pb-5">
                          <div className="w-[200px] h-[150px]">
                            <img
                              src="https://c.animaapp.com/LZ3BWujk/img/rectangle-26-1@2x.png"
                              alt=""
                            />
                          </div>
                          <div className="w-full space-y-2 ">
                            <div className="flex justify-between ">
                              <div className="flex gap-3">
                                <div className="w-[36px] h-[36px] rounded-full">
                                  <img
                                    src={searchResult?.profile_image}
                                    className="w-full h-full rounded-full"
                                    alt=""
                                  />
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
                                  className="text-fg-brand"
                                />
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

export const ReviewProposal = () => {
  const location = useLocation();
  const jobDetails = location.state && location.state.jobDetails;
  console.log({ "dddd": jobDetails });
  const id = jobDetails?._id;
  const [proposals, setProposals] = useState([]);
  const proposalsDetails = async () => {
    const resp = await getProposals(id);
    setProposals(resp);
  };
  useEffect(() => {
    proposalsDetails();
  }, []);

  // const createdAtAgo =
  //   jobDetails &&
  //   formatDistanceToNow(new Date(jobDetails.created_at), { addSuffix: true });
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="overflow-hidden border rounded-lg basis-full md:basis-4/5 border-slate-300">
        <Tabs variant="unstyled">
          <TabList className="px-6 pt-4 border-b">
            <Tab className="px-0 text-black">All Proposals</Tab>
            <Tab>Messaged</Tab>
            {/* <Tab>Archived</Tab> */}
          </TabList>
          <TabIndicator
            height="2px"
            borderRadius="1px"
            color={"#000"}
            className=" bg-fg-brand"
          />
          <TabPanels>
            <TabPanel p={0} bg={"#F3F4F6"}>
              {proposals?.length > 0 ? (
                proposals?.map(() => {
                  const details = proposals?.[0].user_details?.[0];
                  return (
                    <VStack className="h-auto px-8 pt-8 pb-4 border-b-2 w-full">
                      <VStack>
                        <HStack justifyContent={"start"} width={"100%"} alignItems={"center"}>
                          <img
                            src={details?.profile_image}
                            className="w-[50px] h-full rounded-full"
                            alt=""
                          />
                          <div className="w-full space-y-3 ">
                            <div className="flex justify-between ">
                              <div>
                                <h2 className="font-semibold text-fg-brand">
                                  {details?.firstName + " " + details?.lastName}
                                </h2>
                                <p className="text-sm font-medium text-[#6B7280]">
                                  {details?.professional_role}
                                </p>
                              </div>
                              <div>
                                <Stack direction="row" spacing={4} align="center">
                                  <Button
                                    size="sm"
                                    colorScheme="#16A34A"
                                    variant="outline"
                                    color={"#16A34A"}
                                  >
                                    Message
                                  </Button>
                                  <Button
                                    colorScheme="#16A34A"
                                    variant="outline"
                                    size={"sm"}
                                    bg={"#16A34A"}
                                    color={"#fff"}
                                  >
                                    Hire
                                  </Button>
                                </Stack>
                              </div>
                            </div>
                          </div>
                        </HStack>
                        <div>
                          <p className="text-sm font-medium text-[#6B7280]">
                            {details?.country}
                          </p>
                        </div>
                        <div className="flex gap-10">
                          <p className="text-sm font-medium text-[#6B7280]">
                            ${proposals?.[0]?.desiredPrice}
                          </p>
                          <p className="text-sm font-medium text-[#6B7280]">
                            $3M+ earned
                          </p>
                          <p className="text-sm font-medium text-[#6B7280] border-b-2 block border-fg-brand">
                            100% job success
                          </p>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-[#6B7280]">
                            Cover letter
                          </h6>
                          <p className="mt-1 text-sm font-normal leading-6">
                            {proposals?.[0]?.coverLetter}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">

                          <Stack spacing={4} direction="row" align="center">
                            {
                              details?.skills?.map((skill) => {
                                return <Button size="sm" colorScheme="gray" color={"#6B7280"}>
                                  {skill.skill_name}
                                </Button>
                              })
                            }
                          </Stack>
                          {/* <div>
                            <IoIosArrowForward
                              size={24}
                              className="text-fg-brand"
                            />
                          </div> */}
                        </div>
                      </VStack>
                    </VStack>
                  );
                })
              ) : (
                <Box>
                  <Text>There is no proposals for this job!!!</Text>
                </Box>
              )}
            </TabPanel>
            <TabPanel>
              <p>Messaged!</p>
            </TabPanel>
            {/* <TabPanel>
              <p>Archived!</p>
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export const ClientHire = () => {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="overflow-hidden border rounded-lg basis-full md:basis-4/5 border-slate-300">
        <Tabs variant="unstyled">
          <TabList className="px-6 pt-4 border-b">
            <Tab className="px-0 text-black">Offers</Tab>
            <Tab className="px-0 text-black">Hired</Tab>
          </TabList>
          <TabIndicator
            height="2px"
            borderRadius="1px"
            color={"#000"}
            className=" bg-fg-brand"
          />
          <TabPanels>
            <TabPanel>
              <div className="h-[196px] px-8 pt-8 pb-4 flex justify-center items-center ">
                <p>You don’t have any hires yet</p>
              </div>
            </TabPanel>
            <TabPanel>
              <p>Hired!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};













