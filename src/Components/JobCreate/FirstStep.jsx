import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiX } from "react-icons/bi";
import { TagsInput } from "react-tag-input-component";
import { useFormState } from "../../Contexts/FormContext";
import { firstStepSchema } from "../../Schema/job-create-schema";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { getCategories, getSkills } from "../../helpers/freelancerApis.js";
import Select from "react-select/creatable";
import { FaCloudUploadAlt } from "react-icons/fa";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link"],
    [{ color: [] }, { background: [] }],

    ["clean"],
  ],
};

function FirstStep({ setStep }) {
  const { insertToFormState, formState } = useFormState();
  const { quill, quillRef } = useQuill({ modules });
  const [categories, setCategories] = useState({});
  const [skillsOption, setSkillsOption] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
  } = useForm({
    resolver: zodResolver(firstStepSchema),
    defaultValues: {
      tags: [],
    },
  });

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setValue("description", quill.root.innerHTML);
      });
    }
  }, [quill]);

  const tags = getValues("tags");
  const skills = getValues("skills");

  // on form submit assign values to the context and go to next step
  const onSubmit = (v) => {
    insertToFormState(v);
    setStep(2);
  };

  const getCategorySkills = async () => {
    try {
      if (!categories?.list) {
        const response = await getCategories();
        setCategories({
          ...categories,
          list: response?.map((item) => ({
            value: item.category_name,
            label: item.category_name,
            _id: item._id,
          })),
        });
      }
      if (categories?.selectedId) {
        const response = await getSkills(categories.selectedId, "");
        setSkillsOption(
          response?.map((item) => ({
            value: item.skill_name,
            label: item.skill_name,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategorySkills();
  }, [categories]);

  // if there any values in form state context then push this to the form
  useEffect(() => {
    const values = {};
    if (formState?.title) values.title = formState.title;
    if (formState?.description) values.description = formState.description;
    if (formState?.tags) values.tags = formState.tags;
    if (formState?.skills) values.skills = formState.skills;
    if (formState?.job_type) values.job_type = `${formState.job_type}`;
    if (formState?.amount) values.amount = formState.amount;
    if (formState?.file) values.file = formState.file;

    reset(values);
  }, [formState]);

  return (
    <form
      className="w-[530px] h-[716px] flex-col justify-start items-start gap-9 inline-flex"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="w-max-[440px] text-black text-3xl font-medium font-['SF Pro Text'] leading-9">
          Let's start with a strong title.
        </div>
        <div className="w-max-[530px] mt-2 text-gray-700 text-sm font-normal font-['SF Pro Text'] leading-tight">
          Forget the old rules. You can have the best people. Right now. Right
          here.
        </div>
      </div>

      {/* TITLE FIELD */}
      <div>
        <div className="w-[530px] text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight">
          Title
        </div>
        <input
          className="border mt-1 h-9 border-outline-primary rounded-md shadow-sm w-full font-['SF Pro Text'] text-sm py-1 px-3"
          placeholder="Work Title"
          type="text"
          {...register("title")}
        />
        {errors?.title ? (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        ) : null}
      </div>

      {/* DESCRIPTION FIELD */}
      <div>
        <div className="w-[530px] text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight">
          Description
        </div>
        {/* <textarea
          className="border mt-1 border-outline-primary rounded-md shadow-sm w-full font-['SF Pro Text'] text-sm py-1 px-3"
          placeholder="Already have a description? Paste here!"
          rows={2}
          {...register("description")}
        /> */}
        <div style={{ width: "100%", height: 300 }}>
          <div ref={quillRef} style={{ width: "100%", height: "250px" }} />
        </div>

        {errors?.description ? (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        ) : null}
      </div>

      {/* TAGS FIELD */}
      <div>
        <div className="w-[530px] text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight mb-1">
          Job Category
        </div>

        {/* <TagsInput
          value={tags || []}
          onChange={(tags) => setValue("tags", tags)}
          name="tags"
          placeHolder="Enter tags"
          classNames={{
            input: "bg-transparent py-1",
            tag: "",
          }}
        /> */}
        <Controller
          control={control}
          name="tags"
          render={({ field: { ref, onChange } }) => (
            <Select
              inputRef={ref}
              onChange={(val) => {
                onChange(val ? [val._id] : []);
                setCategories({ ...categories, selectedId: val._id });
              }}
              options={categories?.list}
            />
          )}
        />

        {errors?.tags ? (
          <p className="text-sm text-red-500">{errors.tags.message}</p>
        ) : null}
      </div>

      {/* SKILLS FIELD */}
      <div>
        <div className="w-[530px] text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight mb-1">
          Add Skills
        </div>

        {/* <TagsInput
          value={skills || []}
          onChange={(skills) => setValue("skills", skills)}
          name="skills"
          placeHolder="Enter Skills"
          classNames={{
            input: "bg-transparent py-1",
            tag: "",
          }}
        /> */}
        <Controller
          control={control}
          name="skills"
          render={({ field: { ref, onChange } }) => (
            <Select
              closeMenuOnSelect={false}
              inputRef={ref}
              options={skillsOption}
              onChange={(val) => onChange(val.map((c) => c.value))}
              isMulti
            />
          )}
        />
        {errors?.skills ? (
          <p className="text-sm text-red-500">{errors.skills.message}</p>
        ) : null}
      </div>

      {/* BUDGET FIELD */}
      <div>
        <div className="flex items-center">
          <div className="flex items-center">
            <input
              {...register("job_type")}
              id="default-radio-1"
              type="radio"
              value={"fixed"}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label
              htmlFor="default-radio-1"
              className="ml-2 text-sm font-medium text-gray-900 "
            >
              Fixed Budget
            </label>
          </div>
          <div className="flex items-center ml-3">
            <input
              {...register("job_type")}
              id="default-radio-2"
              type="radio"
              value={"hourly"}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label
              htmlFor="default-radio-2"
              className="ml-2 text-sm font-medium text-gray-900 "
            >
              Hourly
            </label>
          </div>
        </div>
        {errors?.job_type ? (
          <p className="text-sm text-red-500">{errors.job_type.message}</p>
        ) : null}
      </div>

      {/* AMOUNT FIELD */}
      <div>
        <div className="w-[530px] text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight">
          Add Amount
        </div>
        <div className="relative">
          <input
            className="border mt-1 h-9 border-outline-primary rounded-md shadow-sm w-full font-['SF Pro Text'] text-sm py-1 px-3"
            placeholder="400"
            {...register("amount")}
          />
          <div className="w-6 h-6 absolute right-2 top-[9px] justify-start items-center gap-1 inline-flex">
            <div className="p-1 bg-white rounded-md shadow border border-gray-200 justify-center items-center gap-1 flex">
              <div className="w-4 h-4 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g id="16/Currency-Dollar" clipPath="url(#clip0_3734_2499)">
                    <path
                      id="Vector"
                      d="M11.1337 5.33333C11.001 4.95683 10.7586 4.62864 10.4378 4.39102C10.1171 4.1534 9.7325 4.01722 9.33366 4H6.66699C6.13656 4 5.62785 4.21071 5.25278 4.58579C4.87771 4.96086 4.66699 5.46957 4.66699 6C4.66699 6.53043 4.87771 7.03914 5.25278 7.41421C5.62785 7.78929 6.13656 8 6.66699 8H9.33366C9.86409 8 10.3728 8.21071 10.7479 8.58579C11.1229 8.96086 11.3337 9.46957 11.3337 10C11.3337 10.5304 11.1229 11.0391 10.7479 11.4142C10.3728 11.7893 9.86409 12 9.33366 12H6.66699C6.26816 11.9828 5.8836 11.8466 5.56281 11.609C5.24203 11.3714 4.99969 11.0432 4.86699 10.6667"
                      stroke="#6B7280"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M8 2V4M8 12V14"
                      stroke="#6B7280"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3734_2499">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        {errors?.amount ? (
          <p className="text-sm text-red-500">{errors.amount.message}</p>
        ) : null}
      </div>

      {/* FILE FIELD */}
      <div>
        <Controller
          control={control}
          name="file"
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <div className="flex items-center justify-between w-full">
                <label className="flex items-center" id="file">
                  <div
                    className={`w-24 h-10 border border-green-400 rounded cursor-pointer bg-green-100 hover:bg-green-200 flex flex-col items-center justify-center text-center`}
                  >
                    <span>
                      <FaCloudUploadAlt className="text-2xl text-center" />
                    </span>
                  </div>
                  <div className="text-center ml-3 text-green-600 text-base font-medium font-['SF Pro Text'] leading-normal flex items-center gap-1">
                    {value?.name || "Add Attachment"}{" "}
                  </div>
                  <input
                    {...field}
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={(e) => {
                      onChange(e.target.files[0]);
                    }}
                  />
                </label>
                {value ? (
                  <BiX
                    onClick={() => onChange(undefined)}
                    className="h-5 w-5 bg-red-50/10 rounded-full cursor-pointer backdrop-blur backdrop-filter bg-red-50 hover:bg-red-100 text-red-500"
                  />
                ) : null}
                {/* Delete Added File */}
              </div>
            );
          }}
        />
        <div className="text-neutral-500 mt-3 text-sm font-medium font-['SF Pro Text'] leading-tight">
          Max size 100 MB
        </div>
        {errors?.file ? (
          <p className="text-sm text-red-500">{errors.file.message}</p>
        ) : null}
      </div>

      <button
        className="w-[136px] h-9 flex-col justify-start items-start gap-2.5 inline-flex"
        type="submit"
      >
        <div className="self-stretch h-9 px-3 py-2 bg-green-500 rounded-md shadow justify-center items-center gap-1 inline-flex">
          <div className="text-center text-white text-sm font-medium font-['SF Pro Text'] leading-tight">
            Save & Continue
          </div>
        </div>
      </button>
    </form>
  );
}

export default FirstStep;
