import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
// import CustomCalendar from "../Misc/CustomCalendar";
import Filter from "../Misc/Filter";
import npsAPIdata from "../../../../recoil/atoms/npsAPIdata";
import nssAPIdata from "../../../../recoil/atoms/nssAPIdata";
import apiNameVar from "../../../../recoil/atoms/apiNameVar";
import totalCardsApiData from "../../../../recoil/atoms/totalCardsApiData";
import npsOverTimeApiData from "../../../../recoil/atoms/npsOverTimeApiData";
import sentimentOverTimeApiData from "../../../../recoil/atoms/sentimentOverTimeApiData";
import npsVsSentimentApiData from "../../../../recoil/atoms/npsVsSentimentApiData";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";
import topCommentsApiData from "../../../../recoil/atoms/topCommentsApiData";
import alertCommentsApiData from "../../../../recoil/atoms/alertCommentsApiData";
import totalCommentsApiData from "../../../../recoil/atoms/totalCommentsApiData";
import NPSOverall from "./NPSOverall";
import NPSAnalysisPage from "../NPS Analysis/NPSAnalysisPage";
import NSSAnalysisPage from "../NSS/NSSAnalysisPage";
import CommentsPage from "../Comments/CommentsPage";
import activeInnerPage from "../../../../recoil/atoms/activeInnerPage";
import largeDateAtom from "../../../../recoil/atoms/largeDateAtom";
import { useNavigate } from "react-router-dom";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import regionList from "../../../../recoil/atoms/regionList";
import goButtonStatus from "../../../../recoil/atoms/goButtonStatus";
import callClinics from "../../../../recoil/atoms/callClinics";
import regionSelectedValue from "../../../../recoil/atoms/regionSelectedValue";
import ClinicValue from "../../../../recoil/atoms/ClinicValue";
import newRegionGlobalValue from "../../../../recoil/atoms/newRegionGlobalValue";
import allDataRecieved from "../../../../recoil/atoms/allDataRecieved";
import providersApiData from "../../../../recoil/atoms/providersApiData";
import clientApidata from "../../../../recoil/atoms/clientApidata";

const NPSDashboard = () => {
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  // const [apiNameVars, setApiNameVars] = useRecoilState(apiNameVar);
  const defaultStartYear = new Date().getFullYear();
  // const defaultStartYear = 2018;

  const defaultStartMonth = 1;
  const defaultEndYear = new Date().getFullYear();
  const defaultEndMonth = new Date().getMonth() + 1;

  // All api data variables
  // const [atomName, setAtomName] = useState();
  const [providerApiAtom, setProviderApiAtom] =
    useRecoilState(providersApiData);
  const [npsApiData, setNpsApiData] = useRecoilState(npsAPIdata);
  const [nssApiData, setNssApiData] = useRecoilState(nssAPIdata);
  const [totalCardsAPIDatas, setTotalCardsAPIDatas] =
    useRecoilState(totalCardsApiData);
  const [npsOverTimeAPIData, setNpsOverTimeAPIData] =
    useRecoilState(npsOverTimeApiData);
  const [nssOverTimeAPIData, setNssOverTimeAPIData] = useRecoilState(
    sentimentOverTimeApiData
  );
  const [npsVsSentiAPIData, setNpsVsSentiAPIData] = useRecoilState(
    npsVsSentimentApiData
  );
  const [clinicsAPIData, setClinicsAPIData] = useRecoilState(clinicsApiData);
  const [topCommentsAPIData, setTopCommentsAPIData] =
    useRecoilState(topCommentsApiData);
  const [alertCommentsAPIData, setAlertCommentsAPIData] =
    useRecoilState(alertCommentsApiData);
  const [allCommentsAPIData, setAllCommentsAPIData] =
    useRecoilState(totalCommentsApiData);
  const [activePageValue, setActivePageValue] = useRecoilState(activeInnerPage);
  const [largeDate, setLargeDate] = useRecoilState(largeDateAtom);

  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [regionListValue, setRegionListValue] = useRecoilState(regionList);
  const [regionValue, setRegionValue] = useRecoilState(regionSelectedValue);

  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);

  const [callClinicValue, setCallClinicValue] = useRecoilState(callClinics);
  const [clinicsAPIdataValue, setClinicAPIDataValue] =
    useRecoilState(clinicsApiData);

  const linksArray = [];
  const defaultArray = [];

  const [selectedClinicValue, setSelectedClinicValue] =
    useRecoilState(ClinicValue);

  const [newRegionGlobal, setNewRegionGlobal] =
    useRecoilState(newRegionGlobalValue);

  const [allDataRecievedStatus, setAllDataRecievedStatus] =
    useRecoilState(allDataRecieved);

  const [clientApiAtom, setClientApiAtom] = useRecoilState(clientApidata);

  const allApiNames = [
    "netPromoterScore",
    "netSentimentScore",
    "totalCards",
    "totalComments",
    "alertComments",
    "npsOverTime",
    "nssOverTime",
    "npsVsSentiments",
    "providersData",
    "clinicData",
    "clientData",
    "filterRegion",
    "filterClinic",
  ];

  useEffect(async () => {
    // Region
    if (callRegion === true) {
      const regionData = await axios.get(
        baseAPI +
          "filterRegion?start_month=" +
          finalStartMonth +
          "&start_year=" +
          finalStartDate +
          "&end_month=" +
          finalEndMonth +
          "&end_year=" +
          finalEndDate +
          "&region=" +
          newRegionGlobal +
          "&clinic=" +
          selectedClinicValue
      );
      setRegionListValue(regionData?.data);

      // console.log("region address:");
      // console.log(regionData);
    }
  }, [callRegion]);

  useEffect(async () => {
    // API url creation
    for (let i = 0; i < 13; i++) {
      const requestURL =
        baseAPI +
        allApiNames[i] +
        "?" +
        "start_year=" +
        finalStartDate +
        "&" +
        "start_month=" +
        finalStartMonth +
        "&" +
        "end_year=" +
        finalEndDate +
        "&" +
        "end_month=" +
        finalEndMonth +
        "&region=" +
        newRegionGlobal +
        "&clinic=" +
        selectedClinicValue;

      const defaultUrl =
        baseAPI +
        allApiNames[i] +
        "?" +
        "start_year=" +
        defaultStartYear +
        "&" +
        "start_month=" +
        defaultStartMonth +
        "&" +
        "end_year=" +
        defaultEndYear +
        "&" +
        "end_month=" +
        defaultEndMonth +
        "&region=" +
        "" +
        "&clinic=" +
        "";

      linksArray.push(requestURL);
      defaultArray.push(defaultUrl);
    }

    setNpsApiData(null);
    setNssApiData(null);
    setTotalCardsAPIDatas(null);
    setNpsOverTimeAPIData(null);
    setNssOverTimeAPIData(null);
    setNpsVsSentiAPIData(null);
    setClinicsAPIData(null);
    setTopCommentsAPIData(null);
    setAlertCommentsAPIData(null);
    setAllCommentsAPIData(null);
    setProviderApiAtom(null);
    setClientApiAtom(null);

    // console.log("fron nps dashboard send data status:");
    // console.log(sendDataStatus);

    // API Calls
    if (sendDataStatus === true) {
      console.log("total Comments response:");
      console.log(linksArray[3]);

      const nps = await axios.get(linksArray[0]);
      setTimeout(() => setNpsApiData(nps?.data), 50);

      // console.log("nps if");
      // console.log(nps?.data);
      // console.log("nps if");
      // console.log(nps?.data);
      // console.log(linksArray[0]);

      const nss = await axios.get(linksArray[1]);
      setTimeout(() => setNssApiData(nss?.data), 50);

      const totalCards = await axios.get(linksArray[2]);
      setTimeout(() => setTotalCardsAPIDatas(totalCards?.data), 50);

      // const topComments = await axios.get(linksArray[3]);
      // setTimeout(() => setTopCommentsAPIData(topComments?.data), 50);

      const allComments = await axios.get(linksArray[3]);
      setTimeout(() => {
        setAllCommentsAPIData(allComments?.data);
      }, 50);

      const alerts = await axios.get(linksArray[4]);
      setTimeout(() => setAlertCommentsAPIData(alerts?.data), 50);

      const npsOverTime = await axios.get(linksArray[5]);
      setTimeout(() => setNpsOverTimeAPIData(npsOverTime?.data), 50);

      const nssOverTime = await axios.get(linksArray[6]);
      setTimeout(() => setNssOverTimeAPIData(nssOverTime?.data), 50);
      // console.log(linksArray[6]);

      const npsVsSentiment = await axios.get(linksArray[7]);
      setTimeout(() => setNpsVsSentiAPIData(npsVsSentiment?.data), 50);

      const providers = await axios.get(linksArray[8]);
      setTimeout(() => setProviderApiAtom(providers), 50);

      const clinics = await axios.get(linksArray[9]);
      // console.log(linksArray[9]);
      setTimeout(() => setClinicsAPIData(clinics?.data), 50);

      const clients = await axios.get(linksArray[10]);
      setTimeout(() => {
        setClientApiAtom(clients?.data);
        setAllDataRecievedStatus(true);
      });
    }

    // ELSE
    else if (sendDataStatus === -1) {
      console.log("total Comments response:");
      console.log(defaultArray[3]);

      const nps = await axios.get(defaultArray[0]);
      setTimeout(() => setNpsApiData(nps?.data), 50);

      const nss = await axios.get(defaultArray[1]);
      setTimeout(() => setNssApiData(nss?.data), 50);

      const totalCards = await axios.get(defaultArray[2]);
      setTimeout(() => setTotalCardsAPIDatas(totalCards?.data), 50);

      // const topComments = await axios.get(defaultArray[3]);
      // setTimeout(() => setTopCommentsAPIData(topComments?.data), 50);

      const allComments = await axios.get(defaultArray[3]);
      setTimeout(() => {
        setAllCommentsAPIData(allComments?.data);
      }, 50);

      const alerts = await axios.get(defaultArray[4]);
      setTimeout(() => setAlertCommentsAPIData(alerts?.data), 50);

      const npsOverTime = await axios.get(defaultArray[5]);
      setTimeout(() => setNpsOverTimeAPIData(npsOverTime?.data), 50);

      const nssOverTime = await axios.get(defaultArray[6]);
      setTimeout(() => setNssOverTimeAPIData(nssOverTime?.data), 50);

      const npsVsSentiment = await axios.get(defaultArray[7]);
      setTimeout(() => setNpsVsSentiAPIData(npsVsSentiment?.data), 50);

      const providers = await axios.get(defaultArray[8]);
      setTimeout(() => setProviderApiAtom(providers), 50);

      const clinics = await axios.get(defaultArray[9]);
      setTimeout(() => setClinicsAPIData(clinics?.data), 50);

      const clients = await axios.get(defaultArray[10]);
      setTimeout(() => {
        setClientApiAtom(clients?.data);
        setAllDataRecievedStatus(true);
      });

      // console.log("default all comments");
    }
  }, [goStatus]);

  // let history = useNavigate();

  // if (sessionStorage.getItem("useStatus") === null) {
  //   history("/");
  // }

  return (
    <div className="relative">
      <div className=" sticky top-12  z-10  bg-white">
        <Filter />
      </div>
      {activePageValue === "NPS_Overall" ? <NPSOverall /> : ""}
      {activePageValue === "NPS_Analysis" ? <NPSAnalysisPage /> : ""}
      {activePageValue === "NSS_Analysis" ? <NSSAnalysisPage /> : ""}
      {activePageValue === "Comments" ? <CommentsPage /> : ""}
    </div>
  );
};

export default NPSDashboard;
