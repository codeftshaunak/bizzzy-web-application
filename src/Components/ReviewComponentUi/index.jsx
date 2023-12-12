import { Box, HStack, Heading, Select, Text, Textarea } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const ReviewComponentUi = () => {
  const ratingNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <section className="w-full my-4">
      <HStack>
        <Heading marginBottom={"10"}>Add Review</Heading>
      </HStack>
      <Box className="w-full border rounded-lg shadow px-6 py-6">
        <Box>
          <Text fontSize="3xl">Client</Text>
          <Text fontSize="2xl">Steven</Text>
        </Box>
        <Box marginTop={"4"}>
          <Text fontSize="3xl">Contract Title</Text>
          <Text fontSize="2xl">
            Python & Node JS Full Stack Developer - (40 hours per week
            guaranteed for 4 months)
          </Text>
        </Box>
      </Box>
      <Box
        marginTop={"10"}
        className="w-full border rounded-lg shadow px-6 py-6"
      >
        <Box>
          <Heading>Private feedback</Heading>
          <Text fontSize="2xl" marginTop={"2"}>
            This is your opportunity to share feedback on Steven that you{" "}
            {"don't"} want posted publicly.{"We'll"} use it to improve the user
            experience, but we {"won't"} share it Steven.{" "}
            <Box as="a" href="#" fontWeight="bold" style={{ color: "#22c55e" }}>
              Learn more
            </Box>
          </Text>
        </Box>

        <Box marginTop={"10"}>
          <Text fontSize="2xl" fontWeight="bold">
            How likely are you to recommend this client to a friend or a
            colleague ?
          </Text>
          <Box marginTop={"3"} className="flex items-center gap-8">
            {ratingNumber.map((retNumber) => {
              return (
                <>
                  <Box
                    className="border-2 cursor-pointer text-center rounded-full w-[4rem] h-[4rem] text-[#22c55e] flex items-center justify-center"
                    fontWeight="bold"
                    fontSize="2xl"
                  >
                    {retNumber}
                  </Box>
                </>
              );
            })}
          </Box>
          <Box
            className="flex justify-between items-center w-[80%]"
            marginTop={"2"}
          >
            <Text fontSize="lg" fontWeight={"bold"}>
              Not at all likely
            </Text>
            <Text fontSize="lg" fontWeight={"bold"}>
              Extremely likely
            </Text>
          </Box>
        </Box>

        <Box marginTop={"10"}>
          <Text fontSize="2xl" fontWeight="bold">
            Do you have any feedback on this client ?{" "}
            <span className="text-gray-600">Optional</span>
          </Text>

          <Box marginTop={"3"}>
            <Textarea
              padding={"4"}
              height={"40"}
              fontSize={"xl"}
              placeholder="Your feedback helps us make our platform better for everyone."
            />
          </Box>
        </Box>

        <Box marginTop={"10"}>
          <Text fontSize="2xl" fontWeight="bold">
            Can you tell us your primary reason for ending this contract ?
          </Text>

          <Box marginTop={"3"} className="w-[70%]">
            <Select placeholder="Select a reason" size="lg">
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
        <Box>
          <Heading>Public feedback</Heading>
          <Text fontSize="2xl" marginTop={"2"}>
            This is your opportunity to share feedback on Steven that you{" "}
            {"don't"} want posted publicly.{"We'll"} use it to improve the user
            experience, but we {"won't"} share it Steven.{" "}
            <Box as="a" href="#" fontWeight="bold" style={{ color: "#22c55e" }}>
              Learn more
            </Box>
          </Text>
        </Box>

        <Box marginTop={"10"}>
          <Text fontSize="2xl" fontWeight="bold">
            Feedback to client
          </Text>
          <Box marginTop={"3"} className="flex flex-col gap-8">
            <Box className="flex items-center gap-6">
              <Box className="flex items-center gap-2">
                <FaStar className="text-[2rem] cursor-pointer text-[#d1d5db]" />
                <FaStar className="text-[2rem] cursor-pointer text-[#d1d5db]" />
                <FaStar className="text-[2rem] cursor-pointer text-[#d1d5db]" />
                <FaStar className="text-[2rem] cursor-pointer text-[#d1d5db]" />
                <FaStar className="text-[2rem] cursor-pointer text-[#d1d5db]" />
              </Box>
              <Text fontSize={"xl"}>Skills</Text>
            </Box>

            <Box className="flex items-center gap-6">
              <Box className="flex items-center gap-2">
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
              </Box>
              <Text fontSize={"xl"}>Quality of Requierments</Text>
            </Box>

            <Box className="flex items-center gap-6">
              <Box className="flex items-center gap-2">
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
              </Box>
              <Text fontSize={"xl"}>Avavilability</Text>
            </Box>

            <Box className="flex items-center gap-6">
              <Box className="flex items-center gap-2">
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
              </Box>
              <Text fontSize={"xl"}>Set Responable Deadlines</Text>
            </Box>

            <Box className="flex items-center gap-6">
              <Box className="flex items-center gap-2">
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
              </Box>
              <Text fontSize={"xl"}>Communication</Text>
            </Box>

            <Box className="flex items-center gap-6">
              <Box className="flex items-center gap-2">
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
                <FaStar className="text-[2rem] text-[#d1d5db] cursor-pointer" />
              </Box>
              <Text fontSize={"xl"}>Cooperation</Text>
            </Box>
          </Box>
        </Box>
        <Text fontWeight={"bold"} fontSize={"3xl"} marginTop={"4"}>
          Total Score:0.00
        </Text>

        <Box marginTop={"10"}>
          <Text fontSize="2xl" fontWeight="bold">
            Share your experience with this client to the Upwork community
          </Text>

          <Box marginTop={"3"}>
            <Textarea
              padding={"4"}
              height={"40"}
              fontSize={"xl"}
              placeholder="Your comments will be shared publicly"
            />
          </Box>
        </Box>

        <Box marginTop={"10"}>
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
        <Box>
          <Text fontSize="2xl">
            Eending this contract will permanently lock the Work Diary for this
            project. {"We'll"} let your client know the job is done and send you
            a final statement for any unpaid work
          </Text>
        </Box>
        <Box marginTop={"4"}>
          <Box className="flex items-center gap-6">
            <Text fontSize="3xl" fontWeight={"bold"} className="text-[#22c55e]">
              Cancel
            </Text>
            <button className="my-6 font-semibold text-[1.4rem] rounded-full px-4 py-2 bg-green-500 text-white">
              Submit Review
            </button>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default ReviewComponentUi;
