import { createContext, useContext, useMemo, useState } from "react";

export const FormContext = createContext({
  formState: {},
  insertToFormState: (v) => {},
});

export const useFormState = () => useContext(FormContext);

export const FormStateProvider = ({ children }) => {
  const [formState, setFormState] = useState({});

  const insertToFormState = (v) => {
    if (!v) return;
    setFormState((prev) => ({ ...prev, ...v }));
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
