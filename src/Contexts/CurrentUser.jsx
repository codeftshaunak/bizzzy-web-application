import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDetailsOfUser } from "../helpers/userApis";
import { useCookies } from "react-cookie";
import { agencyData, profileData } from "../redux/authSlice/profileSlice";
import { getAgency } from '../helpers/agencyApis';
const CurrentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const agency = useSelector((state) => state.profile.agency);
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const activeAgency = cookies.activeagency;
  const hasAgency = profile?.profile?.agency_profile;

  const getUserDetails = async () => {
    const resp = await getAllDetailsOfUser();
    dispatch(profileData({ profile: resp }));
    const response = await getAgency();
    dispatch(agencyData({ agency: response }));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ profile, agency, hasAgency, activeAgency, getUserDetails }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserProvider, CurrentUserContext };
