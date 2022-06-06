import React from "react";
import CompanyImage from "../../assets/img/global-img/everside_logo.svg";
import Avatar from "../../assets/img/avatar/avatar4.jpg";
import { useRecoilState } from "recoil";
import hamburgerStatusRecoil from "../../recoil/atoms/HamburgerAtom";
import DateFilterStatus from "../../recoil/atoms/DateFilterStatusAtom";

const Header = () => {
  const [hamburgerStatus, setHamburgerStatus] = useRecoilState(
    hamburgerStatusRecoil
  );
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);

  return (
    <header
      onClick={() => setDatePickerStatus(!setDatePickerStatus)}
      className="sticky top-0 h-[50px] bg-white border-b-[#EBECEB] border-[1px] z-50 w-full right-0 left-0"
    >
      <div className="flex justify-between items-center px-2 sm:px-2 md:px-5 h-full">
        {/* Company Logo */}
        <div>
          <img
            src={CompanyImage}
            alt="Everside Logo"
            className=" w-[135px]"
            onClick={() => window.location.reload(false)}
          />
        </div>

        {/* Hamburger */}
        <div
          className="w-[22px] justify-center items-center  flex flex-col lg:hidden gap-[6px] cursor-pointer transition-all"
          onClick={() => setHamburgerStatus(!hamburgerStatus)}
        >
          <div
            className={`w-full h-[2px] rounded-xl bg-[#00ac69]  transition-all  ${
              hamburgerStatus
                ? "rotate-45 translate-y-1 ease-in h-[2px]"
                : "rotate-0 translate-y-0  ease-out"
            }`}
          ></div>
          <div
            className={`w-full h-[2px] rounded-xl bg-[#00ac69]  transition-all  ${
              hamburgerStatus ? "hidden ease-out" : "ease-in"
            }`}
          ></div>
          <div
            className={`w-full h-[2px] rounded-xl bg-[#00ac69]  transition-all  ${
              hamburgerStatus
                ? "-rotate-45 -translate-y-1 ease-in h-[2px]"
                : "rotate-0 translate-y-0  ease-out"
            }`}
          ></div>
        </div>

        {/* User Avatar */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="text-[14px] font-semibold md:font-bold mr-[8px]">
            {/* Katrina */}
          </div>
          <img src={Avatar} alt="avatar" className="w-[30px] rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default Header;
