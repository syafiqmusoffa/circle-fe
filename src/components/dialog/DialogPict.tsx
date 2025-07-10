import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  RepliesSidebar,
  ThreadCommentBoxSidebar,
} from "@/components/comments/commentSidebar";
import { formatTime } from "@/utils/formatTime";
import { useState } from "react";
import { ThreadProps } from "@/types/thread";
import Comment from "../comments/CommentIcon";
import Like from "../thread/Like";

type ImageDialogProps = {
  thread: ThreadProps;
};

export function ImageDialog({ thread }: ImageDialogProps) {
  const [showPanel, setShowPanel] = useState(true);
  const [open, setOpen] = useState(false);

  const avatarUrl =
    thread.author.profile.avatarUrl ||
    `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${thread.author.profile.username}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <img
          className="w-full h-48 object-cover cursor-pointer"
          src={thread.imageUrl!}
          alt={`Post by ${thread.author.profile.username}`}
        />
      </DialogTrigger>

      <DialogContent
        className={`border bg-[#2a2b2a] h-[90vh] flex border-white transition-all duration-300 ${
          showPanel ? "min-w-[70vw]" : "min-w-fit"
        }`}
      >
        {/* Gambar utama */}
        <img
          className={`my-2 transition-all duration-300 ${
            showPanel
              ? "w-[60%] mx-auto rounded-2xl"
              : "w-fit rounded-none object-contain"
          }`}
          src={thread.imageUrl!}
          alt={`Post by ${thread.author.profile.username}`}
        />

        {/* Like & Comment floating */}
        <div className="absolute bottom-0 flex items-center gap-5 px-4 py-2">
          <Like
            likeCount={thread.likeCount}
            liked={thread.liked}
            postId={thread.id}
          />
        </div>

        {!showPanel && (
          <Button
            onClick={() => setShowPanel(true)}
            className="absolute bottom-2 right-4 px-3 py-1 text-white bg-[#2a2b2a]"
          >
            <Comment count={thread.likeComment} />
          </Button>
        )}

        {/* Sidebar komentar */}
        {showPanel && (
          <aside className="bg-[#2a2b2a] border border-white p-6 relative rounded-md w-[40%] transition-all duration-300">
            <div
              onClick={() => setShowPanel(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
            >
              ✕
            </div>
            <DialogHeader className="w-full text-white pb-3">
              <DialogTitle>
                <div className="flex gap-2 my-3 w-full">
                  <img
                    src={avatarUrl}
                    alt={thread.author.profile.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-semibold">
                        {thread.author.profile.name}
                      </p>
                      <p className="text-sm text-gray-500 font-semibold">
                        @{thread.author.profile.username}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400">{thread.content}</p>
                    <p className="text-white text-sm">
                      {formatTime(thread.createdAt)}
                    </p>
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="h-[55vh] w-full border border-white">
              <RepliesSidebar threadId={thread.id} />
            </ScrollArea>

            <ThreadCommentBoxSidebar threadId={thread.id} />
          </aside>
        )}
      </DialogContent>
    </Dialog>
  );
}
