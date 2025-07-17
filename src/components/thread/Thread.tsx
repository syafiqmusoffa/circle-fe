import { ThreadProps } from "@/types/thread";
import { Button } from "../ui/button";
import Like from "./Like";
import Comment from "../comments/CommentIcon";
import { NavLink } from "react-router-dom";
import { Avatar } from "../ui/avatar";
import { formatTime } from "@/utils/formatTime";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import {
  RepliesSidebar,
  ThreadCommentBoxSidebar,
} from "../comments/commentSidebar";
import { ScrollArea } from "../ui/scroll-area";

import { useMe } from "@/hooks/use-me";

import { DropdownThreads } from "../dropdown/DropDownMenu";
interface Props {
  thread: ThreadProps;
}

function Thread({ thread }: Props) {
  const [showPanel, setShowPanel] = useState(true);
  const { data: user } = useMe();
  return (
    <div className="border-t border-black px-3 py-3">
      <div className="flex justify-between ">
        <section className="flex justify-between gap-x-3">
          <NavLink
            to={`/profile/${thread.author?.profile?.username}`}
            className="cursor-pointer "
          >
            <Avatar className="w-12 h-12 rounded-full">
              {thread.author.profile.avatarUrl ? (
                <img
                  src={thread.author.profile.avatarUrl}
                  alt={thread.author.profile.username}
                />
              ) : (
                <img
                  src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${thread.author.profile.username}`}
                  alt={thread.author.profile.username}
                />
              )}
            </Avatar>
          </NavLink>
          <div>
            <div className="flex items-center">
              <NavLink
                to={`/profile/${thread.author?.profile?.username}`}
                className="cursor-pointer flex"
              >
                <p className="text-white text-sm mr-3 break-all whitespace-normal font-semibold">
                  {thread.author.profile.name}
                </p>
                <p className="text-gray-600 text-sm flex w-60 items-center">
                  @{thread.author.profile.username}
                </p>
              </NavLink>
            </div>
            <p className="text-white text-sm mr-3 break-all whitespace-normal ">
              {thread.content}
            </p>
            <NavLink to={`/thread/${thread.id}`} className="cursor-pointer">
              <img
                className="w-100 h-80 rounded-2xl object-cover my-2 block lg:hidden"
                src={thread.imageUrl}
                alt={thread.author.profile.username}
              />
            </NavLink>
            <Dialog>
              <DialogTrigger asChild className=" hidden lg:block">
                {thread.imageUrl && (
                  <img
                    className="w-100 h-80 object-cover rounded-2xl my-2 cursor-pointer"
                    src={thread.imageUrl}
                    alt={thread.author.profile.username}
                  />
                )}
              </DialogTrigger>
              <DialogContent
                className={`border bg-[#2a2b2a]  h-[90vh] flex border-white transition-all duration-300 ${showPanel ? "min-w-[70vw]" : "min-w-fit"}`}
              >
                {" "}
                <DialogDescription hidden />
                <DialogTitle hidden />
                <img
                  className={`my-2 cursor-pointer  transition-all duration-300 ${
                    showPanel
                      ? "w-[60%] mx-auto rounded-2xl"
                      : "w-fit rounded-none"
                  }`}
                  src={thread.imageUrl}
                  alt={thread.author.profile.username}
                />
                <div className="absolute bottom-0 flex items-center gap-5 shadow-black">
                  <Like
                    likeCount={thread.likeCount}
                    liked={thread.liked}
                    postId={thread.id}
                  />
                </div>
                {!showPanel && (
                  <Button
                    onClick={() => {
                      setShowPanel(true);
                    }}
                    className="absolute bottom-2 right-4 px-3 py-1  text-white bg-[#2a2b2a] "
                    key={thread.id}
                  >
                    <Comment count={thread.likeComment} />
                  </Button>
                )}
                {showPanel && (
                  <aside
                    className={`bg-[#2a2b2a] p-6 relative rounded-md transition-all duration-300
                      flex flex-col
                      ${showPanel ? "w-[40%] max-h-[90vh]" : "w-0 overflow-hidden"}`}
                  >
                    <div
                      onClick={() => setShowPanel(false)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      tutup
                    </div>
                    <DialogHeader className="w-80 text-white pb-3">
                      <DialogTitle className="w-full">
                        <div className="flex ml-3 gap-2 my-3 w-full">
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
                            <div className="flex">
                              <p className="text-white text-sm mr-3 break-all whitespace-normal font-semibold">
                                {thread.author.profile.name}
                              </p>
                              <p className="text-sm text-gray-500 font-semibold">
                                @{thread.author?.profile?.username}
                              </p>
                            </div>
                            <p className="text-sm text-gray-400 break-all whitespace-normal">
                              {thread.content}
                            </p>
                            <p className="text-white text-sm right-0">
                              {formatTime(thread.createdAt)}
                            </p>
                          </div>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    <ThreadCommentBoxSidebar threadId={thread.id} />
                    <ScrollArea className="flex-1 overflow-auto">
                      <DialogDescription hidden />
                      <RepliesSidebar threadId={thread.id} />
                    </ScrollArea>
                  </aside>
                )}
              </DialogContent>
            </Dialog>

            <div className="flex items-center gap-x-2 text-sm">
              <Like
                likeCount={thread.likeCount}
                liked={thread.liked}
                postId={thread.id}
              />

              <NavLink to={`/thread/${thread.id}`} className="cursor-pointer">
                <Comment count={thread.likeComment} />
              </NavLink>
              <p className="text-gray-500 ">{formatTime(thread.createdAt)}</p>
            </div>
          </div>
        </section>
        {user?.id === thread.author.profile.userId && (
          <DropdownThreads thread={thread} />
        )}
      </div>
    </div>
  );
}

export default Thread;
