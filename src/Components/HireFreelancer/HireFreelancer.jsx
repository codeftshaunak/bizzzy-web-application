import { useState } from "react";
import ContractTerms from "./ContractTerms";
import FreelancerProfile from "./FreelancerProfile";
import JobDetails from "./JobDetails";
import { useSelector } from "react-redux";
import { sendHireFreelancer } from "../../helpers/clientApis";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HireFreelancerPage = () => {
  const info = useSelector((state) => state?.HireFreelancer);
  const [isChecked, setIsChecked] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsContinue(true);

    // Organized API request body
    const body = {};
    body.freelancer_id = info?.targetedFreelancer?.user_id;
    body.job_id = info?.targetedFreelancer?.jobDetails?._id;
    body.budget = info?.targetedFreelancer?.jobDetails?.amount;
    body.accept_terms_condition = isChecked;
    for (const key in info) {
      if (
        typeof info[key] === "object" &&
        key !== "targetedFreelancer" &&
        !Array.isArray(info[key])
      ) {
        const childObject = info[key];
        for (const childKey in childObject) {
          body[childKey] = childObject[childKey];
        }
      }
    }

    try {
      const response = await sendHireFreelancer(body);

      if (response?.code === 200) {
        toast({
          title: response.msg,
          duration: 3000,
          isClosable: true,
          colorScheme: "green",
          position: "top-right",
        });
        navigate("/client-dashboard");
      }
      setIsContinue(false);
    } catch (error) {
      toast({
        title: error?.response?.data?.msg,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.error("Error fetching search results:", error);
      setIsContinue(false);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <section className="w-[80%]">
      <FreelancerProfile />
      <form action="" onSubmit={handleSubmit}>
        <JobDetails />
        <ContractTerms />
        <div className="border border-[lightgray] rounded-lg mt-8 py-6 px-10">
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
              including the{" "}
              <span className="text-green-500">User Agreement</span> and{" "}
              <span className="text-green-500">Privacy Policy</span>
            </p>
          </div>
          <div className="font-semibold text-right flex items-center justify-end gap-10 mt-10">
            <button className="text-green-500">Cancel</button>
            <button
              className={`py-2 px-5 text-white cursor-pointer rounded-full bg-green-500 w-fit flex items-center ${
                (!isChecked || isContinue) && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isChecked || isContinue}
            >
              {isContinue && (
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2 animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
              )}
              Continue
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default HireFreelancerPage;
