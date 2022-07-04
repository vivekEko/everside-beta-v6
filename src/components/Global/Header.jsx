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
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import adminAtom from "../../recoil/atoms/adminAtom";
import adminTypeAtom from "../../recoil/atoms/adminTypeAtom";

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

  const [adminStatus, setAdminStatus] = useRecoilState(adminAtom);

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

        <div className="flex gap-4 items-center ">
          {/* Admin */}
          <div
            className={` ${
              localStorage?.getItem("adminType") === "true" ? "block" : "hidden"
            } relative group`}
          >
            <ManageAccountsOutlinedIcon
              className="text-[#00ac69] cursor-pointer"
              onClick={() => setAdminStatus(!adminStatus)}
            />

            <div className="absolute top-[120%] invisible -right-4 p-2 text-xs text-gray-500 bg-gray-100 rounded-md group-hover:visible">
              Admin
            </div>
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

          {/* Logout */}
          <div className=" relative group">
            <img
              src={logout}
              alt="logout"
              className="w-[20px] cursor-pointer hidden lg:block"
              onClick={() => {
                setLogoutStatus(true);
                setActivePageValue("NPS_Overall");
                navigate("/");
                setUserIsValid(false);
                localStorage.clear();
                window.location.reload(false);
              }}
            />

            <div className="absolute top-[150%] invisible -right-4 p-2 text-xs text-gray-500 bg-gray-100 rounded-md group-hover:visible">
              Logout
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
