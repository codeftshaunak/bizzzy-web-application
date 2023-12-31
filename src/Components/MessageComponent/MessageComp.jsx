import React, { useContext, useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getMessageDetails, getMessageList } from '../../helpers/freelancerApis';
import { BsSendFill } from 'react-icons/bs';
import { SocketContext, userId } from '../../Contexts/SocketContext';
import { userById } from '../../helpers/userApis';

const MessageComp = () => {
    const [messageUsers, setMessageUsers] = useState([]);
    const [messageDetails, setMessageDetails] = useState();
    const [selectedUser, setSelectedUser] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const getMessageUser = async () => {
        try {
            const response = await getMessageList();
            if (response?.isError) {
                toast({
                    title: response.message,
                    status: 'warning',
                    isClosable: true,
                    duration: 3000,
                    position: 'top-right',
                });
                navigate(`${response.path}`);
            } else {
                setMessageUsers(response.body);
            }
        } catch (error) {
            console.error('Error fetching message user:', error);
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
                setMessageDetails(response.body);
            }
        } catch (error) {
            console.error('Error fetching message details:', error);
        }
    };

    return (
        <HStack p={6} w="full" overflow={"scroll"} justifyContent={"space-between"} alignItems={"start"}>
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
                    <Image src="icons/search-icon.svg" alt="search icon" position="absolute" left={3} top={3} />
                    <Image src="icons/more-icon.svg" alt="MORE icon" position="absolute" right={3} top={3} />
                </Box>

                {messageUsers?.length > 0 &&
                    messageUsers.map((user, index) => (
                        <Box
                            key={index}
                            className="h-[90px] w-full border border-primary rounded-2xl bg-green-100 mt-[2rem] cursor-pointer"
                            onClick={() =>
                                getMessagesList(
                                    user?.user_details?.userId ? user?.user_details?.userId : user?.user_details?.user_id
                                )
                            }
                        >
                            <Flex align="center" justify="between" py={2} px={4}>
                                <Box width="85px">
                                    {user?.user_details?.profile_image !== "null" ? (
                                        <Image src={user?.user_details?.profile_image} className="h-[50px] w-[50px]" alt="img" borderRadius={"50px"} />
                                    ) : (
                                        <Avatar size="md" round="20px" name={user?.user_details?.firstName} />
                                    )}
                                </Box>
                                <Box width="full">
                                    <HStack justifyContent={"space-between"}>
                                        <Text fontWeight="semibold">
                                            {user?.user_details?.firstName} {user?.user_details?.lastName} {user?.user_details?.businessName && "," + " " + user?.user_details?.businessName}
                                        </Text>
                                        <Text color="gray.600">7/29/23</Text>
                                    </HStack>
                                    <Text fontWeight="semibold">Expert Dashboard Designer</Text>
                                    <Text color="gray.600">You: {user?.lastMessage.slice(0, 20)}</Text>
                                </Box>
                            </Flex>
                        </Box>
                    ))}
            </Box>

            <VStack width={"55%"}>
                {messageDetails?.length > 0 && <MessageBody data={messageDetails} selectedUser={selectedUser} />}
            </VStack>

            <VStack marginLeft={"1rem"} marginTop={"1rem"} width={"200px"}>
                <Card>
                    <h2>Submit works</h2>
                </Card>
            </VStack>

        </HStack>
    );
};

const MessageBody = ({ data, selectedUser }) => {
    const [messageData, setMessageData] = useState([]);
    const [recieverDetails, setRecieverDetails] = useState();
    const [senderDetails, setSenderDetails] = useState();
    const [message, setMessage] = useState('');
    const { socket } = useContext(SocketContext); // Use socket from context

    const recieverUser = async () => {
        if (selectedUser) {
            const response = await userById(selectedUser);
            setRecieverDetails(response.body)
        }
    }

    useEffect(() => {
        // Scroll to the bottom when the component is first rendered or when new messages are added
        scrollToBottom();
    }, [messageData, message, data]);

    const scrollToBottom = () => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };

    const senderUser = async () => {
        if (selectedUser) {
            const response = await userById(userId);
            setSenderDetails(response.body)
        }
    }

    useEffect(() => {
        setMessageData(data);
        console.log(data);
    }, [data])

    useEffect(() => {
        recieverUser();
        senderUser();
    }, [selectedUser, data, userId, socket])

    const handleSendMessage = () => {
        sendMessage(message);
        setMessage("")
    }

    const renderProfileImage = (user) => {
        const profileImage = user.sender_id === userId ? senderDetails?.profile_image : recieverDetails?.profile_image;
        const isProfileImageAvailable = profileImage !== "null";

        return isProfileImageAvailable ? (
            <Image src={profileImage} className="h-[50px] w-[50px]" alt="img" rounded={"50%"} border={"1px solid gray"} />
        ) : (
            <Avatar size="md" round="20px" name={user.sender_id === userId ? senderDetails?.firstName + senderDetails.lastName : recieverDetails?.firstName + senderDetails.lastName} />
        );
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
            setMessageData((prev) => [...prev, data])
        });
        return () => {
            socket.off("recieve_message");
        };
    }, [data, socket, message])

    return <Box w="100%" px={2} marginLeft={"1.5rem"} py={"1rem"} borderRadius={"15px"} position={"relative"} height={"89vh"} borderLeft={"0.51px solid var(--secondarytext)"}>
        <Flex borderBottom="1px" borderColor="gray.400" h="60px" py={2} px={4} gap={3}>
            {recieverDetails?.profile_image !== "null" ? (
                <Image src={recieverDetails?.profile_image} className="h-[40px] w-[40px]" alt="img" />
            ) : (
                <Avatar size="md" round="20px" name={recieverDetails?.firstName} />
            )}
            <Flex flexDir="column">
                <Text fontWeight="semibold">{recieverDetails?.firstName} {recieverDetails?.lastName}</Text>
                <Text fontSize="sm" color="gray.600">
                    Expert Dashboard Designer <span className="text-gray-400">5:06 AM CDT</span>
                </Text>
            </Flex>
        </Flex>

        <VStack alignItems={"start"} width={"100%"} height={"100%"}>
            <Box height={"70vh"} overflow={"scroll"} width={"100%"} display={"flex"} flexDir={"column"} alignItems={"start"} justifyContent={"flex-start"} id='chat-container'>
                {messageData?.length > 0 &&
                    messageData.map((user, index) => {
                        return <Box key={index} position="relative" padding={"20px"} width={"100%"}>
                            {
                                user.sender_id == userId ?
                                    <HStack justifyContent={"space-between"}>
                                        <Image src="images/more-msg.png" alt="msg more" />
                                        <HStack p={4} pb={0}>
                                            <VStack justifyContent={"end"} alignItems={"end"}>
                                                <Text fontWeight={"600"} textAlign={"right"}>{user.sender_id == userId ? senderDetails?.firstName : recieverDetails?.firstName} {user?.sender_id == userId ? senderDetails?.lastName : recieverDetails?.lastName}</Text>
                                                <Text width={"450px"} textAlign={"right"} fontSize="1rem" mb={2} color="gray.600">{user.message}</Text>
                                            </VStack>
                                            {renderProfileImage(user)}
                                        </HStack>
                                    </HStack>
                                    :
                                    <HStack justifyContent={"space-between"}>
                                        <HStack p={4} pb={0}>
                                            {renderProfileImage(user)}
                                            <Flex flexDir="column">
                                                <Text fontWeight={"600"}>{user.sender_id == userId ? senderDetails?.firstName : recieverDetails?.firstName} {user?.sender_id == userId ? senderDetails?.lastName : recieverDetails?.lastName}</Text>
                                                <Text width={"450px"} fontSize="1rem" mb={2} color="gray.600">{user.message}</Text>
                                            </Flex>
                                        </HStack>
                                        <Image src="images/more-msg.png" alt="msg more" />
                                    </HStack>
                            }
                        </Box>
                    })}
            </Box>

        </VStack >

        <HStack marginTop={"1rem"} width={"43%"} margin={"auto"} padding={"0 10px"} justifyContent={"space-between"} position={"fixed"} bottom={"3rem"}>
            <Input
                placeholder='Write your message here'
                width={"95%"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // Prevents the default behavior of newline on Enter
                        handleSendMessage();
                    }
                }}
            />
            <VStack border={"1px solid gray"} height={"35px"} width={"50px"} alignItems={"center"} justifyContent={"center"} borderRadius={"5px"} borderColor={"ButtonFace"}>
                <BsSendFill fontSize={"20px"} cursor={"pointer"} onClick={() => handleSendMessage()} />
            </VStack>
        </HStack>
    </Box >
};

export default MessageComp;
