import React, { useCallback, useState } from "react";
import Complete from "../../Components/JobCreate/Completed";
import FinalStep from "../../Components/JobCreate/FinalStep";
import FirstStep from "../../Components/JobCreate/FirstStep";
import SecondStep from "../../Components/JobCreate/SecondStep";
import { FormStateProvider, useFormState } from "../../Contexts/FormContext";
import HomeLayout from "../../Layouts/HomeLayout";

const JobPost = () => {
  const [step, setStep] = useState(1);
  const { formState } = useFormState();

  const onSubmit = useCallback(() => {
    console.log(formState);
  }, [formState]);

  return (
    <HomeLayout displaydir="row">
      <FormStateProvider>
        {step === 1 && <FirstStep setStep={setStep} />}
        {step === 2 && <SecondStep setStep={setStep} />}
        {step === 3 && <FinalStep setStep={setStep} onCallback={onSubmit} />}
        {step === 4 && <Complete setStep={setStep} />}
      </FormStateProvider>
    </HomeLayout>
  );
};

export default JobPost;
