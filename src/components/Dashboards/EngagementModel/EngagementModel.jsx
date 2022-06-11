import React from "react";
import { useRecoilState } from "recoil";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";
import UnderConstruction from "../../Global/UnderConstruction";
import AgeGroupGraph from "./AgeGroupGraph";
import ButtonTrial from "./ButtonTrial";
import EngagementHeader from "./EngagementHeader";
import GenderClassification from "./GenderClassification";
import MemberPercentileGraph from "./MemberPercentileGraph";
import PercentileGraph from "./PercentileGraph.jsx";
import TotalCards from "./TotalCards";
import UploadWrapper from "./UploadWrapper";

const EngagementModel = () => {
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);

  return (
    <div>
      <UploadWrapper />

      {apiData && (
        <>
          <GenderClassification />
          <AgeGroupGraph />
        </>
      )}
    </div>
  );
};

export default EngagementModel;
