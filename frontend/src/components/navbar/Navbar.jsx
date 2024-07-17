import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { GoBell } from "react-icons/go";
import { FaArrowDown } from "react-icons/fa6";
import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { RiExternalLinkLine } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    isFixed,
    isLoggedIn,
    setShowLogin,
    showLogout,
    setShowLogout,
    logoutHandler,
  } = useContext(PlayerContext);

  return (
    <nav
      className={`${isFixed ? "fixed top-0 left-1/2 z-50 shadow-md" : ""} h-20`}
    >
      <section className="flex w-full items-center font-semibold justify-between">
        <div className="flex gap-2 items-center">
          <img
            onClick={() => navigate(-1)}
            className="bg-black w-8 rounded-2xl  cursor-pointer p-2"
            src={assets.arrow_left}
            alt="left"
          />
          <img
            onClick={() => navigate(1)}
            className="bg-black w-8 rounded-2xl  cursor-pointer p-2"
            src={assets.arrow_right}
            alt="right"
          />
        </div>
        {isLoggedIn ? (
          <div className="flex gap-4 items-center">
            <p className="text-black bg-white px-4 text-[15px] rounded-2xl  py-1 hidden md:block hover:scale-105 cursor-pointer">
              Explore Premium
            </p>
            <div className="hidden sm:flex items-center gap-2 py-1 bg-black px-3 text-[15px] cursor-pointer rounded-2xl hover:scale-105">
              <div className="rounded-full p-[2px] border border-white">
                <FaArrowDown size={10} />
              </div>
              <p>Install App</p>
            </div>
            <div className="py-2 bg-black px-2 text-[15px] cursor-pointer rounded-full">
              <GoBell className="hover:backdrop-brightness-200" size={18} />
            </div>
            <div
              onClick={() => setShowLogout((prev) => !prev)}
              className="bg-black rounded-full p-1 cursor-pointer"
            >
              <p className="text-black w-7 bg-[#ff6437] h-7 rounded-2xl flex justify-center items-center">
                S
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white text-black text-[18px] px-10 py-2 rounded-full hover:scale-105"
          >
            Login
          </button>
        )}
      </section>
      <section className="flex mt-4 justify-between relative">
        <div className="flex gap-3">
          <p className="text-black bg-white rounded-2xl py-1 px-4 cursor-pointer">
            All
          </p>
          <p className="text-white bg-[#2f2f2f] rounded-2xl py-1 px-4 cursor-pointer">
            Music
          </p>
        </div>
        {showLogout && (
          <article className="flex gap-3 flex-col absolute top 0 right-0 text-[#ffffffe6] bg-[#282828] p-3 rounded z-20 text-md">
            <div className="flex justify-between gap-5 cursor-pointer">
              <p>Account</p>
              <RiExternalLinkLine className="w-5 h-5" />
            </div>
            <p className="w-max cursor-pointer">Profile</p>
            <div className="flex justify-between gap-5 cursor-pointer">
              <p>Upgrade to Premium</p>
              <RiExternalLinkLine className="w-5 h-5" />
            </div>
            <p className="w-max cursor-pointer">Settings</p>
            <hr className="h-[1px] border-none bg-gray-700 px-0" />
            <p onClick={logoutHandler} className="w-max cursor-pointer">
              Log out
            </p>
          </article>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
