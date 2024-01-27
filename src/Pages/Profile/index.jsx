import { UserProfile } from "../../Components/Profile";
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

// Profile Setting Page
export const ProfileSetting = () => {
  return (
    <HomeLayout>
      <UserProfileSetting />
    </HomeLayout>
  );
};
