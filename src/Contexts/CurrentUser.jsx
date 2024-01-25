import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDetailsOfUser } from "../helpers/userApis";
import { agencyData, profileData } from "../redux/authSlice/profileSlice";
import { getAgency } from '../helpers/agencyApis';

const CurrentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const agency = useSelector((state) => state.profile.agency);

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
    <CurrentUserContext.Provider value={profile} agency={agency}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserProvider, CurrentUserContext };
