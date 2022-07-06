import Header from "./components/Global/Header";
import Sidebar from "./components/Global/Sidebar";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import NPSAnalysisPage from "./components/Dashboards/NPS/NPS Analysis/NPSAnalysisPage";
import NSSPage from "./components/Dashboards/NPS/NSS/NSSPage";
import { useRecoilState } from "recoil";
import DateFilterStatus from "./recoil/atoms/DateFilterStatusAtom";
import CommentsPage from "./components/Dashboards/NPS/Comments/CommentsPage";
import EngagementModel from "./components/Dashboards/EngagementModel/EngagementModel";
import SDOH from "./components/Dashboards/SDOH/SDOH";
import hamburgerStatusRecoil from "./recoil/atoms/HamburgerAtom";
import { useEffect, useState } from "react";
import Home from "./components/Global/Home";
import NPSDashboard from "./components/Dashboards/NPS/NPS Overall Dashboard/NPSDashboard";
import engagementErrorAtom from "./recoil/atoms/engagementErrorAtom";
import engagementErrorMessage from "./recoil/atoms/engagementErrorMessage";
import activeInnerPage from "./recoil/atoms/activeInnerPage";
import adminAtom from "./recoil/atoms/adminAtom";
import Admin from "./components/Global/Admin";
import inputFieldNull from "./recoil/atoms/inputFieldNull";

function App() {
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);

  const [hamburgerStatus, setHamburgerStatus] = useRecoilState(
    hamburgerStatusRecoil
  );

  const [activePageValue, setActivePageValue] = useRecoilState(activeInnerPage);

  const [engagementError, setEngagementError] =
    useRecoilState(engagementErrorAtom);

  const [engagementErrorMessages, setEngagementErrorMessages] = useRecoilState(
    engagementErrorMessage
  );

  const [adminStatus, setAdminStatus] = useRecoilState(adminAtom);

  const [emptyInputField, setEmptyInputField] = useRecoilState(inputFieldNull);

  useEffect(() => {
    setActivePageValue("NPS_Overall");
  }, []);

  return (
    <div>
      <div className={` cursor-default relative  `}>
        {/*Calendar Overlay */}
        <div
          onClick={() => setDatePickerStatus(!datePickerStatus)}
          className={`h-screen w-full fixed bg-transparent z-[10] ${
            datePickerStatus ? "block" : "hidden"
          }`}
        ></div>

        {/*Sidebar Overlay */}
        <div
          onClick={() => setHamburgerStatus(!hamburgerStatus)}
          className={`h-screen w-full fixed bg-[#00000025] z-[20] ${
            hamburgerStatus ? "block lg:hidden" : "hidden"
          } xl:hidden`}
        ></div>

        {/* admin modal overlay */}
        <div
          onClick={() => {
            setAdminStatus(false);
            setEmptyInputField(!emptyInputField);
          }}
          className={`h-screen w-full fixed   bg-[#00000041] z-[200] justify-center items-center  ${
            adminStatus ? "flex" : "hidden"
          }`}
        >
          {/* <Admin /> */}
        </div>

        <div
          className={` ${
            adminStatus ? "block" : "hidden"
          } fixed  left-[50%] top-[400px] translate-x-[-50%] translate-y-[-50%] z-[300] w-[90%] max-w-[900px]`}
        >
          <Admin />
        </div>

        {/* engagement model error overlay */}
        <div
          onClick={() => setEngagementError(false)}
          className={`h-screen w-full fixed   bg-[#00000059] z-[2000] justify-center items-center  ${
            engagementError ? "flex" : "hidden"
          }`}
        >
          <div className="bg-white rounded-lg p-8 px-10 w-fit shadow-xl modal-animation ">
            <div className="flex flex-col justify-center items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[70px] w-[70px] block mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#FF0000"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-5xl text-red-600 font-extrabold mb-4">
                Error
              </h1>

              <h1 className="text-lg text-gray-600 border p-2 bg-gray-100 rounded-lg">
                {engagementErrorMessages}
              </h1>
            </div>
          </div>
        </div>

        <main className="bg-white ">
          <Router>
            <Header />
            <Sidebar />
            <div className="lg:pl-[170px] p-[8px]">
              {/* <Filter /> */}
              <Routes>
                <Route path="*" element={<Navigate replace to="/" />} />
                <Route exact path="/" element={<Home />}></Route>
                {/* <Route
                  exact
                  path="/npsDashboard"
                  element={<NPSDashboard />}
                ></Route> */}
                {/* <Route
                  path="/engagementModel"
                  element={<EngagementModel />}
                ></Route> */}
                <Route path="/SDOH" element={<SDOH />}></Route>
              </Routes>
            </div>
          </Router>
        </main>
      </div>
    </div>
  );
}

export default App;
