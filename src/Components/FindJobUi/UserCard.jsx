import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Box, Checkbox, HStack, Image, Input, Select, Text, VStack, Avatar } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../Contexts/CurrentUser';

const UserProfileCard = () => {
    const navigate = useNavigate();
    const { hasAgency, activeAgency } = useContext(CurrentUserContext);
    const [cookies, setCookie] = useCookies(['activeagency']);
    const activeagency = cookies.activeagency;
    const profile = useSelector((state) => state.profile.profile);
    console.log({ profile });
    const { profile_image, firstName, lastName, professional_role } = profile || [];

    const handleSwitching = () => {
        if (activeagency) {
            setCookie('activeagency', false)
        } else {
            navigate(`/profile`)
        }
    }
    return (
        <div className="border border-tertiary rounded-2xl w-full m-auto">
            <div className="flex flex-col items-center gap-1 pt-6 pb-4 border-b border-tertiary">
                {profile_image == null ? (
                    <Avatar name={firstName + ' ' + lastName} />
                ) : (
                    <img
                        src={profile_image}
                        alt="avatar"
                        className="h-[90px] w-[90px] rounded-full border-4 border-tertiary"
                    />
                )}
                <div className="text-2xl font-medium cursor-pointer" onClick={() => navigate(`/profile`)}>{firstName + ' ' + lastName?.slice(0, 1) + '.'}</div>
                <div className="text-sm text-gray-300">{professional_role}</div>
                <div className="flex items-center">
                    <div className="star-filled"></div>
                    <div className="star-filled"></div>
                    <div className="star-filled"></div>
                    <div className="star-filled"></div>
                    <div className="star-filled"></div>
                    <div className="text-sm font-medium">5.0 of 4 Reviews</div>
                </div>
            </div>
            {
                activeagency ? <div className="p-4 flex">
                    <button className="text-center w-[90%] text-white font-semibold py-2 rounded-md m-auto bg-[var(--primarycolor)]" onClick={() => handleSwitching()}>{'Switch Freelancer Profile'}</button>
                </div> : <div className="p-4">
                    <div className="text-sm text-gray-400">Complete your Profile</div>
                    <div className="flex gap-4 items-center mt-3">
                        <div className="w-[80%] h-[5px] bg-green-600 rounded-2xl"></div>
                        <div className="text-xs font-semibold">100%</div>
                    </div>
                </div>
            }

        </div>
    )
}

export default UserProfileCard;
