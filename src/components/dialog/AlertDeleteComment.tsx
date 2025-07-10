import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteComment } from "@/hooks/use-comment-thread";

type DeleteProps = {
  replyId: string | number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};


export function AlertDeleteComment({ replyId,open, onOpenChange }: DeleteProps) {
    const deleteThread = useDeleteComment();
    
      const handleDelete = () => {
        deleteThread.mutate(replyId);
      };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#2a2b2a] text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Mau hapus thread?</AlertDialogTitle>
          <AlertDialogDescription>
            Jika ingin mengubah lebih baik diedit, karena thread akan dihapus
            sepenuhnya.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleDelete}
            className="cursor-pointer bg-red-500"
          >
            Ya, saya yakin.
          </AlertDialogAction>
          <AlertDialogCancel className=" cursor-pointer">
            Batal
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
