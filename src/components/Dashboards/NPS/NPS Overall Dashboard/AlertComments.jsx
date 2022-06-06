import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import extremeCommentsData from "../../../../mock_API/NPS/NPS Main Dashboard/AlertsComments.json";
import { useRecoilState } from "recoil";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import SearchIcons from "../../../../assets/img/global-img/searchIcon.svg";
import ErrorIcon from "../../../../assets/img/global-img/Error.svg";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import alertCommentsApiData from "../../../../recoil/atoms/alertCommentsApiData";
import ExtremeIcon from "../../../../assets/img/NPS Dashboard/Extreme.svg";

const AlertComments = () => {
  const [inputData, setInputData] = useState("");
  const [expandComment, setExpandComment] = useState("");
  const [clickCount, setClickCount] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [totalFilteredComments, setTotalFilteredComments] = useState();

  const handleInput = (e) => {
    setInputData(e.target.value);

    setTotalFilteredComments(
      apiData?.data?.filter((filtered_value) => {
        return filtered_value?.review
          ?.toLowerCase()
          ?.includes(e.target.value?.toLowerCase());
      }).length
    );
  };

  //   truncating description if it contains more then desired no. of characters
  function truncate(string, n) {
    return (
      <span>
        {string?.length > n && (
          <span>
            {string.substr(0, n - 1)}{" "}
            <span className="text-[10px] text-gray-500 cursor-pointer">
              {" "}
              ... read more
            </span>
          </span>
        )}
        {string?.length < n && <span>{string}</span>}
      </span>
    );
  }

  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [apiData, setApiData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const [alertCommentsAPIData, setAlertCommentsAPIData] =
    useRecoilState(alertCommentsApiData);

  useEffect(() => {
    setApiData(alertCommentsAPIData);
    // console.log(apiData.length);
  }, [alertCommentsAPIData]);

  // useEffect(() => {
  //   console.log("Alert Data:");
  //   console.log(apiData);
  // }, [apiData]);

  return (
    <div className=" w-[100%] md:w-[40%] p-2 h-[400px] rounded-lg bg-white border ">
      {!apiData?.data && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData?.data && (
        <div>
          <div className=" pt-2  flex justify-between items-center pb-4 ">
            <h1 className=" text-left font-bold  flex-1 px-2 opacity-80">
              Alerts
              <span
                className={` ${
                  inputData ? " " : " hidden"
                }  ml-1 sm:ml-5 text-[#0b271c]  rounded-md bg-red-100  border text-xs sm:text-sm p-1 sm:px-2`}
              >
                {totalFilteredComments}
              </span>
            </h1>
            <div className=" rounded-md  flex justify-end items-center ">
              <input
                type="text"
                placeholder="Search.."
                className={` outline-none  transition-all pl-2 text-xs  pb-1 w-[80px] sm:w-[100px] ${
                  searchStatus
                    ? "xl:w-[100%] ease-in  xl:border-b-[1px]"
                    : "xl:w-[0%] ease-out"
                }`}
                onChange={handleInput}
                value={inputData}
              />

              <img
                src={SearchIcons}
                alt="searchIcon"
                className="px-2 cursor-pointer"
                onClick={() => setSearchStatus(!searchStatus)}
              />
            </div>
          </div>

          <div className=" h-[340px] overflow-y-scroll scrollbar-hide ">
            {apiData?.data?.length === 0 ? (
              <div className="h-full w-full flex justify-center items-center text-gray-400">
                No Alerts
              </div>
            ) : (
              ""
            )}
            <table className=" text-[12px] p-3 pb-0 w-full">
              <thead className="border-b-gray-100 border-b-2 sticky bg-white top-0 z-[5]">
                <tr className=" flex justify-between items-center gap-3 text-center px-2 text-[10px] text-gray-500 uppercase p-2 font-normal">
                  <th className=" text-gray-400 w-[10%] min-w-[70px] capitalize  text-left font-normal ">
                    Date
                  </th>
                  <th className=" text-gray-400 w-[60%] min-w-[200px]  capitalize text-left font-normal">
                    Comments
                  </th>

                  <th className=" text-gray-400 w-[25%] min-w-[70px]  capitalize font-normal text-left ">
                    Clinic
                  </th>

                  <th className="font-normal w-[5%]   text-gray-400 capitalize invisible">
                    Sentiment
                  </th>
                </tr>
              </thead>
              {apiData?.data
                ?.filter((filtered_value) => {
                  if (inputData === "") {
                    return filtered_value;
                  } else if (
                    filtered_value?.review
                      ?.toLowerCase()
                      ?.includes(inputData.toLowerCase())
                  ) {
                    return filtered_value;
                  }
                })
                .map((data, index) => {
                  return (
                    <tbody key={index} className="w-full ">
                      <tr className="  flex justify-around items-center gap-3 px-2 py-3 border-b">
                        <td className=" text-gray-400 w-[10%] min-w-[70px] capitalize  font-normal text-[12px] ">
                          {data?.timestamp}
                        </td>
                        <td className="  text-gray-400 w-[60%] min-w-[200px]  text-left font-normal ">
                          <div
                            className="w-full text-[#000c08b3] text-[12px] font-semibold"
                            onClick={() => {
                              setExpandComment(data?.id);
                              setClickCount(!clickCount);
                            }}
                          >
                            {expandComment == data?.id && clickCount
                              ? data?.review
                              : truncate(data?.review, 100)}
                          </div>
                        </td>

                        <td className=" text-gray-400 w-[25%] min-w-[70px]   font-normal ">
                          {data?.clinic}
                        </td>
                        <td className="font-normal w-[5%]   text-gray-400 capitalize">
                          <img
                            src={ExtremeIcon}
                            alt="extreme"
                            className="ml-auto"
                          />
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertComments;
