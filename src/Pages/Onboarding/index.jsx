import HomeLayout from "../../Layouts/HomeLayout";
import Process from "./Process";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const {
    description,
    skills,
    professional_role,
    briefDescription,
    businessName,
  } = state.profile.profile;
  const isAuth = state?.auth?.authtoken.length > 10;
  const role = state?.auth?.role;
  const isClient = briefDescription && businessName;
  const isFreelancer = description && skills.length > 0 && professional_role;
  const isComplete = role === 2 ? isClient : isFreelancer;
  if (isComplete) navigate("/");
  return <HomeLayout>{isAuth && !isComplete && <Process />}</HomeLayout>;
};

export default Onboarding;
