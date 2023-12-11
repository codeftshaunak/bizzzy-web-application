import React, { useEffect, useState } from 'react'
import { getMessageDetails, getMessageList } from '../../helpers/freelancerApis';
import { useToast, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
const MessageComp = () => {
    const [messageUsers, setMessageUsers] = useState([]);
    const [messageDetails, setMessageDetails] = useState();
    const navigate = useNavigate();
    const toast = useToast();
    const getMessageUser = async () => {
        const response = await getMessageList();
        console.log(response);
        if (response?.isError) {
            toast({ title: response.message, status: 'warning', isClosable: true, duration: 3000, position: 'top-right' });
            navigate(`${response.path}`);
        } else {
            setMessageUsers(response.body);
        }
    }

    useEffect(() => {
        getMessageUser();
    }, []);

    const getMessagesList = async (receiver_id) => {
        console.log(receiver_id);
        if (receiver_id) {
            const response = await getMessageDetails(receiver_id);
            console.log(response);
        }
    }

    return (
        <div className="flex p-6 w-full">
            <div className="w-[30%]">
                <div className="relative h-[44px] mb-2 mt-6">
                    <input type="text" placeholder="Search Client by Name" className="pb-1 w-full h-[44px] px-10 border border-gray-300 rounded-xl" />
                    <img src="icons/search-icon.svg" alt="search icon" className="absolute left-3 top-3" />
                    <img src="icons/more-icon.svg" alt="MORE icon" className="absolute right-3 top-3" />
                </div>

                {
                    messageUsers?.length > 0 && messageUsers?.map((user, index) => {
                        console.log(user.user_details);
                        return <div className="h-[90px] border border-primary rounded-2xl bg-green-100 mt-2 cursor-pointer" key={index} onClick={() => getMessagesList(user?.user_details?.userId ? user?.user_details?.userId : user?.user_details?.user_id)}>
                            <div className="flex items-center justify-between py-2 px-4">
                                <Box width={"85px"}>
                                    {user?.user_details?.profile_image ? <Avatar size='md' round="20px" name={user?.user_details?.firstName} /> : <img src={user?.user_details?.profile_image} className="h-[40px] w-[40px]" alt="img" />}
                                </Box>
                                <Box width={"full"}>
                                    <div className="flex justify-between">
                                        <div className="font-semibold">{user?.user_details?.firstName} {user?.user_details?.lastName}, {user?.user_details?.businessName}</div>
                                        <div className="text-gray-300">7/29/23</div>
                                    </div>
                                    <div className="font-semibold">Expert Dashboard Designer</div>
                                    <div className="text-gray-300">You: {user?.lastMessage.length > 20 ? user?.lastMessage.slice(0, 20) : user?.lastMessage}</div>
                                </Box>
                            </div>
                        </div>
                    })
                }
            </div>


            <MessageBody />
            {/* <div className="w-[56%] px-2">
                <div className="border-b border-tertiary h-[60px] py-2 px-4 flex gap-3">
                    <img src="images/user-img.png" className="h-[40px] w-[40px]" alt="img" />
                    <div className="flex flex-col">
                        <div className="font-semibold">Sohail Karim, The NorthNine Group</div>
                        <div className="text-sm text-gray-300">Expert Dashboard Designer <span className="text-gray-400">5:06 AM CDT</span></div>
                    </div>
                </div>
                <div className="h-[192px] mt-8 border-t border-tertiary relative">
                    <div className="text-sm text-gray-300 absolute left-[300px] bg-secondary px-4 -mt-3">Sat, Jul 29</div>
                    <img src="images/more-msg.png" className="absolute right-0 top-0" alt="msg more" />
                    <div className="flex items-start gap-3 bg-gray-100 p-4 pb-0">
                        <img src="images/user-img.png" alt="user image" />
                        <div className="flex flex-col">
                            <div>Sohail Karim</div>
                            <div className="text-sm mb-2 text-gray-300">Hi - Show me samples of work</div>
                            <div className="text-sm mb-1"><span className="text-gray-300">Lets talk on Skype</span><br />
                                https://join.skype.com/invite/oNvoDHHBv5q0</div>
                            <div className="pl-4 text-sm">
                                Join conversation<br />
                                <span className="text-gray-300 text-sm">Skype keeps the world talking. Call, message, and share whatever you want - for free.</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 pb-0">
                        <img src="images/empty-user.png" alt="user image" />
                        <div className="flex flex-col">
                            <div>Farhan Ali <span className="text-sm text-gray-300">1:57 AM</span></div>
                            <div className="text-sm">Thanks for the job</div>
                            <div className="bg-gray-500 p-2 h-[40px] w-[310px]">
                                <div className="border-l-4 border-black-900 text-sm pl-3">View details</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 pb-0">
                        <img src="images/user-img.png" alt="user image" />
                        <div className="flex flex-col">
                            <div>Sohail Karim <span className="text-gray-300">sent an offer</span> <span className="text-sm text-gray-300">1:57 AM</span></div>
                            <div className="text-sm">Thanks for the job</div>
                            <div className="bg-gray-500 p-2 h-[95px] w-[321px]">
                                <div className="border-l-4 border-black-900 text-sm pl-3">
                                    <div className="text-sm text-gray-300">Rate: $23.00/hr</div>
                                    <div className="text-sm text-gray-300">Limit: 5 hrs/week</div>
                                    <div className="text-sm">View details</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 pb-0">
                        <img src="images/empty-user.png" alt="user image" />
                        <div className="flex flex-col">
                            <div>Farhan Ali <span className="text-gray-300">accepted an offer</span> <span className="text-sm text-gray-300">1:57 AM</span></div>
                            <div className="text-sm">Thanks for the job</div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="w-[22%] bg-gray-500 p-6 pt-2">
                <div className="text-xl font-semibold border-b border-tertiary text-center pb-6 pt-6">About The client</div>
                <div className="mb-1 text-xl mt-6">Sohail Karim</div>
                <div className="text-sm text-gray-300">The NorthNine Group</div>
                <div className="text-sm text-gray-300 pb-6 border-b border-tertiary">5:06 AM CDT (10 h <br />
                    behind)</div>
                <div className="text-xl mt-6">Submit your work</div>
                <button className="bg-primary text-secondary rounded h-[36px] w-[106px] mt-6">Submit Now</button>
                <div className="text-xl mt-6">Contract Settings</div>
                <button className="bg-primary text-secondary rounded h-[36px] w-[144px] mt-6">Contract Settings</button>
            </div> */}
        </div>
    )
}

const MessageBody = () => {
    return <div className="w-[56%] px-2">
        <div className="border-b border-tertiary h-[60px] py-2 px-4 flex gap-3">
            <img src="images/user-img.png" className="h-[40px] w-[40px]" alt="img" />
            <div className="flex flex-col">
                <div className="font-semibold">Sohail Karim, The NorthNine Group</div>
                <div className="text-sm text-gray-300">Expert Dashboard Designer <span className="text-gray-400">5:06 AM CDT</span></div>
            </div>
        </div>
        <div className="h-[192px] mt-8 border-t border-tertiary relative">
            <div className="text-sm text-gray-300 absolute left-[300px] bg-secondary px-4 -mt-3">Sat, Jul 29</div>
            <img src="images/more-msg.png" className="absolute right-0 top-0" alt="msg more" />
            <div className="flex items-start gap-3 bg-gray-100 p-4 pb-0">
                <img src="images/user-img.png" alt="user image" />
                <div className="flex flex-col">
                    <div>Sohail Karim</div>
                    <div className="text-sm mb-2 text-gray-300">Hi - Show me samples of work</div>
                    <div className="text-sm mb-1"><span className="text-gray-300">Lets talk on Skype</span><br />
                        https://join.skype.com/invite/oNvoDHHBv5q0</div>
                    <div className="pl-4 text-sm">
                        Join conversation<br />
                        <span className="text-gray-300 text-sm">Skype keeps the world talking. Call, message, and share whatever you want - for free.</span>
                    </div>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 pb-0">
                <img src="images/empty-user.png" alt="user image" />
                <div className="flex flex-col">
                    <div>Farhan Ali <span className="text-sm text-gray-300">1:57 AM</span></div>
                    <div className="text-sm">Thanks for the job</div>
                    <div className="bg-gray-500 p-2 h-[40px] w-[310px]">
                        <div className="border-l-4 border-black-900 text-sm pl-3">View details</div>
                    </div>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 pb-0">
                <img src="images/user-img.png" alt="user image" />
                <div className="flex flex-col">
                    <div>Sohail Karim <span className="text-gray-300">sent an offer</span> <span className="text-sm text-gray-300">1:57 AM</span></div>
                    <div className="text-sm">Thanks for the job</div>
                    <div className="bg-gray-500 p-2 h-[95px] w-[321px]">
                        <div className="border-l-4 border-black-900 text-sm pl-3">
                            <div className="text-sm text-gray-300">Rate: $23.00/hr</div>
                            <div className="text-sm text-gray-300">Limit: 5 hrs/week</div>
                            <div className="text-sm">View details</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 pb-0">
                <img src="images/empty-user.png" alt="user image" />
                <div className="flex flex-col">
                    <div>Farhan Ali <span className="text-gray-300">accepted an offer</span> <span className="text-sm text-gray-300">1:57 AM</span></div>
                    <div className="text-sm">Thanks for the job</div>
                </div>
            </div>
        </div>
    </div>
}

export default MessageComp;
