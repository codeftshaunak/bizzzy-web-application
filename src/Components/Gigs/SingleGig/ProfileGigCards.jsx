import { useEffect, useState } from "react";
import { getFreelancerGigs } from "../../../helpers/gigApis";
import { useNavigate } from "react-router-dom";

export const ProfileGigCards = () => {
  const [approvedGigs, setApprovedGigs] = useState([]);

  const getAllGigs = async () => {
    try {
      const response = await getFreelancerGigs();
      const approvedGigs = response?.body?.filter(
        (gig) => gig?.status === "pending"
      );

      setApprovedGigs(approvedGigs);
    } catch (error) {
      console.log("Create some freelancer fetching issue: ", error);
    }
  };
  // Fetching All Gigs
  useEffect(() => {
    getAllGigs();
  }, []);
  return (
    <div className="grid gap-8">
      {approvedGigs?.map((gig) => (
        <ProfileGigCard key={gig._id} gig={gig} />
      ))}
    </div>
  );
};

export const ProfileGigCard = ({ gig }) => {
  const navigate = useNavigate();
  const { title, pricing, images } = gig;

  const handleDetails = () => {
    navigate(`/freelancer/gig/details/${gig._id}`);
  };

  return (
    <div className="flex gap-10">
      <div className="h-44 w-64">
        <div
          className="h-44 w-64 bg-cover"
          style={{ backgroundImage: `url(${images[0]})` }}
        ></div>
      </div>
      <div className="grid justify-between gap-8">
        <div>
          <h4 className="text-3xl font-semibold">{title}</h4>
          <div className="font-semibold text-gray-600 mt-6">
            <span className="bg-green-50 px-3 py-2 rounded-full mr-6">
              From $50
            </span>
            <span>{pricing?.delivery_days} days delivery</span>
          </div>
        </div>
        <button
          onClick={handleDetails}
          className="text-start px-3 py-1 rounded-full border-2 border-[var(--primarytextcolor)] text-[var(--primarytextcolor)] hover:text-white hover:bg-[var(--primarytextcolor)] transition h-fit mt-auto w-fit font-semibold"
        >
          View Project
        </button>
      </div>
    </div>
  );
};
