import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useEditComment } from "@/hooks/use-comment-thread";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  replyId: string | number;
  initialContent: string;
};

export default function CommentEditDialog({
  open,
  onOpenChange,
  replyId,
  initialContent,
}: Props) {
  const { form, handleSubmit, isPending } = useEditComment(replyId);
  const { register, setValue } = form;

  useEffect(() => {
    if (open) {
      setValue("content", initialContent);
    }
  }, [open, initialContent, setValue]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2a2b2a] text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Komentar</DialogTitle>
        </DialogHeader>
        <DialogDescription hidden />
        <form onSubmit={handleSubmit}>
          <textarea
            {...register("content")}
            className="w-full h-24 p-2 border rounded"
          />

          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isPending} className="cursor-pointer">
              {isPending ? "Mengupdate..." : "Update"}
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
