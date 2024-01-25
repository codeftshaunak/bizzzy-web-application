import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import { getGigDetails, updateFreelancerGig } from "../../helpers/gigApis";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const GigUpdate = ({
  activeStep,
  setActiveStep,
  goBackward,
  goForward,
  setIsEdit,
}) => {
  return (
    <GigOverview
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      goBackward={goBackward}
      goForward={goForward}
      setIsEdit={setIsEdit}
    />
  );
};

export const GigOverview = ({
  activeStep,
  goForward,
  goBackward,
  setIsEdit,
}) => {
  const [gigData, setGigData] = useState({});
  const [formData, setFormData] = useState({});
  const toast = useToast();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { id } = useParams();

  // update form data with previous data
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const gigDetails = async () => {
    try {
      const response = await getGigDetails(id);
      const updatedData = {
        ...response.body[0],
        skills:
          response.body[0].skills?.map((item) => ({
            value: item,
            label: item,
          })) || [],
      };
      setGigData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gigDetails();
  }, []);

  const handleCreateGig = useCallback(async () => {
    // Transform data to the desired format
    const transformedData = {
      _id: gigData._id,
      title: formData.title,
      category: formData.category?.category_id,
      sub_category: formData.sub_category._id,
      skills: formData.skills.map((skill) => skill.label),
      pricing: {
        custom_title: formData.pricing.custom_title,
        custom_description: formData.pricing.custom_description,
        service_price: parseInt(formData.pricing.service_price),
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
    try {
      const response = await updateFreelancerGig(transformedData);
      if (response?.code === 200) {
        toast({
          title: response.msg,
          duration: 3000,
          isClosable: true,
          colorScheme: "green",
          position: "top-right",
        });
        if (path === "/freelancer/gig/edit") {
          navigate("/freelancer");
        } else {
          setIsEdit(false);
        }
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [formData]);

  const firstPageGoBackward = () => {
    navigate(-1);
  };

  return (
    <div className="w-[90%] pb-10">
      {activeStep === 0 && (
        <Step0
          afterSubmit={goForward}
          onBack={firstPageGoBackward}
          submitCallback={updateFormData}
          formValues={gigData}
        />
      )}
      {activeStep === 1 && (
        <Step1
          afterSubmit={goForward}
          onBack={goBackward}
          submitCallback={updateFormData}
          formValues={gigData}
        />
      )}
      {activeStep === 2 && (
        <Step2
          afterSubmit={goForward}
          onBack={goBackward}
          submitCallback={updateFormData}
          formValues={gigData}
        />
      )}{" "}
      {activeStep === 3 && (
        <Step3
          afterSubmit={goForward}
          onBack={goBackward}
          submitCallback={updateFormData}
          formValues={gigData}
        />
      )}
      {activeStep === 4 && (
        <Step4
          afterSubmit={handleCreateGig}
          onBack={goBackward}
          submitCallback={updateFormData}
          formValues={gigData}
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
