import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { Box } from "@chakra-ui/react";
import Select from "react-select/creatable";
import {
  getCategories,
  getSkills,
  getSubCategory,
} from "../../../helpers/freelancerApis";
import {
  updateAgencyProfile
} from "../../../helpers/agencyApis";
import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import { FaCloudUploadAlt } from "react-icons/fa";

export function AgencyUpdatedModal({
  isModal,
  setIsModal,
  title,
  data,
  setIsUpdate,
}) {
  const { quill, quillRef } = useQuill();
  const { control, register, handleSubmit } = useForm();
  const [categoriesInfo, setCategoriesInfo] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // handle update info
  const onSubmit = async (data) => {
    try {
      await updateAgencyProfile(data);
      setIsUpdate(new Date());
      console.log({ data });
      setIsModal(false);
    } catch (error) {
      console.log(error);
      setIsModal(false);
    }
    console.log("modal", data);
  };

  // -------- Manage Services
  const getService = async () => {
    if (!categoriesInfo?.categories && title === "Services") {
      const response = await getCategories();
      setCategoriesInfo({ ...categoriesInfo, categories: response });
    } else if (categoriesInfo?.selectedId) {
      console.log(categoriesInfo?.selectedId);
      const response = await getSubCategory(categoriesInfo?.selectedId);
      setSubCategories(response);
    }
  };

  // --------- Manage Skills
  const getAllSkills = async () => {
    if (title === "Skills") {
      try {
        const response = await getSkills(data?.category, data?.category);
        setSkills(
          response?.map((item) => ({
            label: item.skill_name,
            value: item.skill_name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getService();
    if (title === "Skills") getAllSkills();
  }, [categoriesInfo]);

  // --------- Manage Projects
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImages([...selectedImages, file]);
  };
  const handleImageDelete = (indexToRemove) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedImages(updatedImages);
  };
  console.log({ categoriesInfo, subCategories });

  return (
    <div>
      {isModal && (
        <div className="fixed top-0 left-0 flex justify-center items-center z-50 w-full h-full bg-black/30">
          <div className="w-[500px] bg-white border rounded-md relative p-5">
            <span
              className="h-7 w-7 bg-red-100/20 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
              onClick={() => {
                setIsModal(false);
              }}
            >
              <IoMdClose className="text-2xl" />
            </span>
            <h4 className="text-xl font-semibold capitalize">Update {title}</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5">
                {/* -----------Left Side of Agency Profile */}
                {/* update agency name */}
                {title === "Agency Name" && (
                  <input
                    type="text"
                    {...register("agency_name")}
                    defaultValue={data}
                    className="px-3 py-1 border rounded w-full"
                  />
                )}
                {/* update agency tagline */}
                {title === "Agency Tagline" && (
                  <input
                    type="text"
                    {...register("agency_tagline")}
                    defaultValue={data}
                    className="px-3 py-1 border rounded w-full"
                  />
                )}
                {/* update overview */}
                {title === "Overview" && (
                  <div>
                    <Box w="100%" h={300} ref={quillRef} />
                  </div>
                )}
                {/* update services */}
                {title === "Services" && (
                  <>
                    <p className="font-semibold">Select Category</p>
                    <select
                      className="px-3 py-1 border rounded w-full"
                      {...register("agency_services.category", {
                        onChange: (e) => {
                          setCategoriesInfo({
                            ...categoriesInfo,
                            selectedId: e.target.value,
                          });
                        },
                      })}
                    >
                      {categoriesInfo &&
                        categoriesInfo?.categories?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.category_name}
                          </option>
                        ))}
                    </select>
                    {categoriesInfo?.selectedId && (
                      <>
                        <p className="mt-5 font-semibold">
                          Select Sub Category
                        </p>
                        <select
                          className="px-3 py-1 border rounded w-full"
                          {...register("agency_services.subCategory")}
                        >
                          {subCategories?.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.sub_category_name}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  </>
                )}
                {/* update skills */}
                {title === "Skills" && skills.length > 0 && (
                  <Controller
                    control={control}
                    name="agency_skills"
                    render={({ field: { onChange, ref } }) => (
                      <Select
                        inputRef={ref}
                        onChange={(val) => onChange(val.map((c) => c.value))}
                        options={skills}
                        isMulti
                      />
                    )}
                  />
                )}
                {/* update projects */}
                {title === "Projects" && (
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
                          />
                        </div>
                        <br />
                      </div>
                      <div className="flex flex-col gap-[2px]">
                        <p className="text-[14px] font-[500] text-[#374151]">
                          Technologies
                        </p>
                        <div className="w-[100%] outline-none border-[1px] rounded-md">
                          <Select closeMenuOnSelect={false} isMulti />
                        </div>
                      </div>
                      <div className="flex flex-col gap-[2px] mt-6">
                        <p className="text-[14px] font-[500] text-[#374151]">
                          Media
                        </p>
                        <div className="w-[100%] p-[12px] outline-none border-[1px] rounded-md flex gap-2">
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
                                    {selectedImages.length > 0
                                      ? "Add More"
                                      : "Add"}
                                  </span>
                                </div>
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/*------------- Right Side of Agency Profile */}
                {/* update hourly rate */}
                {title === "Hourly Rate" && (
                  <input
                    type="number"
                    {...register("agency_hourlyRate")}
                    defaultValue={data}
                    className="px-3 py-1 border rounded w-full"
                  />
                )}
              </div>

              <div className="text-right mt-10">
                <input
                  type="submit"
                  className="w-fit h-fit bg-green-600 hover:bg-green-500 rounded px-10 py-1 text-white font-semibold transition cursor-pointer"
                  value={"Submit"}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
