import { NavLink } from "react-router-dom";

import CreateDialog from "@/components/dialog/CreateDialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/connection/contexts/AuthContext";
import { CiLogout } from "react-icons/ci";
import {  IoHomeOutline } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";
import { FaRegHeart, FaRegUser } from "react-icons/fa";

function LeftBar() {
  const { logout } = useAuth();
  function onLogout() {
    logout();
  }
  return (
    
      <div className=" w-[17%] left-0 border-r border-black hidden lg:block">
        <div className=" fixed w-[15%]">
          <div className="flex flex-col gap-3 ml-4 mt-5 relative w-full">
            <p className="title-form text-5xl font-extrabold">Circle</p>
            <NavLink to="/" className="icon-kiri">
              <Button className="bg-transparent justify-start hover:bg-gray-700 transition duration-300 ease-in-out w-full cursor-pointer text-white">
                <IoHomeOutline />
                <p className="">Home</p>
              </Button>
            </NavLink>
            <NavLink to="/search" className="icon-kiri">
              <Button className="bg-transparent justify-start hover:bg-gray-700 transition duration-300 ease-in-out w-full cursor-pointer text-white">
                <MdPersonSearch />
                <p className="">Search</p>
              </Button>
            </NavLink>
            <NavLink to="/follow" className="icon-kiri">
              <Button className="bg-transparent justify-start hover:bg-gray-700 transition duration-300 ease-in-out w-full cursor-pointer text-white">
                <FaRegHeart />
                <p className="">Follows</p>
              </Button>
            </NavLink>
            <NavLink to="/profile" className="icon-kiri ">
              <Button className="text-white bg-transparent justify-start hover:bg-gray-700 transition duration-300 ease-in-out w-full cursor-pointer">
                <FaRegUser />
                <p className="">Profile</p>
              </Button>
            </NavLink>
            <CreateDialog />
          </div>
        </div>
        <Button
          className="fixed -bottom-0 mb-3  left-4 bg-[#2a2b2a] cursor-pointer text-white hover:bg-[#272827]"
          onClick={() => {
            onLogout();
          }}
        >
          <CiLogout />
          Logout
        </Button>
      </div>
    
  );
}

export default LeftBar;
