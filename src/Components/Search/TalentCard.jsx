import { AiFillQuestionCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Avatar, Button, HStack, Stack, Box, SkeletonCircle, SkeletonText, Input, Textarea, useToast } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUser";
import FreelancerDetailsModal from "../Modals/FreelancerDetailsModal";
import { MainButtonRounded, MainButtonTranparentRounded } from "../Button/MainButton";
import { sendAgencyInvitation } from "../../helpers/agencyApis";

const TalentCard = ({ freelancerData, loading }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { activeAgency, hasAgency } = useContext(CurrentUserContext);
  const [selectedFreelancer, setSelectedFreelancer] = useState();
  const toast = useToast()

  const [formData, setFormData] = useState({
    agency_profile: hasAgency,
    freelancer_id: selectedFreelancer?.user_id,
    member_position: '',
    message: ''
  });

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      freelancer_id: selectedFreelancer?.user_id,
      agency_profile: hasAgency
    }));
  }, [selectedFreelancer, hasAgency]);

  const handleSelectChange = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setIsOpenModal(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInvitation = async (e) => {
    e.preventDefault();
    try {
      const res = await sendAgencyInvitation(formData);
      console.log(res);
      if (res.isError) {
        toast({
          title: res.message,
          status: 'warning',
          duration: '3000',
          position: 'top-right'
        })
      } else {
        toast({
          title: `Invitation Send To ${selectedFreelancer.firstName} ${selectedFreelancer.lastName}`,
          status: 'success',
          duration: '3000',
          position: 'top-right'
        })
      }
      setFormData({
        member_position: '',
        message: ''
      })
      setIsOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>
    );
  }

  if (freelancerData.length === 0) {
    return (
      <div>
        <h1 className="text-4xl text-gray-300 text-center ">Not Found </h1>
      </div>
    );
  }

  const handleCancel = () => {
    setIsOpenModal(false);
  }



  return (
    <div>
      <div>
        {freelancerData?.map((freelancer) => {
          return (
            <div key={freelancer?._id} className="flex gap-8 pb-5 items-center">
              <div className="w-[150px] h-[150px]">
                {freelancer.profile_image === null ? (
                  <Avatar
                    name={freelancer?.firstName?.slice(0)}
                    width={"130px"}
                    height={"130px"}
                    borderRadius={"50%"}
                    fontSize={"3rem"}
                    objectFit={"cover"}
                  />
                ) : (
                  <img
                    src={freelancer?.profile_image}
                    className="w-[130px] h-[130px] rounded-full object-cover shadow-md"
                    alt=""
                  />
                )}
              </div>
              <div className="w-full space-y-2 ">
                <div className="flex justify-between ">
                  <div className="flex gap-3">
                    <div>
                      <HStack>
                        <h2 className="text-base font-semibold text-fg-brand">
                          {freelancer?.firstName} {freelancer?.lastName}
                        </h2>
                        <Button
                          colorScheme="#16A34A"
                          variant="outline"
                          size={"xs"}
                          color={"#16A34A"}
                          marginLeft={"0.8rem"}
                          height={"18px"}
                        >
                          Available now
                        </Button>
                      </HStack>

                      <p className="text-sm font-medium text-[#6B7280]">
                        {freelancer?.professional_role}
                      </p>
                    </div>
                  </div>
                  {/* Navigation */}
                  <div>
                    <Stack direction="row" spacing={4} align="center">
                      {
                        hasAgency && activeAgency ? <Button
                          size="md"
                          colorScheme="#16A34A"
                          variant="outline"
                          color={"#16A34A"}
                          onClick={() => handleSelectChange(freelancer)}
                        >
                          Invite as a agency member
                        </Button> : <Link to={`/freelancer/${freelancer?.user_id}`}>
                          <Button
                            size="md"
                            colorScheme="#16A34A"
                            variant="outline"
                            color={"#16A34A"}
                          >
                            View Profile
                          </Button>
                        </Link>
                      }

                    </Stack>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#6B7280]">
                    ${freelancer?.hourly_rate}/hr
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
              </div>
            </div>
          );
        })}
      </div>

      {selectedFreelancer && isOpenModal && (
        <FreelancerDetailsModal
          isModal={isOpenModal}
          setIsModal={setIsOpenModal}
          title="Freelancer Details"
        >
          <div key={selectedFreelancer?._id} className="flex gap-8 pb-5 items-center">
            <div className="w-[150px] h-[150px]">
              {selectedFreelancer.profile_image === null ? (
                <Avatar
                  name={selectedFreelancer?.firstName?.slice(0)}
                  width={"130px"}
                  height={"130px"}
                  borderRadius={"50%"}
                  fontSize={"3rem"}
                  objectFit={"cover"}
                />
              ) : (
                <img
                  src={selectedFreelancer?.profile_image}
                  className="w-[130px] h-[130px] rounded-full object-cover shadow-md"
                  alt=""
                />
              )}
            </div>
            <div className="w-full space-y-2 ">
              <div className="flex justify-between ">
                <div className="flex gap-3">
                  <div>
                    <HStack>
                      <h2 className="text-base font-semibold text-fg-brand">
                        {selectedFreelancer?.firstName} {selectedFreelancer?.lastName}
                      </h2>
                      <Button
                        colorScheme="#16A34A"
                        variant="outline"
                        size={"xs"}
                        color={"#16A34A"}
                        marginLeft={"0.8rem"}
                        height={"18px"}
                      >
                        Available now
                      </Button>
                    </HStack>

                    <p className="text-sm font-medium text-[#6B7280]">
                      {selectedFreelancer?.professional_role}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#6B7280]">
                  ${selectedFreelancer?.hourly_rate}/hr
                </p>
              </div>

              <div className="w-full space-y-2 ">
                <div className="flex justify-between ">
                  <div className="flex gap-3">
                    <div>
                      <p className="font-bold">Professional At.</p>
                      <h3>{selectedFreelancer?.categories[0]?.value}</h3>
                      {
                        selectedFreelancer?.sub_categories?.map((subcat) => (
                          <h4 className="text-sm pl-1 ml-1 border-l border-gray-300">{subcat?.value}</h4>
                        ))
                      }
                      <div className="flex pl-1 ml-1 border-l border-gray-300">
                        {
                          selectedFreelancer?.skills
                            ? selectedFreelancer.skills.length > 6
                              ? selectedFreelancer.skills.slice(0, 6).map((skill, index) => (
                                <h4 key={index} className="text-sm border mr-[5px] bg-[#5d8586] px-3 py-1 text-white rounded-2xl cursor-pointer">
                                  {skill}
                                </h4>
                              ))
                              : selectedFreelancer.skills.map((skill, index) => (
                                <h4 key={index} className="text-sm border mr-[5px] bg-[#5d8586] px-3 py-1 text-white rounded-2xl cursor-pointer">
                                  {skill}
                                </h4>
                              ))
                            : null
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="w-full space-y-2 ">
                <div className="flex justify-between ">
                  <div className="flex gap-3 w-full">
                    <div className="w-full">
                      <p className="font-bold">Send Invitation On Your Agency.</p>
                      <div className="flex pl-1 ml-1 border-l border-gray-300 w-full flex-col gap-5">
                        <div className="flex flex-col w-full">
                          <label className="font-medium">Freelancer Position:</label>
                          <Input placeholder="Frontend Web Application Developer" name="member_position" width={"50%"} defaultValue={formData.member_position} onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="font-medium">Message To Freelancer:</label>
                          <Textarea placeholder="Frontend Web Application Developer" name="message" width={"50%"} defaultValue={formData.message} onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-2 ">
                <div className="flex justify-between w-[260px]">
                  <MainButtonRounded onClick={(e) => handleInvitation(e)}>Send Invitation</MainButtonRounded>
                  <MainButtonTranparentRounded onClick={() => handleCancel()}>Cancel</MainButtonTranparentRounded>
                </div>
              </div>

            </div>
          </div>
        </FreelancerDetailsModal>
      )}
    </div>
  );
};

export default TalentCard;




