import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Onboarding from '../Pages/Onboarding';
import Login from '../Pages/Login';
// import { ClientSignUp, FreelancerSignUp } from '../Pages/SignUp';
import Home from '../Pages/Home';
import JobPost from '../Pages/JobPost';
import ApplyJob from '../Pages/ApplyJob';
import { Profile, ProfileSetting } from '../Pages/Profile';
import FindJob from '../Pages/FindJob';
import Message from '../Pages/Message';
import TimeTracker from '../Pages/TimeTracker';
import { SignUp } from '../Pages/SignUp';
import { VerifySuccess } from '../Pages/Success';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/onboarding" element={<Onboarding />} />
                <Route exact path="/create-job" element={<JobPost />} />
                <Route exact path="/find-job" element={<FindJob />} />
                <Route exact path="/find-job/:id" element={<ApplyJob />} />
                {/* <Route exact path="/apply-job" element={<ApplyJob />} /> */}
                <Route exact path="/verify-email" element={<VerifySuccess />} />
                <Route exact path="/messages" element={<Message />} />
                <Route exact path="/freelancer" element={<Profile />} />
                <Route exact path="/freelancer/:id" element={<Profile />} />
                <Route exact path="/userprofile-setting" element={<ProfileSetting />} />
                <Route exact path='/tracker' element={<TimeTracker />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
