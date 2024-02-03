import { BrowserRouter, Route, Routes } from "react-router-dom";
import Onboarding from "../Pages/Onboarding";
import Login from "../Pages/Login";
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
import GigDetails from "../Components/Gigs/GigDetails/GigDetails";
import GigEdit from "../Components/Gigs/GigEdit/GigEdit";
import GigCreate from "../Components/Gigs/GigCreate/GigCreate";
import NotFound from "../Pages/404/NotFound";
import AgencyInvitation from "../Pages/Invitation/AgencyInvitation";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifySuccess />} />
        <Route path="/search-freelancers" element={<SearchFreelancers />} />
        <Route path="/search-job" element={<SearchPage />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/create-job" element={<JobPost />} />
          <Route path="/search-talent" element={<SearchTalents />} />
          <Route path="/freelancer/:id" element={<Profile />} />
          <Route path="/agency-build" element={<AgencyBuild />} />
          <Route path="/agency-dashboard" element={<Agency />} />
          <Route path="/agency/invitation" element={<AgencyInvitation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/find-job" element={<FindJob />} />
          <Route path="/find-job/:id" element={<ApplyJob />} />
          <Route exact path="/message" element={<Message />} />
          <Route exact path="/freelancer/gig" element={<Gig />} />
          <Route exact path="/freelancer/gig/create" element={<GigCreate />} />
          <Route
            exact
            path="/freelancer/gig/details/:id"
            element={<GigDetails />}
          />
          <Route exact path="/freelancer/gig/edit/:id" element={<GigEdit />} />
          <Route exact path="/client" element={<Profile />} />
          <Route exact path="/client/:id" element={<Profile />} />
          <Route
            path="/client/hire/:freelancer_id"
            element={<HireFreelancer />}
          />
          <Route path="/userprofile-setting" element={<ProfileSetting />} />
          <Route path="/tracker" element={<TimeTracker />} />
          <Route path="/client-dashboard" element={<ClientDashBoard />} />
          <Route path="/client-jobdetails" element={<ClientJobPostView />} />
          <Route
            path="/client-jobdetails/:id"
            element={<ClientJobPostView />}
          />
          <Route path="/my-stats" element={<Report />} />
          <Route path="/message/invitation" element={<InterviewInvitation />} />
          <Route path="/message/offer" element={<OfferInvitation />} />
          <Route path="/submit-review/:job_id" element={<Review />} />
          <Route path="/end-contract/:job_id" element={<Review />} />
          <Route path="/my-jobs" element={<MyJobPage />} />
          <Route path="/active-job/submit/:id" element={<EndContract />} />
          <Route path="/endcotract/:id" element={<EndContract />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
