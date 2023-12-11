import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ActiveJobCard = ({ job }) => {
  const { id, jobtitle, budget, jobtype } = job;

  return (
    <div className="border p-4 m-2 rounded h-[160px]">
      <div className="flex items-center justify-center">
        <IoBagOutline className="text-[1.8rem]" />
      </div>
      <div className="text-center my-2">
        <Link to={`/active-job/${id}`} className="text-lg font-bold ">
          {jobtitle}
        </Link>
        <p className="text-sm text-gray-700">{jobtype}</p>
        <p className="text-sm text-gray-700">{budget}</p>
      </div>
    </div>
  );
};

export default ActiveJobCard;
