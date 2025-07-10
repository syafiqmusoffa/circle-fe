import { useCreate } from "@/hooks/use-create-thread";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useRef } from "react";
import { LuImagePlus } from "react-icons/lu";
import { Textarea } from "../ui/textarea";
import { Trash2 } from "lucide-react";
import { Plus } from "lucide-react";

function CreateDialog() {
  const {
    isPending,
    setContent,
    content,
    handleFileChange,
    preview,
    clearImage,
    handleSubmit, isOpen, setIsopen
  } = useCreate();
 

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <Dialog open={isOpen} onOpenChange={setIsopen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer text-white border-none bg-green-600 hover:bg-green-800 hover:text-white "
        >
          <p className=" hidden lg:block">Create Thread?</p>
          <p className="lg:hidden">
            <Plus />
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-auto bg-[#2a2b2a] pb-12 text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Create Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid py-3 text-white">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What is happening?!"
              className="focus-visible:ring-0"
            />
          </div>
          <DialogDescription hidden />
          <DialogFooter className="">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer relative"
            >
              <div className="w-full relative">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className=" border-none w-16 h-16 hidden"
                />
                {preview ? (
                  <div className="relative w-auto">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-0 right-0 bg-red-500 bg-opacity-60 text-white p-1 rounded-full cursor-pointer"
                    >
                      <Trash2 />
                    </button>
                  </div>
                ) : (
                  <span className="absolute right-0">
                    <LuImagePlus size={40} />
                  </span>
                )}
              </div>
            </div>
            <Button
              type="submit"
              disabled={isPending || (!content.trim() && !preview)}
              className="cursor-pointer border-none bg-green-600 hover:bg-green-800 hover:text-white"
            >
              {isPending ? "wait..." : "create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDialog;
