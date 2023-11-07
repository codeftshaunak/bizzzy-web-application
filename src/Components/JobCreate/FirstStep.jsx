import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import { z } from "zod";
import { useFormState } from "../../Contexts/FormContext";

function Step({ step, description, active, finalStep }) {
  return (
    <div className="flex relative mb-[55px]">
      <div
        className={`w-8 h-8 rounded-full border-2 ${
          active ? "border-outline-active" : "border-fg-disabled"
        } flex justify-center items-center`}
      >
        {active && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
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
        <div className="h-[58px] w-0.5 absolute top-8 left-[15px] bg-gray-300" />
      )}
    </div>
  );
}

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(5),
  tags: z.array(z.string()).min(1),
  budget: z.enum(["FIXED_BUDGET", "HOURLY"]),
  amount: z.coerce.number().transform((v) => Number(v)),
});

function FirstStep({ setStep }) {
  const { insertToFormState } = useFormState();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tags: [],
    },
  });

  const tags = getValues("tags");

  const onSubmit = (v) => {
    insertToFormState(v);
    setStep(2);
  };

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

      <div>
        <div className="w-[530px] text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight">
          Description
        </div>
        <textarea
          className="border mt-1 border-outline-primary rounded-md shadow-sm w-full font-['SF Pro Text'] text-sm py-1 px-3"
          placeholder="Already have a description? Paste here!"
          rows={2}
          {...register("description")}
        />
        {errors?.description ? (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        ) : null}
      </div>

      <div>
        <div className="w-[530px] text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight mb-1">
          Add Tags
        </div>

        <TagsInput
          value={tags}
          onChange={(tags) => setValue("tags", tags)}
          name="tags"
          placeHolder="Enter tags"
          classNames={{
            input: "bg-transparent py-1",
            tag: "",
          }}
        />

        {errors?.tags ? (
          <p className="text-sm text-red-500">{errors.tags.message}</p>
        ) : null}
      </div>

      <div>
        <div className="flex items-center">
          <div className="flex items-center">
            <input
              id="default-radio-1"
              type="radio"
              value="FIXED_BUDGET"
              name="budget"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
              {...register("budget")}
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
              id="default-radio-2"
              type="radio"
              value="HOURLY"
              name="budget"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
              {...register("budget")}
            />
            <label
              htmlFor="default-radio-2"
              className="ml-2 text-sm font-medium text-gray-900 "
            >
              Hourly
            </label>
          </div>
        </div>
        {errors?.budget ? (
          <p className="text-sm text-red-500">{errors.budget.message}</p>
        ) : null}
      </div>

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

      <div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g id="24/Attachment">
              <path
                id="Path"
                d="M14.9997 7.00045L8.4997 13.5005C7.67128 14.3289 7.67128 15.672 8.4997 16.5005C9.32813 17.3289 10.6713 17.3289 11.4997 16.5005L17.9997 10.0005C19.6566 8.3436 19.6566 5.65731 17.9997 4.00045C16.3428 2.3436 13.6566 2.3436 11.9997 4.00045L5.4997 10.5005C3.01442 12.9857 3.01442 17.0152 5.4997 19.5005C7.98498 21.9857 12.0144 21.9857 14.4997 19.5005L20.9997 13.0005"
                stroke="#16A34A"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <div className="text-center ml-3 text-green-600 text-base font-medium font-['SF Pro Text'] leading-normal">
            Attachments
          </div>
        </div>
        <div className="text-neutral-500 mt-3 text-sm font-medium font-['SF Pro Text'] leading-tight">
          Max size 100 MB
        </div>
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
