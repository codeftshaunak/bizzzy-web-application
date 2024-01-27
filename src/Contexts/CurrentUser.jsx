<<<<<<< HEAD
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

  const getUserProfile = async () => {
    const resp = await getAllDetailsOfUser();
    dispatch(profileData({ profile: resp }));
  };

  const getAgencyDetails = async () => {
    const response = await getAgency();
    dispatch(agencyData({ agency: response }));
  }

  useEffect(() => {
    getUserProfile();
    getAgencyDetails()
  }, []);

  return (
    <CurrentUserContext.Provider value={{ profile, agency, hasAgency, activeAgency }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserProvider, CurrentUserContext };
=======
import { createContext } from "react";
import { useSelector } from "react-redux";

const CurrentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const profile = useSelector((state) => state.profile);

  return (
    <CurrentUserContext.Provider value={profile}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserProvider, CurrentUserContext };
>>>>>>> parent of db37502 (seperating the git create steps)
