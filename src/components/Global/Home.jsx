import React from "react";
import { useRecoilState } from "recoil";
import UserValidity from "../../recoil/atoms/UserValidity";
import NPSDashboard from "../Dashboards/NPS/NPS Overall Dashboard/NPSDashboard";
import Auth from "./Auth";
import EKO from "../../assets/img/global-img/ekoLogo.png";

const Home = () => {
  const [userIsValid, setUserIsValid] = useRecoilState(UserValidity);

  return (
    <div>
      <div className="">{userIsValid ? <NPSDashboard /> : <Auth />}</div>
      <div className="flex justify-center items py-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 italic text-xs">Powered by</span>
          <a
            href="https://www.ekoinfomatics.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={EKO}
              alt="EKO INFOMATICS"
              className="inline-block w-[50px]"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
