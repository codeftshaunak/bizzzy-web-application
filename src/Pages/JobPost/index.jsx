import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import Complete from "../../Components/JobCreate/Completed";
import FinalStep from "../../Components/JobCreate/FinalStep";
import FirstStep from "../../Components/JobCreate/FirstStep";
import SecondStep from "../../Components/JobCreate/SecondStep";
import { FormStateProvider } from "../../Contexts/FormContext";
import HomeLayout from "../../Layouts/HomeLayout";
import { createJob } from "../../helpers/jobApis";

const JobPost = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);

  const onSubmit = async (data) => {
    const response = await createJob(data);

    if (response.code === 200) {
      toast({
        title: "Job post created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setStep(4);
    } else {
      toast({
        title: "Failed to create job post!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

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
