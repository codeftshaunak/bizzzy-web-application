import { Input, Text, VStack } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdClose, IoMdVideocam } from "react-icons/io";
import { uploadImages, uploadMedia } from "../../../helpers/gigApis";
import { GigCreateLayout } from "../GigCreate";

const Step2 = ({ submitCallback, onBack, afterSubmit }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // image upload function
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    // Check if the total number of selected images doesn't exceed the limit
    if (selectedImages.length + files.length <= 3) {
      // Update state with new files
      setSelectedImages([...selectedImages, ...files]);

      // Upload images to the server
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });

      try {
        const response = await uploadImages(formData);
        console.log("Image upload response:", response);
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    } else {
      console.log("You can select a maximum of 3 images.");
    }
  };

  // image delete function
  const handleImageDelete = (indexToRemove) => {
    setSelectedImages((prev) =>
      [...prev].filter((_, index) => index !== indexToRemove)
    );
  };

  // video upload function
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];

    // Update state with the new video file
    setSelectedVideo(file);

    // Upload video to the server
    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await uploadMedia(formData);
      console.log("Video upload response:", response);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    console.log("Dropped file:", file);
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  // on submit fuction
  const onSubmit = useCallback(() => {
    submitCallback({
      images: selectedImages,
      video: selectedVideo,
    });
    afterSubmit();
  }, [afterSubmit, selectedImages, selectedVideo, submitCallback]);

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

      {/* image manage code end */}

      <VStack alignItems={"start"}>
        <label htmlFor="fileInput" className="text-xl font-[600] pb-0 mb-0">
          Project Videos
        </label>
        <p className="mt-0 mb-2">Upload one video (.mp4), up to 10MB.</p>
        <VStack
          textAlign={"center"}
          backgroundColor={"var(--secondarycolor)"}
          padding={"2rem 2rem"}
          className="shadow-lg rounded-lg cursor-pointer"
          onDrop={handleDrop}
          onClick={handleClick}
          onDragOver={(e) => e.preventDefault()}
        >
          <label htmlFor="fileInput">
            <IoMdVideocam size={"1.6rem"} />
          </label>
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
      </VStack>
    </GigCreateLayout>
  );
};

export default Step2;
