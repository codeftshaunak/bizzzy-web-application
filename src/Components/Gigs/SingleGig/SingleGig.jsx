import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { IoIosMore } from "react-icons/io";
import { AiOutlineShareAlt } from "react-icons/ai";
import { deleteFreelancerGig } from "../../../helpers/gigApis";
import { useNavigate } from "react-router-dom";

const SingleGig = ({ gig, getAllGigs }) => {
  const [isMenu, setIsMenu] = useState(false);
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

  const handleDelete = async () => {
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
        getAllGigs();
      }
    } catch (error) {
      console.log(error);
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
                      onClick={handleDelete}
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
    </>
  );
};

export default SingleGig;
