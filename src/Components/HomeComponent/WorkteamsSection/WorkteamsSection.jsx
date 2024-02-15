import { MdOutlineArrowOutward } from "react-icons/md";


const WorkteamsCard = ({image, title, subTitle})=>{
    return(
        <div className="bg-[#F3F8F5] rounded-lg px-[30px] py-[40px] lg:w-[390px] lg:h-300px]">
            <div className="flex justify-between">
                <div className="relative">
                    <div  className="z-50">
                    <img
                        src={`./icons/${image}`}
                    />
                    </div>
                    {/* <div className="bg-white w-[3rem] h-[3rem] rounded-full absolute top-6 left-8 "></div> */}
                </div>
                <div className="bg-white h-fit w-fit p-3 rounded-full">
                <MdOutlineArrowOutward className="text-[#B0FFCD] text-[2rem]" />
                </div>
            </div>
            <div>
                <h1 className="text-[28px] font-semibold py-[20px]">{title}</h1>
                <p className="text-[18px]">{subTitle}</p>
            </div>
        </div>
    )
}

const WorkteamsSection = () => {
    return (
        <section className="my-8">
          <div className="flex justify-between lg:flex-row flex-col">
            <h1 className="font-semibold md:text-[50px] text-[1.6rem]">Why Online <br/> Workteams?</h1>
            <p className="text-[20px] my-2">You have the opportunity to enlist top-tier talent. Right at <br/> this moment. Right here with us.</p>
          </div>

          <div className="flex lg:flex-row flex-col gap-[40px] py-[50px]">
            <WorkteamsCard image={"jobsIcons.png"} title={"Flexibility"} subTitle={"Ramp up and down, from short-term engagemennnts to full-time teams"}/>
            <WorkteamsCard image={"bagsIcons.png"} title={"Cost Saving"} subTitle={"Pay only for hours worked. Hourly rates fit any budget."}/>
            <WorkteamsCard image={"contactIcons.png"} title={"Access to Talent"} subTitle={"Hire the best from around the world."}/>
          </div>
        </section>
    );
};

export default WorkteamsSection;