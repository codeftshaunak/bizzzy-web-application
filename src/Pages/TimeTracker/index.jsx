import React from 'react';
import HomeLayout from '../../Layouts/HomeLayout';
import Workdairy from '../../Components/WorkDairy/Workdairy';
import Report from '../../Components/WorkDairy/Report';

const TimeTracker = () => {
    return (
        <HomeLayout>
            <Workdairy />
            <Report />
        </HomeLayout>
    );
};

export default TimeTracker;
