import React, { useEffect, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import uploadIcon from "../../../assets/img/global-img/uploadIcon.svg";
import { PuffLoader } from "react-spinners";
import CountUp from "react-countup";
import RespondantsIcon from "../../../assets/img/global-img/respondants.svg";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BASE_API_LINK } from "../../../utils/BaseAPILink";
import { useRecoilState } from "recoil";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import engagementErrorAtom from "../../../recoil/atoms/engagementErrorAtom";
import engagementErrorMessage from "../../../recoil/atoms/engagementErrorMessage";

const UploadWrapper = () => {
  const [engagementError, setEngagementError] =
    useRecoilState(engagementErrorAtom);
  const [engagementErrorMessages, setEngagementErrorMessages] = useRecoilState(
    engagementErrorMessage
  );
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(false);
  // const [rows, setRows] = useState();
  // const [columns, setColumns] = useState();
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);
  const [graphData, setGraphData] = useState();
  const [percentageData, setPercentageData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);
  const [Males, setMales] = useState(0);
  const [Females, setFemales] = useState(0);
  const [Others, setOthers] = useState(0);

  // useEffect(() => {
  //   console.log("selectedFile:");
  //   console.log(selectedFile);
  // }, [selectedFile]);

  useEffect(() => {
    setTimeout(() => {
      setMales(apiData?.gender?.male);
      setFemales(apiData?.gender?.female);
      setOthers(apiData?.gender?.other);
    }, 100);
  }, [apiData?.gender?.male]);

  const changeHandler = (event) => {
    console.log("reached change handler");
    console.log(event?.target?.files[0]?.name);
    setSelectedFile(event?.target?.files[0]);
    setIsFilePicked(true);
  };

  const [usernameLocal, setUsernameLocal] = useState();

  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  const handleSubmission = () => {
    setLoaderStatus(true);
    const formData = new FormData();
    formData.append("username", usernameLocal);
    formData.append("file", selectedFile);

    fetch(baseAPI + "egMemberPercentile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response?.json())
      .then((result) => {
        console.log("response after upload:");
        console.log(result);
        if (result?.Message === "TRUE") {
          // console.log("Total Cards Data:", result);
          setApiData(result);

          setLoaderStatus(false);
          setGraphData(result?.graph);
          setPercentageData(result?.percentage);
          // setSelectedFile("noFiles");
        }
        if (result?.Message === "FALSE") {
          setLoaderStatus(false);
          // alert("Invalid file");
          setEngagementErrorMessages("Invalid file uploaded.");
          setEngagementError(true);
          // setSelectedFile("noFiles");
        }
      })
      .catch((error) => {
        // alert("Something went wrong , please try again!");
        setLoaderStatus(false);
        setEngagementError(true);
        setEngagementErrorMessages("Something went wrong , please try again!");
        // setSelectedFile("noFiles");
      });
  };

  useEffect(() => {
    if (selectedFile) {
      if (selectedFile !== "noFiles") {
        handleSubmission();
        setLoaderStatus(true);
      }
    }
  }, [selectedFile]);

  useEffect(() => {
    if (engagementErrorMessages) {
      setSelectedFile("noFiles");
    }
  }, [engagementErrorMessages]);

  return (
    <div>
      <div>
        <div className="w-[100%] mb-2  rounded-lg bg-white flex justify-between ">
          <div className="flex items-center gap-2 w-[33.33%]  justify-start">
            <form className=" flex   w-fit">
              <label
                htmlFor="file-upload"
                className="p-2 py-3 bg-[#00ac69] text-center sm:w-[50px] rounded-md  text-white transition-all active:scale-95 cursor-pointer relative "
              >
                <input
                  type="file"
                  name="file"
                  id="file-upload"
                  onChange={changeHandler}
                  onClick={(event) => (event.target.value = "")}
                  accept={".csv"}
                  placeholder="upload"
                  className="absolute -top-2 -bottom-2 -left-2 -right-2 w-full opacity-0 z-[-100] cursor-pointer "
                />

                {/* <span className="mr-2 cursor-pointer">Upload</span> */}

                {/* <FileUploadOutlinedIcon
                  fontSize="medium"
                  className="cursor-pointer "
                /> */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6  mx-auto "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v11"
                  />
                </svg> */}

                <div className="flex flex-col justify-center items-center">
                  <svg
                    width="8"
                    height="11"
                    viewBox="0 0 8 11"
                    className={` ${loaderStatus ? "upload-animation" : ""} `}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="white"
                    strokeWidth={0.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.14663 0.146894C3.19308 0.100331 3.24825 0.0633877 3.309 0.0381812C3.36974 0.0129748 3.43486 0 3.50063 0C3.5664 0 3.63152 0.0129748 3.69227 0.0381812C3.75301 0.0633877 3.80819 0.100331 3.85463 0.146894L6.85463 3.14689C6.94852 3.24078 7.00126 3.36812 7.00126 3.50089C7.00126 3.63367 6.94852 3.76101 6.85463 3.85489C6.76075 3.94878 6.63341 4.00153 6.50063 4.00153C6.36786 4.00153 6.24052 3.94878 6.14663 3.85489L4.00063 1.70789V10.5009C4.00063 10.6335 3.94795 10.7607 3.85419 10.8544C3.76042 10.9482 3.63324 11.0009 3.50063 11.0009C3.36802 11.0009 3.24085 10.9482 3.14708 10.8544C3.05331 10.7607 3.00063 10.6335 3.00063 10.5009V1.70789L0.854632 3.85489C0.808144 3.90138 0.752955 3.93826 0.692215 3.96342C0.631476 3.98858 0.566376 4.00153 0.500632 4.00153C0.434888 4.00153 0.369788 3.98858 0.309048 3.96342C0.248309 3.93826 0.19312 3.90138 0.146632 3.85489C0.100144 3.80841 0.0632674 3.75322 0.0381083 3.69248C0.0129493 3.63174 -4.89829e-10 3.56664 0 3.50089C4.89831e-10 3.43515 0.0129493 3.37005 0.0381083 3.30931C0.0632674 3.24857 0.100144 3.19338 0.146632 3.14689L3.14663 0.146894Z"
                      fill="white"
                    />
                  </svg>

                  <svg
                    width="16"
                    height="5"
                    viewBox="0 0 16 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="white"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M0.5 0C0.632608 0 0.759785 0.052679 0.853553 0.146447C0.947322 0.240215 1 0.367392 1 0.5V3C1 3.26522 1.10536 3.51957 1.29289 3.70711C1.48043 3.89464 1.73478 4 2 4H14C14.2652 4 14.5196 3.89464 14.7071 3.70711C14.8946 3.51957 15 3.26522 15 3V0.5C15 0.367392 15.0527 0.240215 15.1464 0.146447C15.2402 0.052679 15.3674 0 15.5 0C15.6326 0 15.7598 0.052679 15.8536 0.146447C15.9473 0.240215 16 0.367392 16 0.5V3C16 3.53043 15.7893 4.03914 15.4142 4.41421C15.0391 4.78929 14.5304 5 14 5H2C1.46957 5 0.960859 4.78929 0.585786 4.41421C0.210714 4.03914 0 3.53043 0 3V0.5C0 0.367392 0.0526784 0.240215 0.146447 0.146447C0.240215 0.052679 0.367392 0 0.5 0V0Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </label>
            </form>

            <div className="mr-2  text-gray-400 text-xs">
              Max file size: 25 MB
            </div>
          </div>

          <div
            className={` ${
              !apiData?.file_name ? "invisible" : "flex"
            } items-center gap-2  w-[40%] sm:w-[33.33%]  text-center justify-center   `}
          >
            <FilePresentOutlinedIcon
              fontSize="medium"
              className="text-gray-400"
            />
            <div className="text-gray-400 text-xs sm:text-sm">
              {apiData?.file_name}
            </div>
            {apiData?.file_size > 1000000 ? (
              <div className="text-gray-400 text-xs">
                {"(" + (apiData?.file_size / 1000000).toFixed(2) + " MB)"}
              </div>
            ) : (
              <div className="text-gray-400 text-xs">
                {"(" + Math.round(apiData?.file_size / 1000) + " KB)"}
              </div>
            )}
          </div>

          <div className=" flex  w-[26.67%] sm:w-[33.33%]   justify-end items-center">
            <a href={baseAPI + "fileDownload?" + "username=" + usernameLocal}>
              <div className="p-2 bg-[#00ac69] text-center sm:w-[50px] rounded-md  text-white transition-all active:scale-95 cursor-pointer relative ">
                <FileDownloadOutlinedIcon
                  fontSize="medium"
                  className="cursor-pointer"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadWrapper;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    // console.log("payload .............................");
    // console.log(payload);

    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-3 shadow-2xl shadow-[#000000] min-w-[150px]">
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className="">
              <div className="flex justify-start items-center mb-2">
                <h1 className="capitalize mr-5 text-[14px] font-semibold">
                  Member Data
                </h1>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">
                  Percentile Name:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.percentile_name}
                </span>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">
                  Percentile Value:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.percentile_value}
                </span>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">Member Score:</span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.member_score}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function CustomTooltip2({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        <h1 className="capitalize mr-2 text-[15px] mb-2 font-bold ">
          {/* {payload[0]?.payload?.month}, {payload[0]?.payload?.year} */}
          Age Data
        </h1>
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className=" ">
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Age Category:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.groupName}
                </span>
              </div>
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Count:
                </span>
                <span className="text-[11px] font-semibold">{data?.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function CustomTooltip3({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className="justify-between items-center flex mb-2">
              <h1 className="capitalize mr-2 text-[15px]  font-bold ">
                Gender Stats
              </h1>

              <div
                style={{ background: data?.payload?.color }}
                className={`h-[8px] w-[8px] rounded-full  `}
              ></div>
            </div>
            <div className=" ">
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Gender:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.label}
                </span>
              </div>
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Percentage:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.percentage}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
