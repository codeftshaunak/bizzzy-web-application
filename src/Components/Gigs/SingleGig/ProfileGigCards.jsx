import { useEffect, useRef, useState } from "react";
import { getFreelancerGigs } from "../../../helpers/gigApis";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";

export const ProfileGigCards = () => {
  const [approvedGigs, setApprovedGigs] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
    <>
      {approvedGigs.length > 0 && (
        <div className="max-w-[905px] relative -z-0">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            loop={true}
          >
            {approvedGigs?.map((gig) => (
              <SwiperSlide key={gig._id} className="w-full">
                <ProfileGigCard gig={gig} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            ref={prevRef}
            className="absolute top-1/2 -left-2 z-20 bg-green-100 rounded-full shadow -mt-4"
          >
            <MdNavigateBefore className="text-3xl" />
          </button>
          <button
            ref={nextRef}
            className="absolute top-1/2 -right-2 z-20 bg-green-100 rounded-full shadow -mt-4"
          >
            <MdNavigateNext className="text-3xl" />
          </button>
        </div>
      )}
    </>
  );
};

export const ProfileGigCard = ({ gig }) => {
  const navigate = useNavigate();
  const { title, pricing, images } = gig;

  const handleDetails = () => {
    navigate(`/freelancer/gig/details/${gig._id}`);
  };

  return (
    <div className="flex justify-start gap-10 w-full">
      <div className="h-44 w-64">
        <div
          className="h-44 w-64 bg-cover"
          style={{ backgroundImage: `url(${images[0]})` }}
        ></div>
      </div>
      <div className="grid justify-between gap-8">
        <div>
          <h4 className="text-2xl font-semibold text-left">{title}</h4>
          <div className="font-semibold text-gray-600 mt-6">
            <span className="bg-green-50 px-3 py-2 rounded-full mr-6">
              From ${pricing?.service_price}
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
