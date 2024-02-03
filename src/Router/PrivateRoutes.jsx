import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const location = useLocation();
  const state = useSelector((state) => state);
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

  return isAuth ? (
    isComplete ? (
      <Outlet />
    ) : (
      <Navigate to="/onboarding" />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
