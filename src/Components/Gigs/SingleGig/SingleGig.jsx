import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { IoIosMore, IoMdClose } from "react-icons/io";
import { AiOutlineShareAlt } from "react-icons/ai";
import { deleteFreelancerGig } from "../../../helpers/gigApis";
import { useNavigate } from "react-router-dom";

const SingleGig = ({ gig, getAllGigs }) => {
  const [isMenu, setIsMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { title, images, _id } = gig;
  const toast = useToast();
  const navigate = useNavigate();

  // handle details & edit button
  const handleGigEdit = () => {
    navigate(`/freelancer/gig/edit/${_id}`);
  };
  const handleGigDetails = () => {
    navigate(`/freelancer/gig/details/${_id}`);
  };

  const handleDelete = async (value) => {
    if (value === "modal") {
      setIsModal(true);
    } else if (value === "delete") {
      try {
        const response = await deleteFreelancerGig(gig._id);
        if (response?.code === 200) {
          toast({
            title: response.msg,
            duration: 3000,
            isClosable: true,
            colorScheme: "green",
            position: "top-right",
          });
          setIsModal(false);
          getAllGigs();
        }
      } catch (error) {
        console.log(error);
        setIsModal(false);
      }
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-between gap-16 bg-gray-50 px-5 py-3 rounded-md"
        onMouseLeave={() => setIsMenu(false)}
      >
        <div className="flex gap-3 items-center">
          {/* <img src={images[0]} className="h-16 w-28 bg-cover" /> */}
          <div
            className={` h-16 w-28 bg-cover`}
            style={{ backgroundImage: `url(${images[0]})` }}
          ></div>
          <div>
            <h4 className="text-lg font-semibold text-gray-600">{title}</h4>
          </div>
        </div>
        <div>
          {
            <div className="relative flex items-center gap-3">
              <div className="cursor-pointer border border-[var(--primarytextcolor)] bg-white hover:bg-gray-200/30 p-1 rounded-full z-0">
                <AiOutlineShareAlt />
              </div>
              <div
                className="cursor-pointer border border-[var(--primarytextcolor)] bg-white hover:bg-gray-200/30 p-1 rounded-full z-0"
                onClick={() => setIsMenu(true)}
              >
                <IoIosMore />
              </div>

              {isMenu && (
                <div
                  className="absolute right-9 -top-11 bg-white  z-30"
                  onMouseEnter={() => {
                    setIsMenu(true);
                  }}
                  onMouseLeave={() => {
                    setIsMenu(false);
                  }}
                >
                  <div className="relative w-full h-fit bg-white p-2 shadow rounded">
                    <div className="w-4 h-4 shadow bg-white absolute -right-1 top-[45%] rotate-45 -z-10"></div>
                    <div
                      className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                      onClick={handleGigDetails}
                    >
                      Details
                    </div>
                    <div
                      className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                      onClick={handleGigEdit}
                    >
                      Edit
                    </div>
                    <div
                      className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                      onClick={() => handleDelete("modal")}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      </div>
      {isModal && (
        <div className="fixed top-0 left-0 flex justify-center items-center z-50 w-full h-full bg-black/30">
          <div className="bg-white w-[500px] h-72 rounded-lg p-10 relative">
            {" "}
            <span
              className="h-7 w-7 bg-red-100/20 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
              onClick={() => {
                setIsModal(false);
              }}
            >
              <IoMdClose className="text-2xl" />
            </span>
            <div className="flex flex-col justify-between h-full w-full">
              <div>
                <h4 className="text-3xl font-semibold text-center">
                  Are you wish to proceed?
                </h4>
                <p className="mt-3 text-gray-600 text-center">
                  Deleting this gig is an irreversible action. I would like to
                  implement a standard naming convention.
                </p>
              </div>
              <div className="flex gap-5 font-semibold mt-auto w-full">
                <button
                  onClick={() => {
                    setIsModal(false);
                  }}
                  className="w-full px-5 py-1 border-2 border-green-500 hover:text-white hover:bg-green-500 bg-green-100 rounded-md transition"
                >
                  No, Keep it.
                </button>
                <button
                  onClick={() => handleDelete("delete")}
                  className="w-full px-5 py-1 bg-green-500 hover:bg-green-600 transition rounded-md text-white"
                >
                  Yes, Delete!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleGig;
