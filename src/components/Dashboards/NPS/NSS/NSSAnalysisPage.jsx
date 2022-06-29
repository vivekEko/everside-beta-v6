import React from "react";
import Filter from "../Misc/Filter";
import NSSFormula from "./NSSFormula";
import NSSDetailedCard from "./NSSDetailedCard";
import NSSAllGraph from "./NSSAllGraph";

const NSSAnalysisPage = () => {
  return (
    <div className="relative">
      {/* <Filter /> */}
      <section className="flex flex-col lg:flex-row items-center justify-center gap-5 mt-[8px]">
        {/* <NSSFormula /> */}
        <NSSDetailedCard />
      </section>

      <section className="my-[8px]  flex flex-col lg:flex-row justify-center gap-[18px]">
        <NSSAllGraph />
      </section>
    </div>
  );
};

export default NSSAnalysisPage;
