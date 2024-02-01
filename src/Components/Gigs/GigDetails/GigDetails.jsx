import { useEffect, useRef, useState } from "react";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaRegClock,
  FaCheck,
} from "react-icons/fa";
import { addDays, format } from "date-fns";
import { IoMdClose } from "react-icons/io";
import HomeLayout from "../../../Layouts/HomeLayout";
import { useNavigate, useParams } from "react-router-dom";
import { getGigDetails } from "../../../helpers/gigApis";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";

const GigDetails = () => {
  const [gigData, setGigData] = useState({});
  const [isFullImg, setIsFullImg] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const {
    title,
    pricing,
    skills,
    images,
    video,
    project_description,
    requirements,
    steps,
  } = gigData;

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const gigDetails = async () => {
    try {
      const response = await getGigDetails(id);
      setGigData(response.body[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // handle back button
  const handleBackward = () => {
    navigate(-1);
  };

  // handle edit button
  const handleGigEdit = () => {
    navigate(`/freelancer/gig/edit/${id}`);
  };

  useEffect(() => {
    gigDetails();
  }, []);

  // automatic render service option
  const renderOptions = () => {
    const { service_options } = pricing;

    return Object.keys(service_options).map((option) => {
      const condition = service_options[option];

      return condition ? (
        <div
          key={option}
          className="flex items-center justify-between gap-1 font-semibold text-gray-700 mt-1 capitalize"
        >
          {option.replace(/_/g, " ")}
          <FaCheck className="text-green-600" />
        </div>
      ) : null;
    });
  };

  return (
    <HomeLayout>
      <div className="w-full p-5 border rounded-md relative">
        <div className="flex gap-5 justify-end">
          <button
            onClick={handleBackward}
            className="text-start px-10 py-1 rounded border-2 border-[var(--primarytextcolor)] text-white hover:text-black bg-[var(--primarytextcolor)] hover:bg-white transition h-fit mt-auto w-fit font-semibold"
          >
            Back
          </button>
          <button
            onClick={handleGigEdit}
            className="text-start px-10 py-1 rounded border-2 border-[var(--primarytextcolor)] hover:text-white text-black hover:bg-[var(--primarytextcolor)] bg-white transition h-fit mt-auto w-fit font-semibold"
          >
            Edit
          </button>
        </div>
        {gigData !== undefined && (
          <div className="grid grid-cols-3 mt-3 gap-16">
            <div className="col-span-2">
              <div className="p-5">
                {isFullImg ? (
                  <div className="absolute top-0 left-0 bg-white w-full">
                    <span
                      className="h-7 w-7 bg-red-500/20 rounded-full absolute -top-2 -right-2 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                      onClick={() => {
                        setIsFullImg("");
                      }}
                    >
                      <IoMdClose className="text-2xl" />
                    </span>
                    <img
                      src={isFullImg}
                      alt=""
                      className="w-full h-fit rounded-md cursor-pointer"
                      onClick={() => setIsFullImg("")}
                    />
                  </div>
                ) : (
                  <div>
                    <h4 className="text-3xl font-semibold">{title}</h4>
                    <div className="flex gap-5 justify-between mt-3 rounded p-3">
                      <div className="flex items-center gap-10 w-full">
                        <div className="w-full relative">
                          <Swiper
                            modules={[Navigation]}
                            navigation={{
                              prevEl: prevRef.current,
                              nextEl: nextRef.current,
                            }}
                          >
                            {images?.map((url) => (
                              <SwiperSlide key={url}>
                                <div
                                  className="h-[600px] w-full bg-cover rounded-md cursor-pointer hover:grayscale transition"
                                  style={{ backgroundImage: `url(${url})` }}
                                  onClick={() => setIsFullImg(url)}
                                ></div>
                              </SwiperSlide>
                            ))}
                            <SwiperSlide>
                              <div className="relative flex items-center justify-center w-full">
                                <video
                                  ref={videoRef}
                                  src={video}
                                  alt="Video Review"
                                  className="h-[600px] w-full rounded-md"
                                  controls={false}
                                />
                                <div
                                  className="absolute rounded-md cursor-pointer"
                                  onClick={handlePlayPauseClick}
                                >
                                  {isPlaying ? (
                                    <FaPauseCircle className="text-6xl text-white/60" />
                                  ) : (
                                    <FaPlayCircle className="text-6xl text-white/60" />
                                  )}
                                </div>
                              </div>
                            </SwiperSlide>
                          </Swiper>
                          <button
                            ref={prevRef}
                            className="absolute top-1/2 -left-4 z-20 bg-green-100 rounded-full shadow -mt-4"
                          >
                            <MdNavigateBefore className="text-4xl" />
                          </button>
                          <button
                            ref={nextRef}
                            className="absolute top-1/2 -right-4 z-20 bg-green-100 rounded-full shadow -mt-4"
                          >
                            <MdNavigateNext className="text-4xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 justify-between mt-5 rounded p-3 tracking-wide">
                      <div>
                        <p className="text-xl font-bold text-gray-700">
                          Project Details
                        </p>
                        <div className="mt-2">
                          {project_description?.project_summary}
                        </div>
                        <div className="mt-7">
                          <p className="text-xl font-bold text-gray-700">
                            Technology:
                          </p>
                          <div className="flex gap-2 font-semibold mt-2">
                            {skills?.map((item) => (
                              <span
                                key={item}
                                className="px-2 h-fit bg-gray-50 border rounded-full"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-10">
                          <p className="text-xl font-bold text-gray-700">
                            Requirements:
                          </p>
                          <ul className="mt-2">
                            {requirements?.map((item) => (
                              <li key={item._id}>{item.requirement}</li>
                            ))}
                          </ul>
                          <div className="mt-10">
                            <p className="text-xl font-bold text-gray-700">
                              Delivery Progress:
                            </p>
                            <div className="mt-2">
                              {steps?.map((item, index) => (
                                <div key={item._id} className="mt-2">
                                  <p className="font-semibold capitalize">
                                    {index + 1}. {item.step_title}
                                  </p>
                                  <p>{item.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-10">
                          <p className="text-xl font-bold text-gray-700">
                            Frequently Asked Questions:
                          </p>
                          <ul className="mt-2">
                            {project_description?.faqs?.map((item, index) => (
                              <div key={item._id} className="mt-2">
                                <p className="font-semibold text-lg capitalize">
                                  {index + 1}. {item.question}
                                </p>
                                <p>{item.answer}</p>
                              </div>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-1 border rounded-md px-10 py-5 h-fit mt-20 bg-green-50 tracking-wide">
              <h4 className="text-xl font-bold text-center border-b-2 pb-2 text-gray-700">
                Overview Information
              </h4>

              <div className="flex items-center justify-between gap-1 font-semibold text-gray-700 mt-3">
                Service Price{" "}
                <span className="text-2xl font-bold">
                  ${pricing?.service_price}
                </span>
              </div>
              <div className="flex items-center justify-between gap-1 font-semibold text-gray-700 mt-3">
                Delivery Time
                <span>{pricing?.delivery_days} Days</span>
              </div>
              <div className="flex items-center justify-between gap-1 font-semibold text-gray-700 mt-2">
                Number of Revisions
                <span>{pricing?.revisions}</span>
              </div>
              <div>{pricing?.service_options && renderOptions()}</div>

              <div className="mt-5 flex items-start gap-2">
                <FaRegClock className="text-lg mt-1" />
                <div>
                  <p className="font-semibold">
                    {pricing?.delivery_days
                      ? `${pricing.delivery_days} days delivery - ${format(
                        addDays(new Date(), pricing.delivery_days),
                        "MMM dd, yyyy"
                      )}`
                      : null}
                  </p>
                  <p className="text-gray-300 text-sm">
                    Revision may occur after this date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default GigDetails;
