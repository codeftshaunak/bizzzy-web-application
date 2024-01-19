import { Input, Select, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import * as yup from "yup";
import { GigCreateLayout } from "../GigCreate";

// validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  // Define validation rules for other fields if needed
});

// default values for the step
const defaultValues = {
  title: "",
  category: {},
  skills: [],
};

const Step0 = ({ submitCallback, onBack, afterSubmit }) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control } = methods;

  // form submit operations
  const onSubmit = (values) => {
    submitCallback(values); // this will update the parent state
    afterSubmit(); // this will perform task after updating the state
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GigCreateLayout title={"Gig Overview"} onBackward={onBack}>
          <VStack alignItems={"start"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Title
            </label>
            <p>
              Tell client what you are going to deliver and how it&apos;ll
              benifites them.
            </p>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    placeholder="You will get a fantastic deliverable that drives impact"
                    marginTop="5px"
                  />
                  {fieldState.error && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </VStack>
          <VStack alignItems={"start"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Category
            </label>
            <p>Select a category that will easy for other to find your gig.</p>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  {...field}
                  options={[
                    {
                      _id: 1,
                      category_id: "6586ac7bf89033570689394f",
                      label: "Chocolate",
                    },
                    {
                      _id: 1,
                      category_id: "6586ac7bf89033570689394f",
                      label: "Strawberry",
                    },
                    {
                      _id: 1,
                      category_id: "6586ac7bf89033570689394f",
                      label: "Vanilla",
                    },
                  ]}
                />
              )}
            />
          </VStack>
          <VStack alignItems={"start"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Skills
            </label>
            <p>Add skills relevant to your gig.</p>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <>
                  <CreatableSelect
                    className="w-full"
                    isMulti
                    {...field}
                    options={[
                      { value: "html", label: "HTML" },
                      { value: "css", label: "CSS" },
                      { value: "javascript", label: "JavaScript" },
                      // Add more skills as needed
                    ]}
                  />
                </>
              )}
            />
          </VStack>
        </GigCreateLayout>
      </form>
    </FormProvider>
  );
};

export default Step0;
