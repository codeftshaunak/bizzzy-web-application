import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { Box } from "@chakra-ui/react";
import Select from "react-select/creatable";
import {
  getCategories,
  getSkills,
  getSubCategory,
} from "../../../helpers/freelancerApis";
import { updateAgencyProfile } from "../../../helpers/agencyApis";
import { useQuill } from "react-quilljs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Country, State, City } from "country-state-city";
import { uploadImages } from "../../../helpers/gigApis";
import { useSelector } from "react-redux";
import LoadingButton from "../../LoadingComponent/LoadingButton";
import CTAButton from "../../CTAButton";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link"],
    [{ color: [] }, { background: [] }],

    ["clean"],
  ],
};

export function AgencyUpdatedModal({
  isModal,
  setIsModal,
  title,
  data,
  setIsUpdate,
}) {
  const [isLading, setIsLoading] = useState(false);
  const { quill, quillRef } = useQuill({ modules });
  const { control, register, handleSubmit, reset } = useForm();
  const [categoriesInfo, setCategoriesInfo] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [overview, setOverview] = useState(title === "Overview" ? data : "");
  const [stateCode, setStateCode] = useState({});
  const profileCountry = useSelector(
    (state) => state?.profile?.profile?.location
  );

  // handle modal close
  const handleClose = () => {
    setIsModal(false);
  };
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // handle quill
  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", (_, __, source) => {
        setOverview(quill.root.innerHTML);
      });
      quill.clipboard.dangerouslyPasteHTML(overview);
    }
  }, [quill]);

  // handle update info
  const onSubmit = async (data) => {
    setIsLoading(true);
    const updatedData =
      title === "Sub Category"
        ? {
            agency_services: JSON.parse(data.agency_services),
          }
        : title === "Overview"
        ? { agency_overview: overview }
        : data;

    const imagesFormData = new FormData();
    selectedImages.forEach((sf) => {
      if (sf.file) imagesFormData.append(`imageFiles`, sf.file);
    });

    try {
      // const response = await uploadImages(imagesFormData);
      // console.log("Image upload response:", response);
      await updateAgencyProfile(updatedData);
      setIsUpdate(new Date());
      setIsModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsModal(false);
      setIsLoading(false);
    }
    reset();
  };

  // -------- Manage Services
  const getService = async () => {
    if (!categoriesInfo?.categories && title === "Services") {
      const response = await getCategories();
      setCategoriesInfo({ ...categoriesInfo, categories: response });
    } else if (categoriesInfo?.selectedId) {
      const response = await getSubCategory(categoriesInfo?.selectedId);
      setSubCategories(response);
    }
  };

  // --------- Manage Skills
  const getAllSkills = async () => {
    if (title === "Skills" || title === "Projects") {
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
    if (title === "Skills" || title === "Projects") getAllSkills();
  }, [categoriesInfo]);

  // // --------- Manage Projects
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedImages([...selectedImages, file]);
  // };
  // const handleImageDelete = (indexToRemove) => {
  //   const updatedImages = selectedImages.filter(
  //     (_, index) => index !== indexToRemove
  //   );
  //   setSelectedImages(updatedImages);
  // };

  // manage agency location
  let countryCode;
  let stateData;
  let cityData;
  if (title === "Office Location") {
    countryCode = Country.getAllCountries().find(
      (country) => country.name === profileCountry
    );
    stateData = State.getStatesOfCountry(countryCode?.isoCode).map((state) => ({
      value: state.name,
      label: state.name,
      isoCode: state.isoCode,
    }));
    cityData = City.getCitiesOfState(countryCode?.isoCode, stateCode || "").map(
      (city) => ({
        value: city.name,
        label: city.name,
      })
    );
  }

  return (
    <div>
      {isModal && (
        <div
          onClick={handleClose}
          className="fixed top-0 left-0 flex justify-center items-center z-50 w-full h-full bg-black/30"
        >
          <div
            className="w-[500px] bg-white border rounded-md relative p-5"
            onClick={handleModalClick}
          >
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
                    required
                    defaultValue={data}
                    className="px-3 py-1 border rounded w-full"
                  />
                )}
                {/* update agency tagline */}
                {title === "Agency Tagline" && (
                  <input
                    type="text"
                    {...register("agency_tagline")}
                    required
                    defaultValue={data}
                    className="px-3 py-1 border rounded w-full"
                  />
                )}
                {/* update overview */}
                {title === "Overview" && (
                  <div>
                    <div
                      ref={quillRef}
                      className="w-full h-56 border border-gray-200 rounded-b-md"
                    />
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
                      required
                    >
                      {categoriesInfo &&
                        categoriesInfo?.categories?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.category_name}
                          </option>
                        ))}
                    </select>
                    {
                      <>
                        <p className="mt-5 font-semibold">
                          Select Sub Category
                        </p>
                        <select
                          className="px-3 py-1 border rounded w-full"
                          {...register("agency_services.subCategory")}
                          required
                          disabled={!categoriesInfo?.selectedId}
                        >
                          {subCategories?.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.sub_category_name}
                            </option>
                          ))}
                        </select>
                      </>
                    }
                  </>
                )}
                {title === "Sub Category" && (
                  <>
                    <p className="mt-5 font-semibold">Select Sub Category</p>
                    <select
                      className="px-3 py-1 border rounded w-full"
                      {...register("agency_services")}
                      required
                    >
                      {data.map((item) => (
                        <option
                          key={item._id}
                          value={JSON.stringify({
                            subCategory: item._id,
                            category: item.category_id,
                          })}
                        >
                          {item.sub_category_name}
                        </option>
                      ))}
                    </select>
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
                        closeMenuOnSelect={false}
                        onChange={(val) => onChange(val.map((c) => c.value))}
                        options={skills}
                        isMulti
                        required
                      />
                    )}
                  />
                )}
                {/* update projects */}
                {/* {title === "Projects" && (
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
                            {...register("agency_portfolio.project_name")}
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
                            {...register(
                              "agency_portfolio.project_description"
                            )}
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
                            name="agency_portfolio.technologies"
                            render={({ field: { onChange, ref } }) => (
                              <Select
                                inputRef={ref}
                                closeMenuOnSelect={false}
                                onChange={(val) =>
                                  onChange(val.map((c) => c.value))
                                }
                                options={skills}
                                isMulti
                                required
                              />
                            )}
                          />
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
                )} */}

                {/*------------- Right Side of Agency Profile */}
                {/* update hourly rate */}
                {title === "Hourly Rate" && (
                  <input
                    type="number"
                    {...register("agency_hourlyRate")}
                    defaultValue={Number(data)}
                    required
                    className="px-3 py-1 border rounded w-full"
                  />
                )}
                {/* update office location */}
                {title === "Office Location" && (
                  <div>
                    <p>Your Country</p>
                    <select
                      className="w-full px-2 py-1 border rounded"
                      {...register("agency_location.country")}
                      defaultValue={profileCountry}
                    >
                      <option value={profileCountry}>{profileCountry}</option>
                    </select>
                    <div className="w-full flex gap-5 mt-3">
                      <div className="w-1/2">
                        <p>Select State</p>
                        <Controller
                          control={control}
                          name="agency_location.state"
                          render={({ field: { onChange, ref } }) => (
                            <Select
                              className="w-full"
                              inputRef={ref}
                              onChange={(val) => {
                                onChange(val.value), setStateCode(val.isoCode);
                              }}
                              options={[...(stateData || [])]}
                              required
                            />
                          )}
                        />
                      </div>
                      <div className="w-1/2">
                        <p>Select City</p>
                        <Controller
                          control={control}
                          name="agency_location.street"
                          render={({ field: { onChange, ref } }) => (
                            <Select
                              className="w-full"
                              inputRef={ref}
                              onChange={(val, action) => {
                                if (action.action === "create-option") {
                                  onChange(action.option.value);
                                } else {
                                  onChange(val.value);
                                }
                              }}
                              options={[
                                ...(cityData || []),
                                {
                                  label: "Create New Field",
                                  value: "__create_new_field__",
                                },
                              ]}
                              required
                              isDisabled={!stateCode}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>Address</p>
                      <input
                        className="w-full px-2 py-1 border rounded"
                        type="text"
                        {...register("agency_location.address")}
                      />
                    </div>
                  </div>
                )}
                {/* update company info */}
                {title === "Agency Size" && (
                  <input
                    type="number"
                    {...register("agency_companyInfo.agency_size")}
                    defaultValue={Number(data)}
                    required
                    className="px-3 py-1 border rounded w-full"
                  />
                )}
                {title === "Founded" && (
                  <input
                    type="date"
                    {...register("agency_companyInfo.agency_foundedYear")}
                    className="px-3 py-1 border rounded w-full"
                    required
                  />
                )}
                {/* {title === "Client" && (
                  <input
                    type="text"
                    {...register("agency_companyInfo.agency_focus")}
                    className="px-3 py-1 border rounded w-full"
                  />
                )} */}
              </div>

              <div className="text-right mt-10">
                {/* <input
                  type="submit"
                  className="w-fit h-fit bg-green-600 hover:bg-green-500 rounded px-10 py-1 text-white font-semibold transition cursor-pointer"
                  value={"Submit"}
                /> */}
                {isLading ? (
                  <LoadingButton />
                ) : (
                  <CTAButton
                    text="Submit"
                    bg="var(--primarycolor)"
                    color="#fff"
                    fontWeight="500"
                    height="2.5rem"
                    borderRadius="5px"
                    fontSize="1rem"
                    type="submit"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
