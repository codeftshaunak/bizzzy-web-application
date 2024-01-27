import React from 'react'
import LinkArrowIcon from '../../assets/icons/link-arrow'
import { useNavigate } from 'react-router-dom';
import { Image, HStack } from '@chakra-ui/react'

export const HomeFooter = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className='bg-green-50 mt-20 py-[2.62rem]'>
                <div className='max-w-[1300px] mx-auto'>
                    <div className='w-[1300px] h-[253px] flex-col justify-start items-start gap-9 inline-flex'>
                        <div className='w-[1300px]'>
                            <span className="text-black text-5xl font-['SF Pro']">
                                Important{' '}
                            </span>
                            <span className="text-green-600 text-5xl font-['SF Pro']">
                                links
                            </span>
                            <span className="text-black text-5xl font-['SF Pro']">.</span>
                        </div>
                        <div className='justify-start items-start gap-5 inline-flex'>
                            <div className='h-40 flex-col justify-between items-start inline-flex'>
                                <div className='w-[310px] justify-between items-start inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate("/")}>
                                        Home
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                                <div className='w-[310px] justify-between items-start inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        About
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                                <div className='w-[310px] justify-between items-center inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        Contact Us
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                                <div className='w-[310px] justify-between items-center inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        About
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                            </div>
                            <div className='h-40 flex-col justify-between items-start inline-flex'>
                                <div className='w-[310px] justify-between items-start inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        Casestudies
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                                <div className='w-[310px] justify-between items-start inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        Blogs
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                                <div className='w-[310px] justify-between items-start inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        Events
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                                <div className='w-[310px] justify-between items-start inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        Community
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                            </div>
                            <div className='h-40 flex-col justify-between items-start inline-flex'>
                                <div className='w-[310px] justify-between items-center inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        One Pager
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                                <div className='w-[310px] justify-between items-center inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        Multi Pager
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                                <div className='w-[310px] justify-between items-center inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        E-commerce Pages
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                                <div className='w-[310px] justify-between items-center inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        Dynamic Content Pages
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                            </div>
                            <div className='h-40 flex-col justify-between items-start inline-flex'>
                                <div className='w-[310px] justify-between items-start inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        Privacy
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                                <div className='w-[310px] justify-between items-start inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        Terms & Conditions
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                                <div className='w-[310px] justify-between items-center inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        Leadership
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                                <div className='w-[310px] justify-between items-center inline-flex'>
                                    <div className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer" onClick={() => navigate()}>
                                        Team
                                    </div>
                                    <div className='w-5 h-5 relative'>
                                        <LinkArrowIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-green-600'>
                <div className='w-[1300px] mx-auto px-2 py-[13px] text-center'>
                    <div className="text-white text-base font-normal font-['Lato'] leading-tight">
                        Bizzzy © 2023. All Rights Reserved
                    </div>
                </div>
            </div>
        </div>
    )
}


export const MVPFooter = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className='bg-green-50 mt-20 py-[2.62rem]'>
                <div className='max-w-[1300px] mx-auto'>
                    <div className='w-[1300px] h-[23px] flex-col justify-start items-start gap-9 inline-flex'>


                        <div className="flex justify-between w-full items-center">
                            <Image src='/images/bizzzy_logo.png' width={"150px"} />

                            <HStack width={"75%"} justifyContent={"space-between"}>
                                <div className='justify-between items-center inline-flex'>
                                    <div className="text-gray-700 text-lg f cursor-pointer" onClick={() => navigate()}>
                                        About Us
                                    </div>
                                </div>

                                <div className='justify-between items-start inline-flex'>
                                    <div className="text-gray-700 text-lg  cursor-pointer" onClick={() => navigate("/")}>
                                        Facebook
                                    </div>
                                </div>

                                <div className='justify-between items-start inline-flex'>
                                    <div className="text-gray-700 text-lg  cursor-pointer" onClick={() => navigate("/")}>
                                        Facebook
                                    </div>
                                </div>

                                <div className='justify-between items-center inline-flex'>
                                    <div className="text-gray-700 text-lg  cursor-pointer" onClick={() => navigate()}>
                                        Contact Us
                                    </div>
                                </div>

                                <div className='justify-between items-center inline-flex'>
                                    <div className="text-gray-700 text-lg  cursor-pointer" onClick={() => navigate()}>
                                        Privacy Policy
                                    </div>
                                </div>

                                <div className='justify-between items-center inline-flex'>
                                    <div className="text-gray-700 text-lg  cursor-pointer" onClick={() => navigate()}>
                                        Terms of Service
                                    </div>
                                </div>
                                <div className="text-gray-700 text-base leading-tight">
                                    Bizzzy © 2023. All Rights Reserved
                                </div>
                            </HStack>

                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='bg-green-600'>
                <div className='w-[1300px] mx-auto px-2 py-[13px] text-center'>
                    <div className="text-white text-base font-normal font-['Lato'] leading-tight">
                        Bizzzy © 2023. All Rights Reserved
                    </div>
                </div>
            </div> */}
        </div>
    )
}

