import React, { useEffect, useState } from "react";
import doctorIcon from "../../../../assets/img/NPS Dashboard/DoctorIcon.svg";
import docData from "../../../../mock_API/NPS/NPS Main Dashboard/HealthProfessional.json";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import providersApiData from "../../../../recoil/atoms/providersApiData";
import { useRecoilState } from "recoil";
import PuffLoader from "react-spinners/PuffLoader";

const HealthProfessionals = () => {
  const [apiData, setApiData] = useState();
  const [providerApiAtom, setProviderApiAtom] =
    useRecoilState(providersApiData);

  useEffect(() => {
    setApiData(providerApiAtom?.data?.data);
    // console.log("atom data provider component");
    // console.log(providerApiAtom?.data?.data);
  }, [providerApiAtom]);

  return (
    <div className="p-5 rounded-lg bg-white transition-all w-[100%]  h-[300px] border">
      {!apiData && (
        <div className="  h-[270px] bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center ">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData?.length === 0 && (
        <div className="flex 2 h-full w-full justify-center items-center text-gray-400">
          No Providers
        </div>
      )}

      {apiData?.length > 0 && (
        <>
          <h1 className="  font-bold  opacity-80">Providers</h1>
          <div className="text-xs text-gray-400 border-b-2 border-b-gray-100 flex justify-end px-2 pb-2">
            {/* <div className="flex items-center gap-10">
              <span> NPS</span>
              <span>Rating</span>
            </div> */}
          </div>
          <div className=" h-[85%] overflow-y-scroll scrollbar-hide   ">
            <div className="">
              {apiData?.map((data) => {
                return (
                  <div
                    key={Math.random()}
                    className="flex justify-between items-center my-4"
                  >
                    <div className="flex gap-5 items-center">
                      <div className="w-[40px] h-[40px] rounded-full bg-[#e6f5fc] flex justify-center items-center text-[#0094e0] uppercase font-semibold">
                        {data?.provider_type}
                      </div>
                      <div>
                        <div className="text-sm">{data?.provider_name}</div>
                        <div className="text-gray-500 text-xs">
                          {data?.provider_category}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HealthProfessionals;
