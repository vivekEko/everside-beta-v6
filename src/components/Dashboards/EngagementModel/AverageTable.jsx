import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";
import ReactToPrint from "react-to-print";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { BASE_API_LINK } from "../../../utils/BaseAPILink";

const AverageTable = () => {
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);
  const [callAverageTable, setCallAverageTable] = useState(false);

  const [usernameLocal, setUsernameLocal] = useState();

  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  const AverageTableRef = useRef();

  // useEffect(() => {
  //   const formData = new FormData();
  //   formData.append("username", apiData?.average_table);

  //   fetch(BASE_API_LINK + "averageTableDownload", {
  //     method: "GET",

  //   })
  //     .then((response) => response?.json())
  //     .then((result) => {
  //       console.log("average response", result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [callAverageTable]);

  return (
    <div
      className="p-4   w-full  rounded-lg bg-white border "
      ref={AverageTableRef}
    >
      <div className="flex justify-between items-center">
        <h1 className=" text-left font-bold  flex-1 px-2 opacity-80 text-[#000C08]">
          Average Data
        </h1>

        {/* <ReactToPrint
          trigger={() => (
            <button>
              <FileDownloadOutlinedIcon
                fontSize="small"
                className="text-gray-500 "
              />
            </button>
          )}
          content={() => AverageTableRef.current}
          documentTitle="AverageTable"
        /> */}

        <a
          href={
            BASE_API_LINK +
            "averageTableDownload?" +
            "username=" +
            usernameLocal
          }
        >
          <FileDownloadOutlinedIcon
            fontSize="small"
            className="text-gray-500 "
          />
        </a>
      </div>

      <div className="overflow-x-scroll scrollbar-hide">
        <div className="grid grid-cols-8 place-items-center gap-2 border-b min-w-[600px] ">
          <div className="w-full p-2 font-medium text-xs text-gray-500">
            Region
          </div>

          <div className="w-full p-2 font-medium text-xs text-gray-500">
            PCP Avail
          </div>

          <div className="w-full p-2 font-medium text-xs text-gray-500">
            Probability
          </div>

          <div className="w-full p-2 font-medium text-xs text-gray-500">
            Insured
          </div>

          <div className="w-full p-2 font-medium text-xs text-gray-500">
            Whites
          </div>

          <div className="w-full p-2 font-medium text-xs text-gray-500">
            Blacks
          </div>

          <div className="w-full p-2 font-medium text-xs text-gray-500">
            Asians
          </div>

          <div className="w-full p-2 font-medium text-xs text-gray-500">
            Hispanics / Latinos
          </div>
        </div>

        <div className=" h-[225px] overflow-y-scroll scrollbar-hide  min-w-[600px] ">
          {apiData?.average_table?.map((data) => (
            <div key={Math.random()} className="grid grid-cols-8  gap-2">
              <div className="w-full p-2 font-semibold text-gray-800 text-sm capitalize">
                {data?.region}
              </div>

              <div className="w-full p-2  text-gray-800 text-sm">
                {parseFloat(data?.PCP_Avail).toFixed(2)}
              </div>

              <div className="w-full p-2  text-gray-800 text-sm">
                {parseFloat(data?.probability_eng).toFixed(2)}
              </div>

              <div className="w-full p-2  text-gray-800 text-sm">
                {parseFloat(data?.Percent_Insured).toFixed(2)}
              </div>

              <div className="w-full p-2  text-gray-800 text-sm">
                {parseFloat(data?.__Ethnic_White).toFixed(2)}
              </div>

              <div className="w-full p-2  text-gray-800 text-sm">
                {parseFloat(data?.per_black).toFixed(2)}
              </div>

              <div className="w-full p-2  text-gray-800 text-sm">
                {parseFloat(data?.per_asian).toFixed(2)}
              </div>

              <div className="w-full p-2  text-gray-800 text-sm">
                {parseFloat(data?.__Hispanic_or_Latino).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AverageTable;
