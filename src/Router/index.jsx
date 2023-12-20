import { BrowserRouter, Route, Routes } from "react-router-dom";
import Onboarding from "../Pages/Onboarding";
import Login from "../Pages/Login";
// import { ClientSignUp, FreelancerSignUp } from '../Pages/SignUp';
import Home from "../Pages/Home";
import JobPost from "../Pages/JobPost";
import ApplyJob from "../Pages/ApplyJob";
import { Profile, ProfileSetting } from "../Pages/Profile";
import { FindJob, SearchPage } from "../Pages/FindJob";
import Message from "../Pages/Message";
import TimeTracker from "../Pages/TimeTracker";
import { SignUp } from "../Pages/SignUp";
import { VerifySuccess } from "../Pages/Success";
import ClientJobPostView from "../Pages/ClientJobPostView";
import ClientDashBoard from "../Pages/ClientDashboard";
import Report from "../Pages/Reports";
import MyJobPage from "../Pages/MyJobs";
import Review from '../Pages/Review';
import EndContract from "../Pages/MyJobs/ActiveJobDetails/ActiveJobDetails";
import { InterviewInvitation, OfferInvitation } from "../Pages/Invitation";

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
                <Route exact path="/search-job" element={<SearchPage />} />
                <Route exact path="/verify-email" element={<VerifySuccess />} />
                <Route exact path="/message" element={<Message />} />
                <Route exact path="/freelancer" element={<Profile />} />
                <Route exact path="/freelancer/:id" element={<Profile />} />
                <Route exact path="/client" element={<Profile />} />
                <Route exact path="/client/:id" element={<Profile />} />
                <Route exact path="/userprofile-setting" element={<ProfileSetting />} />
                <Route exact path='/tracker' element={<TimeTracker />} />
                <Route exact path="/client-dashboard" element={<ClientDashBoard />} />
                <Route exact path="/client-jobdetails" element={<ClientJobPostView />} />
                <Route exact path="/client-jobdetails/:id" element={<ClientJobPostView />} />
                <Route exact path="/my-stats" element={<Report />} />
                <Route exact path="/message/invitation" element={<InterviewInvitation />} />
                <Route exact path="/message/offer" element={<OfferInvitation />} />
                <Route exact path="/submit-review/:id" element={<Review />} />
                <Route exact path="/my-jobs" element={<MyJobPage />} />
                <Route exact path="/active-job/submit/:id" element={<EndContract />} />
                <Route exact path="/endcotract/:id" element={<EndContract />} />
            </Routes>
        </BrowserRouter>
    )
};

export default Router;
