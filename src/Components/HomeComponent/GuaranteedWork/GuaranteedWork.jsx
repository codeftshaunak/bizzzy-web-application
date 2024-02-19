import { FaStar } from "react-icons/fa";

const GuaranteedWork = () => {
  return (
    <section className="my-8 relative">
      <div className="flex justify-between lg:flex-row flex-col gap-3">
        <h1 className="font-semibold md:text-[50px] text-[1.6rem]">
          Guaranteed work. <br /> Guaranteed Payment
        </h1>
        <p className="text-[20px]">
          You have the opportunity to enlist top-tier talent. <br className="hidden lg:block" /> Right at
          this moment. Right here with us.
        </p>
      </div>

      <div className="pt-[5rem] flex lg:justify-between lg:flex-row flex-col lg:items-center lg:py-[8rem]">
        <div className="flex flex-col gap-y-[50px]">
          <div className="relative my-8">
            <h1 className="-z-50 text-[100px] absolute top-[-70%] text-[#D6D6D6] font-bold">
              01
            </h1>
            <div className="">
              <h1 className="font-bold text-[26px]">See Work as it’s Done</h1>
              <p className="py-2">
                Check in on your contractors as easily as if you were in the
                <br /> same office.
              </p>
            </div>
          </div>
          <div className="relative">
            <h1 className="-z-50 text-[100px] absolute top-[-70%] text-[#D6D6D6] font-bold">
              02
            </h1>
            <div className="">
              <h1 className="font-bold text-[26px]">Build a Team of Experts</h1>
              <p className="py-2">
                Check in on your contractors as easily as if you were in the
                <br /> same office.
              </p>
            </div>
          </div>
          <div className="relative  my-8">
            <h1 className="-z-50 text-[100px] absolute top-[-70%] text-[#D6D6D6] font-bold">
              03
            </h1>
            <div className="">
              <h1 className="font-bold text-[26px]">
                Eliminate Payroll Hassle
              </h1>
              <p className="py-2">
                Check in on your contractors as easily as if you were in the
                <br /> same office.
              </p>
            </div>
          </div>
        </div>
        
        <div className=" lg:absolute mt-[7rem]  md:ml-[-3rem] md:mt-[14rem] lg:m-0 lg:top-[40%] left-[45%]">
          <div className="relative">
            <div>
              <div className="absolute right-[35%] top-[-6%]">
                <div className="text-[1.2rem] bg-white shadow w-fit px-4 py-2 rounded-full flex items-center gap-2">
                  <FaStar className="text-[#FBDB33]" /> Love our work
                </div>
              </div>
              <div className="absolute top-[30%] right-[10%] lg:right-[-10%]">
                <div className="text-[1.2rem] bg-white shadow w-fit px-4 py-2 rounded-full flex items-center gap-2">
                  <FaStar className="text-[#FBDB33]" /> 24/7 Available
                </div>
              </div>
              <div className="absolute top-[50%] lg:left-[-5%]">
                <div className="text-[1.2rem] bg-white shadow w-fit px-4 py-2 rounded-full flex items-center gap-2">
                  <FaStar className="text-[#FBDB33]" />
                  Highly Responsive
                </div>
              </div>
            </div>
            <img
              className=""
              src="./images/GuaranteedworkOne.png"
              alt="Guaranteedwork"
            />
            <img
              className="absolute top-[-30%] left-[40%] -z-50"
              src="./images/GuaranteedworkTow.png"
              alt="Guaranteedwork"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteedWork;
