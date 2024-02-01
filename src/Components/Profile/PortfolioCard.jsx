import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

const PortfolioCard = ({ portfolio }) => {
  const { project_name, attachements } = portfolio;

  return (
    <div className="flex flex-col rounded-md -z-10">
      <div className="overflow-hidden">
        {attachements && (
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
          >
            {attachements?.map((item) => (
              <SwiperSlide key={item}>
                <img
                  src={item}
                  className="h-48 w-full object-cover rounded-t"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <p className="text-[14px] text-[#374151] font-[500] border px-3 py-2 rounded-b">
        {project_name}
      </p>
    </div>
  );
};

export default PortfolioCard;
