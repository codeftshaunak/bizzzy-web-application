import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState } from "../../Contexts/FormContext";

const schema = z.object({
  duration: z.string(),
});

const options = [
  {
    key: "3 to 6 Months",
    title: "3 to 6 Months",
  },
  {
    key: "1 to 3 Months",
    title: "1 to 3 Months",
  },
  {
    key: "Less than 1 Month",
    title: "Less than 1 Month",
  },
];

function FinalStep({ setStep, onCallback = () => {} }) {
  const { insertToFormState } = useFormState();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      duration: "Less than 1 Month",
    },
  });

  const onSubmit = (v) => {
    const value = insertToFormState(v);
    onCallback(value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[530px] h-[716px] flex-col justify-start items-start gap-9 inline-flex"
      >
        <div>
          <div className="w-max-[440px] text-black text-3xl font-medium font-['SF Pro Text'] leading-9">
            How long will our work take?
          </div>
          <div className="w-max-[530px] mt-2 text-gray-700 text-sm font-normal font-['SF Pro Text'] leading-tight">
            This won`t restrict any proposals, but helps match expertise to your
            budget.
          </div>
          {errors?.duration ? (
            <p className="text-sm text-red-500">{errors.duration.message}</p>
          ) : null}
        </div>

        {options.map((option) => (
          <div
            key={option.key}
            className="flex p-[1.12rem] items-center border border-outline-primary w-[446px] rounded-xl active-checkbox"
          >
            <input
              id={option.key}
              type="radio"
              value={option.key}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
              {...register("duration")}
            />
            <label htmlFor="default-radio-1" className="ml-4">
              <div className="w-[375px] text-stone-900 text-lg font-semibold font-['SF Pro Text'] leading-7">
                {option.title}
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

export default FinalStep;
