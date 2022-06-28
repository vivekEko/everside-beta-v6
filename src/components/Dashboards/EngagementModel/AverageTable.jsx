import React from "react";
import { useRecoilState } from "recoil";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";

const AverageTable = () => {
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);
  return (
    <div className="p-2   w-full  rounded-lg bg-white border  ">
      <h1 className=" text-left font-bold  flex-1 px-2 opacity-80 text-[#000C08]">
        Average Data
      </h1>
      <div className="grid grid-cols-7 place-items-center gap-2 border-b">
        <div className="w-full p-2 font-medium text-xs text-gray-500">
          Region
        </div>

        <div className="w-full p-2 font-medium text-xs text-gray-500">PCP</div>

        {/* <div className="w-full p-2 font-medium text-xs text-gray-500">Probability</div> */}

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

      <div className="grid grid-cols-7 place-items-center gap-2 h-[225px] overflow-y-scroll">
        {apiData?.average_table?.map((data) => (
          <>
            <div className="w-full p-2 font-semibold text-gray-800 text-sm">
              {data?.region}
            </div>

            <div className="w-full p-2  text-gray-800 text-sm">
              {parseFloat(data?.PCP_Avail).toFixed(2)}
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
          </>
        ))}
      </div>
    </div>
  );
};

export default AverageTable;
