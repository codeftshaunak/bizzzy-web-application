import { FaPen, FaQuestionCircle } from "react-icons/fa";
import { IoIosAlarm } from "react-icons/io";
import { GiPriceTag } from "react-icons/gi";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContractTerms } from "../../redux/features/HireFreelancerSlice";

const ContractTerms = () => {
  const info = useSelector(
    (state) => state?.HireFreelancer?.targetedFreelancer
  );
  const priceRef = useRef(null);
  const [isEditingHours, setIsEditingHours] = useState(false);
  const [formData, setFormData] = useState({
    job_type: "hourly",
    hourly_rate: info?.hourly_rate || 0,
    weekly_limit: "40",
    allow_freelancer_manually_timelog: false,
  });

  const dispatch = useDispatch();

  // update form data and dispatch to Redux
  const handleFormDataChange = (key, value) => {
    let updatedFormData = { ...formData };

    // Check if the key is either 'hourly_rate' or 'payFixedPrice'
    if (key === "job_type") {
      if (value === "hourly") {
        delete updatedFormData.project_budget;
        updatedFormData["weekly_limit"] = Number(40);
      } else {
        delete updatedFormData.hourly_rate;
        delete updatedFormData.weekly_limit;
      }

      priceRef.current.value = null;
    }

    // Update the form data with the new key-value pair
    updatedFormData = {
      ...updatedFormData,
      [key]: value,
    };

    // Set the updated form data in the state
    setFormData(updatedFormData);

    // Dispatch the updated form data to Redux
    dispatch(setContractTerms(updatedFormData));
  };

  const activeRadio = (
    <div className="h-5 w-5 rounded-full border-4 border-green-500 bg-green-500 relative">
      <div className="absolute top-0 left-0 border-2 h-full w-full rounded-full"></div>
    </div>
  );
  return (
    <div className="border border-[lightgray] rounded-lg mt-8 py-6 px-10">
      <h4 className="text-xl font-bold">Contract Terms</h4>
      <p className="font-semibold">
        <span className="text-green-500">Upwork Payment Protection.</span> Only
        pey for the work you
      </p>
      <div className="mt-5">
        <h5 className="font-bold flex items-center gap-1">
          Payment Option <FaQuestionCircle className="cursor-pointer" />
        </h5>
        <div className="grid grid-cols-2 max-w-2xl gap-5 mt-1">
          <div
            className={`border-2  rounded-md p-2 cursor-pointer ${
              formData.job_type === "fixed"
                ? ""
                : "border-green-500 bg-green-50"
            }`}
            onClick={() => handleFormDataChange("job_type", "hourly")}
          >
            <div className="flex justify-between">
              <small className="whitespace-nowrap bg-white text-sm border border-blue-500 rounded-full w-fit px-2">
                Popular
              </small>
              {formData.job_type === "fixed" ? (
                <div className="h-5 w-5 rounded-full border-2 border-gray-400  relative"></div>
              ) : (
                activeRadio
              )}
            </div>
            <div className="mb-2 mt-1">
              <IoIosAlarm className="text-2xl" />
            </div>
            <p className="text-2xl font-semibold">Pay by the hour</p>
            <p className="text-sm">
              Pay for the number of hours worked on a project
            </p>
          </div>
          <div
            className={`border-2  rounded-md p-2 cursor-pointer ${
              formData.job_type === "fixed"
                ? "border-green-500 bg-green-50"
                : ""
            }`}
            onClick={() => handleFormDataChange("job_type", "fixed")}
          >
            <div className="flex justify-end">
              {formData.job_type === "fixed" ? (
                activeRadio
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gray-400  relative"></div>
              )}
            </div>
            <div className="mb-2 mt-1">
              <GiPriceTag className="text-2xl" />
            </div>
            <p className="text-2xl font-semibold">Pay a fixed price</p>
            <p className="text-sm">Pay as project milestones are completed</p>
          </div>
        </div>
        <div className="mt-7">
          <h5 className="font-bold flex items-center gap-1">
            {formData.job_type === "fixed"
              ? "Pay by the project"
              : "Pay by the hour"}
          </h5>
          <div className="font-semibold mt-1">
            <input
              type="number"
              className="border-2 rounded-md px-3 py-1 outline-gray-500"
              placeholder="$0.00"
              required
              ref={priceRef}
              defaultValue={info.hourly_rate}
              onChange={(e) => {
                handleFormDataChange(
                  formData.job_type === "fixed"
                    ? "project_budget"
                    : "hourly_rate",
                  Number(e.target.value)
                );
              }}
            />
            /{formData.job_type === "fixed" ? "total" : "hr"}
          </div>
          {/* <p className="text-sm text-gray-600 font-semibold mt-2 h-5">
            {!formData.job_type === "fixed" &&
              "Seanie D.&apos;s profile rate is $9.00/hr"}
          </p> */}
        </div>
        <div className="mt-7">
          <h5 className="font-bold flex items-center gap-1">
            Weekly Limit <FaQuestionCircle className="cursor-pointer" />
          </h5>
          <p className=" text-gray-600">
            Setting a weekly limit is great way to help ensure you stay on
            budget
          </p>
        </div>
        {formData.job_type === "hourly" && (
          <>
            <div className="mt-6">
              <h5 className="font-bold flex items-center gap-1">
                {formData.weekly_limit} hrs/week{" "}
                <FaPen
                  className="cursor-pointer"
                  onClick={() => setIsEditingHours(true)}
                />
              </h5>
              {isEditingHours ? (
                <input
                  type="number"
                  className="border-2 px-2 rounded-md outline-gray-500 mt-1"
                  value={formData.weekly_limit}
                  required
                  max={40}
                  maxLength={2}
                  onChange={(e) => {
                    const enteredValue = Number(e.target.value);
                    if (enteredValue <= 40) {
                      handleFormDataChange("weekly_limit", enteredValue);
                    } else {
                      handleFormDataChange("weekly_limit", 40);
                    }
                  }}
                  onBlur={() => setIsEditingHours(false)}
                />
              ) : (
                <p className=" text-gray-600">40 max/week</p>
              )}
            </div>
            <p className="mt-2 text-gray-600">
              <span className="text-red-500 font-bold">*</span>Total Weekly
              Expenditure: $
              {Number(formData?.hourly_rate) * Number(formData?.weekly_limit) ||
                0}
            </p>
          </>
        )}
        <div className="flex gap-1 mt-7">
          <input
            type="checkbox"
            onChange={(e) =>
              handleFormDataChange(
                "allow_freelancer_manually_timelog",
                e.target.checked
              )
            }
            checked={formData.allow_freelancer_manually_timelog}
          />{" "}
          <p>
            Allow freelancer to log time manually if needed{" "}
            <span className="text-green-500">Learn more</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContractTerms;
