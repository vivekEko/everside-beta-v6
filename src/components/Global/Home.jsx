import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import UserValidity from "../../recoil/atoms/UserValidity";
import NPSDashboard from "../Dashboards/NPS/NPS Overall Dashboard/NPSDashboard";
import Auth from "./Auth";

const Home = () => {
  const [userIsValid, setUserIsValid] = useRecoilState(UserValidity);

  // useEffect(() => {
  //   console.log("validity of user:");
  //   // console.log(userIsValid);
  // }, [userIsValid]);

  return (
    <div>
      {/* <div>
        <button
          className="p-5 bg-white rounded-md"
          onClick={() => setUserIsValid(!userIsValid)}
        >
          {userIsValid}
        </button>
      </div> */}
      {/* <div className="relative">
        {userIsValid ? <NPSDashboard /> : <Auth />}
      </div> */}

      {userIsValid ? <NPSDashboard /> : <Auth />}
    </div>
  );
};

export default Home;
