import { SuggestedUserType } from "@/types/suggested-profile";
import { Avatar,  AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import api from "@/utils/api";
import { useState, useEffect } from "react";
import { useFollow, useUnFollow } from "@/hooks/use-follow";
import { NavLink } from "react-router-dom";

interface Props {
  suggested: SuggestedUserType;
}

function SuggestedUser({ suggested }: Props) {
  const profile = suggested.profile;
  const [isFollowed, setIsFollowed] = useState(false);
  const { followMutation } = useFollow(suggested.id);
  const { unfollowMutation } = useUnFollow(suggested.id);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await api.get("/api/following");
        const isUserFollowed = res.data.following.some(
          (follow: any) => follow.followingId === suggested.id
        );
        setIsFollowed(isUserFollowed);
      } catch (err) {}
    };

    fetchFollowing();
  }, [suggested.id]);

  if (!profile) return null;

  return (
    <div className="flex justify-between items-center">
      
        <NavLink
          to={`/profile/${profile?.username}`}
          className="cursor-pointer flex items-center gap-2 "
        >
          <Avatar className="w-10 h-10">
            {profile.avatarUrl ? (
              <AvatarImage src={profile.avatarUrl} alt={profile.username} />
            ) : (
              <img
                src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${profile.username}`}
                alt={profile.username}
              />
            )}
          </Avatar>
          <div>
            <p className="text-white font-semibold">{profile.name}</p>
            <p className="text-gray-600">@{profile.username}</p>
          </div>
        </NavLink>

      <Button
        onClick={() => {
          if (isFollowed) {
            unfollowMutation.mutate();
            setIsFollowed(false);
          } else {
            followMutation.mutate();
            setIsFollowed(true);
          }
        }}
        className="bg-[#1f1f1f] hover:bg-[#272827] text-white px-4 py-1 rounded cursor-pointer"
      >
        {followMutation.isPending || unfollowMutation.isPending
          ? "..."
          : isFollowed
            ? "Unfollow"
            : "Follow"}
      </Button>
    </div>
  );
}

export default SuggestedUser;
