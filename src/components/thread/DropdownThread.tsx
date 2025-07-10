import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

function DropdownThread() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer text-white hover:text-gray-400 duration-100">
          •••
        </DropdownMenuTrigger>
        <DropdownMenuContent className="sm:max-w-[425px] p-3 bg-gray-200 ">
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Hide</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Report</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Follow</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DropdownThread;
