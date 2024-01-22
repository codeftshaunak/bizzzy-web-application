import {
  Button,
  Checkbox,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import * as yup from "yup";
import { GigCreateLayout } from "../GigCreate";

// validation schema
const schema = yup.object().shape({
  // title: yup.string().required("Title is required"),
  // Define validation rules for other fields if needed
});

// default values for the step
const defaultValues = {
  project_description: {
    project_summary: "",
    faqs: [],
  },
  terms: false,
  privacy_notice: false,
};

const Step4 = ({ submitCallback, onBack, afterSubmit }) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control, setValue } = methods;

  const { fields: faqFields, append: appendFaq } = useFieldArray({
    control,
    name: "faqs",
  });

  const addFaq = () => {
    appendFaq({ question: "", answer: "" });
  };

  // form submit operations
  const onSubmit = (values) => {
    submitCallback(values); // this will update the parent state
    afterSubmit(); // this will perform task after updating the state
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GigCreateLayout
          title={"Project description"}
          forwardBtnText="Submit now"
          onBackward={onBack}
        >
          <VStack alignItems={"start"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Project Summary
            </label>
            <p>
              Tell the client what you are going to deliver and how it&apos;ll
              benefit them.
            </p>
            <Controller
              name="project_description.project_summary"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="You will get a fantastic deliverable that drives impact"
                  marginTop={"5px"}
                />
              )}
            />
          </VStack>

          <VStack alignItems={"start"} width={"100%"}>
            <label
              htmlFor="fileInput"
              className="text-[1.7rem] font-[600] pb-0 mb-0"
            >
              Frequently asked questions (optional)
            </label>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            <VStack width={"100%"}>
              {faqFields.map((faq, index) => (
                <VStack
                  key={index}
                  alignItems={"start"}
                  width={"100%"}
                  backgroundColor={"var(--secondarycolor)"}
                  padding={"2rem 1.5rem"}
                  marginTop={"1rem"}
                  className="shadow-md rounded-md"
                >
                  <label htmlFor="" className="font-semibold">
                    Question
                  </label>
                  <Controller
                    name={`project_description.faqs[${index}].question`}
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Enter the question"
                        marginTop={"5px"}
                      />
                    )}
                  />
                  <label htmlFor="" className="font-semibold">
                    Answer
                  </label>
                  <Controller
                    name={`project_description.faqs[${index}].answer`}
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Enter the answer"
                        marginTop={"5px"}
                      />
                    )}
                  />
                </VStack>
              ))}
            </VStack>
            <HStack width={"100%"}>
              <Button
                color="#16a34a"
                fontWeight={"600"}
                cursor={"pointer"}
                padding={"1rem 0"}
                backgroundColor={"transparent"}
                onClick={() => addFaq()}
                _hover={{
                  backgroundColor: "transparent",
                }}
              >
                <FiPlus size={"1.3rem"} /> <Text>Add a step</Text>
              </Button>
            </HStack>
          </VStack>

          <VStack alignItems={"start"} width={"100%"}>
            <label
              htmlFor="fileInput"
              className="text-[1.7rem] font-[600] pb-0 mb-0"
            >
              Terms of Service
            </label>
            <HStack width={"100%"}>
              <Checkbox
                colorScheme="green"
                size="lg"
                onChange={(e) => {
                  setValue("terms", e.target.checked);
                }}
              ></Checkbox>
              <Text fontSize={"0.9rem"}>
                I understand and agree to the{" "}
                <strong>Bizzzy Terms of Service</strong>, including the{" "}
                <strong>User Agreement</strong> and{" "}
                <strong>Privacy Policy</strong>
              </Text>
            </HStack>
          </VStack>

          <VStack alignItems={"start"} width={"100%"}>
            <label
              htmlFor="fileInput"
              className="text-[1.7rem] font-[600] pb-0 mb-0"
            >
              Privacy Notice
            </label>
            <HStack width={"100%"}>
              <Checkbox
                colorScheme="green"
                size="lg"
                onChange={(e) => {
                  setValue("privacy_notice", e.target.checked);
                }}
              ></Checkbox>
              <Text fontSize={"0.9rem"}>
                By submitting the project and activating it, Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Vitae, labore. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                deleniti.
              </Text>
            </HStack>
          </VStack>
        </GigCreateLayout>
      </form>
    </FormProvider>
  );
};

export default Step4;