import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Navigate,
  useParams,
} from "react-router-dom";

import { useOtherProfile } from "@/hooks/use-profile";
import { useFollow, useUnFollow } from "@/hooks/use-follow";
import { useState } from "react";
import { Button } from "../ui/button";
import { AxiosError } from "axios";


export function ProfileCompOther() {
  const { username } = useParams();
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useOtherProfile(username);

  const { followMutation } = useFollow(profile?.user.id);
  const { unfollowMutation } = useUnFollow(profile?.user.id);
  const [followed, setFollowed] = useState(profile?.user.isFollowed);

  const handleClick = () => {
    if (followed) {
      unfollowMutation.mutate();
      setFollowed(false);
    } else {
      followMutation.mutate();
      setFollowed(true);
    }
  };

  if (isLoading) return <p className="p-3 text-white">Loading...</p>;
  if (isError && error instanceof AxiosError) {
    if (error.response?.status === 400) {
      return <Navigate to="/profile" />;
    }
  }
  if (isError && error instanceof AxiosError) {
    if (error.response?.status === 404) {
      return <Navigate to="/404" />;
    }
  }
  return (
    <div className="bg-[#2a2b2a] p-4 mt-3 rounded-lg ">
      <div className="relative w-full mb-6">
        <div className="h-40 bg-gradient-to-r from-green-200 to-yellow-300 rounded-lg transition-all duration-300"></div>

        <Avatar className="absolute -bottom-6 left-4 w-20 h-20">
          {profile?.avatarUrl ? (
            <AvatarImage
              src={profile?.avatarUrl}
              alt={profile?.username}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <AvatarImage
              src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${profile?.username}`}
              alt={profile?.username}
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
            <p>follower {profile?.user._count.followers}</p>
            <p>following {profile?.user._count.following}</p>
          </div>
        </div>

        <Button
          onClick={handleClick}
          disabled={followMutation.isPending || unfollowMutation.isPending}
          className="bg-[#1f1f1f] hover:bg-[#272827] text-white px-4 py-1 rounded cursor-pointer"
        >
          {followMutation.isPending || unfollowMutation.isPending
            ? "..."
            : profile?.user.isFollowed
              ? "Unfollow"
              : "Follow"}
        </Button>
      </div>
    </div>
  );
}
