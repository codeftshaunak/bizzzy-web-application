/* eslint-disable react/no-children-prop */
import { CommonButton } from "../../Global/Buttons/Buttons";

const DreamsInto = () => {
  return (
    <section className="bg-[url('./images/DreamsInto.png')] bg-no-repeat bg-cover bg-center w-full h-full rounded-xl p-[2rem] lg:p-[5rem]">
      <div className="flex justify-between lg:flex-row flex-col">
        <div>
          <h1 className="text-white text-[1.6rem] font-medium md:text-[40px]">
            Crafting Your Digital Dreams into <br className="hidden lg:block" /> Reality.
          </h1>
          <p className="text-white text-[1.3rem] my-4">
            You can have the best people. Right now. Right here.
          </p>
        </div>
        <div className="my-2">
          <CommonButton children={"Join us"} />
        </div>
      </div>
    </section>
  );
};

export default DreamsInto;
