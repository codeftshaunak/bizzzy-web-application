import { Button, HStack, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { createGig } from "../../helpers/freelancerApis";
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import { useNavigate } from "react-router-dom";
import { uploadImages, uploadMedia } from "../../helpers/gigApis";

export const GigCreate = ({ activeStep, goForward, goBackward }) => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    // update form data with previous data
    const updateFormData = useCallback(
        (newData) => {
            const data = { ...formData, ...newData };
            setFormData((prev) => ({ ...prev, ...newData }));
            return data;
        },
        [formData]
    );

    const handleUpload = useCallback(async () => {
        const uploadResponse = {};
        if (formData?.images?.length) {
            // prepare form data for file uploading
            const imagesFormData = new FormData();
            formData.images.forEach((sf) => {
                if (!sf.file) return;
                imagesFormData.append(`imageFiles`, sf.file);
            });
            try {
                const response = await uploadImages(imagesFormData);
                console.log("Image upload response:", response);
                uploadResponse.images = response?.body;
            } catch (error) {
                console.error("Error uploading images:", error);
            }
        }

        if (formData.video && formData.video?.file) {
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

    const handleCreateGig = async (data) => {
        // Transform data to the desired format
        const transformedData = {
            title: data.title,
            category: data.category.category_id,
            sub_category: data.sub_category._id,
            skills: data.skills.map((skill) => skill.label),
            pricing: {
                custom_title: data.pricing.custom_title,
                custom_description: data.pricing.custom_description,
                service_price: parseInt(data.pricing.service_price),
                delivery_days: parseInt(data.pricing.delivery_days),
                revisions: parseInt(data.pricing.revisions),
                service_options: data.pricing.service_options,
            },
            images: data.images || [],
            video: data.video || "",
            requirements: data.requirements || [],
            steps: data.steps || [],
            project_description: {
                project_summary: data?.project_description?.project_summary,
                faqs: data?.project_description?.faqs,
            },
            terms: data.terms,
            privacy_notice: data.privacy_notice,
        };

        try {
            const mediaResponse = await handleUpload();
            if (mediaResponse.images) {
                const response = await createGig({
                    ...transformedData,
                    images: mediaResponse.images,
                    video: mediaResponse.video,
                });
                console.log({ mediaResponse, response });
                navigate(-1);
            }
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
                    formValues={formData}
                />
            )}
            {activeStep === 1 && (
                <Step1
                    afterSubmit={goForward}
                    onBack={goBackward}
                    submitCallback={updateFormData}
                    formValues={formData}
                />
            )}
            {activeStep === 2 && (
                <Step2
                    afterSubmit={goForward}
                    onBack={goBackward}
                    submitCallback={updateFormData}
                    formValues={formData}
                />
            )}{" "}
            {activeStep === 3 && (
                <Step3
                    afterSubmit={goForward}
                    onBack={goBackward}
                    submitCallback={updateFormData}
                    formValues={formData}
                />
            )}
            {activeStep === 4 && (
                <Step4
                    afterSubmit={handleCreateGig}
                    onBack={goBackward}
                    submitCallback={updateFormData}
                    formValues={formData}
                />
            )}
        </div>
    );
};

export const GigCreateLayout = ({
    children,
    title,
    onBackward = () => { },
    onForward = () => { },
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
