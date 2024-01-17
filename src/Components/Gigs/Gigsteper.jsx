import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Box,
  StepSeparator,
  StepStatus,
  Text,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { GigCreate } from "./GigCreate";
import { useCallback } from "react";
const steps = [
  { title: "Overview", description: "Contact Info" },
  { title: "Pricing", description: "Date & Time" },
  { title: "Gallery", description: "Select Rooms" },
  { title: "Requirement & Steps", description: "Select Rooms" },
  { title: "Description & Review", description: "Select Rooms" },
];

export const GigSteper = ({ activeStep }) => {
  return (
    <Stepper
      size="lg"
      index={activeStep}
      colorScheme="green"
      width={"90%"}
      justifyContent={"center"}
      textAlign={"center"}
      alignItems={"center"}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <Box>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Text className="absolute pt-2 text-[0.9rem]">{step.title}</Text>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export const CreateWithStepper = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  //   move step backward
  const goBackward = useCallback(() => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  }, [activeStep, setActiveStep]);
  // move step forward
  const goForward = useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep]);

  return (
    <>
      <GigSteper activeStep={activeStep} />
      <GigCreate
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        goBackward={goBackward}
        goForward={goForward}
      />
    </>
  );
};
