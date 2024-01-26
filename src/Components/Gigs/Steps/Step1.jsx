import { Checkbox, HStack, Input, Textarea, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { GigCreateLayout } from "../GigCreate";

// validation schema
const schema = yup.object().shape({
  pricing: yup.object().shape({
    custom_title: yup.string().label("Pricing Title").required(),
    custom_description: yup.string().label("Description").required(),
    service_price: yup.number().label("Service Price").required().default(0),
    delivery_days: yup.number().label("Delivery Days").required().default(0),
    revisions: yup.number().label("Revisions").required().default(1),
    service_options: yup
      .object()
      .shape({
        design_customization: yup.boolean(),
        content_upload: yup.boolean(),
        responsive_design: yup.boolean(),
        source_code: yup.boolean(),
      })
      .test(
        "atLeastOneRequired",
        "Please select at least one service option.",
        (value) => {
          return Object.values(value).some((option) => option === true);
        }
      ),
  }),
});

// default values for the step
const defaultValues = {
  pricing: {
    custom_title: "",
    custom_description: "",
    service_price: 10,
    delivery_days: 2,
    revisions: 1,
    service_options: {
      design_customization: false,
      content_upload: false,
      responsive_design: false,
      source_code: false,
    },
  },
};

const Step1 = ({ submitCallback, onBack, afterSubmit, formValues }) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = methods;
  console.log({ errors });
  // form submit operations
  const onSubmit = (values) => {
    submitCallback(values); // this will update the parent state
    afterSubmit(); // this will perform task after updating the state
  };

  // load state
  useEffect(() => {
    const changes = defaultValues;
    console.log("click");
    Object.keys(defaultValues).map((key) => {
      const value = formValues?.[key];
      changes[key] = value === undefined ? defaultValues[key] : value;
    });
    console.log({ changes });
    reset(changes);
  }, [formValues]);
  console.log({ formValues });
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
              render={({ field, fieldState }) => (
                <>
                  <Textarea
                    {...field}
                    placeholder="Web Application"
                    marginTop={"5px"}
                  />
                  {fieldState.error && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {fieldState.error.message}
                    </p>
                  )}
                </>
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
              render={({ field, fieldState }) => (
                <>
                  <Textarea
                    {...field}
                    placeholder="Web Application"
                    marginTop={"5px"}
                  />
                  {fieldState.error && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
            <p className="text-right w-full">0/80 characters</p>
          </VStack>

          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Gig Price
            </label>
            <Controller
              name="pricing.service_price"
              control={control}
              render={({ field, fieldState }) => (
                <div className="relative w-1/2">
                  <Input
                    type="number"
                    {...field}
                    marginTop={"5px"}
                    width={"100%"}
                    value={field.value === null ? "" : field.value}
                    onChange={(e) => {
                      e.target.value === ""
                        ? field.onChange(null)
                        : field.onChange(e.target.value);
                    }}
                  />
                  {fieldState.error && (
                    <p className="" style={{ color: "red", marginTop: "5px" }}>
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </HStack>

          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Delivery Days
            </label>
            <Controller
              name="pricing.delivery_days"
              control={control}
              render={({ field, fieldState }) => (
                <div className="relative w-1/2">
                  <Input
                    type="number"
                    {...field}
                    marginTop={"5px"}
                    width={"100%"}
                    value={field.value === null ? "" : field.value}
                    onChange={(e) => {
                      e.target.value === ""
                        ? field.onChange(null)
                        : field.onChange(e.target.value);
                    }}
                  />
                  {fieldState.error && (
                    <p className="" style={{ color: "red", marginTop: "5px" }}>
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
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
              render={({ field, fieldState }) => (
                <div className="relative w-1/2">
                  <select {...field} className="w-[100%] py-2 px-3 border">
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                  {fieldState.error && (
                    <p className="" style={{ color: "red", marginTop: "5px" }}>
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </HStack>

          <VStack alignItems={"start"} width={"100%"}>
            <label htmlFor="" className="text-2xl font-[600] pb-0 mb-4">
              Services Options
            </label>

            <Controller
              name="pricing.service_options.design_customization"
              control={control}
              render={({ field }) => (
                <Checkbox
                  colorScheme="green"
                  size="lg"
                  isChecked={field.value}
                  onChange={(e) => {
                    setValue(
                      "pricing.service_options.design_customization",
                      e.target.checked
                    );
                    clearErrors("pricing.service_options");
                  }}
                >
                  Design Customization
                </Checkbox>
              )}
            />

            <Controller
              name="pricing.service_options.content_upload"
              control={control}
              render={({ field }) => (
                <Checkbox
                  colorScheme="green"
                  size="lg"
                  isChecked={field.value}
                  onChange={(e) => {
                    setValue(
                      "pricing.service_options.content_upload",
                      e.target.checked
                    );
                    clearErrors("pricing.service_options");
                  }}
                >
                  Content Upload
                </Checkbox>
              )}
            />

            <Controller
              name="pricing.service_options.responsive_design"
              control={control}
              render={({ field }) => (
                <Checkbox
                  colorScheme="green"
                  size="lg"
                  isChecked={field.value}
                  onChange={(e) => {
                    setValue(
                      "pricing.service_options.responsive_design",
                      e.target.checked
                    );
                    clearErrors("pricing.service_options");
                  }}
                >
                  Responsive Design
                </Checkbox>
              )}
            />

            <Controller
              name="pricing.service_options.source_code"
              control={control}
              render={({ field }) => (
                <Checkbox
                  colorScheme="green"
                  size="lg"
                  isChecked={field.value}
                  onChange={(e) => {
                    setValue(
                      "pricing.service_options.source_code",
                      e.target.checked
                    );
                    clearErrors("pricing.service_options");
                  }}
                >
                  Source Code
                </Checkbox>
              )}
            />

            {errors.pricing?.service_options && (
              <p className="" style={{ color: "red", marginTop: "5px" }}>
                {errors.pricing?.service_options?.root?.message}
              </p>
            )}
          </VStack>
        </GigCreateLayout>
      </form>
    </FormProvider>
  );
};

export default Step1;
