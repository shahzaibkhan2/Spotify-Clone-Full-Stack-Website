import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <nav className="flex justify-between w-full border-b-2 border-gray-800 px-5 sm:px-12 py-4 text-lg">
      <p className="text-2xl font-semibold">Admin Panel</p>
      <div className="flex items-center justify-center">
        <p className="mr-3 font-medium">Shahzaib</p>
        <img className="w-10" src={assets.user} alt="user" />
      </div>
    </nav>
  );
};

export default Navbar;
