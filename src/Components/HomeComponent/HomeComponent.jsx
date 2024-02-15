import DreamsInto from "./DreamsInto/DreamsInto";
import Findtalent from "./Findtalent/Findtalent";
import GuaranteedWork from "./GuaranteedWork/GuaranteedWork";
import HeroSection from "./HeroSection/HeroSection";
import WorkteamsSection from "./WorkteamsSection/WorkteamsSection";

const HomeComponent = () => {
    return (
        <div className="mx-auto w-full">
            <HeroSection/>
            <WorkteamsSection/>
            <Findtalent/>
            <GuaranteedWork/>
            <DreamsInto/>
        </div>
    );
};

export default HomeComponent;