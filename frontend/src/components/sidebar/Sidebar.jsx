import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";

import Footer from "../footer/Footer";
import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
const Sidebar = () => {
  const { isLoggedIn } = useContext(PlayerContext);
  const navigate = useNavigate();
  return (
    <aside className="w-[23%] h-full p-2 flex-col text-white gap-2 hidden lg:flex">
      <section className="justify-around h-[30%] rounded flex flex-col bg-[#121212] ">
        <img className="w-32 mb-1 pl-6" src={assets.logo} alt="logo" />
        <div
          onClick={() => navigate("/")}
          className="flex gap-3 items-center cursor-pointer pl-5 "
        >
          <MdHomeFilled size={30} style={{ color: "#fff" }} />
          <p className="font-bold text-[16px]">Home</p>
        </div>
        <div className="group w-max flex gap-3 items-center cursor-pointer pl-5 transition-all duration-300 ease-in-out ">
          <FiSearch
            className="text-[#b3b3b3] group-hover:text-white"
            size={25}
          />
          <p className="font-bold text-[16px] text-[#b3b3b3] group-hover:text-white">
            Search
          </p>
        </div>
      </section>
      <section className="h-[8%] mb-[-9px] bg-[#121212]">
        <div className="flex px-4 pb-4 pt-1 justify-between items-center">
          <div className="group pl-1 flex gap-3 items-center transition-all duration-300 ease-in-out">
            <img
              className="w-7 group-hover:brightness-200 cursor-pointer"
              src={assets.playList}
              alt="stack-icon"
            />
            <p className="font-semibold text-[#b3b3b3] group-hover:text-white cursor-pointer">
              Your Library
            </p>
          </div>
          <div className="flex gap-3 items-center rounded-full p-2 hover:bg-opacity-50 cursor-pointer">
            <LuPlus className="text-[#b3b3b3] hover:text-white" size={20} />
            {isLoggedIn && (
              <FaArrowRight
                className="text-[#b3b3b3] hover:text-white"
                size={20}
              />
            )}
          </div>
        </div>
      </section>
      <section className="h-[30%] rounded bg-[#121212] overflow-x-scroll ">
        <div className="bg-[#242424] p-4 rounded m-2 font-semibold flex flex-col  justify-start items-start pl-4 gap-1">
          <h1>Create your playlist</h1>
          <p className="font-light">Just one click away from playlist</p>
          <button className="py-1.5 px-4 text-black bg-white text-[15px] mt-4 rounded-full">
            Create Playlist
          </button>
        </div>
        <div className="bg-[#242424] p-4 rounded m-2 font-semibold flex flex-col  justify-start items-start pl-4 mt-4 gap-1">
          <h1>Find the best podcasts</h1>
          <p className="font-light">Stay updated to the latest podcasts</p>
          <button className="py-1.5 px-4 text-black bg-white text-[15px] mt-4 rounded-full">
            Browse Podcast
          </button>
        </div>
      </section>
      <Footer />
    </aside>
  );
};

export default Sidebar;
