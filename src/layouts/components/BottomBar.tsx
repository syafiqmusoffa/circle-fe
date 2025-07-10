import CreateDialog from "@/components/dialog/CreateDialog";
import { Button } from "@/components/ui/button";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";
import { NavLink } from "react-router-dom";


function BottomBar() {
    return (
      <div className="fixed bottom-0 left-0 w-screen lg:hidden">
        <div className="flex justify-around items-center w-screen h-14 bg-secondary bg-[#1a1b1a] border border-t-black">
          <div className="flex justify-around items-center w-full max-w-md h-14 bg-secondary">
            <NavLink to="/" className="icon-kiri">
              <Button className="bg-transparent justify-start hover:bg-gray-700 transition duration-300 ease-in-out w-full cursor-pointer text-white">
                <IoHomeOutline />
              </Button>
            </NavLink>
            <NavLink to="/search" className="icon-kiri">
              <Button className="bg-transparent justify-start hover:bg-gray-700 transition duration-300 ease-in-out w-full cursor-pointer text-white">
                <MdPersonSearch />
              </Button>
            </NavLink>
            <CreateDialog />
            <NavLink to="/follow" className="icon-kiri">
              <Button className="bg-transparent justify-start hover:bg-gray-700 transition duration-300 ease-in-out w-full cursor-pointer text-white">
                <FaRegHeart />
              </Button>
            </NavLink>
            <NavLink to="/profile" className="icon-kiri ">
              <Button className="text-white bg-transparent justify-start hover:bg-gray-700 transition duration-300 ease-in-out w-full cursor-pointer">
                <FaRegUser />
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    );
}

export default BottomBar

