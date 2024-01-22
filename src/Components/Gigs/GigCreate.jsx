import { Button, HStack, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { createGig } from "../../helpers/freelancerApis";
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";

export const GigCreate = ({
  activeStep,
  setActiveStep,
  goBackward,
  goForward,
}) => {
  return (
    <GigOverview
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      goBackward={goBackward}
      goForward={goForward}
    />
  );
};

export const GigOverview = ({ activeStep, goForward, goBackward }) => {
  const [formData, setFormData] = useState({});

  // update form data with previous data
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleCreateGig = useCallback(async () => {
    // Transform data to the desired format
    const transformedData = {
      title: formData.title,
      category: formData.category.category_id,
      skills: formData.skills.map((skill) => skill.label),
      pricing: {
        custom_title: formData.pricing.custom_title,
        custom_description: formData.pricing.custom_description,
        delivery_days: parseInt(formData.pricing.delivery_days),
        revisions: parseInt(formData.pricing.revisions),
        service_options: formData.pricing.service_options,
      },
      images: formData.images || [],
      video: formData.video || "",
      requirements: formData.requirements || [],
      steps: formData.steps || [],
      project_description: {
        project_summary: formData?.project_description?.project_summary,
        faqs: formData?.project_description?.faqs,
      },
      terms: formData.terms,
      privacy_notice: formData.privacy_notice,
    };
    console.log(transformedData);
    const response = await createGig(transformedData);
    console.log(response);
  }, [formData]);

  return (
    <div className="w-[90%] pb-10">
      {activeStep === 0 && (
        <Step0
          afterSubmit={goForward}
          onBack={goBackward}
          submitCallback={updateFormData}
        />
      )}
      {activeStep === 1 && (
        <Step1
          afterSubmit={goForward}
          onBack={goBackward}
          submitCallback={updateFormData}
        />
      )}
      {activeStep === 2 && (
        <Step2
          afterSubmit={goForward}
          onBack={goBackward}
          submitCallback={updateFormData}
        />
      )}{" "}
      {activeStep === 3 && (
        <Step3
          afterSubmit={goForward}
          onBack={goBackward}
          submitCallback={updateFormData}
        />
      )}
      {activeStep === 4 && (
        <Step4
          afterSubmit={handleCreateGig}
          onBack={goBackward}
          submitCallback={updateFormData}
        />
      )}
    </div>
  );
};

export const GigCreateLayout = ({
  children,
  title,
  onBackward = () => {},
  onForward = () => {},
  backwardBtnText = "Back",
  forwardBtnText = "Save & Continue",
}) => {
  return (
    <div className="w-[60%]">
      <Text fontSize={"2.5rem"} fontWeight={"600"} textAlign={"left"}>
        {title}
      </Text>
      <br />
      <div className="w-full flex flex-col gap-5">{children}</div>
      <HStack marginTop={"1rem"}>
        <Button
          className="mt-3 border"
          backgroundColor={"white"}
          height={"34px"}
          fontWeight={"400"}
          borderRadius={"25px"}
          border={"2px solid  var(--primarytextcolor)"}
          transition={"0.3s ease-in-out"}
          _hover={{
            color: "white",
            backgroundColor: "var(--primarytextcolor)",
          }}
          onClick={onBackward}
        >
          {backwardBtnText}
        </Button>
        <Button
          type="submit"
          className="mt-3 border"
          backgroundColor={"var(--primarytextcolor)"}
          color={"white"}
          height={"34px"}
          fontWeight={"400"}
          borderRadius={"25px"}
          border={"2px solid  var(--primarytextcolor)"}
          transition={"0.3s ease-in-out"}
          _hover={{
            color: "black",
            backgroundColor: "white",
          }}
          onClick={onForward}
        >
          {forwardBtnText}
        </Button>
      </HStack>
    </div>
  );
};