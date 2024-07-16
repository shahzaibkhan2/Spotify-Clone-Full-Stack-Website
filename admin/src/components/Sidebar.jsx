import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

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
        src={assets.logo_small}
        alt="logo"
      />
      <div className="flex gap-5 mt-10 flex-col">
        <NavLink
          to="/add-song"
          className="flex gap-2.5 items-center bg-white text-gray-800 border border-black drop-shadow-[-4px_4px_#00ff5b] p-2 text-sm font-medium custom-pr"
        >
          <img className="w-5" src={assets.add_song} alt="song" />
          <p className="hidden sm:block">Add Song</p>
        </NavLink>
        <NavLink
          to="/list-song"
          className="flex gap-2.5 items-center bg-white text-gray-800 border border-black drop-shadow-[-4px_4px_#00ff5b] p-2 text-sm font-medium custom-pr"
        >
          <img className="w-5" src={assets.song_icon} alt="song" />
          <p className="hidden sm:block">Song List</p>
        </NavLink>
        <NavLink
          to="/add-album"
          className="flex gap-2.5 items-center bg-white text-gray-800 border border-black drop-shadow-[-4px_4px_#00ff5b] p-2 text-sm font-medium custom-pr"
        >
          <img className="w-5" src={assets.add_album} alt="song" />
          <p className="hidden sm:block">Add Album</p>
        </NavLink>
        <NavLink
          to="/list-album"
          className="flex gap-2.5 items-center bg-white text-gray-800 border border-black drop-shadow-[-4px_4px_#00ff5b] p-2 text-sm font-medium custom-pr"
        >
          <img className="w-5" src={assets.album_icon} alt="song" />
          <p className="hidden sm:block">Album List</p>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
