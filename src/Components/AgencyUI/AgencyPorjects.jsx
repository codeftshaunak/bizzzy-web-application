import { Box, Text, Image, VStack, HStack, Button } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select/creatable";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { getSkills } from "../../helpers/freelancerApis";
import { FiPlus } from "react-icons/fi";
import { createAgencyProject } from "../../helpers/agencyApis";
import { uploadImages } from "../../helpers/gigApis";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import UniversalModal from "../Modals/UniversalModal";

const AgencyProjects = ({ agency, setAgency }) => {
  const [isLading, setIsLoading] = useState(false);
  const { control, register, handleSubmit, reset } = useForm();
  const [isModal, setIsModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [skills, setSkills] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { agency_services } = agency;

  const onSubmit = async (data) => {
    setIsLoading(true);
    const imagesFormData = new FormData();

    selectedImages.forEach((sf) => {
      imagesFormData.append(`imageFiles`, sf);
    });

    try {
      const response = await createAgencyProject(data);
      const portfolio = response.agency_portfolio.slice(-1)[0];
      if (response?._id) {
        imagesFormData.append("ref", "agency_project_portfolio");
        imagesFormData.append("agency_id", response._id);
        if (portfolio?._id) {
          const response = await uploadImages(
            imagesFormData,
            `?portfolio_id=${portfolio._id}`
          );
          setAgency(response.body);
        }
      }
      setIsModal(false);
      // setAgency(new Date());
      setSelectedImages([]);
      setIsLoading(false);
    } catch (error) {
      setIsModal(false);
      setSelectedImages([]);
      setIsLoading(false);
    }
    reset();
  };

  const getAllSkills = async () => {
    try {
      const response = await getSkills(agency_services?.category);
      setSkills(
        response?.map((item) => ({
          label: item.skill_name,
          value: item.skill_name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (skills.length < 1) getAllSkills();
  }, [agency]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImages((prev) => [...prev, file]);
  };
  const handleImageDelete = (indexToRemove) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedImages(updatedImages);
  };
  return (
    <>
      <Box width={"100%"}>
        <HStack>
          <Text fontSize={"1.3rem"} fontWeight={"600"} marginBottom={"0px"}>
            Projects
          </Text>
          {/* {!!agency?.agency_services && (
            <VStack
              backgroundColor={"white"}
              borderRadius={"50%"}
              width={"30px"}
              border={"1px solid var(--primarycolor)"}
              height={"30px"}
              alignItems={"center"}
              justifyContent={"center"}
              transition={"0.6s ease-in-out"}
              cursor={"pointer"}
              _hover={{
                border: "2px solid var(--primarycolor)",
                backgroundColor: "transparent",
                color: "var(--primarycolor)",
              }}
              onClick={() => setIsModal(true)}
            >
              <RiEdit2Fill fontSize={"15px"} />
            </VStack>
          )} */}
          {
            <VStack
              backgroundColor={"white"}
              borderRadius={"50%"}
              width={"30px"}
              border={"1px solid var(--primarycolor)"}
              height={"30px"}
              alignItems={"center"}
              justifyContent={"center"}
              transition={"0.6s ease-in-out"}
              cursor={"pointer"}
              _hover={{
                border: "2px solid var(--primarycolor)",
                backgroundColor: "transparent",
                color: "var(--primarycolor)",
              }}
              onClick={() => setIsModal(true)}
            >
              <FiPlus fontSize={"25px"} />
            </VStack>
          }
        </HStack>
        {agency.agency_portfolio?.length > 0 ? (
          <div className="mr-12 relative mt-3">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              modules={[Navigation, Pagination]}
            >
              {agency.agency_portfolio.map((item) => (
                <SwiperSlide key={item._id}>
                  <ProjectCard info={item} />
                </SwiperSlide>
              ))}
            </Swiper>
            {agency.agency_portfolio.length > 3 && (
              <>
                <button
                  ref={prevRef}
                  className="absolute top-1/2 -left-2 z-20 bg-green-100 rounded-full shadow -mt-4"
                >
                  <MdNavigateBefore className="text-3xl" />
                </button>
                <button
                  ref={nextRef}
                  className="absolute top-1/2 -right-2 z-20 bg-green-100 rounded-full shadow -mt-4"
                >
                  <MdNavigateNext className="text-3xl" />
                </button>
              </>
            )}
          </div>
        ) : (
          <Box marginTop={"20px"}>
            <Image
              src="./images/404not-added.png"
              width={"150px"}
              display={"block"}
              margin={"auto"}
            ></Image>
            <Text fontSize={"1.3rem"} textAlign={"center"} fontWeight={"600"}>
              You haven&apos;t added your project!
            </Text>
            <Text fontSize={"1rem"} textAlign={"center"}>
              Add your best build for attract visitors!!!
            </Text>
          </Box>
        )}
      </Box>

      {/* Only New Project Creating UI */}
      <UniversalModal
        isModal={isModal}
        setIsModal={setIsModal}
        title={"Create Portfolio"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col">
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Project Name
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Project Name"
                    required
                    {...register("project_name")}
                  />
                </div>
                <br />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Project Description
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <textarea
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Description"
                    required
                    {...register("project_description")}
                  />
                </div>
                <br />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Technologies
                </p>
                <div className="w-[100%] outline-none border-[1px] rounded-md">
                  <Controller
                    control={control}
                    name="technologies"
                    render={({ field: { onChange, ref } }) => (
                      <Select
                        inputRef={ref}
                        required
                        closeMenuOnSelect={false}
                        onChange={(val) => onChange(val.map((c) => c.value))}
                        options={skills}
                        isMulti
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[2px] mt-6">
                <p className="text-[14px] font-[500] text-[#374151]">Media</p>
                <div className="w-[100%] p-[12px] outline-none border-[1px] rounded-md flex">
                  <div className="flex">
                    {selectedImages?.map((image, index) => (
                      <div
                        key={index}
                        className="rounded border border-green-300 mr-2 relative"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Selected ${index + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <span
                          className="h-5 w-5 bg-red-50/10 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                          onClick={() => handleImageDelete(index)}
                        >
                          <IoMdClose />
                        </span>
                      </div>
                    ))}
                  </div>
                  {selectedImages.length < 3 && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        name="file"
                        multiple
                        style={{ display: "none" }}
                        id="fileInput"
                        disabled={selectedImages.length >= 3}
                      />
                      <label htmlFor="fileInput">
                        <div
                          className={`w-24 h-20 border border-green-400 rounded cursor-pointer bg-green-100 hover:bg-green-200 flex flex-col items-center justify-center text-center`}
                        >
                          <span>
                            <FaCloudUploadAlt className="text-2xl text-center" />
                          </span>
                          <span className="font-semibold">
                            {selectedImages.length > 0 ? "Add More" : "Add"}
                          </span>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right mt-10">
            <Button
              isLoading={isLading}
              loadingText="Submitting"
              colorScheme="whatsapp"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </UniversalModal>
    </>
  );
};

export default AgencyProjects;
