import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDetailsOfUser } from "../helpers/userApis";
import { useCookies } from "react-cookie";
import { agencyData, profileData } from "../redux/authSlice/profileSlice";
import { getAgency } from "../helpers/agencyApis";
const CurrentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const agency = useSelector((state) => state.profile.agency);
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const [userAgencyLoading, setUserAgencyLoading] = useState(false);
  const activeAgency = cookies.activeagency;
  const hasAgency = profile?.profile?.agency_profile;

  const getUserDetails = async () => {
    try {
      setUserAgencyLoading(true);
      const resp = await getAllDetailsOfUser();
      dispatch(profileData({ profile: resp }));
      const response = await getAgency();
      dispatch(agencyData({ agency: response }));
      setUserAgencyLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        profile,
        agency,
        hasAgency,
        activeAgency,
        getUserDetails,
        userAgencyLoading,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserProvider, CurrentUserContext };
