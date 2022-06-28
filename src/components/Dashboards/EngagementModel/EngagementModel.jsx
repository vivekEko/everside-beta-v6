import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";
import AgeGroupGraph from "./AgeGroupGraph";
import ENgagementTotalCards from "./ENgagementTotalCards";
import GenderClassification from "./GenderClassification";
import MemberScoreGraph from "./MemberScoreGraph";
import UploadWrapper from "./UploadWrapper";
import EKO from "../../../assets/img/global-img/ekoLogo.png";
import { BASE_API_LINK } from "../../../utils/BaseAPILink";
import UserValidity from "../../../recoil/atoms/UserValidity";
import Auth from "../../Global/Auth";
import USMap from "./USMap";
import engagementErrorAtom from "../../../recoil/atoms/engagementErrorAtom";
import engagementErrorMessage from "../../../recoil/atoms/engagementErrorMessage";
import AverageTable from "./AverageTable";

const EngagementModel = () => {
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);
  const [usernameLocal, setUsernameLocal] = useState();
  const [userIsValid, setUserIsValid] = useRecoilState(UserValidity);

  const [engagementError, setEngagementError] =
    useRecoilState(engagementErrorAtom);

  const [engagementErrorMessages, setEngagementErrorMessages] = useRecoilState(
    engagementErrorMessage
  );

  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  useEffect(() => {
    if (usernameLocal) {
      const formData = new FormData();
      formData.append("username", usernameLocal);
      fetch(BASE_API_LINK + "egMemberPercentile", {
        method: "POST",
        body: formData,
      })
        .then((response) => response?.json())
        .then((result) => {
          console.log("Engagement previos data:", result);
          setApiData(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [usernameLocal]);

  return (
    <>
      {!userIsValid ? (
        <Auth />
      ) : (
        <div>
          <div className="min-h-[90vh]">
            <UploadWrapper />

            {apiData?.Message === "TRUE" && (
              <div className="w-full mb-2">
                <div className="lg:flex items-center w-full gap-2 mb-2 lg:flex-row-reverse">
                  <div className="lg:flex-[0.3] mb-[8px] lg:mb-0">
                    <ENgagementTotalCards />
                  </div>
                  <div className="lg:flex-[0.7] ">
                    <MemberScoreGraph />
                  </div>
                </div>
                <div className="lg:flex items-start w-full gap-2 ">
                  <div className="w-[40%] mb-[8px] lg:mb-0">
                    <AgeGroupGraph />
                  </div>
                  <div className="w-[60%] mb-[8px] lg:mb-0">
                    <AverageTable />
                  </div>

                  {/* <div className="flex-1">
                    <GenderClassification />
                  </div> */}
                </div>
                <div className="mt-2 rounded-md ">{/* <USMap /> */}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default EngagementModel;
