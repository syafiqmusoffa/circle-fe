import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CommentEditDialog from "../dialog/CommentEditDialog";
import { AlertDeleteComment } from "../dialog/AlertDeleteComment";

type Props = {
  replyId: any;
  content: string;
};

export function DropdownComment({ replyId, content }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer text-white hover:text-gray-400 duration-100 mr-3">
          •••
        </DropdownMenuTrigger>
        <DropdownMenuContent className="sm:max-w-[425px] p-3 bg-gray-200">
          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => {
                setIsEditOpen(true);
              }, 50);
            }}
            className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => {
                setIsDelete(true);
              }, 50);
            }}
            className="cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CommentEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        replyId={replyId}
        initialContent={content}
      />
      <AlertDeleteComment
        onOpenChange={setIsDelete}
        open={isDelete}
        replyId={replyId}
      />
    </div>
  );
}
