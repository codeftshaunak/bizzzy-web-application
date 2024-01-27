import { AiFillQuestionCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Avatar, Button, HStack, Stack, Spinner } from "@chakra-ui/react";
const TalentCard = ({ freelancerData, loading }) => {
  // console.log("freelancerData", freelancerData);
  if (loading) {
    return (
      <div className="text-center">
        <Spinner
          backgroundColor={"#"}
          width={"3rem"}
          height={"3rem"}
          color="red"
        />
      </div>
    );
  }
  if (freelancerData.length === 0) {
    return (
      <div>
        <h1 className="text-4xl text-gray-300 text-center ">Not Found </h1>
      </div>
    );
  }
  return (
    <div>
      <div>
        {freelancerData?.map((freelancer) => {
          return (
            <div key={freelancer?._id} className="flex gap-8 pb-5 items-center">
              <div className="w-[150px] h-[150px]">
                {/* <img
          src="https://c.animaapp.com/LZ3BWujk/img/rectangle-26-1@2x.png"
          alt=""
        /> */}

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
                      <Link to={`/freelancer/${freelancer?.user_id}`}>
                        <Button
                          size="md"
                          colorScheme="#16A34A"
                          variant="outline"
                          color={"#16A34A"}
                        >
                          View Profile
                        </Button>
                      </Link>
                      {/* <Button
                        colorScheme="#16A34A"
                        variant="outline"
                        size={"md"}
                        bg={"#16A34A"}
                        color={"#fff"}
                      >
                        View Profile
                      </Button> */}
                    </Stack>
                  </div>
                </div>

                {/* <div>
          <Button
            colorScheme="#16A34A"
            variant="outline"
            size={"xs"}
            color={"#16A34A"}
          >
            Available now
          </Button>
        </div> */}

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
    </div>
  );
};

export default TalentCard;
