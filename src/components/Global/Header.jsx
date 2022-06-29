import React, { useEffect, useState } from "react";
import CompanyImage from "../../assets/img/global-img/everside_logo.svg";
import logout from "../../assets/img/global-img/logout.svg";
import { useRecoilState } from "recoil";
import hamburgerStatusRecoil from "../../recoil/atoms/HamburgerAtom";
import DateFilterStatus from "../../recoil/atoms/DateFilterStatusAtom";
import UserValidity from "../../recoil/atoms/UserValidity";
import { useNavigate } from "react-router-dom";
import activeInnerPage from "../../recoil/atoms/activeInnerPage";
import { BASE_API_LINK } from "../../utils/BaseAPILink";
import axios from "axios";

const Header = () => {
  const [activePageValue, setActivePageValue] = useRecoilState(activeInnerPage);

  const [userIsValid, setUserIsValid] = useRecoilState(UserValidity);

  const [logoutStatus, setLogoutStatus] = useState(false);

  const [hamburgerStatus, setHamburgerStatus] = useRecoilState(
    hamburgerStatusRecoil
  );
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);

  const navigate = useNavigate();

  const [usernameLocal, setUsernameLocal] = useState();

  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  useEffect(() => {
    if (logoutStatus === true) {
      axios.get(BASE_API_LINK + "logout?" + "username=" + usernameLocal);

      sessionStorage.clear();
    }
  }, [logoutStatus]);

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
        {/* <a href={BASE_API_LINK + "logout?" + "username=" + usernameLocal}> */}
        <img
          src={logout}
          alt="logout"
          className="w-[20px] cursor-pointer hidden lg:block"
          onClick={() => {
            setLogoutStatus(!logoutStatus);

            setActivePageValue("NPS_Overall");
            navigate("/");
            setUserIsValid(false);
            window.location.reload(false);
          }}
        />
        {/* </a> */}
      </div>
    </header>
  );
};

export default Header;
