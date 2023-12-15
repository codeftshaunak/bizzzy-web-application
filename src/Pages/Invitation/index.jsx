import React from 'react'
import HomeLayout from '../../Layouts/HomeLayout';
import Interview from '../../Components/Invitation/Interview';
import Offer from '../../Components/Invitation/Offer';



export const InterviewInvitation = () => {
    return <HomeLayout><Interview /></HomeLayout>
}

export const OfferInvitation = () => {
    return <HomeLayout><Offer /></HomeLayout>
}

