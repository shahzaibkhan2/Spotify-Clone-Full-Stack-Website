import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import { BsMusicNoteList } from "react-icons/bs";
import { MdLibraryMusic } from "react-icons/md";
import { IoIosAlbums } from "react-icons/io";

const Sidebar = () => {
  return (
    <aside className="min-h-screen pl-[4vw] bg-[#000]">
      <img
        className="custom-width-lg mt-5 hidden sm:block"
        src={assets.logo}
        alt="logo"
      />
      <img
        className="custom-width-sm mr-5 mt-5 sm:hidden block"
        src={assets.logoMini}
        alt="logo"
      />
      <div className="flex gap-5 mt-10 flex-col">
        <NavLink
          to="/add-song"
          className="flex gap-2.5 items-center bg-[#a04c68] text-white border drop-shadow-[-4px_4px_#fff] p-2 text-sm font-medium custom-pr"
        >
          <PiMusicNotesPlusFill className="w-7 h-7" />
          <p className="hidden sm:block">Add Song</p>
        </NavLink>
        <NavLink
          to="/list-song"
          className="flex gap-2.5 items-center bg-[#a04c68] text-white border drop-shadow-[-4px_4px_#fff] p-2 text-sm font-medium custom-pr"
        >
          <BsMusicNoteList className="w-6 h-6" />
          <p className="hidden sm:block">Song List</p>
        </NavLink>
        <NavLink
          to="/add-album"
          className="flex gap-2.5 items-center bg-[#a04c68] text-white border drop-shadow-[-4px_4px_#fff] p-2 text-sm font-medium custom-pr"
        >
          <MdLibraryMusic className="w-6 h-6" />
          <p className="hidden sm:block">Add Album</p>
        </NavLink>
        <NavLink
          to="/list-album"
          className="flex gap-2.5 items-center bg-[#a04c68] text-white border drop-shadow-[-4px_4px_#fff] p-2 text-sm font-medium custom-pr"
        >
          <IoIosAlbums className="w-6 h-6" />

          <p className="hidden sm:block">Album List</p>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
