import { Input, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import * as yup from "yup";
import { GigCreateLayout } from "../GigCreate";
import { getAllDetailsOfUser } from "../../../helpers/userApis";
import { getSkills, getSubCategory } from "../../../helpers/freelancerApis";
// import { useSelector } from "react-redux";

// validation schema
const schema = yup.object().shape({
  title: yup.string().label("Title").required(),
  category: yup
    .object()
    .shape({
      value: yup.string().label("Category").required(),
      label: yup.string().label("Category").required(),
    })
    .label("Category")
    .required(),
  sub_category: yup
    .object()
    .shape({
      value: yup.string().label("Sub category").required(),
      label: yup.string().label("Sub category").required(),
    })
    .label("Sub Category")
    .required(),
  skills: yup
    .array(
      yup.object().shape({
        value: yup.string().label("Skill").required(),
        label: yup.string().label("Skill").required(),
      })
    )
    .label("Skills")
    .min(1)
    .required(),
  // Define validation rules for other fields if needed
});

// default values for the step
const defaultValues = {
  title: "",
  category: {},
  sub_category: {},
  skills: [],
};
const Step0 = ({ submitCallback, onBack, afterSubmit, formValues }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState(null);
  const [skillOptions, setSkillOptions] = useState([]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control, reset } = methods;

  // form submit operations
  const onSubmit = (values) => {
    submitCallback(values); // this will update the parent state
    afterSubmit(); // this will perform task after updating the state
    console.log({ values });
  };

  // load state
  useEffect(() => {
    const changes = {};

    Object.keys(defaultValues).map((key) => {
      const value = formValues?.[key];
      changes[key] = value === undefined ? defaultValues[key] : value;
    });

    reset(changes);
  }, [formValues]);

  // Get All Category of freelancer
  const allCategory = async () => {
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

  // get all sub category of freelancer
  const allSubCategory = async () => {
    if (categoryId) {
      try {
        console.log(categoryId);
        const response = await getSubCategory(categoryId);
        setSubCategoryOptions(
          response?.map((item) => ({
            value: item.sub_category_name,
            label: item.sub_category_name,
            category_id: item.category_id,
            _id: item._id,
          }))
        );
        console.log({ response, subCategoryOptions });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // get all skills of freelancer
  const allSkills = async () => {
    try {
      const response = await getSkills(categoryId, subCategoryId);
      setSkillOptions(
        response?.map((item) => ({
          value: item.skill_name,
          label: item.skill_name,
        }))
      );
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!categoryOptions) {
      allCategory();
    }

    allSubCategory();
  }, [categoryId]);

  useEffect(() => {
    if (categoryId && subCategoryId) {
      allSkills();
    }
  }, [categoryId, subCategoryId]);

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
                  <Input {...field} marginTop="5px" />
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
              render={({ field, fieldState }) => {
                return (
                  <>
                    <CreatableSelect
                      className="w-full"
                      {...field}
                      options={categoryOptions}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setCategoryId(selectedOption.category_id);
                      }}
                      // isValidNewOption={(inputValue, selectOptions) =>
                      //   inputValue.trim() !== "" &&
                      //   !selectOptions.find(
                      //     (option) => option.label === inputValue
                      //   )
                      // }
                    />
                    {fieldState.error && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {fieldState.error?.message ||
                          fieldState.error?.label?.message ||
                          fieldState.error?.value?.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </VStack>
          <VStack alignItems={"start"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Sub Category
            </label>
            <p>
              Select a sub category that will easy for other to find your gig.
            </p>
            <Controller
              name="sub_category"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <CreatableSelect
                    className="w-full"
                    {...field}
                    options={subCategoryOptions}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                      setSubCategoryId(selectedOption._id);
                    }}
                  />
                  {fieldState.error && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {fieldState.error?.message ||
                        fieldState.error?.label?.message ||
                        fieldState.error?.value?.message}
                    </p>
                  )}
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
              render={({ field, fieldState }) => (
                <>
                  <CreatableSelect
                    className="w-full"
                    isMulti
                    {...field}
                    options={skillOptions}
                  />
                  {fieldState.error && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {fieldState.error?.message ||
                        fieldState.error?.label?.message ||
                        fieldState.error?.value?.message}
                    </p>
                  )}
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
