// RightBar.tsx
import { useLocation } from "react-router-dom";
import ProfileComp from "@/components/profile/Profile";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa6";
import { BiLogoInstagramAlt } from "react-icons/bi";
import SuggestedUserList from "@/components/follow/SuggestedUserList";

function RightBar() {
  const location = useLocation();
  const hideProfile = ["/profile"].includes(location.pathname);
  const hideSuggested = ["/follow"].includes(location.pathname);

  return (
    <div className="w-[25%] border-l border-black lg:block hidden">
      <div className="fixed p-5">
        {!hideProfile && <ProfileComp />}
        {!hideSuggested && (
          <div className="mt-5 bg-[#2a2b2a] p-4 rounded-lg">
            <h3 className="font-bold text-white">Suggested for you</h3>
            <SuggestedUserList />
          </div>
        )}
        <div className="mt-5 bg-[#2a2b2a] p-4 rounded-lg">
          <div className="text-white flex items-center gap-x-2">
            <p>Developed by Syafiq</p>
            <p>●</p>
            <button className="cursor-pointer hover:text-gray-400 duration-200">
              <FaGithub />
            </button>
            <button className="cursor-pointer hover:text-gray-400 duration-200">
              <CiLinkedin />
            </button>
            <button className="cursor-pointer hover:text-gray-400 duration-200">
              <FaFacebook />
            </button>
            <button className="cursor-pointer hover:text-gray-400 duration-200">
              <BiLogoInstagramAlt />
            </button>
          </div>
          <div className="text-gray-500 flex items-center gap-x-2 text-xs">
            <p>Powered by DumbWays Indonesia ● #1CodingBootcamp</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
