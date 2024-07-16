import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const FooterFeed = () => {
  return (
    <footer id="footer-feed" className="pt-14 pb-20">
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-5 mb-10">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold">Company</h2>
          <p>About</p>
          <p>Jobs</p>
          <p>For the Record</p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold">Communities</h2>
          <p>For Artists</p>
          <p>Developers</p>
          <p>Advertising</p>
          <p>Investors</p>
          <p>Venders</p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold">Useful links</h2>
          <p>Support</p>
          <p>Free Mobile App</p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold">BeatFlow Plans</h2>
          <p>Premium Duo</p>
          <p>Premium Family</p>
          <p>Premium Student</p>
          <p>BeatFlow Free</p>
        </div>
        <div className="flex w-max gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#292929] hover:bg-[#ffffff4c]">
            <FaInstagram className="md:w-4 md:h-4" />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#292929] hover:bg-[#ffffff4c]">
            <FaTwitter className="md:w-4 md:h-4" />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#292929] hover:bg-[#ffffff4c]">
            <FaFacebook className="md:w-4 md:h-4" />
          </div>
        </div>
      </section>
      <hr className="border-none h-[1px] bg-[#ffffff1a]" />
      <section className="flex justify-between mt-10">
        <div className="flex flex-wrap gap-3 md:gap-5 lg:flex-nowrap md:mr-2">
          <p>Legal</p>
          <p>Safety & Privacy Center</p>
          <p>Privacy Policy</p>
          <p>Cookies</p>
          <p>About Ads</p>
          <p>Accessibility</p>
        </div>
        <p>© 2024 BeatFlow AB</p>
      </section>
    </footer>
  );
};

export default FooterFeed;
