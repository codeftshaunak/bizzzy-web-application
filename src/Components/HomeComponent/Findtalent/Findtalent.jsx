/* eslint-disable react/no-children-prop */
import { CommonButtonTranparent } from "../../Global/Buttons/Buttons";

const Findtalent = () => {
  return (
    <section className="my-8">
      <div className="flex justify-between lg:flex-row flex-col">
        <h1 className="font-semibold md:text-[50px] text-[1.6rem]">
          Find talent
          <br /> right way.
        </h1>
        <p className="text-[20px]">
          Work with the largest network of independent professionals and <br />{" "}
          get things done—from quick turnarounds to big transformations.
        </p>
      </div>

      <div className="flex mt-4 items-center flex-col lg:flex-row gap-[40px] py-10 w-auto">
        <div className="w-full h-full md:w-[600px] md:h-[385px] relative bg-[url('./images/TalentBannerOne.png')] bg-no-repeat p-10">
          <div className="absolute bottom-[20%]">
            <div className="flex flex-col">
              <h1 className="text-[2rem] text-white my-6">
                Post a Job and Hire a Pro
              </h1>
            </div>
            <CommonButtonTranparent children={"Become a Freelancer"} />
          </div>
        </div>

        <div className=" md:w-[600px] md:h-[385px] bg-[url('./images/TalentBannerTow.png')] bg-no-repeat p-10 relative">
          <div className="absolute bottom-[20%]">
            <div className="flex flex-col">
              <h1 className="text-[2rem] text-white my-6">
              Browse and Buy Projects
              </h1>
            </div>
            <CommonButtonTranparent children={"Become a Freelancer"} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Findtalent;
