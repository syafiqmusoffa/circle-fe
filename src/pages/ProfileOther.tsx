import OtherProfileTabs from "@/components/profile/OtherProfileTabs";
import { ProfileCompOther } from "@/components/profile/ProfileOther";

export function ProfileOther() {
  return (
    <main className="p-3 h-265">
      <h1 className="pt-3 text-4xl text-gray-400">Profile</h1>
      <ProfileCompOther />
      <OtherProfileTabs />
      <div className="py-10 "></div>
    </main>
  );
}

