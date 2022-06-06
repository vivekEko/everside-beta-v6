import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ClientIcon from "../../../../assets/img/NPS Dashboard/ClientIcon.svg";
import clientData from "../../../../mock_API/NPS/NPS Main Dashboard/Clients.json";
import clientApidata from "../../../../recoil/atoms/clientApidata";
import PuffLoader from "react-spinners/PuffLoader";

// import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const Clients = () => {
  const [apiData, setApiData] = useState();
  const [clienApiDatavalue, setClientApiDataValue] =
    useRecoilState(clientApidata);

  useEffect(() => {
    setApiData(clienApiDatavalue);
  }, [clienApiDatavalue]);

  return (
    <div className="p-5 border rounded-lg bg-white transition-all  w-[100%] h-[300px]">
      {!apiData?.data && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData?.data && (
        <div className="">
          {apiData?.data?.length > 0 ? (
            <div className="h-[260px]">
              <h1 className="  font-bold opacity-80 ">Clients</h1>
              <div className="text-xs text-gray-400 border-b-2  border-b-gray-100 flex justify-end px-2 pb-2">
                <span className="invisible">Rank</span>
              </div>
              <div className=" h-[85%] overflow-y-scroll scrollbar-hide">
                <div className="">
                  {apiData?.data?.map((data) => {
                    return (
                      <div
                        key={Math.random()}
                        className="flex justify-between items-center my-4"
                      >
                        <div className="flex gap-5 items-center">
                          <img
                            src={ClientIcon}
                            alt={data.client_name}
                            className="w-[40px] rounded-full"
                          />
                          <div>
                            <div className="text-sm">{data.client_name}</div>
                            <div className="text-gray-500 text-xs">
                              {data.parent_client_name}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[300px] w-full flex justify-center items-center text-gray-400">
              No Clients
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Clients;
