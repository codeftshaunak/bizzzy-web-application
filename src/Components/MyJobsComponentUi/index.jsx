import React from "react";
import ActiveJobSlider from "./ActiveJobSlider";
import ApplyedJobs from "./ApplyedJobs/ApplyedJobs";

const MyJobsComponentUi = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-12">
                    <div>
                        <h2 className=" text-[25px] mb-2 font-semibold">Active Jobs</h2>
                    </div>
                    <div className="my-4">
                        <ActiveJobSlider />
                    </div>
                </div>
            </div>
            <div>
                <ApplyedJobs />
            </div>
        </div>
    )
}

export default MyJobsComponentUi