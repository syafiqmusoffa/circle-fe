import { useEditThread } from "@/hooks/edit-thread";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { LuImagePlus } from "react-icons/lu";

type ThreadCommentBoxProps = {
  thread: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function DialogEditContent({
  thread,
  open,
  onOpenChange,
}: ThreadCommentBoxProps) {
  const {
    handleSubmit,
    isPending,
    fileInputRef,
    handleFileChange,
    setContent,
    preview,
    clearImage,
    content,
    setImage,
    setPreview,
    setImageDeleted,
  } = useEditThread(thread.id);
  useEffect(() => {
    if (!open) {
      setImage(null);
      setPreview(null);
      setImageDeleted(false);
      setContent(thread?.content || "");
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2a2b2a] text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Thread</DialogTitle>
        </DialogHeader>
        <DialogDescription hidden />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 rounded w-full h-24"
              placeholder={thread.content}
            />
            <label>
              <input
                name="imageUrl"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-40 object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={clearImage}
                    className="absolute top-0 right-1 bg-red-500 hover:bg-red-300 cursor-pointer"
                  >
                    Delete image
                  </Button>
                </div>
              ) : thread.imageUrl ? (
                <div className="relative">
                  <img
                    src={thread.imageUrl}
                    alt={thread.imageUrl}
                    className="w-full h-40 object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={clearImage}
                    className="absolute top-0 right-1 bg-red-500 hover:bg-red-300 cursor-pointer"
                  >
                    Delete image
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-40 rounded border border-dashed border-gray-400 text-gray-400">
                  <LuImagePlus className="w-10 h-10" />
                </div>
              )}
            </label>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isPending || (!content.trim() && !preview)}
                className="cursor-pointer"
              >
                {isPending ? "Mengupdate..." : "Update Thread"}
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogEditContent;
