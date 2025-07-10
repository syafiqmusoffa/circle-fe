import { useState } from "react";
import { ThreadProps } from "@/types/thread";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DialogEditContent from "../dialog/DialogEditContent";
import { AlertDelete } from "../dialog/AlertDelete";

interface Props {
  thread: ThreadProps;
}

export function DropdownThreads({ thread }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer text-white hover:text-gray-400 duration-100">
          •••
        </DropdownMenuTrigger>
        <DropdownMenuContent className="sm:max-w-[425px] p-3 bg-gray-200">
          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => {
                setIsEditOpen(true);
              }, 50);
            }} className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => {
                setIsDelete(true);
              }, 50);
            }} className="cursor-pointer"
          >Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogEditContent
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        thread={thread}
      />
          <AlertDelete onOpenChange={setIsDelete} open={ isDelete} thread={thread}/>
    </div>
  );
}
