import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Checkbox, HStack, Image, Input, Select, Text, VStack, Avatar } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AgencyUserCard = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['activeagency']);
    const activeagency = cookies.activeagency;
    const agency = useSelector((state) => state.profile.agency);
    const { agency_name, agency_tagline, agency_profileImage } = agency || [];


    const handleSwitching = () => {
        if (!activeagency) {
            setCookie('activeagency', true)
        } else {
            navigate(`/agency-profile`)
        }
    }

    return (
        <div className="border border-tertiary rounded-2xl w-[300px] m-auto">
            <div className="flex flex-col items-center gap-1 pt-6 pb-4 border-b border-tertiary">
                {agency_profileImage == null ? (
                    <Avatar name={agency_name} />
                ) : (
                    <img
                        src={agency_profileImage}
                        alt="avatar"
                        className="h-[90px] w-[90px] rounded-full border-4 border-tertiary"
                    />
                )}
                <div className="text-2xl font-medium cursor-pointer">{agency_name}</div>
                <div className="text-sm text-gray-300">{agency_tagline}</div>
                <div className="flex items-center">
                    <div className="star-filled"></div>
                    <div className="star-filled"></div>
                    <div className="star-filled"></div>
                    <div className="star-filled"></div>
                    <div className="star-filled"></div>
                    <div className="text-sm font-medium">5.0 of 4 Reviews</div>
                </div>
            </div>
            {/* <div className="p-4">
                <div className="text-sm text-gray-400">Complete your Profile</div>
                <div className="flex gap-4 items-center mt-3">
                    <div className="w-[80%] h-[5px] bg-green-600 rounded-2xl"></div>
                    <div className="text-xs font-semibold">100%</div>
                </div>
            </div> */}
            <div className="p-4 flex">
                {
                    agency ? <button className="text-center w-[90%] text-white font-semibold py-2 rounded-md m-auto bg-[var(--primarycolor)]" onClick={() => handleSwitching()}>{activeagency ? 'Visit Your Agency Profile' : 'Switch To Agency Profile'}</button>
                        : <button className="text-center w-[90%] text-white font-semibold py-2 rounded-md m-auto bg-[var(--primarycolor)]" onClick={() => navigate("/agency-build")}>Create Your Agency Profile</button>
                }
            </div>
        </div>
    )
}

export default AgencyUserCard;
