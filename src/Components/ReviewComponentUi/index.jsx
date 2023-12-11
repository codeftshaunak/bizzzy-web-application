import {
  Box,
  HStack,
  Heading,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

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
    </section>
  );
};

export default ReviewComponentUi;
