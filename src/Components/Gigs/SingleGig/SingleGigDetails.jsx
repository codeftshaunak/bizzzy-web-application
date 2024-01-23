import { useRef, useState } from "react";
import { FaPlayCircle, FaPauseCircle, FaRegClock } from "react-icons/fa";
import { formatDistance } from "date-fns";
import { IoMdClose } from "react-icons/io";
import { PiRepeatBold } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { Carousel } from "react-responsive-carousel";

const SingleGigDetails = ({ gig, setIsOpenDetails }) => {
  const [isFullImg, setIsFullImg] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const {
    title,
    pricing,
    project_description,
    updated_at,
    skills,
    images,
    video,
  } = gig;
  const formattedDate = formatDistance(new Date(updated_at), new Date(), {
    addSuffix: true,
  });

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  console.log({ gig });

  return (
    <div className="absolute top-0 left-0 w-full h-fit grid grid-cols-3 gap-20 bg-white/90 backdrop-filter backdrop-blur-2xl p-5 z-50 border rounded-md">
      <div className="col-span-2">
        <span
          className="h-7 w-7 bg-red-500/20 rounded-full absolute -top-2 -right-2 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
          onClick={() => {
            setIsOpenDetails(false), setIsFullImg("");
          }}
        >
          <IoMdClose className="text-2xl" />
        </span>
        <div className="p-5">
          {isFullImg ? (
            <div>
              {" "}
              <img
                src={isFullImg}
                alt=""
                className="w-full rounded-md cursor-pointer"
                onClick={() => setIsFullImg("")}
              />
            </div>
          ) : (
            <div>
              <h4 className="text-3xl font-semibold">{title}</h4>
              <div className="flex gap-5 justify-between mt-3 rounded p-3">
                <div className="flex items-center gap-10">
                  <div className="flex gap-5">
                    <Carousel showThumbs={false}>
                      {images?.map((url) => (
                        <img
                          key={url}
                          src={url}
                          alt=""
                          className="h-[600px] bg-cover rounded-md cursor-pointer hover:grayscale transition"
                          onClick={() => setIsFullImg(url)}
                        />
                      ))}
                      <div className="relative flex items-center justify-center">
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
                    </Carousel>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 justify-between mt-5 rounded p-3">
                <div>
                  <div className="flex gap-3">
                    <p className="text-xl font-semibold">Skills:</p>
                    <div className="flex gap-2 font-semibold">
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-1 border rounded-md px-10 py-5 h-fit mt-20 bg-gray-50 text-sm tracking-wide">
        <h4 className="text-xl font-semibold text-center border-b-2 text-gray-600">
          Some Information
        </h4>

        <div className="flex items-center justify-between gap-1 font-semibold text-gray-700 mt-3">
          Delivery Time
          <span>{pricing?.delivery_days} Days</span>
        </div>
        <div className="flex items-center justify-between gap-1 font-semibold text-gray-700 mt-1">
          Number of Revisions
          <span>{pricing?.revisions}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleGigDetails;
