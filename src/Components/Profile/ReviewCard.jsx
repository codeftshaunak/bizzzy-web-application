import StarRatings from "react-star-ratings";

const ReviewCard = ({ workDetails }) => {
  const { feedback_details, job_details, sender_details } = workDetails || [];
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-[16px] text-[#374151] font-[500]">
        {job_details?.title}
      </p>
      <div className="flex gap-[8px]">
        <StarRatings
          rating={Number(feedback_details?.average_rating)}
          starDimension="18px"
          starSpacing="1px"
          starRatedColor="#16A34A"
          starEmptyColor="#8ab89b"
        />
        <p className="text-[#374151] text-[14px] font-[400]">
          {feedback_details?.average_rating}
        </p>
      </div>
      <p className="text-[#374151] text-[14px] font-[400]">
        {feedback_details?.feedback_message}
      </p>
      <p className="text-[#374151] text-[14px] font-[400]">2022-2022</p>
    </div>
  );
};

export default ReviewCard;
