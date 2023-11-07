import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState } from "../../Contexts/FormContext";

function Step({ step, description, active, finalStep, complete }) {
  return (
    <div className="flex relative mb-[55px]">
      <div
        className={`w-8 h-8 rounded-full border-2 ${
          active ? "border-outline-active" : "border-fg-disabled"
        } ${
          complete ? "border-outline-active bg-outline-active" : ""
        } flex justify-center items-center`}
      >
        {active && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
        {complete && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g id="Icons/24px/Check">
              <path
                id="Path"
                d="M5 12L10 17L20 7"
                stroke="white"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        )}
      </div>
      <div className="ml-2">
        <div className=" text-green-600 text-sm font-medium font-['SF Pro Text'] leading-tight">
          Step {step}
        </div>
        <div className="text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight">
          {description}
        </div>
      </div>
      {!finalStep && (
        <div
          className={`h-[58px] w-0.5 absolute top-8 left-[15px] ${
            complete ? "bg-outline-active" : "bg-gray-300"
          }`}
        />
      )}
    </div>
  );
}

const schema = z.object({
  experience: z.enum(["ENTRY", "INTERMEDIATE", "EXPERT"]),
});

const options = [
  {
    key: "ENTRY",
    title: "Entry",
    text: "Looking somerelatively new to this field",
  },
  {
    key: "INTERMEDIATE",
    title: "Intermediate",
    text: "Looking some relatively good in this field",
  },
  {
    key: "EXPERT",
    title: "Expert",
    text: "Looking some relatively expert to this field",
  },
];

function SecondStep({ setStep }) {
  const { insertToFormState } = useFormState();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      experience: "EXPERT",
    },
  });

  const onSubmit = (v) => {
    insertToFormState(v);
    setStep(3);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[530px] h-[716px] flex-col justify-start items-start gap-9 inline-flex"
      >
        <div>
          <div className="w-max-[440px] text-black text-3xl font-medium font-['SF Pro Text'] leading-9">
            What level experience you need?
          </div>
          <div className="w-max-[530px] mt-2 text-gray-700 text-sm font-normal font-['SF Pro Text'] leading-tight">
            This won`t restrict any proposals, but helps match expertise to your
            budget.
          </div>
        </div>
        {errors?.experience ? (
          <p className="text-sm text-red-500">{errors.experience.message}</p>
        ) : null}

        {options.map((option) => (
          <div
            className={`flex p-5 items-center  w-[446px] h-[88px] rounded-xl border border-outline-primary active-checkbox`}
            key={option.key}
          >
            <input
              id={option.key}
              type="radio"
              value={option.key}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              {...register("experience")}
            />
            <label htmlFor="default-radio-1" className="ml-4">
              <div className="w-[375px] text-stone-900 text-lg font-semibold font-['SF Pro Text'] leading-7">
                {option.title}
              </div>
              <div className="w-[375px] text-neutral-500 text-sm font-normal font-['SF Pro Text'] leading-tight">
                {option.text}
              </div>
            </label>
          </div>
        ))}

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
    </>
  );
}

export default SecondStep;
