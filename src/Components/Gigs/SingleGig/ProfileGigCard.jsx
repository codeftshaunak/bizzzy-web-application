import { Switch } from "@chakra-ui/react";
const ProfileGigCard = () => {
  return (
    <div className="flex justify-between gap-10">
      <div className="flex gap-10">
        <img
          src="https://bizzzy.s3.amazonaws.com/Gig_Folder/8759b76d-9c63-46bb-8706-be7c8ef10ad4-aedrian-XHjD1MYQ5oM-unsplash.jpg"
          className="h-44 w-64 bg-cover object-cover"
        />
        <div className="grid justify-between gap-8">
          <div>
            <h4 className="text-3xl font-semibold">
              Create a dynamic page updated
            </h4>
            <div className="font-semibold text-gray-600 mt-6">
              <span className="bg-green-50 px-3 py-2 rounded-full mr-6">
                From $50
              </span>
              <span>2 days delivery</span>
            </div>
          </div>
          <button className="text-start px-3 py-1 rounded-full border-2 border-[var(--primarytextcolor)] text-[var(--primarytextcolor)] hover:text-white hover:bg-[var(--primarytextcolor)] transition h-fit mt-auto w-fit font-semibold">
            View Project
          </button>
        </div>
      </div>
      <Switch colorScheme="green" size="lg" isChecked={true} />
    </div>
  );
};

export default ProfileGigCard;
