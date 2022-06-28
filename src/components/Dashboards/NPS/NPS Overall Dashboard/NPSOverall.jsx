import React from "react";
import CustomCalendar2 from "../Misc/CustomCalendar2";
import AlertComments from "./AlertComments";
import Clients from "./Clients";
import Clinics from "./Clinics";
import Comments from "./Comments";
import HealthProfessionals from "./HealthProfessionals";
import NPSCard from "./NPSCard";
import NPSOverTime from "./NPSOverTime";
import NPSvsSentiment from "./NPSVsSentiment";
import NSSCard from "./NSSCard";
import NSSOverTime from "./NSSOverTime";
import TotalCard from "./TotalCard";
import NPSDetailedCard from "../NPS Analysis/NPSDetailCard";
import NSSDetailedCard from "../NSS/NSSDetailedCard";
import NPSAllGraph from "../NPS Analysis/NPSAllGraph";
import NSSAllGraph from "../NSS/NSSAllGraph";
import TotalComments from "../Comments/TotalComments";
import NPSallComments from "./NPSallComments";
import CustomCalendar4 from "../Misc/CustomCalendar4";
import NPSallComments2 from "./NPSallComments2";
import NPSallComments3 from "./NPSallComments3";

const NPSOverall = () => {
  return (
    <div>
      <section className="mt-[8px] flex justify-between items-center gap-2 flex-col  sm:flex-col  xl:flex-row xl:gap-2">
        <div className="flex items-start  flex-col sm:flex-row gap-2 w-full xl:w-[70%] ">
          <NPSCard />
          <NSSCard />
        </div>
        <TotalCard />
      </section>
      <section className="my-[8px]  flex flex-col md:flex-row justify-center gap-2">
        <NPSallComments3 />
        <AlertComments />
      </section>
      <section className="my-[8px]  flex flex-col xl:flex-row justify-center gap-2">
        <NPSOverTime />
        <NSSOverTime />
      </section>

      <section className="my-[8px]  grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
        <NPSvsSentiment />
        <HealthProfessionals />
        <Clinics />
        <Clients />
      </section>
      {/* <CustomCalendar4 /> */}
    </div>
  );
};

export default NPSOverall;
