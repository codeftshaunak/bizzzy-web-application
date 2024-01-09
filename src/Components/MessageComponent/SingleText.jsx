import {
  HStack,
  VStack,
  Box,
  Image,
  Flex,
  Text,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { deleteMessage } from "../../helpers/clientApis";

const SingleText = ({
  user,
  userId,
  senderDetails,
  receiverDetails,
  // isRepeatedUser,
  // setIsRepeatedUser,
  // currentUser,
  // setCurrentUser,
}) => {
  const [isMore, setIsMore] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const toast = useToast();
  // {
  //   console.log(isRepeatedUser, user.sender_id);
  // }

  // // Set Current User
  // if (user?.sender_id === currentUser) {
  //   setIsRepeatedUser(true);
  //   setCurrentUser(user?.sender_id);
  // } else {
  //   setIsRepeatedUser(false);
  //   setCurrentUser(user?.sender_id);
  // }
  // console.log({ user });

  // Delete message
  const deleteCurrentMsg = async (id) => {
    setIsMenu(false);
    try {
      const response = await await deleteMessage(id);
      console.log(response);
      if (response?.code === 200) {
        toast({
          title: response.msg,
          duration: 3000,
          isClosable: true,
          colorScheme: "green",
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: error?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.error("Error fetching search results:", error);
    }
  };

  const renderProfileImage = (user) => {
    const profileImage =
      user.sender_id === userId
        ? senderDetails?.profile_image
        : receiverDetails?.profile_image;
    const isProfileImageAvailable =
      profileImage !== "null" && profileImage !== null;

    return isProfileImageAvailable ? (
      <Image
        src={profileImage}
        className="h-[50px] w-[50px]"
        alt="img"
        rounded={"50%"}
        border={"1px solid gray"}
      />
    ) : (
      <Avatar
        size="md"
        round="20px"
        name={
          user.sender_id === userId
            ? senderDetails?.firstName + " " + senderDetails.lastName
            : receiverDetails?.firstName + " " + receiverDetails.lastName
        }
      />
    );
  };

  return (
    <Box
      position="relative"
      padding={"10px"}
      width={"100%"}
      onMouseEnter={() => setIsMore(true)}
      onMouseLeave={() => setIsMore(false)}
    >
      {user.sender_id == userId ? (
        <HStack justifyContent={"space-between"}>
          {isMore ? (
            <div className="relative">
              <div
                className="cursor-pointer bg-white hover:bg-gray-200/30 p-1 rounded-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_12px]"
                onClick={() => setIsMenu(true)}
                onMouseLeave={() => setIsMenu(false)}
              >
                <IoIosMore />
              </div>
              {isMenu && (
                <div
                  className="absolute left-6 -top-4 p-2 shadow bg-white rounded"
                  onMouseEnter={() => {
                    setIsMore(true), setIsMenu(true);
                  }}
                  onMouseLeave={() => {
                    setIsMore(false), setIsMenu(false);
                  }}
                >
                  <div
                    className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                    onClick={() => deleteCurrentMsg(user?._id)}
                  >
                    Delete
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Text></Text>
          )}
          <HStack alignItems={"start"}>
            <VStack justifyContent={"end"} alignItems={"end"}>
              <Text fontWeight={"600"} textAlign={"right"}>
                You
              </Text>
              <Text
                width={"450px"}
                textAlign={"right"}
                fontSize="1rem"
                mb={2}
                color="gray.600"
              >
                {user.message}
              </Text>
            </VStack>
            {renderProfileImage(user)}
          </HStack>
        </HStack>
      ) : (
        <HStack
          justifyContent={"space-between"}
          onMouseEnter={() => setIsMore(true)}
          onMouseLeave={() => setIsMore(false)}
        >
          <HStack>
            {renderProfileImage(user)}
            <Flex flexDir="column">
              <Text fontWeight={"600"}>
                {user.sender_id == userId
                  ? senderDetails?.firstName
                  : receiverDetails?.firstName}{" "}
                {user?.sender_id == userId
                  ? senderDetails?.lastName
                  : receiverDetails?.lastName}
              </Text>
              <Text width={"450px"} fontSize="1rem" mb={2} color="gray.600">
                {user.message}
              </Text>
            </Flex>
          </HStack>
          {isMore ? (
            <div className="relative">
              <div
                className="cursor-pointer bg-white hover:bg-gray-200/30 p-1 rounded-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_12px]"
                onClick={() => setIsMenu(true)}
                onMouseLeave={() => setIsMenu(false)}
              >
                <IoIosMore />
              </div>
              {isMenu && (
                <div
                  className="absolute right-6 -top-4 p-2 shadow bg-white rounded"
                  onMouseEnter={() => {
                    setIsMore(true), setIsMenu(true);
                  }}
                  onMouseLeave={() => {
                    setIsMore(false), setIsMenu(false);
                  }}
                >
                  <div
                    className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                    onClick={() => setIsMenu(false)}
                  >
                    Delete
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Text></Text>
          )}
        </HStack>
      )}
    </Box>
  );
};

export default SingleText;
