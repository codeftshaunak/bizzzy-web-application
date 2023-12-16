import React, { useContext, useEffect, useState } from 'react';
import {
    Avatar,
    AvatarBadge,
    AvatarGroup,
    HStack,
    VStack,
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
            console.log(response);

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
        <Flex p={6} w="full">
            <Box w="30%">
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
                            className="h-[90px] border border-primary rounded-2xl bg-green-100 mt-[2rem] cursor-pointer"
                            onClick={() =>
                                getMessagesList(
                                    user?.user_details?.userId ? user?.user_details?.userId : user?.user_details?.user_id
                                )
                            }
                        >
                            <Flex align="center" justify="between" py={2} px={4}>
                                <Box width="85px">
                                    {user?.user_details?.profile_image !== "null" ? (
                                        <Image src={user?.user_details?.profile_image} className="h-[40px] w-[40px]" alt="img" />
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

            {messageDetails?.length > 0 && <MessageBody data={messageDetails} selectedUser={selectedUser} />}
        </Flex>
    );
};

const MessageBody = ({ data, selectedUser }) => {
    const [messageData, setMessageData] = useState([]);
    console.log(messageData);
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
    }, [messageData]);

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
            <Image src={profileImage} className="h-[40px] w-[40px]" alt="img" rounded={"50%"} />
        ) : (
            <Avatar size="md" round="20px" name={user.sender_id === userId ? senderDetails?.firstName : recieverDetails?.firstName} />
        );
    };

    const sendMessage = (message) => {
        if (socket) {
            // Set up event listener for incoming chat messages before emitting events
            socket.on("recieve_message", (data) => {
                console.log(data);
                data.created_at = new Date();
                setMessageData([...messageData, data]);
            });

            // Emit events
            socket.emit("connect_user", { user_id: userId });
            socket.emit("chat_message", {
                sender_id: userId,
                receiver_id: selectedUser,
                message: message,
                message_type: 1,
            });
        }
    };

    return <Box w="56%" px={2} marginLeft={"1.5rem"} py={"1rem"} borderRadius={"15px"}>
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

        <VStack justifyContent={"end"} alignItems={"start"} width={"100%"} height={"67vh"} overflow={"scroll"} id="chat-container"
        >
            {messageData?.length > 0 &&
                messageData.map((user, index) => (
                    <Box key={index} position="relative" padding={"20px"} width={"100%"}>
                        <HStack justifyContent={"space-between"}>
                            <Flex itemsStart gap={3} p={4} pb={0}>
                                {renderProfileImage(user)}
                                <Flex flexDir="column">
                                    <Text>{user.sender_id == userId ? senderDetails?.firstName : recieverDetails?.firstName} {user?.sender_id == userId ? senderDetails?.lastName : recieverDetails?.lastName}</Text>
                                    <Text fontSize="sm" mb={2} color="gray.600">{user.message}</Text>
                                </Flex>
                            </Flex>

                            <Image src="images/more-msg.png" alt="msg more" />
                        </HStack>
                    </Box>
                ))}
        </VStack>

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
    </Box>
};

export default MessageComp;
