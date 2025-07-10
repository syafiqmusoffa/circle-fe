import { addComment } from "@/hooks/use-comment-thread";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";

function ThreadCommentBox() {
  const { id: threadId } = useParams();
  const { content, setContent, isPending, handleSubmit } =
    addComment(threadId);
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-2 ">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tambahkan komentar..."
        className="w-full border rounded-xl p-2 mt-2 text-white"
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

export default ThreadCommentBox;
