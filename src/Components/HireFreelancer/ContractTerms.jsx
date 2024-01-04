import { FaPen, FaQuestionCircle } from "react-icons/fa";
import { IoIosAlarm } from "react-icons/io";
import { GiPriceTag } from "react-icons/gi";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setContractTerms } from "../../redux/features/HireFreelancerSlice";

const ContractTerms = () => {
  const priceRef = useRef(null);
  const [isEditingHours, setIsEditingHours] = useState(false);
  const [formData, setFormData] = useState({
    isFixedPay: false,
    weeklyLimit: "40",
    allowManualTime: false,
  });

  // update form data and dispatch to Redux
  const dispatch = useDispatch();
  const handleFormDataChange = (key, value) => {
    let updatedFormData = { ...formData };

    // Check if the key is either 'payByTheHour' or 'payFixedPrice'
    if (key === "isFixedPay") {
      if (value === true) {
        delete updatedFormData.payByTheHour;
      } else {
        delete updatedFormData.payFixedPrice;
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

    console.log(formData);
  };

  const activeRadio = (
    <div className="h-5 w-5 rounded-full border-4 border-green-500 bg-green-500 relative">
      <div className="absolute top-0 left-0 border-2 h-full w-full rounded-full"></div>
    </div>
  );
  return (
    <div className="border border-[lightgray] rounded-lg mt-8 py-5 px-8">
      <h4 className="text-xl font-bold">Contract Terms</h4>
      <p className="mt-4 font-semibold">
        <span className="text-green-500">Upwork Payment Protection.</span> Only
        pey for the work you
      </p>
      <div className="mt-3">
        <h5 className="font-bold flex items-center gap-1">
          Payment Option <FaQuestionCircle className="cursor-pointer" />
        </h5>
        <div className="flex gap-10 mt-1">
          <div
            className={`border-2  rounded-md p-2 cursor-pointer ${
              formData.isFixedPay ? "" : "border-green-500 bg-green-50"
            }`}
            onClick={() => handleFormDataChange("isFixedPay", false)}
          >
            <div className="flex justify-between">
              <small className="whitespace-nowrap bg-white text-sm border border-blue-500 rounded-full w-fit px-2">
                Popular
              </small>
              {formData.isFixedPay ? (
                <div className="h-5 w-5 rounded-full border-2 border-gray-400  relative"></div>
              ) : (
                activeRadio
              )}
            </div>
            <div className="mb-2 mt-1">
              <IoIosAlarm className="text-2xl" />
            </div>
            <p className="text-2xl font-semibold">Pay by the hour</p>
            <p className="text-gray-500 text-sm">
              Pay for the number of hours worked on a project
            </p>
          </div>
          <div
            className={`border-2  rounded-md p-2 cursor-pointer ${
              formData.isFixedPay ? "border-green-500 bg-green-50" : ""
            }`}
            onClick={() => handleFormDataChange("isFixedPay", true)}
          >
            <div className="flex justify-end">
              {formData.isFixedPay ? (
                activeRadio
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gray-400  relative"></div>
              )}
            </div>
            <div className="mb-2 mt-1">
              <GiPriceTag className="text-2xl" />
            </div>
            <p className="text-2xl font-semibold">Pay a fixed price</p>
            <p className="text-gray-500">
              Pay as project milestones are completed
            </p>
          </div>
        </div>
        <div className="mt-7">
          <h5 className="font-bold flex items-center gap-1">Pay by the hour</h5>
          <div className="font-semibold mt-1">
            <input
              type="number"
              className="border-2 rounded-md px-3 py-1 outline-gray-500"
              placeholder="$0.00"
              required
              ref={priceRef}
              onChange={(e) => {
                handleFormDataChange(
                  formData.isFixedPay ? "payFixedPrice" : "payByTheHour",
                  e.target.value
                );
              }}
            />
            /{formData.isFixedPay ? "total" : "hr"}
          </div>
          <p className="text-sm text-gray-600 font-semibold mt-2 h-5">
            {!formData.isFixedPay &&
              "Seanie D.&apos;s profile rate is $9.00/hr"}
          </p>
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
        <div className="mt-6">
          <h5 className="font-bold flex items-center gap-1">
            ${formData.weeklyLimit} hrs/week{" "}
            <FaPen
              className="cursor-pointer"
              onClick={() => setIsEditingHours(true)}
            />
          </h5>
          {isEditingHours ? (
            <input
              type="number"
              className="border-2 px-2 rounded-md outline-gray-500 mt-1"
              value={formData.weeklyLimit}
              required
              onChange={(e) =>
                handleFormDataChange("weeklyLimit", e.target.value)
              }
              onBlur={() => setIsEditingHours(false)}
            />
          ) : (
            <p className="mt-1 text-gray-600">$100 max/week</p>
          )}
        </div>
        <div className="flex gap-1 mt-7">
          <input
            type="checkbox"
            onChange={(e) =>
              handleFormDataChange("allowManualTime", e.target.checked)
            }
            checked={formData.allowManualTime}
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
