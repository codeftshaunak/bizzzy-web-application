import React, { useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout';
import Login from '../Login';
// import { ClientSignUp, FreelancerSignUp } from '../SignUp';
import Process from './Process';

const Onboarding = () => {
    return (
        <HomeLayout>
            <Process />
        </HomeLayout>
    )
}

export default Onboarding;
