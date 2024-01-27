import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useSelector } from 'react-redux';
=======
>>>>>>> parent of db37502 (seperating the git create steps)
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Modal from "react-modal";
import { HStack, useToast } from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  updateFreelancerProfile,
  updateFreelancer,
  uploadImage,
  getAllDetailsOfUser,
} from "../../helpers/userApis";
import { Spinner } from "@chakra-ui/react";
<<<<<<< HEAD
import { getSkills } from "../../helpers/freelancerApis";
import { IoMdClose } from "react-icons/io";

=======
import { getSkills } from "../../helpers/clientApis";
import { IoMdClose } from "react-icons/io";
>>>>>>> parent of db37502 (seperating the git create steps)
export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: " 0",
    borderRadius: "12px",
    overflow: "visible",
  },
};

export const ProfileModal = ({
  modalIsOpen,
  closeModal,
  modalPage,
  selectedEducation,
  inputChange,
}) => {
<<<<<<< HEAD
  // const [userProfileInfo, setUserProfileInfo] = useState(null);

  const userProfileInfo = useSelector((state) => state.profile.profile);


=======
  const [userProfileInfo, setUserProfileInfo] = useState(null);
>>>>>>> parent of db37502 (seperating the git create steps)
  const toast = useToast();
  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const selectStyle = {
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#16A34A",
      color: "#fff",
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#fff",
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#16A34A" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #16A34A" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "#16A34A" : provided.borderColor,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#d1f3dd" : null,
      ":hover": {
        ...provided[":hover"],
        backgroundColor: "#d1f3dd", // Change to your desired hover background color
        color: "colorForTextOnGreen", // Change text color for better visibility if needed
      },
    }),
    // Add any other style customizations here
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const [inputValues, setInputValues] = useState({
    professional_role: "",
    hourly_rate: "",
    description: "",
  });
  const [editProfileInput, setEditProfileInput] = useState({
    profile_image: null,
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditProfileInput({
      profile_image: file,
    });
  };
  const uploadProfileImage = async () => {
    setIsLoader(true);
    try {
      const formData = new FormData();
      // formData.append("profile_image", editProfileInput.profile_image);
      formData.append("file", editProfileInput.profile_image);

      const response = await uploadImage(formData);
      setIsLoader(false);
      closeModal();
    } catch (error) {
      setIsLoader(false);
      console.error("Error uploading image:", error);
    }
  };
  const [experienceInput, setExperienceInput] = useState({
    company_name: "",
    position: "",
    start_date: "",
    end_date: "",
    job_description: "",
    job_location: "",
  });
  const [educationInput, setEducationInput] = useState({
    degree_name: "",
    institution: "",
    start_date: "",
    end_date: "",
  });

  // const [updateEducationInput, setUpdateEducationInput] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    inputChange((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    // console.log(`Setting ${name} to ${value}`);
    // setUpdateEducationInput((prevInput) => ({
    //   ...prevInput,
    //   [name]: value,
    // }));
  };
  // useMemo(() => {
  //   console.log(selectedEducation, updateEducationInput, "setting useeffect");
  //   setUpdateEducationInput((pre)=>({
  //     ...pre,
  //     _id: selectedEducation?._id || "",
  //     degree_name: selectedEducation?.degree_name || "",
  //     institution: selectedEducation?.institution || "",
  //     start_date:
  //       moment(selectedEducation?.start_date).format("YYYY/MM/DD") || "",
  //     end_date: moment(selectedEducation?.end_date).format("YYYY/MM/DD") || "",
  //   }));
  // }, [selectedEducation]);
  const [portfolioInput, setPortfolioInput] = useState({
    project_name: "",
    project_description: "",
    technologies: "",
  });
  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues || []);
  };

<<<<<<< HEAD
=======
  // Get Profile Details
  const userProfile = async () => {
    const response = await getAllDetailsOfUser();
    setUserProfileInfo(response?.body);
  };
  useEffect(() => {
    userProfile();
  }, [closeModal]);
>>>>>>> parent of db37502 (seperating the git create steps)

  // Handle Updating Skills Methods
  const getCategorySkills = async (categoryIds) => {
    try {
      const validCategoryIds = categoryIds?.filter((category) => category._id);
      const promises = validCategoryIds?.map(async ({ _id }) => {
        try {
          const skills = await getSkills(_id);
<<<<<<< HEAD
          if (skills) {
            return skills?.map((item) => ({
=======
          if (skills && skills.body) {
            return skills.body?.map((item) => ({
>>>>>>> parent of db37502 (seperating the git create steps)
              value: item?.skill_name,
              label: item?.skill_name,
              _id: item?._id,
            }));
          } else {
            return [];
          }
        } catch (error) {
          console.error(`Error fetching skills for category ID ${_id}:`, error);
          return [];
        }
      });

      const results = await Promise.all(promises);
      const newSkillOptions = results.flat();

      setOptions(newSkillOptions);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    if (modalPage === "skills") {
      setSelectedOptions(
        userProfileInfo?.skills?.map((item) => ({
          value: item,
          label: item,
        }))
      );
    }
    getCategorySkills(userProfileInfo?.categories);
  }, [modalIsOpen]);

  // console.log({ selectedOptions });

  // const uploadImages = async (images) => {
  //   try {
  //     const uploadPromises = images.map((image) => uploadImage(image));
  //     const uploadedResults = await Promise.all(uploadPromises);
  //     console.log("Uploaded images:", uploadedResults);
  //     return uploadedResults;
  //   } catch (error) {
  //     console.error("Error uploading images:", error);
  //     throw error;
  //   }
  // };

  const handleSaveAndContinue = async (data) => {
<<<<<<< HEAD
=======
    console.log(data, "data");
>>>>>>> parent of db37502 (seperating the git create steps)
    try {
      if (data === "category") {
        // Handle saving categories
        const selectedCategories = selectedOptions?.map(
          (option) => option.value
        );
        const response = await updateFreelancerProfile({
          categories: selectedCategories,
        });
<<<<<<< HEAD

        console.log({ response });

=======
>>>>>>> parent of db37502 (seperating the git create steps)
        if (response.code === 405) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          closeModal();
          setSelectedOptions([]);
        } else if (response.code === 200) {
          toast({
            title: "Category Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          closeModal();
          setSelectedOptions([]);
        }
      } else if (data === "info") {
        const response = await updateFreelancerProfile({
          professional_role: inputValues.professional_role,
          hourly_rate: inputValues.hourly_rate,
          description: inputValues.description,
        });
        if (response.code === 405) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          closeModal();
          setSelectedOptions([]);
        } else if (response.code === 200) {
          toast({
            title: "Basic Information Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          closeModal();
        }
      } else if (data == "skills") {
        const selectedCategories = selectedOptions.map(
          (option) => option?.value
        );
        console.log(selectedCategories, "selectedCategories");
        const response = await updateFreelancerProfile({
          skills: selectedCategories,
        });
        // console.log({ skills: response });
        if (response.code == 405) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          closeModal();
          setSelectedOptions([]);
        } else if (response.code === 200) {
          toast({
            title: "Skils Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setSelectedOptions([]);
          closeModal();
        }
      } else if (data == "portfolio") {
        const formData = new FormData();
        for (let i = 0; i < selectedImages.length; i++) {
          const file = selectedImages[i];
          if (file) {
            formData.append(`file`, file, file.name);
          }
        }

        formData.append("portfolio[project_name]", portfolioInput.project_name);
        formData.append(
          "portfolio[project_description]",
          portfolioInput.project_description
        );
        // formData.append("technologies", portfolioInput.technologies);


        const response = await updateFreelancerProfile(formData);
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setPortfolioInput({
            project_name: "",
            project_description: "",
            technologies: "",
          });
          closeModal();
        } else if (response.code === 200) {
          // Handle category added successfully
          toast({
            title: "Portfolio Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setPortfolioInput({
            project_name: "",
            project_description: "",
            technologies: "",
          });
          closeModal();
        }
      } else if (data == "experience") {
        const response = await updateFreelancerProfile({
          experience: {
            company_name: experienceInput.company_name,
            job_description: experienceInput.job_description,
            start_date: experienceInput.start_date,
            end_date: experienceInput.end_date,
            job_location: experienceInput.job_location,
            position: experienceInput.position,
          },
        });
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setExperienceInput({
            company_name: "",
            job_description: "",
            start_date: "",
            end_date: "",
            job_location: "",
            position: "",
          });
          closeModal();
        } else if (response.code === 200) {
          // Handle category added successfully
          toast({
            title: "Exprience Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setExperienceInput({
            company_name: "",
            job_description: "",
            start_date: "",
            end_date: "",
            job_location: "",
            position: "",
          });
          closeModal();
        }
      } else if (data == "experienceUpdated") {
        inputChange({
          _id: selectedEducation._id,
          company_name: selectedEducation.company_name,
          job_description: selectedEducation.job_description,
          start_date: selectedEducation.start_date,
          end_date: selectedEducation.end_date,
          job_location: selectedEducation.job_location,
          position: selectedEducation.position,
        });
        const response = await updateFreelancer({
          experience: {
            experienceId: selectedEducation?._id,
            company_name: selectedEducation?.company_name,
            job_description: selectedEducation?.job_description,
            start_date: selectedEducation?.start_date,
            end_date: selectedEducation?.end_date,
            job_location: selectedEducation.job_location,
            position: selectedEducation.position,
          },
        });
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          inputChange({
            company_name: "",
            job_description: "",
            start_date: "",
            end_date: "",
            job_location: "",
            position: "",
          });
          closeModal();
        } else if (response.code === 200) {
          // Handle category added successfully
          toast({
            title: "Education Update Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          inputChange({
            company_name: "",
            job_description: "",
            start_date: "",
            end_date: "",
            job_location: "",
            position: "",
          });
          closeModal();
        }
      } else if (data == "editProfile") {
        const response = await updateFreelancer({
          editProfile: {
            profile_image: editProfileInput.profile_image,
          },
        });
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setEditProfileInput({
            profile: "",
          });
          closeModal();
        } else if (response.code === 200) {
          // Handle category added successfully
          toast({
            title: "Profile Edited Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setEditProfileInput({
            profile: "",
          });
          closeModal();
        }
      } else if (data == "education") {
        const response = await updateFreelancerProfile({
          education: {
            degree_name: educationInput.degree_name,
            institution: educationInput.institution,
            start_date: educationInput.start_date,
            end_date: educationInput.end_date,
          },
        });
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setEducationInput({
            degree_name: "",
            institution: "",
            start_date: "",
            end_date: "",
          });
          closeModal();
        } else if (response.code === 200) {
          // Handle category added successfully
          toast({
            title: "Education Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setEducationInput({
            degree_name: "",
            institution: "",
            start_date: "",
            end_date: "",
          });
          closeModal();
        }
      } else if (data == "educationUpdate") {
        inputChange({
          _id: selectedEducation._id,
          degree_name: selectedEducation.degree_name,
          institution: selectedEducation.institution,
          start_date: selectedEducation.start_date,
          end_date: selectedEducation.end_date,
        });
        const response = await updateFreelancer({
          education: {
            educationId: selectedEducation?._id,
            degree_name: selectedEducation?.degree_name,
            institution: selectedEducation?.institution,
            start_date: selectedEducation?.start_date,
            end_date: selectedEducation?.end_date,
          },
        });
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          inputChange({
            degree_name: "",
            institution: "",
            start_date: "",
            end_date: "",
          });
          closeModal();
        } else if (response.code === 200) {
          // Handle category added successfully
          toast({
            title: "Education Update Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          inputChange({
            degree_name: "",
            institution: "",
            start_date: "",
            end_date: "",
          });
          closeModal();
        }
      } else if (data == "basicInformation") {
        inputChange({
          professional_role: selectedEducation.professional_role,
          hourly_rate: selectedEducation.hourly_rate,
          description: selectedEducation.description,
        });
        const response = await updateFreelancer({
          professional_role: selectedEducation?.professional_role,
          hourly_rate: selectedEducation?.hourly_rate,
          description: selectedEducation?.description,
        });
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          inputChange({
            professional_role: "",
            hourly_rate: "",
            description: "",
          });
          closeModal();
        } else if (response.code === 200) {
          userProfile();
          toast({
            title: "Basic Info Updated Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          inputChange({
            professional_role: "",
            hourly_rate: "",
            description: "",
          });
          closeModal();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Media Image Uploaded
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    //     const formData = new FormData();
    // formData.append("image", file);
    // console.log("formData--->",formData)
    // const files = Array.from(e.target.files);
    // if (selectedImages.length + files.length <= 3) {
    // const selectedFiles = files.filter((file) => file.type.includes("image"));
    setSelectedImages([...selectedImages, file]);
    // } else {
    //   console.log("You can select a maximum of 3 images.");
    // }
  };
  const handleImageDelete = (indexToRemove) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedImages(updatedImages);
  };
  // console.log({ selectedImages });
  return (
    <Modal
      isOpen={modalIsOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="w-[500px] flex flex-col gap-[20px] ">
        <div className="flex items-center justify-between p-[24px] w-full border-b-[1px] border-b-[#F3F4F6] ">
          <p className="text-[16px] capitalize text-[#374151] ">{modalPage}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            cursor={"pointer"}
            onClick={closeModal}
          >
            <path
              d="M18 6L6 18"
              stroke="#6B7280"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#6B7280"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {modalPage === "skills" && (
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col px-[24px]">
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                value={selectedOptions}
                onChange={handleChange}
                styles={selectStyle}
              />
            </div>
            <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
              <button
                className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[4px] px-[20px] rounded-md"
                onClick={() => handleSaveAndContinue("skills")}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {modalPage === "portfolio" && (
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col px-[24px]  pb ">
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Project Name
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Project Name"
                    onChange={(e) =>
                      setPortfolioInput({
                        ...portfolioInput,
                        project_name: e.target.value,
                      })
                    }
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
                    value={portfolioInput.project_description}
                    onChange={(e) =>
                      setPortfolioInput({
                        ...portfolioInput,
                        project_description: e.target.value,
                      })
                    }
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
                  {/* <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Technologies"
                    onChange={(e) =>
                      setPortfolioInput({
                        ...portfolioInput,
                        technologies: e.target.value,
                      })
                    }
                  /> */}

                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={options}
                    onChange={handleChange}
                  // styles={selectStyle}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[2px] mt-6">
                <p className="text-[14px] font-[500] text-[#374151]">Media</p>
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
                            {selectedImages.length > 0 ? "Add More" : "Add"}
                          </span>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
              <button
                className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[4px] px-[20px] rounded-md "
                onClick={() => handleSaveAndContinue("portfolio")}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {modalPage === "education" && (
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col px-[24px]  pb ">
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Degree Name
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Degree"
                    onChange={(e) =>
                      setEducationInput({
                        ...educationInput,
                        degree_name: e.target.value,
                      })
                    }
                  />
                </div>
                <br />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Institution
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Institution"
                    onChange={(e) =>
                      setEducationInput({
                        ...educationInput,
                        institution: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <br />
              <HStack justifyContent={"space-between"}>
                <div className="flex flex-col gap-[2px] w-[49%]">
                  <p className="text-[14px] font-[500] text-[#374151]">
                    Start Date
                  </p>
                  <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                    <input
                      type="date"
                      className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                      placeholder="State date"
                      onChange={(e) =>
                        setEducationInput({
                          ...educationInput,
                          start_date: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <br />
                <div className="flex flex-col gap-[2px] w-[49%]">
                  <p className="text-[14px] font-[500] text-[#374151]">
                    End Date
                  </p>
                  <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                    <input
                      type="date"
                      className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                      placeholder="End Date"
                      onChange={(e) =>
                        setEducationInput({
                          ...educationInput,
                          end_date: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </HStack>
              <br />
            </div>
            <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
              <button
                className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[4px] px-[20px] rounded-md "
                onClick={() => handleSaveAndContinue("education")}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {modalPage === "educationEdit" && selectedEducation && (
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col px-[24px]  pb ">
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Degree Name
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Degree"
                    name="degree_name"
                    value={selectedEducation.degree_name}
                    // defaultValue={updateEducationInput.degree_name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="hidden"
                    name="_id"
                    value={selectedEducation._id}
                    onChange={handleInputChange}
                  />
                </div>
                <br />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Institution
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Institution"
                    name="institution"
                    value={selectedEducation.institution}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <br />
              <HStack justifyContent={"space-between"}>
                <div className="flex flex-col gap-[2px] w-[49%]">
                  <p className="text-[14px] font-[500] text-[#374151]">
                    Start Date
                  </p>
                  <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                    <input
                      type="date"
                      className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                      placeholder="Start date"
                      name="start_date"
                      value={selectedEducation.start_date}
                      defaultValue={selectedEducation.start_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <br />
                <div className="flex flex-col gap-[2px] w-[49%]">
                  <p className="text-[14px] font-[500] text-[#374151]">
                    End Date
                  </p>
                  <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                    <input
                      type="date"
                      className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                      placeholder="End Date"
                      name="end_date"
                      value={selectedEducation.end_date}
                      defaultValue={selectedEducation.end_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </HStack>
              <br />
            </div>
            <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
              <button
                className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[4px] px-[20px] rounded-md "
                onClick={() => handleSaveAndContinue("educationUpdate")}
              >
                Update
              </button>
            </div>
          </div>
        )}
        {modalPage === "exprience" && (
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col px-[24px] pb">
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Your Company Name
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Your Company Name"
                    onChange={(e) =>
                      setExperienceInput({
                        ...experienceInput,
                        company_name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <br />
              <HStack justifyContent={"space-between"}>
                <div className="flex flex-col gap-[2px] w-[49%]">
                  <p className="text-[14px] font-[500] text-[#374151]">
                    Start Year
                  </p>
                  <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                    <input
                      type="date"
                      className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                      placeholder="Institution"
                      onChange={(e) =>
                        setExperienceInput({
                          ...experienceInput,
                          start_date: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <br />
                <div className="flex flex-col gap-[2px] w-[49%]">
                  <p className="text-[14px] font-[500] text-[#374151]">
                    End Year
                  </p>
                  <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                    <input
                      type="date"
                      className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                      placeholder="Position"
                      onChange={(e) =>
                        setExperienceInput({
                          ...experienceInput,
                          end_date: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </HStack>
              <br />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Position
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Position"
                    onChange={(e) =>
                      setExperienceInput({
                        ...experienceInput,
                        position: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Location
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    value={experienceInput.job_location}
                    onChange={(e) =>
                      setExperienceInput({
                        ...experienceInput,
                        job_location: e.target.value,
                      })
                    }
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Location"
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Description
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <textarea
                    type="text"
                    value={experienceInput.job_description}
                    onChange={(e) =>
                      setExperienceInput({
                        ...experienceInput,
                        job_description: e.target.value,
                      })
                    }
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Description"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
              <button
                className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[8px] px-[20px] rounded-md "
                onClick={() => handleSaveAndContinue("experience")}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {modalPage === "experienceUpdated" && selectedEducation && (
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col px-[24px] pb">
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Your Company Name
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Your Company Name"
                    name="company_name"
                    value={selectedEducation?.company_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <br />
              <HStack justifyContent={"space-between"}>
                <div className="flex flex-col gap-[2px] w-[49%]">
                  <p className="text-[14px] font-[500] text-[#374151]">
                    Start Year
                  </p>
                  <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                    <input
                      type="date"
                      className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                      placeholder="Institution"
                      name="start_date"
                      value={selectedEducation?.start_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <br />
                <div className="flex flex-col gap-[2px] w-[49%]">
                  <p className="text-[14px] font-[500] text-[#374151]">
                    End Year
                  </p>
                  <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                    <input
                      type="date"
                      className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                      placeholder="Position"
                      name="end_date"
                      value={selectedEducation?.end_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </HStack>
              <br />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Position
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Position"
                    name="position"
                    value={selectedEducation?.position}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Location
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    name="job_location"
                    value={selectedEducation?.job_location}
                    onChange={handleInputChange}
                    placeholder="Location"
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Description
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <textarea
                    type="text"
                    name="job_description"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    value={selectedEducation?.job_description}
                    onChange={handleInputChange}
                    placeholder="Description"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
              <button
                className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[8px] px-[20px] rounded-md "
                onClick={() => handleSaveAndContinue("experienceUpdated")}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {modalPage === "editProfile" && (
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col px-[24px] pb">
              <div className="flex flex-col gap-[2px]">
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="file"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="Your Company Name"
                    name="profile_image"
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
              <button
                className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[8px] px-[20px] rounded-md min-w-[100px]"
                onClick={() => uploadProfileImage()}
              >
                {isLoader ? <Spinner size="sm" color="white.500" /> : "Submit"}
              </button>
            </div>
          </div>
        )}
        {modalPage === "basicInformation" && (
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col px-[24px] pb">
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">Title</p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="professional_role"
                    name="professional_role"
                    value={selectedEducation?.professional_role}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">Hourly</p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="number"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    placeholder="hourly_rate"
                    name="hourly_rate"
                    value={selectedEducation?.hourly_rate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">
                  Description
                </p>
                <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <textarea
                    type="text"
                    name="description"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[#D1D5DB] "
                    value={selectedEducation?.description}
                    onChange={handleInputChange}
                    placeholder="description"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
              <button
                className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[8px] px-[20px] rounded-md "
                onClick={() => handleSaveAndContinue("basicInformation")}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
