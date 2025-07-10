import { MdKeyboardBackspace } from "react-icons/md";
import {  useNavigate, useParams } from "react-router-dom";

import ThreadText from "@/components/thread/ThreadText";
import ThreadCommentBox from "@/components/comments/ThreadCommentBox";
import { fetchComments } from "@/hooks/use-comment-thread";
import Replies from "@/components/comments/CommentThread";

function DetailThread() {
  const { id } = useParams();
  const { data: replies = [], isLoading, isError } = fetchComments(id!);
  const navigate = useNavigate();

 
   
  return (
    <div className="pt-3 ">
      <div className="p-3 flex items-center">
        <div onClick={() => navigate(-1)}>
          <MdKeyboardBackspace className="text-gray-500 cursor-pointer w-10 h-8" />
        </div>
        <h1 className="text-4xl text-gray-400">Thread</h1>
      </div>

      <ThreadText />

      <ThreadCommentBox />

      {isLoading ? (
        <p className="text-center text-gray-500 mt-4">Loading comments...</p>
      ) : isError ? (
        <p className="text-center text-red-500 mt-4">
          Failed to load comments.
        </p>
      ) : (
        <Replies replies={replies} />
      )}
      <div className="py-10 ">

      </div>
    </div>
  );
}

export default DetailThread;
