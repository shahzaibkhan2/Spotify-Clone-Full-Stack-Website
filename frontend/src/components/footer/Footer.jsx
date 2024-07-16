import { RiGlobalLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="text-[#a7a7a7] text-[11px] gap-4 h-[45%] rounded flex flex-col bg-[#121212]">
      <div className="flex gap-4 items-center pl-5 mt-8">
        <p>Legal</p>
        <p>Safety & Privacy Center</p>
      </div>
      <div className="flex gap-4 items-center pl-5">
        <p>Privacy Policy</p>
        <p>Cookies</p>
        <p>About Ads</p>
      </div>
      <p className="items-center pl-5">Accessibility</p>
      <p className="items-center pl-5">Cookies</p>
      <div className="ml-5 w-[90px] h-8 flex items-center gap-1 px-2 border border-solid border-gray-500 rounded-full group hover:border-white hover:scale-[1.02] cursor-pointer">
        <RiGlobalLine
          className="text-white group-hover:brightness-200"
          size={20}
        />
        <p className="text-[13px] text-white group-hover:brightness-200">
          English
        </p>
      </div>
    </footer>
  );
};

export default Footer;
