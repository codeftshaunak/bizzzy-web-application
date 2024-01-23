import { Checkbox, HStack, Input, Textarea, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { GigCreateLayout } from "../GigCreate";
import { useSelector } from "react-redux";

// validation schema
const schema = yup.object().shape({
  // title: yup.string().required("Title is required"),
  // Define validation rules for other fields if needed
});

// default values for the step
const defaultValues = {
  pricing: {
    custom_title: "",
    custom_description: "",
    delivery_days: 0,
    revisions: 0,
    service_options: [],
  },
};

const Step1 = ({ submitCallback, onBack, afterSubmit, formValues }) => {
  // const editableData = useSelector((state) => state?.freelancer?.editableGig);
  // const { } = editableData.data;
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control, setValue, reset } = methods;

  // form submit operations
  const onSubmit = (values) => {
    submitCallback(values); // this will update the parent state
    afterSubmit(); // this will perform task after updating the state
  };

  // load state
  useEffect(() => {
    const changes = defaultValues;

    Object.keys(defaultValues).map((key) => {
      const value = formValues?.[key];

      if (value) changes[key] = value;
    });

    reset(changes);
  }, [formValues, reset]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GigCreateLayout title={"Gig Price & Scope"} onBackward={onBack}>
          <VStack alignItems={"start"}>
            <label htmlFor="" className="text-2xl font-[600] pb-0">
              Create pricing tiers
            </label>
            <br />
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Custom Title
            </label>
            <Controller
              name="pricing.custom_title"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Web Application"
                  marginTop={"5px"}
                />
              )}
            />
            <p className="text-right w-full">0/30 characters</p>
          </VStack>

          <VStack alignItems={"start"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Custom Description
            </label>
            <Controller
              name="pricing.custom_description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Web Application"
                  marginTop={"5px"}
                />
              )}
            />
            <p className="text-right w-full">0/80 characters</p>
          </VStack>

          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Delivery Days
            </label>
            <Controller
              name="pricing.delivery_days"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  {...field}
                  marginTop={"5px"}
                  placeholder="3"
                  width={"50%"}
                />
              )}
            />
          </HStack>

          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Number Of Revisions
            </label>
            <Controller
              name="pricing.revisions"
              control={control}
              render={({ field }) => (
                <select {...field} className="w-[50%] py-2 px-3 border">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              )}
            />
          </HStack>

          {/* Checkbox for each service option */}
          <VStack alignItems={"start"} width={"100%"}>
            <label htmlFor="" className="text-2xl font-[600] pb-0 mb-4">
              Services Options
            </label>
            <Checkbox
              colorScheme="green"
              size="lg"
              onChange={(e) => {
                setValue(
                  "pricing.service_options.design_customization",
                  e.target.checked
                );
              }}
            >
              Design Customization
            </Checkbox>
            <Checkbox
              colorScheme="green"
              size="lg"
              onChange={(e) => {
                setValue(
                  "pricing.service_options.content_upload",
                  e.target.checked
                );
              }}
            >
              Content Upload
            </Checkbox>
            <Checkbox
              colorScheme="green"
              size="lg"
              onChange={(e) => {
                setValue(
                  "pricing.service_options.responsive_design",
                  e.target.checked
                );
              }}
            >
              Responsive Design
            </Checkbox>
            <Checkbox
              colorScheme="green"
              size="lg"
              onChange={(e) => {
                setValue(
                  "pricing.service_options.source_code",
                  e.target.checked
                );
              }}
            >
              Source Code
            </Checkbox>
          </VStack>
        </GigCreateLayout>
      </form>
    </FormProvider>
  );
};

export default Step1;
