import {  PostWithRelativeTime } from "@/types/profile";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Like from "./Like";
import { Button } from "../ui/button";
import Comment from "../comments/CommentIcon";
import { formatTime } from "@/utils/formatTime";
import { ScrollArea } from "../ui/scroll-area";
import { RepliesSidebar, ThreadCommentBoxSidebar } from "../comments/commentSidebar";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type ThreadProps = {
  threads: PostWithRelativeTime[];
};

export const MyThread = ({ threads }: ThreadProps) => {
 const imageThreads = threads.filter((post) => post.imageUrl);
  const [showPanel, setShowPanel] = useState(false);
  if (imageThreads.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-4">
        Belum ada gambar yg dipost.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-1 mt-3">
      {threads
        .filter((post) => post.imageUrl)
        .map((post) => (
          <div key={post.id} className="border  overflow-hidden">
            {post.imageUrl && (
              <NavLink to={`/thread/${post.id}`} className="cursor-pointer">
                <img
                  src={post.imageUrl!}
                  alt={`post-${post.id}`}
                  className="w-full h-48 object-cover cursor-pointer block lg:hidden"
                />
              </NavLink>
            )}
            <Dialog>
              <DialogTrigger asChild className=" hidden lg:block">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl!}
                    alt={`post-${post.id}`}
                    className="w-full h-48 object-cover cursor-pointer"
                  />
                )}
              </DialogTrigger>
              <DialogContent
                className={`border bg-[#2a2b2a]  h-[90vh] flex border-white transition-all duration-300 ${showPanel ? "min-w-[70vw]" : "min-w-fit"}`}
              >
                <DialogTitle hidden />
                <DialogDescription hidden />
                <img
                  className={`my-2 cursor-pointer  transition-all duration-300 ${
                    showPanel
                      ? "w-[60%] mx-auto rounded-2xl"
                      : "w-fit rounded-none"
                  }`}
                  src={post.imageUrl}
                  alt={post.author.profile.username}
                />

                <div className="absolute bottom-0 flex items-center gap-5 shadow-black">
                  <Like
                    likeCount={post.likeCount}
                    liked={post.liked}
                    postId={post.id}
                  />
                </div>
                {!showPanel && (
                  <Button
                    onClick={() => {
                      setShowPanel(true);
                    }}
                    className="absolute bottom-2 right-4 px-3 py-1  text-white bg-[#2a2b2a] "
                    key={post.id}
                  >
                    <Comment count={post.countComment} />
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
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      tutup
                    </div>

                    <DialogHeader className="w-80 text-white pb-3">
                      <DialogTitle className="w-full">
                        <div className="flex ml-3 gap-2 my-3 w-full">
                          {post.author.profile.avatarUrl ? (
                            <img
                              src={post.author.profile.avatarUrl}
                              alt=""
                              className="w-12 h-12 rounded-full"
                            />
                          ) : (
                            <img
                              src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${post.author.profile.username}`}
                              alt={post.author.profile.username}
                              className="w-12 h-12 rounded-full"
                            />
                          )}
                          <div>
                            <div className="flex">
                              <p className="text-white text-sm mr-3 break-all whitespace-normal font-semibold">
                                {post.author.profile.name}
                              </p>
                              <p className="text-sm text-gray-500 font-semibold">
                                @{post.author?.profile?.username}
                              </p>
                            </div>
                            <p className="text-sm text-gray-400 break-all whitespace-normal">
                              {post.content}
                            </p>
                            <p className="text-white text-sm right-0">
                              {formatTime(post.createdAt)}
                            </p>
                          </div>
                        </div>
                      </DialogTitle>
                    </DialogHeader>

                    <ThreadCommentBoxSidebar threadId={post.id} />

                    <ScrollArea className="flex-1 overflow-auto">
                      <DialogDescription hidden />
                      <RepliesSidebar threadId={post.id} />
                    </ScrollArea>
                  </aside>
                )}
              </DialogContent>
            </Dialog>
          </div>
        ))}
    </div>
  );
};
