import { Avatar, AvatarImage } from "../ui/avatar";
import EditDialog from "../dialog/EditDialog";
import { useLocation } from "react-router-dom";

import { useProfile } from "@/hooks/use-profile";
import { useAuth } from "../connection/contexts/AuthContext";
import { Button } from "../ui/button";

function ProfileComp() {
  const { data: profile, isLoading, isError } = useProfile();
  const location = useLocation();
  const isNotProfilePage = ["/profile"].includes(location.pathname);
  if (isLoading) return <div>Loading...</div>;
  if (isError || !profile) return <div>Gagal mengambil profil</div>;
  const { logout } = useAuth();
  function onLogout() {
    logout();
  }
  return (
    <div className="bg-[#2a2b2a] p-4 mt-3 rounded-lg ">
      <div className="relative w-full mb-6">
        {profile.backgroundUrl ? ( <img
            className={`${
              isNotProfilePage ? "h-40" : "h-20"
            }  rounded-lg object w-full object-cover`}
            src={profile.backgroundUrl}
            alt={profile.username}
          />
         
        ) : (
          <div
            className={`${
              isNotProfilePage ? "h-40" : "h-20"
            } bg-gradient-to-r from-green-200 to-yellow-300 rounded-lg transition-all duration-300`}
          ></div>
        )}

        <Avatar
          className={`absolute -bottom-6 left-4 ${isNotProfilePage ? "w-20 h-20" : "w-15 h-15"}`}
        >
          {profile.avatarUrl ? (
            <AvatarImage
              src={profile.avatarUrl}
              alt={profile.username}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <AvatarImage
              src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${profile.username}`}
              alt={profile.username}
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </Avatar>
      </div>
      <div className="flex justify-between ">
        <div className="flex flex-col ">
          <h2 className="text-start mt-2 font-bold text-2xl text-white">
            {profile?.name || "user"}
          </h2>
          <p className="text-start text-sm text-gray-500">
            @{profile?.username || "user"}
          </p>
          <p className="text-start text-sm text-white italic">
            "{profile?.bio || "add your bio"}"
          </p>
          <div className="flex gap-2 text-gray-200">
            <p>follower {profile.user._count.followers}</p>
            <p>following {profile.user._count.following}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <EditDialog />
          <Button
            className="bg-[#2a2b2a] cursor-pointer text-white hover:bg-[#272827]  block lg:hidden"
            onClick={() => {
              onLogout();
            }}
          >
            <p className="flex items-center">
              Logout
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileComp;
