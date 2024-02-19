/* eslint-disable react/no-children-prop */
import StarIcon from "../../../assets/icons/star";
import { MainButton, MainButtonTranparent } from "../../Global/Buttons/Buttons";
import { FaStar } from "react-icons/fa";

function ReviewCard() {
  return (
    <div className=" px-3 py-3 bg-white rounded-full border shadow">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img src={"./images/user.jpeg"} className="rounded-full w-[3.5rem]" />
          <div className="bg-[#32FF46] rounded-full w-[1rem] h-[1rem] absolute right-0 bottom-0"></div>
        </div>
        <div>
          <h1 className="font-semibold">John Adam.</h1>
          <p className="text-[12px]">Customer Support Consultant</p>
          <h1 className="flex items-center gap-2 text-[12px]">
            <FaStar className="text-[#FBDB33]" /> 4.5.0 of 4 Reviews
          </h1>
        </div>
      </div>
    </div>
  );
}

const HeroSection = () => {
  return (
    <div className="flex w-[100%] justify-between items-center lg:flex-row flex-col">
      <div className="lg:ml-[-1.6rem]">
        <div className="flex mb-4 items-center gap-2 text-[#16A34A] text-[16px] border w-fit px-4 py-2 rounded-full bg-[#DAEFE2]">
          <img src="./icons/starIcons.png" alt="stations" /> The future of Work{" "}
        </div>
        <h1 className="font-bold md:text-[55px] text-[1.6rem]">
          Welcome to the <br className="lg:block hidden"/>
          World’s <span className="italic text-[#16A34A]">
            Fastest Growing
          </span>{" "}
          <br className="lg:block hidden" />
          Freelance Platform.
        </h1>
        <p className="text-[20px] mt-6">
          Forget the old rules. You can have the best people.
          <br className="lg:block hidden"/>
          Right now. Right here.
        </p>
        <div className="flex md:flex-row flex-col items-center gap-4 md:w-fit w-full my-8">
          <MainButton children={"Become a Freelancer"}  />
          <MainButtonTranparent children={"Hire a Freelancer"} />
        </div>
      </div>
      <div className="md:heroBgSection relative lg:mr-[2rem]">
        <div className="absolute top-[18%]  right-[-11%] hidden md:block">
          <ReviewCard />
        </div>
        <div className="absolute bottom-[35%] left-[-20%]  hidden md:block">
          <ReviewCard />
        </div>
        <img src="./images/heroBanner.png" alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
