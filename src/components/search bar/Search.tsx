import { SuggestedUserType } from "@/types/suggested-profile";
import { useFollow, useUnFollow } from "@/hooks/use-follow";
import { Avatar,  AvatarImage } from "../ui/avatar";
import { NavLink } from "react-router-dom";

type Props = {
  user: SuggestedUserType;
  onToggleFollow: (isFollowed: boolean) => void;
};

export const SearchUserCard = ({ user, onToggleFollow }: Props) => {
  const { followMutation } = useFollow(user.id);
  const { unfollowMutation } = useUnFollow(user.id);

  const handleClick = () => {
    if (user.isFollowed) {
      unfollowMutation.mutate(undefined, {
        onSuccess: () => onToggleFollow(false),
      });
    } else {
      followMutation.mutate(undefined, {
        onSuccess: () => onToggleFollow(true),
      });
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border border-gray-700 p-4 rounded-lg">
      <NavLink
        to={`/profile/${user.profile?.username}`}
        className="cursor-pointer flex"
      >
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            {user.profile.avatarUrl ? (
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
          <div>
            <p className="font-semibold">{user.profile.name}</p>
            <p className=" text-gray-400">@{user.profile.username}</p>
          </div>
        </div>
      </NavLink>
      <button
        onClick={handleClick}
        className="bg-[#1f1f1f] hover:bg-[#272827] text-white px-4 py-1 rounded cursor-pointer"
      >
        {user.isFollowed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};
