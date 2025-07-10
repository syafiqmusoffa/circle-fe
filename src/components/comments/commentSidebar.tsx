import { addComment, fetchComments } from "@/hooks/use-comment-thread";
import Replies from "./CommentThread";
import { Button } from "../ui/button";

type ThreadCommentBoxProps = {
  threadId: any;
};
export function RepliesSidebar({ threadId }: ThreadCommentBoxProps) {
  const {
    data: replies = [],
    isLoading,
    isError,
  } = fetchComments(threadId.toString());

  

  if (isLoading) return <p className="text-gray-400">Loading...</p>;
  if (isError) return <p className="text-red-500">Gagal memuat komentar.</p>;

  return (
    <div>
      <Replies replies={replies} />
    </div>
  );
}



export function ThreadCommentBoxSidebar({ threadId }: ThreadCommentBoxProps) {
  const { content, setContent, isPending, handleSubmit } = addComment(threadId);
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-2 ">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tambahkan komentar..."
        className="w-full rounded-xl p-2 mt-2 text-white"
      />
      <Button
        type="submit"
        disabled={isPending || !content.trim()}
        className="cursor-pointer text-white border-none bg-green-600 hover:bg-green-800 hover:text-white"
      >
        {isPending ? "Mengirim..." : "Kirim"}
      </Button>
    </form>
  );
}
