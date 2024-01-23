import { Input, Select, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import * as yup from "yup";
import { GigCreateLayout } from "../GigCreate";
import { getAllDetailsOfUser } from "../../../helpers/userApis";
// import { useSelector } from "react-redux";

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
const Step0 = ({ submitCallback, onBack, afterSubmit, formValues }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  // const editableData = useSelector((state) => state?.freelancer?.editableGig);
  // const { title } = editableData.data;
  // const [localTitle, setLocalTitle] = useState(title || "");
  // console.log({ editableData });
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control, reset } = methods;
  console.log({ formValues });
  // form submit operations
  const onSubmit = (values) => {
    submitCallback(values); // this will update the parent state
    afterSubmit(); // this will perform task after updating the state
    console.log({ values });
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

  // Get Freelancer Details
  const getProfileInformation = async () => {
    try {
      const resp = await getAllDetailsOfUser();
      setCategoryOptions(
        resp?.categories?.map((item) => ({
          value: item.value,
          label: item.value,
          category_id: item._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileInformation();
  }, []);
  console.log({ categoryOptions });

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
                <>
                  <CreatableSelect
                    className="w-full"
                    {...field}
                    options={categoryOptions}
                  />
                </>
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
