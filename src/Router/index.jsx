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
import Review from "../Pages/Review";
import EndContract from "../Pages/MyJobs/ActiveJobDetails/ActiveJobDetails";
import { InterviewInvitation, OfferInvitation } from "../Pages/Invitation";
import HireFreelancer from "../Pages/HireFreelancer";
import PrivateRoutes from "./PrivateRoutes";
import SearchFreelancers from "../Pages/SearchFreelancers";
import Gig from "../Components/Gigs/index";
import Agency from "../Pages/Agency";
import { SearchTalents } from "../Components/Search/SearchTalent";
import AgencyBuild from "../Pages/Agency/AgencyBuild";
import AgencyProfilePage from "../Pages/Agency/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/verify-email" element={<VerifySuccess />} />

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route exact path="/onboarding" element={<Onboarding />} />
          <Route exact path="/create-job" element={<JobPost />} />
          <Route exact path="/find-job" element={<FindJob />} />
          <Route exact path="/find-job/:id" element={<ApplyJob />} />
          <Route exact path="/search-job" element={<SearchPage />} />
          <Route exact path="/search-talent" element={<SearchTalents />} />
          <Route
            exact
            path="/search-freelancers"
            element={<SearchFreelancers />}
          />

          <Route exact path="/agency-build" element={<AgencyBuild />} />
          <Route exact path="/agency-profile" element={<AgencyProfilePage />} />
          <Route exact path="/agency-dashboard" element={<Agency />} />

          <Route exact path="/message" element={<Message />} />
          <Route exact path="/freelancer" element={<Profile />} />
          <Route exact path="/freelancer/:id" element={<Profile />} />
          <Route exact path="/freelancer/gig" element={<Gig />} />
          <Route exact path="/client" element={<Profile />} />
          <Route exact path="/client/:id" element={<Profile />} />
          <Route
            exact
            path="/client/hire/:freelancer_id"
            element={<HireFreelancer />}
          />
          <Route
            exact
            path="/userprofile-setting"
            element={<ProfileSetting />}
          />
          <Route exact path="/tracker" element={<TimeTracker />} />
          <Route exact path="/client-dashboard" element={<ClientDashBoard />} />
          <Route
            exact
            path="/client-jobdetails"
            element={<ClientJobPostView />}
          />
          <Route
            exact
            path="/client-jobdetails/:id"
            element={<ClientJobPostView />}
          />
          <Route exact path="/my-stats" element={<Report />} />
          <Route
            exact
            path="/message/invitation"
            element={<InterviewInvitation />}
          />
          <Route exact path="/message/offer" element={<OfferInvitation />} />
          <Route exact path="/submit-review/:job_id" element={<Review />} />
          <Route exact path="/end-contract/:job_id" element={<Review />} />
          <Route exact path="/my-jobs" element={<MyJobPage />} />
          <Route
            exact
            path="/active-job/submit/:id"
            element={<EndContract />}
          />
          <Route exact path="/endcotract/:id" element={<EndContract />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
