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
