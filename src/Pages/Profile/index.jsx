import { UserProfile } from "../../Components/Profile";
import { FreelancerProfilePage } from "../../Components/Profile/FreelancerProfilePage";
import UserProfileSetting from "../../Components/Profile/UserProfileSetting";
import HomeLayout from "../../Layouts/HomeLayout";

// Initial Profile Page
export const Profile = () => {
  return (
    <HomeLayout>
      <UserProfile />
    </HomeLayout>
  );
}

export const ProfileViewAs = () => {
  return (
    <HomeLayout>
      <div className="w-[100%] m-auto">
        <FreelancerProfilePage viewAs={true} />
      </div>
    </HomeLayout>
  )
}

// Profile Setting Page
export const ProfileSetting = () => {
  return (
    <HomeLayout>
      <UserProfileSetting />
    </HomeLayout>
  );
};
