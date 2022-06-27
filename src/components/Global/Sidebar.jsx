import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import activeInnerPage from "../../recoil/atoms/activeInnerPage";
import hamburgerStatusRecoil from "../../recoil/atoms/HamburgerAtom";
import componentName from "../../recoil/atoms/PageNameAtom";
import BoxIconLarge from "../Sidebar/IconContainer/BoxIconLarge";
import BoxIconSmall from "../Sidebar/IconContainer/BoxIconSmall";
import DashboardIcon from "../Sidebar/IconContainer/DashboardIcon";
import NPSDashboardIcon from "../Sidebar/IconContainer/NPSDashboardIcon";
import SidebarLink from "../Sidebar/LinkContainer/SidebarLink";
import SidebarMiniLink from "../Sidebar/LinkContainer/SidebarMiniLink";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import EngagementIcon from "../Sidebar/IconContainer/EngagementIcon";
import UserValidity from "../../recoil/atoms/UserValidity";
import DateFilterStatus from "../../recoil/atoms/DateFilterStatusAtom";
import logout from "../../assets/img/global-img/logout.svg";

const Sidebar = () => {
  const [userIsValid, setUserIsValid] = useRecoilState(UserValidity);

  const [hamburgerStatus, setHamburgerStatus] = useRecoilState(
    hamburgerStatusRecoil
  );

  // const [componentNameValue, setComponentNameValue] =
  //   useRecoilState(componentName);

  const [componentNameValue, setComponentNameValue] =
    useRecoilState(componentName);

  // const [childNPSLinkStatus, setChildNPSLinkStatus] = useState(false);
  const [bgColorValue, setbgColorValue] = useState("transparent");
  const [strokeColor, setStrokeColor] = useState("#000C08");

  const [pageName, setPageName] = useState("/");
  const location = useLocation();

  // useEffect(() => {
  //   setPageName("/");
  // }, [pageName]);

  useEffect(() => {
    if (pageName === componentNameValue) {
      setbgColorValue("#00AC69");
      setStrokeColor("#00AC69");
    } else {
      setbgColorValue("transparent");
      setStrokeColor("#000C08");
    }
  }, [pageName, componentNameValue]);

  const [activePageValue, setActivePageValue] = useRecoilState(activeInnerPage);
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);
  let navigate = useNavigate();

  return (
    <div
      className={`h-[calc(100vh-50px)]  mt-[50px] fixed inset-y-0 left-0 z-30  overflow-y-scroll overflow-x-hidden transition-all duration-[400ms] ease-out transform    scrollbar-hide  bg-white border-r-2 border-b-[#EBECEB] border-[1px] w-[165px] ${
        hamburgerStatus
          ? "ease-in   "
          : "ease-out  -translate-x-[100%] lg:translate-x-0 "
      }`}
      onClick={() => setDatePickerStatus(!setDatePickerStatus)}
    >
      <div className="   ">
        <div className="pt-[65px] relative ">
          <div>
            <div className="mb-[30px]">
              <SidebarLink
                iconName="/"
                pageName={pageName}
                linkName="NPS"
                onClick={() => {
                  setPageName("/");
                  setComponentNameValue("/");
                  // setChildNPSLinkStatus(!childNPSLinkStatus);
                  setHamburgerStatus(!hamburgerStatus);
                  setActivePageValue("NPS_Overall");
                }}
                icon={
                  <NPSDashboardIcon
                    bgColor={bgColorValue}
                    strokeColor={strokeColor}
                    iconName="/"
                    pageName={pageName}
                  />
                }
              />

              <div className={`mt-[10px] w-[90%] ml-auto `}>
                <SidebarMiniLink
                  iconName="NPS_Analysis"
                  pageName={activePageValue}
                  linkName="NPS Analysis"
                  onClick={() => {
                    setPageName("/");
                    setComponentNameValue("/");
                    setHamburgerStatus(!hamburgerStatus);
                    setActivePageValue("NPS_Analysis");
                  }}
                  icon={
                    <NPSDashboardIcon
                      bgColor={bgColorValue}
                      strokeColor={strokeColor}
                      iconName="NPS_Analysis"
                      pageName={activePageValue}
                    />
                  }
                />

                <SidebarMiniLink
                  iconName="NSS_Analysis"
                  pageName={activePageValue}
                  linkName="Sentiments"
                  onClick={() => {
                    setPageName("/");
                    setComponentNameValue("/");
                    setHamburgerStatus(!hamburgerStatus);
                    setActivePageValue("NSS_Analysis");
                  }}
                  icon={
                    <NPSDashboardIcon
                      bgColor={bgColorValue}
                      strokeColor={strokeColor}
                      iconName="NSS_Analysis"
                      pageName={activePageValue}
                    />
                  }
                />

                <SidebarMiniLink
                  iconName="Comments"
                  pageName={activePageValue}
                  linkName="Comments"
                  onClick={() => {
                    setPageName("/");
                    setComponentNameValue("/");
                    setHamburgerStatus(!hamburgerStatus);
                    setActivePageValue("Comments");
                  }}
                  icon={
                    <NPSDashboardIcon
                      bgColor={bgColorValue}
                      strokeColor={strokeColor}
                      iconName="Comments"
                      pageName={activePageValue}
                    />
                  }
                />
              </div>
            </div>

            {/* <EngagementIcon /> */}

            <div className="mb-[30px] ">
              <SidebarLink
                iconName="Engagement_Model"
                pageName={pageName}
                linkName="Engagement Model"
                onClick={() => {
                  setPageName("Engagement_Model");
                  setComponentNameValue("Engagement_Model");
                  setHamburgerStatus(!hamburgerStatus);
                  setActivePageValue("Engagement_Model");
                }}
                icon={
                  <BoxIconLarge
                    bgColor={bgColorValue}
                    strokeColor={strokeColor}
                    iconName="Engagement_Model"
                    pageName={pageName}
                  />
                }
              />
            </div>

            {/* <div className="mb-[30px] invisible">
              <Link to="/SDOH">
                <SidebarLink
                  iconName="/SDOH"
                  pageName={pageName}
                  linkName="SDOH"
                  onClick={() => {
                    setPageName("/SDOH");
                    setComponentNameValue("/SDOH");
                    setHamburgerStatus(!hamburgerStatus);
                    setActivePageValue(null);
                  }}
                  icon={
                    <BoxIconLarge
                      bgColor={bgColorValue}
                      strokeColor={strokeColor}
                      iconName="/SDOH"
                      pageName={pageName}
                    />
                  }
                />
              </Link>
            </div> */}
          </div>
        </div>
        <div className=" absolute top-[calc(100vh-100px)] left-0 right-0 h-[50px]  ">
          <img
            src={logout}
            alt="logout"
            className="w-[25px] cursor-pointer lg:hidden mx-auto"
            onClick={() => {
              sessionStorage.clear();
              // history("/");
              navigate("/");
              setUserIsValid(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
