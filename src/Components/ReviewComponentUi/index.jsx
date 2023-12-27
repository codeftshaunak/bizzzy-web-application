import React, { useEffect, useState } from 'react';
import { HStack, VStack, useToast, Textarea, Text, Box, Select } from '@chakra-ui/react';
import { BiSolidDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import StarRatings from 'react-star-ratings';
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { giveFeedback, getOptionsList } from "../../helpers/clientApis";


const index = () => {
  const options = [
    "Skills",
    "Quality of Requirements",
    "Availability",
    "Set Responsible Deadlines",
    "Communication",
    "Cooperation",
  ];
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const profile = useSelector((state) => state.profile);
  const { id } = profile?.profile;
  const location = useLocation();
  const jobDetails = location.state && location.state.jobDetails;
  const clientDetails = location.state && location.state.clientDetails;
  const reciever_id = clientDetails.user_id;
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sender_id: "",
    reciever_id: "",
    job_id: "",
    private_feedback: {
      reason_for_ending_contract: "",
      recommending_others: 0,
    },

    public_feedback: {
      feedback: options.map(option => ({
        options: option,
        ratings: 0,
      })),
      average_rating: "",
      feedback_message: feedbackMessage,
    },

  });

  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleNumberClick = (num) => {
    setSelectedNumber((prevSelectedNumber) =>
      prevSelectedNumber === num ? null : num
    );
  };

  const getResonOptionList = async () => {
    try {
      const response = await getOptionsList(id)
      setResonOptionList(response?.body?.reasons)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePublicFeedbackChange = (option, field, value) => {
    setFormData((prevData) => {
      if (field === "feedback_message") {
        return {
          ...prevData,
          public_feedback: {
            ...prevData.public_feedback,
            [field]: value,
          },
        };
      } else if (field === "reason_for_ending_contract") {
        return {
          ...prevData,
          private_feedback: {
            ...prevData.private_feedback,
            [field]: value
          }
        }
      }
      else {
        return {
          ...prevData,
          public_feedback: {
            ...prevData.public_feedback,
            feedback: prevData.public_feedback.feedback.map((item) =>
              item.options === option ? { ...item, ratings: value } : item
            ),
          },
        };
      }
    });
  };

  const totalScore =
    (
      formData.public_feedback.feedback
        .map((item) => item.ratings || 0)
        .reduce((total, rating) => total + rating, 0) /
      options.length ||
      0
    ).toFixed(2);

  useEffect(() => {
    setFormData((data) => ({
      ...data,
      sender_id: id,
      reciever_id: reciever_id,
      public_feedback: {
        ...data.public_feedback,
        average_rating: totalScore,
        feedback_message: feedbackMessage
      },
      private_feedback: {
        ...data.private_feedback,
        recommending_others: selectedNumber
      }
    }));
    getResonOptionList();
  }, [totalScore, feedbackMessage, selectedNumber, id, reciever_id]);


  const [resonOptionList, setResonOptionList] = useState([]);


  const handelSubmit = async () => {
    try {
      const response = await giveFeedback(formData);
      // // Reset form data
      // setFormData({
      //   private_feedback: {
      //     reason_for_ending_contract: "",
      //     recommending_to_others: 0,
      //     // strengths: [],
      //     // status: 1,
      //   },
      //   public_feedback: {
      //     feedback: options.map(option => ({
      //       options: option,
      //       ratings: 0,
      //     })),
      //     feedback_message: "",
      //     // status: 1,
      //   },
      // });
      // setFeedbackMessage("");
      // setSelectedRating(0);

      toast({
        title: response.msg,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      navigate("/my-jobs")
    } catch (error) {
      console.log(error);
      toast({
        title: "Some issue happen please check everything again",
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };


  return (
    <VStack width={"90%"} alignItems={"start"} gap={"30px"} margin={"auto"} padding={"0 0 3rem 0"}>
      <Text textAlign={"left"} fontSize={"1.6rem"} fontWeight={"600"}> End contract </Text>
      <VStack alignItems={"start"} justifyContent={"start"} margin={"auto"} width={"100%"} gap={"20px"} padding={"3rem 2.5rem"} border={"0.1px solid gray"} borderRadius={"15px"}>
        <Box width={"80%"} gap={"20px"}>
          <Box>
            <Text textAlign={"left"} fontSize={"1.2rem"} fontWeight={"600"}> Client </Text>
            <Text textAlign={"left"} fontSize={"1.2rem"}> {clientDetails?.firstName} {clientDetails?.lastName}</Text>
          </Box>
          <br />
          <Box>
            <Text textAlign={"left"} fontSize={"1.2rem"} fontWeight={"600"}> Contract Title </Text>
            <Text textAlign={"left"} fontSize={"1.2rem"}> {jobDetails?.title} </Text>
          </Box>
        </Box>
      </VStack>

      <VStack alignItems={"start"} justifyContent={"start"} margin={"auto"} width={"100%"} gap={"20px"} padding={"3rem 2.5rem"} border={"0.1px solid gray"} borderRadius={"15px"}>
        <Text textAlign={"left"} fontSize={"1.6rem"} fontWeight={"600"}> Private feedback </Text>
        <Box width={"80%"} gap={"20px"}>
          <Text fontSize={"1.2rem"}>This is your opportunity to share feedback on {clientDetails?.firstName} that you{" "}
            {"don't"} want posted publicly.
            {"We'll"} use it to improve the user experience, but we {"won't"}{" "}
            share it with {clientDetails?.firstName}.
          </Text>
          <br />
          <Box>
            <Text textAlign={"left"} fontSize={"1.2rem"} fontWeight={"600"}>  How likely are you to recommend this client to a friend or a
              colleague?
            </Text>
            <br />
            <VStack alignItems={"start"}>
              <HStack justifyContent={"space-between"} width={"100%"}>
                {
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <VStack
                      key={num}
                      fontSize={"1.2rem"}
                      justifyContent={"center"}
                      borderRadius={"50%"}
                      cursor={"pointer"}
                      fontWeight={"600"}
                      width={"50px"}
                      height={"50px"}
                      border={"2px solid var(--bordersecondary)"}
                      textAlign={"center"}
                      bg={selectedNumber === num ? "var(--primarycolor)" : "transparent"}
                      color={selectedNumber === num ? "white" : "black"}
                      onClick={() => handleNumberClick(num)}
                    >
                      <Text padding={"0"}>{num}</Text>

                    </VStack>
                  ))
                }
              </HStack>

              <HStack justifyContent={"space-between"} width={"100%"} marginTop={"1rem"}>
                <BiSolidDislike fontSize={"1.9rem"} color='var(--primarytextcolor)' />
                <Text>Embark on a journey to discover your preferred range of choices.</Text>
                <BiSolidLike fontSize={"1.9rem"} color='#0096FE' />
              </HStack>
            </VStack>
          </Box>

          <br />
          <Box>
            <Text textAlign={"left"} fontSize={"1.2rem"} fontWeight={"600"} marginBottom={"1rem"}>Primary reason for ending contract</Text>
            <Select
              placeholder="Select a reason"
              size="lg"
              id="reasonSelect"
              onChange={(e) => handlePublicFeedbackChange("", "reason_for_ending_contract", e.target.value)}
            >
              {resonOptionList && resonOptionList?.map((option) => (
                <option value={option?.name} key={option?._id}>
                  {option?.name}
                </option>
              ))}
            </Select>
          </Box>
        </Box>
      </VStack>

      <VStack alignItems={"start"} justifyContent={"start"} margin={"auto"} width={"100%"} gap={"20px"} padding={"3rem 2.5rem"} border={"0.1px solid gray"} borderRadius={"15px"}>
        <Text textAlign={"left"} fontSize={"1.6rem"} fontWeight={"600"}> Public feedback </Text>
        <Box width={"80%"} gap={"20px"}>
          <Text fontSize={"1.2rem"}>We'll post your feedback on {clientDetails?.firstName}'s Recent History when they've left there feedback for you or after 14-day feedback period closes. Your insights can help other Upwork talent choose their next job </Text>
          <br />
          <Box>
            <Text textAlign={"left"} fontSize={"1.2rem"} fontWeight={"600"}>  Feedback to client</Text>
            <br />
            <VStack alignItems={"start"}>
              <Box marginTop={{ base: 10, md: 8 }} paddingX={{ base: 4, md: 8 }}>
                <Text fontSize={{ base: "2xl", md: "2xl" }} fontWeight="bold">
                  Feedback to client
                </Text>
                <Box marginTop={{ base: 3, md: 6 }} className="flex flex-col gap-4 md:gap-8 w-full">
                  {options?.map((option, index) => (
                    <Box
                      key={index}
                      className="flex md:items-center gap-2 md:gap-6 flex-col md:flex-row"
                    >
                      <Box className="flex items-center gap-2">
                        <StarRatings
                          rating={formData.public_feedback.feedback.find((item) => item.options === option).ratings}
                          starRatedColor="orange"
                          starHoverColor="orange"
                          starEmptyColor="gray"
                          changeRating={(newRating) =>
                            handlePublicFeedbackChange(option, "ratings", newRating)
                          }
                          numberOfStars={5}
                          starDimension="2rem"
                          name={`ratings-${index}`}
                        />
                      </Box>
                      <Text fontSize={{ base: "xl", md: "xl" }} className="w-full">
                        {option}
                      </Text>
                    </Box>
                  ))}
                </Box>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "2xl", md: "2xl" }}
                  marginTop={{ base: 4, md: 8 }}
                >
                  Total Score: {totalScore}
                </Text>
              </Box>
            </VStack>
          </Box>
          <br />
          <br />
          <Box>
            <Text fontSize={{ base: "2xl", md: "2xl" }} fontWeight="bold">Share your experience to Upwork community</Text>
            <Box marginTop={{ base: 3, md: 6 }}>
              <Textarea
                padding={{ base: 2, md: 4 }}
                height={{ base: 32, md: 40 }}
                fontSize={{ base: "lg", md: "xl" }}
                placeholder="Your comments will be shared publicly"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </VStack>

      <VStack
        marginTop={"10"}
        border={"0.1px solid gray"}
        borderRadius={"15px"}
        padding={"2rem 2.5rem"}
        justifyContent={"start"}
        width={"100%"}
        alignItems={"start"}
      >
        <Box marginTop={{ base: 4, md: 6 }} paddingX={{ base: 4, md: 6 }}>
          <Text fontSize={{ base: "xl", md: "1.2rem" }}>
            Ending this contract will permanently lock the Work Diary for this
            project. {"We'll"} let your client know the job is done and send you
            a final statement for any unpaid work.
          </Text>
        </Box>
        <Box marginTop={{ base: 4, md: 6 }} paddingX={{ base: 4, md: 6 }}>
          <Box className="flex flex-col items-center md:flex-row md:items-center gap-3 md:gap-6">
            <Text
              fontSize={{ base: "xl", md: "1.2rem" }}
              fontWeight="450"
              className="text-[#22c55e]"
            >
              Cancel
            </Text>
            <button
              className="my-4 font-semibold text-[1.2rem] rounded-full px-8 py-2 bg-green-500 text-white"
              onClick={() => handelSubmit()}>
              Submit Review
            </button>
          </Box>
        </Box>
      </VStack>
    </VStack>
  )
}

export default index;
