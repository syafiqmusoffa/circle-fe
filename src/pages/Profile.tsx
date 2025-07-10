import ProfileComp from "@/components/profile/Profile";
import ProfileTabs from "@/components/profile/ProfileTabs";

function Profile() {
  return (
    <main className="p-3 h-265">
      <h1 className="pt-3 text-4xl text-gray-400">Profile</h1>
      <ProfileComp />
      <ProfileTabs />
      <div className="py-10 "></div>
    </main>
  );
}

export default Profile;
