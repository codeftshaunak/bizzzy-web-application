import {
  Avatar,
  HStack,
  VStack,
  Box,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";
import { BsSendFill } from "react-icons/bs";

export const MessageUsersSkeleton = () => {
  return (
    <div>
      <Box
        className="h-[90px] w-full border border-primary rounded-2xl bg-green-100 mt-[2rem] cursor-pointer opacity-50"
        cursor={"not-allowed"}
      >
        <Flex align="center" justify="between" py={2} px={4}>
          <Box width="85px">
            <Avatar size="md" round="20px" />
          </Box>
          <Box width="full">
            <HStack justifyContent={"space-between"}>
              <Text fontWeight="semibold" fontSize={"15px"}>
                bizzzy expert
              </Text>
              <Text color="gray.600">7/29/23</Text>
            </HStack>
            <Text fontWeight="semibold" fontSize={"15px"}>
              Expert Dashboard Designer
            </Text>
            <Text color="gray.600">You: ...</Text>
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export const MessageBodySkeleton = () => {
  return (
    <Box
      width="100%"
      px={"20px"}
      marginLeft={"1.5rem"}
      py={"1rem"}
      borderRadius={"15px"}
      position={"relative"}
      height={"80%"}
      overflow={"hidden"}
      className="border shadow-sm"
      cursor={"not-allowed"}
    >
      <Flex
        borderBottom="1px"
        borderColor="gray.400"
        h="60px"
        py={2}
        px={4}
        gap={3}
      >
        <Avatar size="md" round="20px" />
        <Flex flexDir="column">
          <Text fontWeight="semibold">bizzzy expert</Text>
          <Text fontSize="sm" color="gray.600">
            Expert Dashboard Designer{" "}
            <span className="text-gray-400">5:06 AM CDT</span>
          </Text>
        </Flex>
      </Flex>

      <VStack
        alignItems={"start"}
        width={"100%"}
        height={"100%"}
        position={"relative"}
      >
        <Box
          height={"69vh"}
          overflowY={"auto"}
          width={"100%"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"flex-start"}
        >
          <HStack marginTop={2}>
            <Avatar size="md" round="20px" opacity={"0.5"} />
            <Flex flexDir="column" gap={2}>
              <Box
                height={3}
                width={"100px"}
                bgColor="gray.200"
                rounded={"sm"}
              ></Box>
              <Box
                width={"450px"}
                height={2}
                bgColor="gray.200"
                rounded={"sm"}
              ></Box>
            </Flex>
          </HStack>
          <HStack marginLeft={"auto"}>
            <VStack justifyContent={"end"} alignItems={"end"}>
              <Box
                height={3}
                width={"100px"}
                bgColor="gray.200"
                rounded={"sm"}
              ></Box>
              <Box
                width={"450px"}
                height={2}
                bgColor="gray.200"
                rounded={"sm"}
              ></Box>
            </VStack>
            <Avatar size="md" round="20px" opacity={"0.5"} />
          </HStack>
          <HStack alignItems={"start"} marginTop={2}>
            <Avatar size="md" round="20px" opacity={"0.5"} />
            <Flex flexDir="column" gap={2}>
              <Box
                height={3}
                width={"100px"}
                bgColor="gray.200"
                rounded={"sm"}
              ></Box>
              <Box
                width={"450px"}
                height={2}
                bgColor="gray.200"
                rounded={"sm"}
              ></Box>
            </Flex>
          </HStack>
          <HStack marginLeft={"auto"}>
            <VStack justifyContent={"end"} alignItems={"end"}>
              <Box
                height={3}
                width={"100px"}
                bgColor="gray.200"
                rounded={"sm"}
              ></Box>
              <Box
                width={"450px"}
                height={2}
                bgColor="gray.200"
                rounded={"sm"}
              ></Box>
            </VStack>
            <Avatar size="md" round="20px" opacity={"0.5"} />
          </HStack>
        </Box>
        <HStack
          marginTop={"1rem"}
          width={"43%"}
          margin={"auto"}
          height={"35px"}
          padding={"0 10px"}
          backgroundColor="white"
          justifyContent={"space-between"}
          position={"fixed"}
          bottom={"3rem"}
          className="rounded"
        >
          <Input placeholder="Write your message here" width={"95%"} disabled />
          <VStack
            border={"1px solid gray"}
            height={"40px"}
            width={"50px"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"5px"}
            borderColor={"ButtonFace"}
          >
            <BsSendFill fontSize={"20px"} />
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};
