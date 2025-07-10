import { ReplyProps } from "@/types/thread";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formatTime } from "@/utils/formatTime";
import { DropdownComment } from "../dropdown/DropdownComments";
import { NavLink } from "react-router-dom";
import { useMe } from "@/hooks/use-me";

interface RepliesProps {
  replies: ReplyProps[];
}

function Replies({ replies }: RepliesProps) {
  const isEmpty = replies.length === 0;
  const { data: user } = useMe();
  return (
    <div className="mt-4">
      {isEmpty ? (
        <p className="w-full border-t border-black pt-2 pl-12 text-sm text-gray-500 text-center">
          No replies yet.
        </p>
      ) : (
        replies.map((reply) => (
          <div
            className="flex w-full border-t border-black py-3 pl-4 justify-between"
            key={reply.id}
          >
            <div className=" flex gap-x-3 ">
              <NavLink
                to={`/profile/${reply.author?.profile?.username}`}
                className="cursor-pointer flex"
              >
                <Avatar className="w-12 h-12">
                  {reply.author.profile.avatarUrl ? (
                    <AvatarImage src={reply.author.profile.avatarUrl} alt="" />
                  ) : (
                    <AvatarImage
                      src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${reply.author.profile.username}`}
                      alt={reply.author.profile.username}
                    />
                  )}
                </Avatar>
              </NavLink>
              <div>
                <div className="flex">
                  <NavLink
                    to={`/profile/${reply.author?.profile?.username}`}
                    className="cursor-pointer flex"
                  >
                    <p className="text-white text-sm mr-3 break-all whitespace-normal font-semibold">
                      {reply.author.profile.name}
                    </p>
                    <p className="text-sm text-gray-500 font-semibold">
                      @{reply.author?.profile?.username}
                    </p>
                  </NavLink>
                </div>
                <p className="text-sm text-gray-400  break-all whitespace-normal">
                  {reply.content}
                </p>
                <p className="text-white text-sm right-0">
                  {formatTime(reply.createdAt)}
                </p>
              </div>
            </div>
            {user?.id === reply.author.profile.userId && (
              <DropdownComment content={reply.content} replyId={reply.id} />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Replies;
