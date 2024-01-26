import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  HStack,
  VStack,
  Card,
  Box,
  Input,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  getMessageDetails,
  getMessageList,
} from "../../helpers/freelancerApis";
import { BsSendFill } from "react-icons/bs";
import { SocketContext, userId } from "../../Contexts/SocketContext";
import { userById } from "../../helpers/userApis";
import SingleText from "./SingleText";

const MessageComp = () => {
  const [messageUsers, setMessageUsers] = useState([]);
  const [messageDetails, setMessageDetails] = useState();
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const getMessageUser = async () => {
    try {
      const response = await getMessageList();
      if (response?.isError) {
        toast({
          title: response.message,
          status: "warning",
          isClosable: true,
          duration: 3000,
          position: "top-right",
        });
        navigate(`${response.path}`);
      } else {
        setMessageUsers(response);
      }
    } catch (error) {
      console.error("Error fetching message user:", error);
    }
  };

  useEffect(() => {
    getMessageUser();
  }, []);

  const getMessagesList = async (receiver_id) => {
    try {
      if (receiver_id) {
        setSelectedUser(receiver_id);
        const response = await getMessageDetails(receiver_id);
        setMessageDetails(response);
      }
    } catch (error) {
      console.error("Error fetching message details:", error);
    }
  };

  return (
    <HStack
      paddingX={6}
      paddingTop={6}
      width="full"
      height="full"
      justifyContent={"space-between"}
      alignItems={"start"}
    // className="bg-green-500"
    >
      <Box w="350px">
        <Box position="relative" h="44px" mb={2} mt={6}>
          <Input
            type="text"
            placeholder="Search Client by Name"
            pb={1}
            w="full"
            h="44px"
            px={10}
            border="1px"
            borderColor="gray.600"
            rounded="xl"
          />
          <Image
            src="icons/search-icon.svg"
            alt="search icon"
            position="absolute"
            left={3}
            top={3}
          />
          <Image
            src="icons/more-icon.svg"
            alt="MORE icon"
            position="absolute"
            right={3}
            top={3}
          />
        </Box>
        {/* {console.log({ messageUsers })} */}
        {messageUsers?.length > 0 && (
          <Box overflowY={"auto"}>
            {messageUsers.map((user, index) => (
              <Box
                key={index}
                className="h-[90px] w-full border border-primary rounded-2xl bg-green-100 mt-[2rem] cursor-pointer"
                onClick={() => {
                  getMessagesList(
                    user?.user_details?.userId
                      ? user?.user_details?.userId
                      : user?.user_details?.user_id
                  );
                }}
              >
                <Flex align="center" justify="between" py={2} px={4}>
                  <Box width="85px">
                    {user?.user_details?.profile_image !== null ? (
                      <Image
                        src={user?.user_details?.profile_image}
                        className="h-[50px] w-[50px] rounded-full"
                        alt="img"
                        borderRadius={"50px"}
                      />
                    ) : (
                      <Avatar
                        size="md"
                        round="20px"
                        name={user?.user_details?.firstName + " " + user?.user_details?.lastName}
                      />
                    )}
                  </Box>
                  <Box width="full">
                    <HStack justifyContent={"space-between"}>
                      <Text fontWeight="semibold" fontSize={"15px"}>
                        {user?.user_details?.firstName}{" "}
                        {user?.user_details?.lastName}{" "}
                        {user?.user_details?.businessName &&
                          "," + " " + user?.user_details?.businessName}
                      </Text>
                      <Text color="gray.600">7/29/23</Text>
                    </HStack>
                    <Text fontWeight="semibold" fontSize={"15px"}>Expert Dashboard Designer</Text>
                    <Text color="gray.600">
                      You: {user?.lastMessage.slice(0, 10)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <VStack width={"55%"}>
        {/* {console.log({ messageDetails, selectedUser })} */}
        {messageDetails?.length > 0 && (
          <MessageBody data={messageDetails} selectedUser={selectedUser} />
        )}
      </VStack>

      <VStack marginLeft={"1rem"} marginTop={"1rem"} width={"200px"}>
        <Card className="px-10 py-2">
          <h2>Submit works</h2>
        </Card>
        <div className="mt-6 relative w-full">
          <img className="w-full" src="/images/dashboard/banner.png" alt="banner" />
          <div className="flex flex-col gap-3 absolute bottom-3 left-3">
            <div className="text-3xl text-secondary font-bold">Earn Hourly</div>
            <div className="text-sm text-secondary">Download the Bizzzy time tracker app to start working hourly contracts.</div>
            <button className="bg-primary text-secondary rounded h-[36px] w-[130px]">Download Now</button>
          </div>
        </div>
      </VStack>
    </HStack>
  );
};

//--------------------- Message Body
const MessageBody = ({ data, selectedUser }) => {
  const [messageData, setMessageData] = useState([]);
  const [receiverDetails, setreceiverDetails] = useState();
  const [senderDetails, setSenderDetails] = useState();
  const [message, setMessage] = useState("");
  // const [currentUser, setCurrentUser] = useState("");
  // const [isRepeatedUser, setIsRepeatedUser] = useState(false);
  const { socket } = useContext(SocketContext); // Use socket from context
  // {
  //   console.log({ currentUser, isRepeatedUser });
  // }
  const recieverUser = async () => {
    if (selectedUser) {
      const response = await userById(selectedUser);
      setreceiverDetails(response);
    }
  };

  useEffect(() => {
    // Scroll to the bottom when the component is first rendered or when new messages are added
    scrollToBottom();
  }, [messageData, message, data]);

  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  const senderUser = async () => {
    if (selectedUser) {
      const response = await userById(userId);
      setSenderDetails(response);
    }
  };
  // console.log({ receiverDetails, senderDetails });
  useEffect(() => {
    setMessageData(data);
    console.log(data);
  }, [data]);

  useEffect(() => {
    recieverUser();
    senderUser();
  }, [selectedUser, data, userId, socket]);

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  const sendMessage = (message) => {
    socket.emit("connect_user", { user_id: userId });
    socket.emit("chat_message", {
      sender_id: userId,
      receiver_id: selectedUser,
      message: message,
      message_type: 1,
    });
  };

  useEffect(() => {
    socket.on();
    socket.emit("connect_user", { user_id: userId });
    socket.on("recieve_message", (data) => {
      data.created_at = new Date();
      setMessageData((prev) => [...prev, data]);
    });
    return () => {
      socket.off("recieve_message");
    };
  }, [data, socket, message]);

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
    >
      <Flex
        borderBottom="1px"
        borderColor="gray.400"
        h="60px"
        py={2}
        px={4}
        gap={3}
      >
        {receiverDetails?.profile_image !== null ? (
          <Image
            src={receiverDetails?.profile_image}
            className="h-[40px] w-[40px] rounded-full"
            alt="img"
          />
        ) : (
          <Avatar size="md" round="20px" name={receiverDetails?.firstName + " " + receiverDetails?.lastName} />
        )}
        <Flex flexDir="column">
          <Text fontWeight="semibold">
            {receiverDetails?.firstName} {receiverDetails?.lastName}
          </Text>
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
          height={"65vh"}
          overflowY={"auto"}
          width={"100%"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"start"}
          justifyContent={"flex-start"}
          id="chat-container"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        // className="bg-red-500"
        >
          {console.log({ messageData })}
          {messageData?.length > 0 &&
            messageData.map((user, index) => (
              <SingleText
                key={index}
                user={user}
                userId={userId}
                senderDetails={senderDetails}
                receiverDetails={receiverDetails}
              // setIsRepeatedUser={setIsRepeatedUser}
              // isRepeatedUser={isRepeatedUser}
              // currentUser={currentUser}
              // setCurrentUser={setCurrentUser}
              />
            ))}
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
          <Input
            placeholder="Write your message here"
            width={"95%"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevents the default behavior of newline on Enter
                handleSendMessage();
              }
            }}
          />
          <VStack
            border={"1px solid gray"}
            height={"40px"}
            width={"50px"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"5px"}
            borderColor={"ButtonFace"}
            className={message && "bg-green-500"}
            cursor={"pointer"}
            onClick={() => handleSendMessage()}
          >
            <BsSendFill fontSize={"20px"} className={message && "text-white"} />
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default MessageComp;
