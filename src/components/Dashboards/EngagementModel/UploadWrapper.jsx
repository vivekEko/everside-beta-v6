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

const UploadWrapper = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(false);
  // const [rows, setRows] = useState();
  // const [columns, setColumns] = useState();
  const [apiData, setApiData] = useState();
  const [graphData, setGraphData] = useState();
  const [percentageData, setPercentageData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const [Males, setMales] = useState(0);
  const [Females, setFemales] = useState(0);
  const [Others, setOthers] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setMales(apiData?.gender?.male);
      setFemales(apiData?.gender?.female);
      setOthers(apiData?.gender?.other);
    }, 100);

    console.log(apiData?.gender);
  }, [apiData?.gender?.male]);

  useEffect(() => {
    console.log("Males");
    console.log(Males);
  }, [Males]);

  const changeHandler = (event) => {
    // console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    fetch(baseAPI + "egMemberPercentile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response?.json())
      .then((result) => {
        // console.log("Success:", result);
        if (result?.Message === "TRUE") {
          setLoaderStatus(false);
          setGraphData(result?.graph);
          setPercentageData(result?.percentage);
        }
        if (result?.Message === "FALSE") {
          setLoaderStatus(false);
          alert("Invalid file");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(baseAPI + "egMemberPercentile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response?.json())
      .then((result) => {
        console.log("Total Cards Data:", result);
        setApiData(result);
        // setRows(result?.rows);
        // setColumns(result?.columns);
      })
      .catch((error) => {
        // console.error("Error:", error);
      });
  };

  useEffect(() => {
    // console.log("selected file: ");
    // console.log(selectedFile);
    // console.log(isFilePicked);
    if (selectedFile) {
      handleSubmission();
      setLoaderStatus(true);
    }
  }, [selectedFile]);

  const loaderAnimation = {
    width: Males + "%",
    minWidth: "5%",
  };

  return (
    <div>
      {graphData && (
        <div>
          <div className="flex justify-between items-start gap-2 flex-row-reverse">
            {/* Total cards */}
            {/* <div className="flex justify-center items-center gap-10 w-[40%] border">
            <div className="p-2 text-center bg-white rounded-lg w-[150px] border">
              <h3 className="opacity-60 mb-2 text-xs">Rows</h3>
              <h1 className="opacity-80 text-3xl">{rows}</h1>
            </div>

            <div className="p-2 text-center bg-white rounded-lg w-[150px] border">
              <h3 className="opacity-60 mb-2 text-xs">Columns</h3>
              <h1 className="opacity-80 text-3xl">{columns}</h1>
            </div>
          </div> */}

            <div className="grid grid-cols-3 w-[40%]  ">
              {apiData?.cards_data?.map((data, index) => (
                <div
                  key={index}
                  className=" p-5 bg-white text-gray-600 rounded-md border text-center w-[97%] my-[6px]"
                >
                  <h3 className="text-[#000C08] capitalize opacity-40 text-[10px] md:text-[14px]">
                    {data?.name}
                  </h3>
                  <h1 className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80 ">
                    <CountUp
                      start={0}
                      duration={1}
                      end={data?.value}
                      separator=","
                    />
                  </h1>
                </div>
              ))}
            </div>

            {/* Graph */}

            <div className="p-2 md:p-5    rounded-lg bg-white border flex justify-center md:justify-center items-center w-[60%]">
              <div className="w-full">
                <h1 className=" font-bold opacity-80 ">Member Percentile</h1>
                <div className="text-center text-[10px] opacity-80 flex w-full justify-end gap-5 mt-[30px] mb-[10px]">
                  <div className="flex justify-end items-center gap-[4px] ">
                    <div className="bg-red-500 h-[10px] w-[10px] rounded-full"></div>
                    <p>Low</p>
                  </div>
                  <div className="flex justify-end items-center gap-[4px] ">
                    <div className="bg-yellow-500 h-[10px] w-[10px] rounded-full"></div>
                    <p>Medium</p>
                  </div>
                  <div className="flex justify-end items-center gap-[4px] ">
                    <div className="bg-green-500 h-[10px] w-[10px] rounded-full"></div>
                    <p>High</p>
                  </div>
                </div>

                {/* Graph */}
                <div className="relative ">
                  {/* <div className=" absolute h-full w-full z-[999] bg-opacity-10 pl-[3%] pr-[1.5%] grid grid-cols-3">
            <div className="bg-red-500 opacity-10 h-full w-[100%]  mx-auto"></div>
            <div className="bg-yellow-500 opacity-10 h-full w-[100%]  mx-auto"></div>
            <div className="bg-green-500 opacity-10 h-full w-[100%]  mx-auto"></div>
          </div> */}

                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart
                      data={graphData}
                      margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="npsGradient"
                          gradientTransform="rotate(0)"
                        >
                          <stop
                            offset={percentageData?.low}
                            stopColor="red"
                            stopOpacity={1}
                          />
                          <stop
                            offset={percentageData?.medium}
                            stopColor="yellow"
                            stopOpacity={1}
                          />
                          <stop
                            offset={percentageData?.high}
                            stopColor="green"
                            stopOpacity={1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        vertical={false}
                        horizontal={false}
                        opacity={0.5}
                      />
                      <XAxis
                        dataKey="percentile_name"
                        fontSize={12}
                        axisLine={false}
                        tickLine={false}
                        tickCount={6}
                        angle={0}
                        textAnchor="middle"
                        xAxisId="1"
                      />
                      <XAxis
                        dataKey="percentile_value"
                        xAxisId="0"
                        fontSize={12}
                        axisLine={false}
                        tickLine={false}
                        tickCount={6}
                        angle={0}
                        textAnchor="middle"
                      />

                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        fontSize={12}
                        tickCount={4}
                        //   tickFormatter={(number) => `${number}%`}
                        margin={{ right: 20 }}
                      />
                      <Tooltip cursor={false} content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        name="member_score"
                        dataKey="member_score"
                        stroke="transparent "
                        dot={false}
                        fill="url(#npsGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-start gap-2 mt-2">
            {/* Age Graph */}

            <div className="p-2 md:p-5    rounded-lg bg-white border flex justify-center md:justify-center items-center w-[50%]">
              <div className="w-full">
                <h1 className=" font-bold opacity-80 ">Age Group</h1>

                <div className="relative ">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={apiData?.age_graph}
                      margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        horizontal={false}
                        opacity={0.5}
                      />
                      <XAxis
                        dataKey="groupName"
                        fontSize={12}
                        axisLine={false}
                        tickLine={false}
                        tickCount={10}
                        angle={0}
                        textAnchor="middle"
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        fontSize={10}
                        tickCount={4}
                        tickFormatter={(number) => `${number}`}
                        margin={{ right: 20 }}
                      />
                      <Tooltip cursor={false} content={<CustomTooltip2 />} />

                      <Bar
                        barSize={60}
                        dataKey="groupValue"
                        fill="#0094E0"
                        radius={[5, 5, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Gender */}

            <div className="w-[50%] border rounded-md p-5 h-[317px] ">
              <div className=" font-bold   flex justify-between gap-2 items-center">
                <div className="font-bold opacity-80 text-[18px] mb-7  w-full">
                  Gender Classification
                </div>
                <div className="text-center text-[10px] opacity-80 flex w-full justify-end gap-5 ">
                  <div className="flex justify-end items-center gap-[4px] ">
                    <div className="bg-[#39a0ed] h-[10px] w-[10px] rounded-full"></div>
                    <p>Male</p>
                  </div>
                  <div className="flex justify-end items-center gap-[4px] ">
                    <div className="bg-[#13c4a3] h-[10px] w-[10px] rounded-full"></div>
                    <p>Female</p>
                  </div>
                  <div className="flex justify-end items-center gap-[4px] ">
                    <div className="bg-[#d77a69] h-[10px] w-[10px] rounded-full"></div>
                    <p>Other</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 items-center flex-col-reverse sm:flex-row  ">
                <div className="w-[90%] md:w-[60%]   ">
                  <div className=" w-[100%] md:w-[80%] ml-auto">
                    <div>
                      <div className="flex items-center px-3">
                        <div className="w-[100%] text-[14px] opacity-80 font-medium">
                          Male
                        </div>

                        <div className="mx-2 opacity-80 font-bold">
                          <CountUp
                            start={0}
                            duration={1}
                            end={apiData?.gender?.total_male}
                            separator=","
                          />
                        </div>
                        <img src={RespondantsIcon} alt="number of males" />
                      </div>
                      <div>
                        <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center ">
                          {apiData?.gender?.male && (
                            <div
                              className={` ml-auto rounded-full bg-[#39a0ed] transition-all ease-in duration-1000 w-[50%]`}
                              // style={loaderAnimation}
                            >
                              <div className="font-semibold  text-white ml-2">
                                {apiData?.gender?.male < 1 ? (
                                  apiData?.gender?.male + "%"
                                ) : (
                                  <CountUp
                                    start={0}
                                    duration={1}
                                    end={apiData?.gender?.male}
                                    separator=","
                                    suffix="%"
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="my-4">
                      <div className="flex items-center px-3">
                        <div className="w-full text-[14px] opacity-80 font-medium">
                          Female
                        </div>

                        <div className="mx-2 opacity-80 font-bold">
                          <CountUp
                            start={0}
                            duration={1}
                            end={apiData?.gender?.total_female}
                            separator=","
                          />
                        </div>
                        <img src={RespondantsIcon} alt="number of promoters" />
                      </div>
                      <div>
                        <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                          <div
                            className={` ml-auto rounded-full bg-[#13c4a3] transition-all ease-in duration-500`}
                            style={{
                              width: Females + "%",
                              minWidth: "5%",
                            }}
                          >
                            <div className="font-semibold  text-white ml-2">
                              {apiData?.gender?.females < 1 ? (
                                apiData?.gender?.females + "%"
                              ) : (
                                <CountUp
                                  start={0}
                                  duration={1}
                                  end={apiData?.gender?.female}
                                  separator=","
                                  suffix="%"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center px-3">
                        <div className="w-full text-[14px] opacity-80 font-medium">
                          Others
                        </div>

                        <div className="mx-2 opacity-80 font-bold">
                          <CountUp
                            start={0}
                            duration={1}
                            end={apiData?.gender?.total_other}
                            separator=","
                          />
                        </div>
                        <img src={RespondantsIcon} alt="number of promoters" />
                      </div>
                      <div>
                        <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                          <div
                            className={`  ml-auto rounded-full bg-[#d77a61] transition-all ease-in duration-1000`}
                            style={{
                              width: Others + "%",
                              minWidth: "5%",
                            }}
                          >
                            <div className="font-semibold  text-white ml-2">
                              {apiData?.gender?.others < 1 ? (
                                apiData?.gender?.others + "%"
                              ) : (
                                <CountUp
                                  start={0}
                                  duration={1}
                                  end={apiData?.gender?.others}
                                  separator=","
                                  suffix="%"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative w-[100%] sm:w-[40%]   ">
                  <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                    {/* <div className="flex flex-col justify-center items-center">
                      <h1 className="text-[18px] opacity-40">NPS</h1>
                      <p className="opacity-80 text-[24px] font-semibold  ">
                        <CountUp
                          start={0}
                          duration={1}
                          end={apiData?.nps?.nps_score}
                          separator=","
                          suffix="%"
                        />
                      </p>
                    </div> */}
                  </div>

                  <div className=" w-[100%] md:min-w-[110px]">
                    <ResponsiveContainer height={180} width="100%">
                      <PieChart key={apiData?.gender_pie}>
                        <Tooltip cursor={false} content={<CustomTooltip3 />} />
                        <Pie
                          data={apiData?.gender_pie}
                          dataKey="percentage"
                          nameKey="label"
                          cx="50%"
                          cy="50%"
                          strokeWidth={5}
                          innerRadius="0%"
                          outerRadius="100%"
                          cornerRadius={6}
                          paddingAngle={-1}
                          startAngle={-270}
                          endAngle={-630}
                          minAngle={15}
                        >
                          {apiData?.gender_pie?.map((entry, index) => (
                            <Cell key={Math.random()} fill={entry?.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="w-[100%] px-5 p-3 py-5  rounded-lg bg-white mb-5">
          <h1 className=" text-left font-bold  text-lg mb-5  opacity-80 text-[#000C08]">
            Upload File
          </h1>
          <form>
            <div className="border-[2px] border-dashed border-[#00ac69]  rounded-2xl  w-full flex justify-center items-center h-[250px] relative">
              {loaderStatus ? (
                <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
                  <PuffLoader color="#00ac69" size={50} width={100} />
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    name="file"
                    onChange={changeHandler}
                    accept={".csv"}
                    className="absolute top-0 bottom-0 left-0 right-0 w-full opacity-0"
                  />
                  <img
                    src={uploadIcon}
                    alt="upload"
                    className="w-[80px] mx-auto text-center"
                  />
                  <p className="opacity-40">Click to upload your files here </p>
                </div>
              )}
            </div>
          </form>
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
  console.log("gender payloadddddddddddddddddddddddddd");
  console.log(payload);
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
