import React from "react";
import { useRecoilState } from "recoil";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";
import UnderConstruction from "../../Global/UnderConstruction";
import AgeGroupGraph from "./AgeGroupGraph";
import ButtonTrial from "./ButtonTrial";
import EngagementHeader from "./EngagementHeader";
import ENgagementTotalCards from "./ENgagementTotalCards";
import GenderClassification from "./GenderClassification";
import MemberPercentileGraph from "./MemberPercentileGraph";
import MemberScoreGraph from "./MemberScoreGraph";
import PercentileGraph from "./PercentileGraph.jsx";
import TotalCards from "./TotalCards";
import UploadWrapper from "./UploadWrapper";

const EngagementModel = () => {
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);

  return (
    <div>
      {apiData && (
        <div className="w-full mb-2">
          <div className="lg:flex items-center w-full gap-2 mb-2 lg:flex-row-reverse">
            <div className="lg:flex-[0.3] mb-[8px] lg:mb-0">
              <ENgagementTotalCards />
            </div>
            <div className="lg:flex-[0.7] ">
              <MemberScoreGraph />
            </div>{" "}
          </div>
          <div className="lg:flex items-center w-full gap-2 ">
            <div className="flex-1 mb-[8px] lg:mb-0">
              <AgeGroupGraph />
            </div>

            <div className="flex-1">
              <GenderClassification />
            </div>
          </div>
        </div>
      )}
      <UploadWrapper />
    </div>
  );
};
export default EngagementModel;
