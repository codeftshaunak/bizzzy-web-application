import { createContext, useContext, useMemo, useState } from "react";

export const FormContext = createContext({
  formState: {},
  insertToFormState: (v) => {},
});

export const useFormState = () => useContext(FormContext);

export const FormStateProvider = ({ children }) => {
  const [formState, setFormState] = useState({});

  const insertToFormState = (v) => {
    if (!v) return formState;
    const newState = { ...formState, ...v };
    setFormState(newState);
    return newState;
  };

  const value = useMemo(
    () => ({
      formState,
      insertToFormState,
    }),
    [formState]
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
