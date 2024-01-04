import { useState } from "react";
import ContractTerms from "./ContractTerms";
import FreelancerProfile from "./FreelancerProfile";
import JobDetails from "./JobDetails";
import { useSelector } from "react-redux";

const HireFreelancerPage = () => {
  const info = useSelector((state) => state?.HireFreelancer);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = () => {
    console.log(info);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <section>
      <FreelancerProfile />
      <JobDetails />
      <ContractTerms />
      <div className="border border-[lightgray] rounded-lg mt-8 py-5 px-8">
        <div className="flex gap-1">
          <input
            type="checkbox"
            name=""
            id=""
            checked={isChecked}
            onChange={handleCheckboxChange}
          />{" "}
          <p>
            Yes, I understand and agree to the{" "}
            <span className="text-green-500">Upwork Terms of Service</span>,
            including the <span className="text-green-500">User Agreement</span>{" "}
            and <span className="text-green-500">Privacy Policy</span>
          </p>
        </div>
        <div className="font-semibold text-right">
          <button className="text-green-500 mr-10">Cancel</button>
          <button
            className={`py-2 px-5 text-white cursor-pointer rounded-full bg-green-500 w-fit mt-10 ${
              !isChecked && "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!isChecked}
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
};

export default HireFreelancerPage;
