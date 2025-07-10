import { MdComment } from "react-icons/md";

interface CommentProps {
  count : number
}

function Comment({count}:CommentProps) {
  return (
    <div className="my-3 flex gap-x-2 items-center text-white hover:text-gray-500 duration-200 cursor-pointer">
      <MdComment className="" size={20} />
      <span >{count}</span>
    </div>
  );
}

export default Comment;
