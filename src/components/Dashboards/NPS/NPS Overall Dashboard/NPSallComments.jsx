import React, { useEffect, useState } from "react";
// import TopCommentsQ1Data from "../../../../mock_API/NPS/NPS Main Dashboard/Comments.json";
import { useRecoilState } from "recoil";
import PuffLoader from "react-spinners/PuffLoader";
import SearchIcons from "../../../../assets/img/global-img/searchIcon.svg";
import totalCommentsApiData from "../../../../recoil/atoms/totalCommentsApiData";
import PositiveIcon from "../../../../assets/img/NPS Dashboard/Positive.svg";
import NegativeIcon from "../../../../assets/img/NPS Dashboard/Negative.svg";
import ExtremeIcon from "../../../../assets/img/NPS Dashboard/Extreme.svg";
import NeutralIcon from "../../../../assets/img/NPS Dashboard/Neutral.svg";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import totalComments from "../../../../recoil/atoms/totalComments";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import nssAPIdata from "../../../../recoil/atoms/nssAPIdata";

const NPSallComments = () => {
  const [inputData, setInputData] = useState("");
  const [expandComment, setExpandComment] = useState("");
  const [clickCount, setClickCount] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [totalViewedComments, setTotalViewedComments] = useState(99);
  const [totalNoComments, setTotalNoComments] = useRecoilState(totalComments);
  const [totalFilteredComments, setTotalFilteredComments] = useState(100);
  const [ascSort, setAscSort] = useState(false);
  const [showSentiments, setShowSentiments] = useState(false);
  const [selectedSentiments, setSelectedSentiments] = useState([]);
  const [nssApiData, setNssApiData] = useRecoilState(nssAPIdata);

  useEffect(() => {
    console.log("selected senti:");
    console.log(selectedSentiments);
    console.log("legth of selected senti");
    console.log(selectedSentiments.length);
  }, [selectedSentiments]);

  function handleLoadMore() {
    if (totalViewedComments + 100 <= totalNoComments) {
      setTotalViewedComments(totalViewedComments + 100);
    } else {
      setTotalViewedComments(totalViewedComments);
    }
  }

  const handleInput = (e) => {
    setInputData(e.target.value);

    // let filteredComments = apiData?.filter((filtered_value) => {
    //   return filtered_value?.review
    //     ?.toLowerCase()
    //     ?.includes(inputData?.toLowerCase());
    // }).length;

    setTotalFilteredComments(
      apiData?.filter((filtered_value) => {
        return filtered_value?.review
          ?.toLowerCase()
          ?.includes(e.target.value?.toLowerCase());
      }).length
    );
  };

  // useEffect(() => {
  //   console.log("total Filtered Comments:");
  //   console.log(totalFilteredComments);
  // }, [totalFilteredComments]);

  //   truncating description if it contains more then desired no. of characters
  function truncate(string, n) {
    return (
      <span>
        {string?.length > n && (
          <span>
            {string.substr(0, n - 1)}{" "}
            <span className="text-[10px] text-gray-500 cursor-pointer">
              {" "}
              ... Read more
            </span>
          </span>
        )}
        {string?.length < n && <span>{string}</span>}
      </span>
    );
  }

  const [apiData, setApiData] = useState();
  const [apiDataCopy, setApiDataCopy] = useState();

  const [allCommentsAPIData, setAllCommentsAPIData] =
    useRecoilState(totalCommentsApiData);

  const sentimentList = ["Positive", "Neutral", "Negative", "Extreme"];

  useEffect(() => {
    if (ascSort === true) {
      setApiData(apiData?.map((data) => data)?.reverse());
    }
    if (ascSort === false) {
      setApiData(apiData?.map((data) => data)?.reverse());
    }
  }, [ascSort]);

  useEffect(() => {
    if (ascSort === false) {
      setApiData(allCommentsAPIData?.data);
    }

    sentimentList?.map((sentimentNames) => {
      if (selectedSentiments?.includes(sentimentNames)) {
        if (selectedSentiments?.length > 1) {
          setApiData((apiData) => [
            ...apiData,
            allCommentsAPIData?.data
              ?.filter((filteredData) => {
                if (filteredData?.label?.includes(sentimentNames)) {
                  return filteredData;
                }
              })
              .map((data) => data),
          ]);
        } else if (selectedSentiments?.length === 1) {
          setApiData(
            allCommentsAPIData?.data
              ?.filter((filteredData) => {
                if (filteredData?.label?.includes(sentimentNames)) {
                  return filteredData;
                }
              })
              .map((data) => data)
          );
        }
      }
    });

    // if (selectedSentiments?.includes("Positive")) {
    //   if (selectedSentiments?.length > 1) {
    //     setApiData((apiData) => [
    //       ...apiData,
    //       allCommentsAPIData?.data
    //         ?.filter((filteredData) => {
    //           if (filteredData?.label?.includes("Positive")) {
    //             return filteredData;
    //           }
    //         })
    //         .map((data) => data),
    //     ]);
    //   } else if (selectedSentiments?.length === 1) {
    //     setApiData(
    //       allCommentsAPIData?.data
    //         ?.filter((filteredData) => {
    //           if (filteredData?.label?.includes("Positive")) {
    //             return filteredData;
    //           }
    //         })
    //         .map((data) => data)
    //     );
    //   }
    // } else if (selectedSentiments?.includes("Neutral")) {
    //   if (selectedSentiments?.length > 1) {
    //     setApiData((apiData) => [
    //       ...apiData,
    //       allCommentsAPIData?.data
    //         ?.filter((filteredData) => {
    //           if (filteredData?.label?.includes("Neutral")) {
    //             return filteredData;
    //           }
    //         })
    //         .map((data) => data),
    //     ]);
    //   } else if (selectedSentiments?.length === 1) {
    //     setApiData(
    //       allCommentsAPIData?.data
    //         ?.filter((filteredData) => {
    //           if (filteredData?.label?.includes("Neutral")) {
    //             return filteredData;
    //           }
    //         })
    //         .map((data) => data)
    //     );
    //   }
    // } else if (selectedSentiments?.includes("Negative")) {
    //   if (selectedSentiments?.length > 1) {
    //     setApiData((apiData) => [
    //       ...apiData,
    //       allCommentsAPIData?.data
    //         ?.filter((filteredData) => {
    //           if (filteredData?.label?.includes("Negative")) {
    //             return filteredData;
    //           }
    //         })
    //         .map((data) => data),
    //     ]);
    //   } else if (selectedSentiments?.length === 1) {
    //     setApiData(
    //       allCommentsAPIData?.data
    //         ?.filter((filteredData) => {
    //           if (filteredData?.label?.includes("Negative")) {
    //             return filteredData;
    //           }
    //         })
    //         .map((data) => data)
    //     );
    //   }
    // } else if (selectedSentiments?.includes("Extreme")) {
    //   if (selectedSentiments?.length > 1) {
    //     setApiData((apiData) => [
    //       ...apiData,
    //       allCommentsAPIData?.data
    //         ?.filter((filteredData) => {
    //           if (filteredData?.label?.includes("Extreme")) {
    //             return filteredData;
    //           }
    //         })
    //         .map((data) => data),
    //     ]);
    //   } else if (selectedSentiments?.length === 1) {
    //     setApiData(
    //       allCommentsAPIData?.data
    //         ?.filter((filteredData) => {
    //           if (filteredData?.label?.includes("Extreme")) {
    //             return filteredData;
    //           }
    //         })
    //         .map((data) => data)
    //     );
    //   }
    // }

    // else if (selectedSentiments?.includes("Neutral")) {
    //   setApiData((apiData) => [
    //     ...apiData,
    //     allCommentsAPIData?.data
    //       ?.filter((filteredData) => {
    //         if (filteredData?.label?.includes("Neutral")) {
    //           return filteredData;
    //         }
    //       })
    //       .map((data) => data),
    //   ]);
    // } else if (selectedSentiments?.includes("Negative")) {
    //   setApiData((apiData) => [
    //     ...apiData,
    //     allCommentsAPIData?.data
    //       ?.filter((filteredData) => {
    //         if (filteredData?.label?.includes("Negative")) {
    //           return filteredData;
    //         }
    //       })
    //       .map((data) => data),
    //   ]);
    // } else if (selectedSentiments?.includes("Extreme")) {
    //   setApiData((apiData) => [
    //     ...apiData,
    //     allCommentsAPIData?.data
    //       ?.filter((filteredData) => {
    //         if (filteredData?.label?.includes("Extreme")) {
    //           return filteredData;
    //         }
    //       })
    //       .map((data) => data),
    //   ]);
    // }
  }, [allCommentsAPIData, selectedSentiments]);

  // useEffect(() => {
  //   console.log(
  //     allCommentsAPIData?.data
  //       ?.filter((filteredData) => {
  //         if (filteredData?.label?.includes("Extreme")) {
  //           return filteredData;
  //         }
  //       })
  //       .map((data) => data)
  //   );
  // }, [apiData]);

  // function to remove selected text from array
  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  return (
    <div className="w-[100%] md:w-[60%] border  p-2 h-[400px] rounded-lg bg-white">
      {!apiData && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div>
          <div className=" pt-2  flex justify-between items-end mb-2">
            <h1 className=" text-left font-bold  flex-1 px-2 opacity-80 text-[#000C08]">
              Comments{" "}
              <span
                className={` ${
                  inputData ? " " : " hidden"
                } ml-1 sm:ml-5 text-[#0b271c]  rounded-md bg-green-100 border text-xs sm:text-sm p-1 sm:px-2`}
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
                    : "xl:w-[0%] ease-out "
                }`}
                onChange={handleInput}
                value={inputData}
              />
              {/* <SearchIcon
                fontSize="small"
                className="cursor-pointer text-gray-400"
              /> */}
              <img
                src={SearchIcons}
                alt="searchIcon"
                className="px-2 cursor-pointer"
                onClick={() => setSearchStatus(!searchStatus)}
              />
            </div>
          </div>
          <div className=" h-[350px] overflow-y-scroll overflow-x-scroll scrollbar-hide ">
            {apiData?.length === 0 ? (
              <div className="h-full w-full flex justify-center items-center text-gray-400">
                No Comments
              </div>
            ) : (
              <div>
                <table className="border-b-gray-100 border-b-2 text-[12px] p-3 pb-0 w-full min-w-[400px]  ">
                  <thead className="border-b-gray-100 border-b-2 sticky bg-white top-0 z-[5]">
                    <tr className=" flex justify-between items-center gap-3 text-center px-2 text-[12px] text-gray-500 uppercase p-2 font-normal">
                      <th className=" w-[5%]  min-w-[30px] hidden">
                        <div className=" rounded-md  flex justify-start text-gray-400 capitalize font-medium">
                          S.No
                        </div>
                      </th>

                      <th
                        onClick={() => setAscSort(!ascSort)}
                        className=" text-gray-400 w-[7%] min-w-[70px] capitalize  font-normal cursor-pointer hover:text-gray-600 transition"
                      >
                        <span>Date</span>
                        <span>
                          {" "}
                          <ArrowDropUpRoundedIcon
                            className={` transition  ${
                              ascSort
                                ? "rotate-180   ease-in"
                                : "rotate-0  ease-in"
                            } `}
                          />{" "}
                        </span>
                      </th>
                      <th className=" text-gray-400 w-[70%] min-w-[200px] capitalize text-left font-normal">
                        Comments
                      </th>

                      <th className=" text-gray-400 w-[7%] min-w-[70px]  capitalize font-normal hidden">
                        Reason
                      </th>
                      <th className=" text-gray-400 w-[7%] min-w-[70px]  capitalize font-normal hidden">
                        Visit Type
                      </th>

                      <th
                        className="font-normal w-[10%] min-w-[70px]  text-gray-400 capitalize relative"
                        // onMouseEnter={() => setShowSentiments(true)}
                        onMouseLeave={() => setShowSentiments(false)}
                      >
                        <span
                          className=" cursor-pointer"
                          onClick={() => setShowSentiments(!showSentiments)}
                        >
                          Sentiment
                          <ArrowDropUpRoundedIcon
                            fontSize="small"
                            className={` ${
                              showSentiments
                                ? "rotate-0 ease-in"
                                : "rotate-180 ease-in"
                            } transition-all`}
                          />
                        </span>

                        <div
                          className={` ${
                            showSentiments ? "block" : "hidden "
                          } absolute bg-white  top-[100%] -right-2 -left-10 shadow-lg rounded-lg border`}
                        >
                          {sentimentList?.map((data, index) => (
                            <div
                              key={index + 1}
                              className="text-left m-2 cursor-pointer"
                            >
                              <input
                                className=" cursor-pointer"
                                type="checkbox"
                                name={data}
                                value={data}
                                checked={
                                  selectedSentiments?.includes(data)
                                    ? true
                                    : false
                                }
                                onChange={() => {
                                  if (selectedSentiments?.includes(data)) {
                                    console.log(data + " already exits");
                                    setSelectedSentiments(
                                      (selectedSentiments) =>
                                        arrayRemove(selectedSentiments, data)
                                    );
                                  } else {
                                    setSelectedSentiments(
                                      (selectedSentiments) => [
                                        ...selectedSentiments,
                                        data,
                                      ]
                                    );
                                  }
                                }}
                              />

                              <label
                                htmlFor={data}
                                className="text-xs pl-2 cursor-pointer"
                                onClick={() => {
                                  if (selectedSentiments?.includes(data)) {
                                    console.log(data + " already exits");
                                    setSelectedSentiments(
                                      (selectedSentiments) =>
                                        arrayRemove(selectedSentiments, data)
                                    );
                                  } else {
                                    setSelectedSentiments(
                                      (selectedSentiments) => [
                                        ...selectedSentiments,
                                        data,
                                      ]
                                    );
                                  }
                                }}
                              >
                                {data}
                              </label>

                              <div className="ml-2 inline-block">
                                (
                                {data === "Positive" &&
                                  nssApiData?.nss?.total_positive}
                                {data === "Negative" &&
                                  nssApiData?.nss?.total_negative}
                                {data === "Extreme" &&
                                  nssApiData?.nss?.total_extreme}
                                {data === "Neutral" &&
                                  nssApiData?.nss?.total_neutral}
                                )
                              </div>
                            </div>
                          ))}

                          <div
                            className="underline w-fit text-[10px] cursor-pointer m-2"
                            onClick={() => setSelectedSentiments([])}
                          >
                            Clear all
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  {apiData
                    ?.filter((filtered_value) => {
                      if (inputData === "") {
                        return filtered_value;
                      } else if (
                        filtered_value?.review
                          ?.toLowerCase()
                          ?.includes(inputData.toLowerCase())
                      ) {
                        return {
                          filtered_value,
                        };
                      }
                    })
                    .map((data, index) => {
                      return (
                        <tbody key={index} className="w-full">
                          {index <= totalViewedComments && (
                            <>
                              <tr className=" py-2 px-2 flex justify-between items-center gap-3 border-b-2 border-b-gray-100 w-full">
                                <td className=" text-gray-400 w-[5%]  min-w-[30px] text-[14px] hidden ">
                                  {index + 1}
                                </td>
                                <td className=" text-gray-400 w-[7%] min-w-[70px] text-center  font-semibold  text-[12px] ">
                                  {data?.timestamp}
                                </td>

                                <td className=" w-[70%] min-w-[200px] ">
                                  <div
                                    className="max-w-[100%] text-[#000c08b3] font-semibold"
                                    onClick={() => {
                                      setExpandComment(data.id);
                                      setClickCount(!clickCount);
                                    }}
                                  >
                                    {expandComment == data?.id && clickCount
                                      ? data?.review
                                      : truncate(data?.review, 100)}
                                  </div>
                                </td>

                                <td className=" text-gray-400 w-[7%] min-w-[70px] text-center font-semibold  text-[10px] hidden">
                                  Annual Checkup
                                </td>
                                <td className=" text-gray-400 w-[7%] min-w-[70px]  text-center font-semibold text-[10px] hidden">
                                  Office
                                </td>
                                {data?.label == "Positive" && (
                                  // <td className=" bg-[#00AC69] bg-opacity-[16%] text-[#00AC69] font-medium py-2 w-[15%]  rounded-full  min-w-[60px] text-center">
                                  //   {data?.label}
                                  // </td>
                                  <td className="  font-medium py-2 w-[7%] min-w-[70px]  rounded-full text-center ">
                                    {/* <div className="bg-[#00AC69] w-[8px] h-[8px] rounded-lg mx-auto"></div> */}
                                    <img
                                      src={PositiveIcon}
                                      alt="Positive"
                                      className="w-[20px] mx-auto opacity-80 "
                                    />
                                  </td>
                                )}
                                {data?.label == "Negative" && (
                                  <td className="  py-2 w-[7%] min-w-[70px]  font-medium rounded-full text-center ">
                                    <img
                                      src={NegativeIcon}
                                      alt="Negative"
                                      className="w-[20px] mx-auto opacity-80 "
                                    />
                                  </td>
                                )}
                                {data?.label == "Neutral" && (
                                  <td className="  py-2 w-[7%] min-w-[70px]  text-gray-700 rounded-full   font-medium text-center ">
                                    {/* {data?.label} */}
                                    <img
                                      src={NeutralIcon}
                                      alt="Neutral"
                                      className="w-[20px] mx-auto  "
                                    />
                                  </td>
                                )}
                                {data?.label == "Extreme" && (
                                  <td className="  py-2 w-[7%] min-w-[70px] text-center    rounded-full   ">
                                    <img
                                      src={ExtremeIcon}
                                      alt="Extreme"
                                      className="w-[20px] mx-auto opacity-80 "
                                    />
                                  </td>
                                )}
                                {/* <td className=" bg-green-100 p-2 text-green-700 rounded-md">
{data.label}
</td> */}
                              </tr>
                            </>
                          )}
                        </tbody>
                      );
                    })}
                </table>

                {totalFilteredComments > 50 && (
                  <div className=" flex  justify-center items-center p-2">
                    <div
                      className="flex flex-col justify-center items-center cursor-pointer "
                      onClick={handleLoadMore}
                    >
                      <DoubleArrowRoundedIcon className="text-gray-400 rotate-90 " />
                      <div className="text-xs text-gray-500">Load More</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NPSallComments;
