/** @format */
import icons from "../../ultils/icons";
import user from "../../assets/images/boyImage.jpg";
const { FaUserAlt, BsFillCaretDownFill } = icons;
import logo from "../../assets/images/logo.png";
const Header = () => {
  return (
    <div className="flex justify-between h-header py-2 px-10">
      <div className="flex gap-3 items-center">
        <img
          className="w-[64px] h-[64px] object-contain"
          src={logo}
          alt="logo"
        />
        <div className="text-[24px] text-main font-semibold">
          <h2 className="uppercase ">trường đại học công nghệ đông á</h2>
          <p className="text-[12px] mt-2">EAST ASIA UNVERSITY OF TECHNOLOGY</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* <img
          className="rounded-full w-[32px] h-[32px] object-contain"
          src={user}
        /> */}
        <svg
          className="h-12 w-12 text-gray-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>

        <span className="text-[16px] text-main font-serif">Admin</span>
        <span className="text-main">
          <BsFillCaretDownFill size={12} />
        </span>
      </div>
    </div>
  );
};

export default Header;
