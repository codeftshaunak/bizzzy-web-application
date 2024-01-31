import React from "react";

export const FreelancerDetailsModal = (isOpenModal, setIsOpenModal) => {

    return (
        <div>
            {isOpenModal && (
                <div className="fixed top-0 left-0 flex justify-center items-center z-50 w-full h-full bg-black/30">
                    <div className="w-[500px] bg-white border rounded-md relative p-5">
                        <h1 className="m-0 p-0 text-xl font-semibold">Freelancer Details</h1>
                    </div>
                </div>
            )}
        </div>
    );
}
