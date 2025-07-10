import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useState } from "react";
import { useToggleLike } from "@/hooks/use-like";

type LikeProps = {
  postId: number;
  liked: boolean;
  likeCount: number;
};

function Like({ postId, liked: initialLiked, likeCount }: LikeProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeAmount, setLikeAmount] = useState(likeCount);

  const { toggleLike } = useToggleLike(postId, liked);

  const handleToggle = () => {
    toggleLike.mutate(undefined, {
      onSuccess: () => {
        setLiked((prev) => !prev);
        setLikeAmount((prev) => (liked ? prev - 1 : prev + 1));
      },
    });
  };

  return (
    <button
      onClick={handleToggle}
      className="my-3 items-center text-white hover:text-gray-500 duration-200 cursor-pointer"
    >
      {liked ? (
        <div className="flex gap-2 items-center ">
          <BsHeartFill className="text-red-600" size={20} />
          <span className="text-white">{likeAmount}</span>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <BsHeart size={20} />
          <span className="text-white">{likeAmount}</span>
        </div>
      )}
    </button>
  );
}

export default Like;
