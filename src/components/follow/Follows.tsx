import { UserFollowsType } from "@/types/suggested-profile";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useFollow, useUnFollow } from "@/hooks/use-follow";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface ListProps {
  users: UserFollowsType[];
}

export function Following({ users }: ListProps) {
  return (
    <div className="space-y-3">
      {users
        .filter((user) => user.profile)
        .map((user) => (
          <FollowCard key={user.id} user={user} isInitiallyFollowed={true} />
        ))}
    </div>
  );
}

export function Follower({ users }: ListProps) {
  return (
    <div className="space-y-3">
      {users
        .filter((user) => user.profile)
        .map((user) => (
          <FollowCard key={user.id} user={user} isInitiallyFollowed={false} />
        ))}
    </div>
  );
}

interface FollowCardProps {
  user: UserFollowsType;
  isInitiallyFollowed: boolean;
}

function FollowCard({ user, isInitiallyFollowed }: FollowCardProps) {
  const { followMutation } = useFollow(user.id);
  const { unfollowMutation } = useUnFollow(user.id);
  const [isFollowed, setIsFollowed] = useState(isInitiallyFollowed);

  const handleClick = () => {
    if (isFollowed) {
      unfollowMutation.mutate();
      setIsFollowed(false);
    } else {
      followMutation.mutate();
      setIsFollowed(true);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          {user.profile?.avatarUrl ? (
            <AvatarImage
              src={user.profile.avatarUrl}
              alt={user.profile.username}
            />
          ) : (
            <AvatarImage
              src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${user.profile.username}`}
              alt={user.profile.username}
            />
          )}
        </Avatar>
        <div className="flex flex-col">
          <NavLink
            to={`/profile/${user.profile.username}`}
            className="cursor-pointer"
          >
            <p className="text-white">{user.profile?.name}</p>

            <p className="text-gray-500">@{user.profile.username}</p>
          </NavLink>
        </div>
      </div>

      <Button
        onClick={handleClick}
        disabled={followMutation.isPending || unfollowMutation.isPending}
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
