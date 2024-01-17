import React from "react";
import portfoliobg from "../../assets/portfoliobg.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PortfolioCard = ({ portfolio }) => {
  console.log({ portfolio });
  const { project_name, project_description, technologies, attachements } =
    portfolio;

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="rounded-md overflow-hidden">
        {attachements && (
          <Carousel showThumbs={false}>
            {attachements?.map((item) => (
              <div key={item}>
                <img
                  src={item}
                  className="h-48 w-full object-cover rounded-3"
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <img src="" alt="" />
      <p className="text-[14px] text-[#374151] font-[500]">{project_name}</p>
    </div>
  );
};

export default PortfolioCard;
