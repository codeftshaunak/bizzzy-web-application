import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const location = useLocation();
<<<<<<< HEAD
  const auth = useSelector((state) => state?.auth?.authtoken.length > 10);
=======
  const auth = useSelector((state) => state?.auth?.authtoken.length > 10); //dummy checking purpose
>>>>>>> parent of db37502 (seperating the git create steps)

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
