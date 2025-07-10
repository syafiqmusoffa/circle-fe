import {  PostWithRelativeTime } from "@/types/profile";
import Like from "./Like";
import { NavLink } from "react-router-dom";
import Comment from "../comments/CommentIcon";
import { DropdownThreads } from "../dropdown/DropDownMenu";
import { formatTime } from "@/utils/formatTime";

type Props = {
  thread: PostWithRelativeTime[];
};



export const MyThreadList = ({ thread }: Props) => {
  if (thread.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-4">
        Belum ada thread yang dibuat.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {thread.map((thread: any) => {
        return (
          <div key={thread.id} className="border-b border-black px-3 py-3">
            <div className="flex justify-between">
              <section className="flex justify-between gap-x-3">
                {thread.author.profile.avatarUrl ? (
                  <img
                    src={thread.author.profile.avatarUrl}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <img
                    src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${thread.author.profile.username}`}
                    alt={thread.author.profile.username}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <div className="flex items-center pb-2">
                    <p className="text-gray-400 text-sm mr-3">
                      {thread.author.profile.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      @{thread.author.profile.username}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm mr-3 break-all whitespace-normal ">
                    {thread.content}
                  </p>
                  {thread.imageUrl && (
                    <img
                      className="w-100 h-60 object-cover rounded-2xl my-2"
                      src={thread.imageUrl}
                      alt={thread.author.profile.username}
                    />
                  )}
                  <div className="flex items-center gap-x-2">
                    <Like
                      likeCount={thread.likeCount}
                      liked={thread.liked}
                      postId={thread.id}
                    />
                    <NavLink
                      to={`/thread/${thread.id}`}
                      className="cursor-pointer"
                    >
                      <Comment count={thread.countComment} />
                    </NavLink>
                    <p className="text-gray-500">{formatTime(thread.createdAt)}</p>
                  </div>
                </div>
              </section>
              <DropdownThreads thread={thread} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
