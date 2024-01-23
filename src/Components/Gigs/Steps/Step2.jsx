import { Input, Text, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import { IoMdClose, IoMdVideocam } from "react-icons/io";
import { uploadImages, uploadMedia } from "../../../helpers/gigApis";
import { GigCreateLayout } from "../GigCreate";

const Step2 = ({ submitCallback, onBack, afterSubmit, formValues }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [tempBlob, setTempBlob] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState(undefined); // undefined = initial, null = loading

  // clear Temp Blob
  const clearTempBlob = () => {
    setTempBlob((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p));

      return [];
    });
  };
  // add temp blob
  const insertTempBlob = (files = []) => {
    setTempBlob((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  // add selected images
  const insertSelectedImages = (urls = []) => {
    setSelectedImages((prev) => [...prev, ...urls]);
  };
  // image upload function
  const handleImageUpload = useCallback(
    async (e) => {
      const files = Array.from(e.target.files);

      // Check if the total number of selected images doesn't exceed the limit
      if (selectedImages.length + files.length <= 3) {
        // create temporary blob files
        insertTempBlob(files);

        // prepare form data for file uploading
        const formData = new FormData();
        files.forEach((file) => formData.append(`imageFiles`, file));

        try {
          const response = await uploadImages(formData);
          console.log("Image upload response:", response);
          insertSelectedImages(response?.body);
        } catch (error) {
          console.error("Error uploading images:", error);
        } finally {
          clearTempBlob();
        }
      } else {
        console.log("You can select a maximum of 3 images.");
      }
    },
    [selectedImages]
  );
  // image delete function
  const handleImageDelete = (indexToRemove) => {
    setSelectedImages((prev) =>
      [...prev].filter((_, index) => index !== indexToRemove)
    );
  };

  // set video to uploading state
  const setVideoUploading = () => setSelectedVideo(null);
  // set video to inital state
  const setVideoInitial = () => setSelectedVideo(undefined);
  // set video to file url
  const setVideoUrl = (url) => setSelectedVideo(url);

  // video upload function
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];

    // start video uploading
    setVideoUploading();

    // prepare uploading form state
    const formData = new FormData();
    formData.append("videoFile", file);

    try {
      const response = await uploadMedia(formData);
      console.log("Video upload response:", response);
      setVideoUrl(response?.body);
    } catch (error) {
      console.error("Error uploading video:", error);
      setVideoInitial();
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    console.log("Dropped file:", file);
  };

  // on submit fuction
  const onSubmit = useCallback(() => {
    submitCallback({
      images: selectedImages,
      video: selectedVideo,
    });
    afterSubmit();
  }, [afterSubmit, selectedImages, selectedVideo, submitCallback]);

  // load state
  useEffect(() => {
    const images = formValues?.images;
    const video = formValues?.video;

    if (images) setSelectedImages(images);
    if (video) setSelectedVideo(video);
  }, [formValues]);

  return (
    <GigCreateLayout
      title={"Create a Gig Gallery"}
      onForward={onSubmit}
      onBackward={onBack}
    >
      <div className="flex flex-col gap-[2px] mt-6">
        <label htmlFor="fileInput" className="text-xl font-[600] pb-0 mb-0">
          Project Images
        </label>
        <p className="mt-0 mb-3">
          Upload up to 3 images (.jpg or .png), less than 10MB.
        </p>
        <div className="w-[70%] p-[12px] outline-none border-[1px] rounded-md flex gap-2">
          <div className="flex">
            {selectedImages?.map((imageUrl, index) => (
              <div
                key={index}
                className="rounded border border-green-300 mr-2 relative"
              >
                <img
                  src={imageUrl}
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
            {tempBlob?.map((imageUrl, index) => (
              <div
                key={index}
                className="rounded border-2 border-red-300 mr-2 relative"
              >
                <img
                  src={imageUrl}
                  alt={`Selected ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gray-800/20 flex items-center justify-center">
                  <FaSpinner className="animate-spin" />
                </div>
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

      <VStack alignItems={"start"}>
        <label className="text-xl font-[600] pb-0 mb-0">Project Videos</label>
        <p className="mt-0 mb-2">Upload one video (.mp4), up to 10MB.</p>
        {selectedVideo === undefined && (
          <label htmlFor="videoInput">
            <VStack
              textAlign={"center"}
              backgroundColor={"var(--secondarycolor)"}
              padding={"2rem 2rem"}
              className="shadow-lg rounded-lg cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <IoMdVideocam size={"1.6rem"} />
              <Text>
                Drag video here or <br /> <strong>browse</strong>
              </Text>
              <Input
                id="videoInput"
                type="file"
                accept="video/*"
                name="videoFile"
                onChange={handleVideoUpload}
                style={{ display: "none" }} // Hide the actual input
              />
            </VStack>
          </label>
        )}

        {selectedVideo === null && (
          <div className="aspect-video flex items-center justify-center bg-gray-700 w-[200px]">
            <FaSpinner className="animate-spin" />
          </div>
        )}

        {selectedVideo && (
          <div className="aspect-video">
            <video className="w-full h-full" src={selectedVideo}></video>
          </div>
        )}
      </VStack>
    </GigCreateLayout>
  );
};

export default Step2;
