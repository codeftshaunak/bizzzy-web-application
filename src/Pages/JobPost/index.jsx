import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import Complete from "../../Components/JobCreate/Completed";
import FinalStep from "../../Components/JobCreate/FinalStep";
import FirstStep from "../../Components/JobCreate/FirstStep";
import SecondStep from "../../Components/JobCreate/SecondStep";
import HomeLayout from "../../Layouts/HomeLayout";

const schema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.string(),
  type: z.string(),
  amount: z.number(),
  experience: z.string(),
  duration: z.string(),
});

const JobPost = () => {
  const [step, setStep] = useState(1);

  const methods = useForm({
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (values) => {
    console.log(values);
    setStep(4);
  };

  return (
    <HomeLayout displaydir="row">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && <FirstStep setStep={setStep} />}
          {step === 2 && <SecondStep setStep={setStep} />}
          {step === 3 && <FinalStep setStep={setStep} />}
          {step === 4 && <Complete setStep={setStep} />}
        </form>
      </FormProvider>
    </HomeLayout>
  );
};

export default JobPost;
