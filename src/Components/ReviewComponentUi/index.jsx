import { Box, HStack, Heading, Select, Text, Textarea, useToast } from "@chakra-ui/react";
import StarRatings from 'react-star-ratings';
import { giveFeedback } from "../../helpers/clientApis";
import { useState } from "react";
import jwtDecode from 'jwt-decode';

const ReviewComponentUi = () => {
  const ratingNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedRating, setSelectedRating] = useState(0);
  const authtoken = localStorage.getItem("authtoken");
  const decodedToken = authtoken ? jwtDecode(authtoken) : null;
  const userId = decodedToken?.id
  const toast = useToast();
  const [feedbackMessage, setFeedbackMessage] = useState("")

  const options = [
    "Skills",
    "Quality of Requirements",
    "Availability",
    "Set Responsible Deadlines",
    "Communication",
    "Cooperation",
  ];

  const [formData, setFormData] = useState({
    // user_id_giver: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    // user_id_feedbacker: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    private_feedback: {
      reason_for_ending_contract: "",
      recommending_to_others: 0,
      strengths: [],
      status: 1,
      is_deleted: false,
    },
    public_feedback: {
      feedback: options.map(option => ({
        option: option,
        ratings: 0,
      })),
      feedback_message: feedbackMessage,
      status: 1,
      is_deleted: false,
    },
  });


  const handlePrivateFeedbackChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      private_feedback: {
        ...prevData.private_feedback,
        [field]: value,
      },
    }));
  };

  const handleRatingSelection = (rating) => {
    setSelectedRating(rating);
    handlePrivateFeedbackChange("status", rating);
  };


  const handlePublicFeedbackChange = (option, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      public_feedback: {
        ...prevData.public_feedback,
        feedback: prevData.public_feedback.feedback.map((item) =>
          item.option === option ? { ...item, rating: value } : item
        ),
      },
    }));
  };
 
  const handelSubmit = async () => {
    try {
      const response = await giveFeedback(formData);
      console.log(response, "response");

      toast({
        title: response.msg,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
    });
    } catch (error) {
      toast({
        title:error,
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
    });
    }
  };

  return (
    <section className="w-full my-4">
      <HStack>
        <Heading marginBottom={"10"} fontSize={"3xl"}>Add Review</Heading>
      </HStack>
      <Box className="w-full border rounded-lg shadow px-6 py-6">
        <Box marginTop={{ base: 10, md: 8 }} marginBottom={{ base: 10, md: 8 }} paddingX={{ base: 4, md: 8 }}>
          <Box>
            <Text fontSize="2xl">Client</Text>
            <Text fontSize="xl">Steven</Text>
          </Box>
          <Box marginTop={"4"}>
            <Text fontSize="2xl">Contract Title</Text>
            <Text fontSize="xl">
              Python & Node JS Full Stack Developer - (40 hours per week
              guaranteed for 4 months)
            </Text>
          </Box>
        </Box>
      </Box>

      <Box
        marginTop={{ base: 4, md: 10 }}
        className="w-full  border rounded-lg shadow px-6 py-6"
      >
        <Box marginTop={{ base: 10, md: 8 }} paddingX={{ base: 4, md: 8 }}>
          <Heading fontSize={{ base: "xl", md: "2xl" }}>
            Private feedback
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            marginTop={{ base: 2, md: 4 }}
          >
            This is your opportunity to share feedback on Steven that you{" "}
            {"don't"} want posted publicly.
            {"We'll"} use it to improve the user experience, but we {"won't"}{" "}
            share it with Steven.
            <Box as="a" href="#" fontWeight="bold" style={{ color: "#22c55e" }}>
              Learn more
            </Box>
          </Text>
        </Box>

        <Box marginTop={{ base: 10, md: 8 }} paddingX={{ base: 4, md: 8 }}>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            How likely are you to recommend this client to a friend or a
            colleague?
          </Text>
          <Box
            marginTop={{ base: 3, md: 4 }}
            className="grid grid-cols-3 md:flex gap-4 "
          >
            {ratingNumber.map((retNumber) => (
              <Box
                key={retNumber}
                className={`border-2 cursor-pointer text-center rounded-full w-[4rem] h-[4rem] ${selectedRating === retNumber ? "bg-[#22c55e] text-white" : ""
                  } text-[#22c55e] flex items-center justify-center`}
                fontWeight="bold"
                fontSize={{ base: "lg", md: "2xl" }}
                onClick={() => handleRatingSelection(retNumber)}
              >
                {retNumber}
              </Box>
            ))}
          </Box>

          <Box className="flex justify-between items-center w-full md:w-[70%] mt-2">
            <Text fontSize="lg" fontWeight="bold">
              Not at all likely
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Extremely likely
            </Text>
          </Box>
        </Box>

        <Box marginTop={{ base: 10, md: 8 }} paddingX={{ base: 4, md: 8 }}>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            Do you have any feedback on this client?{" "}
            <span className="text-gray-600">Optional</span>
          </Text>
          <Box marginTop={{ base: 3, md: 4 }}>
            <Textarea
              padding={{ base: 2, md: 4 }}
              height={{ base: 32, md: 40 }}
              fontSize={{ base: "lg", md: "xl" }}
              placeholder="Your feedback helps us make our platform better for everyone."
              onChange={(e) => handlePrivateFeedbackChange("strengths", e.target.value)}
            />
          </Box>
        </Box>

        <Box marginTop={{ base: 10, md: 8 }} paddingX={{ base: 4, md: 8 }}>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            Can you tell us your primary reason for ending this contract?
          </Text>

          <Box
            marginTop={{ base: 3, md: 4 }}
            className="w-full md:w-[70%] lg:w-[50%]"
          >
            <Select placeholder="Select a reason" size="lg"
              onChange={(e) => handlePrivateFeedbackChange("reason_for_ending_contract", e.target.value)}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
        </Box>
      </Box>

      <Box
        marginTop={"10"}
        className="w-full border rounded-lg shadow px-6 py-6"
      >
        <Box
          paddingX={{ base: 4, md: 8 }}
          paddingTop={{ base: 4, md: 8 }}
          paddingBottom={{ base: 8, md: 8 }}
        >
          <Heading fontSize={{ base: "xl", md: "2xl" }}>
            Public feedback
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            marginTop={{ base: 2, md: 4 }}
          >
            This is your opportunity to share feedback on Steven that you{" "}
            {"don't"} want posted publicly.
            {"We'll"} use it to improve the user experience, but we {"won't"}{" "}
            share it with Steven.
            <Box
              as="a"
              href="#"
              fontWeight="bold"
              style={{
                color: "#22c55e",
                display: "block",
                marginTop: { base: 2, md: 4 },
              }}
            >
              Learn more
            </Box>
          </Text>
        </Box>

        <Box marginTop={{ base: 10, md: 8 }} paddingX={{ base: 4, md: 8 }}>
          <Text fontSize={{ base: "2xl", md: "2xl" }} fontWeight="bold">
            Feedback to client
          </Text>

          <Box marginTop={{ base: 3, md: 6 }} className="flex flex-col gap-4 md:gap-8 w-full">
            {options.map((option, index) => (
              <Box
                key={index}
                className="flex md:items-center gap-2 md:gap-6 flex-col md:flex-row"
              >
                <Box className="flex items-center gap-2">
                  <StarRatings
                    rating={formData.public_feedback.feedback.find((item) => item.option === option).rating}
                    starRatedColor="orange"
                    starHoverColor="orange"
                    starEmptyColor="gray"
                    changeRating={(newRating) =>
                      handlePublicFeedbackChange(option, "rating", newRating)
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
            Total Score:{" "}
            {(
              Object.values(formData.public_feedback.feedback).reduce(
                (total, item) => total + item?.ratings,
                0
              ) / options.length
            ).toFixed(2)}
          </Text>
        </Box>

        <Box marginTop={{ base: 10, md: 10 }} paddingX={{ base: 4, md: 8 }}>
          <Text fontSize={{ base: "2xl", md: "2xl" }} fontWeight="bold">
            Share your experience with this client to the Upwork community
          </Text>

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

        <Box marginTop={{ base: 10, md: 10 }} paddingX={{ base: 4, md: 8 }}>
          <Text fontSize="2xl" marginTop={"2"} fontWeight="bold">
            See and
            <Box as="a" href="#" marginLeft={"2"} style={{ color: "#22c55e" }}>
              example of appropiate feedback
            </Box>
          </Text>
        </Box>
      </Box>

      <Box
        marginTop={"10"}
        className="w-full border rounded-lg shadow px-6 py-6"
      >
        <Box marginTop={{ base: 4, md: 6 }} paddingX={{ base: 4, md: 6 }}>
          <Text fontSize={{ base: "xl", md: "2xl" }}>
            Ending this contract will permanently lock the Work Diary for this
            project. {"We'll"} let your client know the job is done and send you
            a final statement for any unpaid work.
          </Text>
        </Box>
        <Box marginTop={{ base: 4, md: 6 }} paddingX={{ base: 4, md: 6 }}>
          <Box className="flex flex-col items-center md:flex-row md:items-center gap-3 md:gap-6">
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="450"
              className="text-[#22c55e]"
            >
              Cancel
            </Text>
            <button
              className="my-4 font-semibold text-[1.2rem] rounded-full px-4 py-2 bg-green-500 text-white"
              onClick={handelSubmit}>
              Submit Review
            </button>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default ReviewComponentUi;
