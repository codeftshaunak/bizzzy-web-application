import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import {
  getGigDetails,
  updateFreelancerGig,
  uploadImages,
  uploadMedia,
} from "../../helpers/gigApis";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const GigUpdate = ({ activeStep, goForward, goBackward, setIsEdit }) => {
  const [gigData, setGigData] = useState({});
  const [formData, setFormData] = useState({});
  const toast = useToast();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { id } = useParams();

  // update form data with previous data
  const updateFormData = useCallback(
    (newData) => {
      const data = { ...formData, ...newData };
      setFormData((prev) => ({ ...prev, ...newData }));
      return data;
    },
    [formData]
  );

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
        images:
          response.body[0].images?.map((item) => ({ preview: item })) || [],
        video: { preview: response.body[0].video || "" },
      };
      setGigData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gigDetails();
    console.log("click");
  }, []);

  const handleUpload = useCallback(async () => {
    const uploadResponse = {};
    // check existing uploaded or new images
    const existUploaded = formData.images
      .filter((item) => !item.hasOwnProperty("file"))
      .map((item) => item.preview);
    uploadResponse.images = existUploaded;
    const readyToUpload = formData.images.filter((item) =>
      item.hasOwnProperty("file")
    );

    console.log({ existUploaded, readyToUpload, uploadResponse });
    if (readyToUpload.length > 0) {
      // prepare form data for file uploading
      const imagesFormData = new FormData();

      readyToUpload.forEach((sf) => {
        if (sf.file) {
          imagesFormData.append("imageFiles", sf.file);
        }
      });

      try {
        const response = await uploadImages(imagesFormData);
        console.log("Image upload response:", response);

        // Assuming the response has a "body" property containing uploaded images
        uploadResponse.images = [
          ...uploadResponse.images,
          ...(response?.body || []),
        ];
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }

    if (formData.video?.file) {
      // prepare uploading form state
      const videoFormData = new FormData();
      videoFormData.append("videoFile", formData.video.file);

      try {
        const response = await uploadMedia(videoFormData);
        console.log("Video upload response:", response);
        uploadResponse.video = response?.body;
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    }

    return uploadResponse;
  }, [formData.images, formData.video]);

  const handleUpdateGig = async (data) => {
    console.log({ data });
    // Transform data to the desired format
    const transformedData = {
      _id: gigData._id,
      title: data?.title,
      category: data?.category?.category_id,
      sub_category: data?.sub_category._id,
      skills: data?.skills.map((skill) => skill.label),
      pricing: {
        custom_title: data?.pricing.custom_title,
        custom_description: data?.pricing.custom_description,
        service_price: parseInt(data?.pricing.service_price),
        delivery_days: parseInt(data?.pricing.delivery_days),
        revisions: parseInt(data?.pricing.revisions),
        service_options: data?.pricing.service_options,
      },
      images: data?.images || [],
      video: data?.video || "",
      requirements: data?.requirements || [],
      steps: data?.steps || [],
      project_description: {
        project_summary: data?.project_description?.project_summary,
        faqs: data?.project_description?.faqs,
      },
      terms: data?.terms,
      privacy_notice: data?.privacy_notice,
    };
    console.log(transformedData);
    try {
      const mediaResponse = await handleUpload();

      const response = await updateFreelancerGig({
        ...transformedData,
        images: mediaResponse.images,
        video: mediaResponse.video,
      });
      if (response?.code === 200) {
        toast({
          title: response.msg,
          duration: 3000,
          isClosable: true,
          colorScheme: "green",
          position: "top-right",
        });
        navigate(-1);
        setIsEdit(false);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
          afterSubmit={handleUpdateGig}
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
