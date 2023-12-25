import ActiveJobSlider from "./ActiveJobSlider";
import ApplyedJobs from "./ApplyedJobs/ApplyedJobs";

const MyJobsComponentUi = () => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-12">
                    <div>
                        <h2 className="my-3 text-2xl font-medium">Active Jobs</h2>
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