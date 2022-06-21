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
import { useState } from "react";
import Home from "./components/Global/Home";
import NPSDashboard from "./components/Dashboards/NPS/NPS Overall Dashboard/NPSDashboard";

function App() {
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);

  const [hamburgerStatus, setHamburgerStatus] = useRecoilState(
    hamburgerStatusRecoil
  );

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
        <Header />
        <main className="bg-white ">
          <Router>
            <Sidebar />
            <div className="lg:pl-[170px] p-[8px]">
              {/* <Filter /> */}
              <Routes>
                <Route path="*" element={<Navigate replace to="/" />} />
                <Route exact path="/" element={<Home />}></Route>
                <Route
                  exact
                  path="/npsDashboard"
                  element={<NPSDashboard />}
                ></Route>
                <Route
                  path="/engagementModel"
                  element={<EngagementModel />}
                ></Route>
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
