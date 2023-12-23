import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ActiveJobCard = ({ job }) => {
  const { _id, budget, job_details } = job;
  // console.log({ "dddd": job });
  return (
    <div className="border p-4 m-2 rounded h-[170px] w-[280px] my-auto mx-auto">
      <div className="flex items-center justify-center my-2">
        <IoBagOutline className="text-[1.8rem]" />
      </div>
      <div className="text-center my-2">
        <Link to={`/active-job/submit/${_id}`} className="text-lg font-bold" state={job}>
          {job_details[0]?.title}
        </Link>
        <p className="text-sm text-gray-700">
          {job_details[0]?.budget === "1"
            ? "Fixed Rate"
            : job_details[0]?.budget === "2"
              ? "Hourly"
              : ""}
        </p>

        <p className="text-sm text-gray-700">${budget}</p>
      </div>
    </div>
  );
};

export default ActiveJobCard;
