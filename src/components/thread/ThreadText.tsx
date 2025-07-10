
import { useState } from "react";

import { Navigate, NavLink, useParams } from "react-router-dom";

import { fetchThreadById } from "@/hooks/use-thread-by-id";
import Like from "./Like";
import { Avatar } from "../ui/avatar";
import Comment from "../comments/CommentIcon";
import { AxiosError } from "axios";
import { DropdownThreads } from "../dropdown/DropDownMenu";
import { formatTime } from "@/utils/formatTime";
import { useMe } from "@/hooks/use-me";

function ThreadText() {
  const { id } = useParams<{ id: string }>();
  const { data: thread, isLoading, error, isError } = fetchThreadById(id);
  const [like, setLike] = useState<boolean>(false);
  const toggleLike = () => {
    setLike(!like);
  };
  const { data: user } = useMe();
  if (isLoading) return <p className="p-3 text-white">Loading...</p>;
  if (isError && error instanceof AxiosError) {
    if (error.response?.status === 404) {
      return <Navigate to="/404" />;
    }
  }

  return (
    <>
      <div className=" border-b border-black px-4 py-3">
        <div className="flex justify-between">
          <section className="flex justify-between gap-x-3">
            <NavLink
              to={`/profile/${thread.author?.profile?.username}`}
              className="cursor-pointer flex"
            >
              <Avatar className="w-12 h-12">
                {thread.author.profile.avatarUrl ? (
                  <img
                    src={thread.author.profile.avatarUrl}
                    alt={thread.author.profile.username}
                    className=""
                  />
                ) : (
                  <img
                    src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${thread.author.profile.username}`}
                    alt={thread.author.profile.username}
                    className=""
                  />
                )}
              </Avatar>
            </NavLink>
            <div>
              <div className="flex items-center ">
                <NavLink
                  to={`/profile/${thread.author?.profile?.username}`}
                  className="cursor-pointer flex"
                >
                  <p className="text-white text-sm mr-3 break-all whitespace-normal font-semibold ">
                    {thread.author.profile.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    @{thread.author.profile.username}
                  </p>
                </NavLink>
              </div>
              <p className="text-gray-400 text-sm mr-3 break-all whitespace-normal ">
                {thread.content}
              </p>
              {thread.imageUrl ? (
                <img
                  className="w-100 h-80 rounded-2xl object-cover my-2"
                  src={thread.imageUrl}
                  alt={thread.author.profile.name}
                />
              ) : null}
              <div className="flex items-center gap-x-2">
                <div className="flex gap-2 items-center">
                  <div
                    onClick={toggleLike}
                    className="my-3 flex gap-x-2 items-center text-gray-500 hover:text-white duration-200 cursor-pointer"
                  >
                    <Like
                      likeCount={thread.likeCount}
                      liked={thread.liked}
                      postId={thread.id}
                    />
                  </div>
                  <Comment count={thread._count.comments} />
                  <p className="text-gray-500">
                    {formatTime(thread.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </section>
          {user?.id === thread.author.profile.userId && (
            <DropdownThreads thread={thread} />
          )}
        </div>
      </div>
    </>
  );
}

export default ThreadText;
