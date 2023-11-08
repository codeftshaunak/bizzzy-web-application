import { HStack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import Complete from "../../Components/JobCreate/Completed";
import FinalStep from "../../Components/JobCreate/FinalStep";
import FirstStep from "../../Components/JobCreate/FirstStep";
import Preview from "../../Components/JobCreate/Preview";
import SecondStep from "../../Components/JobCreate/SecondStep";
import Steps from "../../Components/JobCreate/Steps";
import { FormStateProvider } from "../../Contexts/FormContext";
import HomeLayout from "../../Layouts/HomeLayout";
import { createJob } from "../../helpers/jobApis";

const JobPost = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);

  const onSubmit = async (data) => {
    // format data for sending to the server
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // create the job using form state
    const response = await createJob(formData);

    console.log(response);

    if (response) {
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
        <HStack
          justifyContent={"space-around"}
          width={"full"}
          alignItems={"flex-start"}
        >
          <Steps step={step} setStep={setStep} />
          {step === 1 && <FirstStep setStep={setStep} />}
          {step === 2 && <SecondStep setStep={setStep} />}
          {step === 3 && <FinalStep setStep={setStep} onCallback={onSubmit} />}
          {step === 4 && <Complete setStep={setStep} />}
          <Preview />
        </HStack>
      </FormStateProvider>
    </HomeLayout>
  );
};

export default JobPost;
