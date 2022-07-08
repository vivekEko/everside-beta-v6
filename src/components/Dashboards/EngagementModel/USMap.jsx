import React, { useEffect, useRef } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import cities from "./cities.json";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";
import { useRecoilState } from "recoil";
import { useState } from "react";
import MapData from "../../../mock_API/Engagement Model/mapData.json";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconSize: [30, 30],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const USMap = () => {
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);

  const position = [
    parseFloat(apiData?.long_mid),
    parseFloat(apiData?.lat_mid),
  ];

  return (
    <div>
      <div
        key={apiData?.long_mid}
        className="h-full overflow-hidden rounded-md border "
      >
        <MapContainer
          className="z-0"
          center={position}
          zoom={9}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {apiData?.map_data?.map((data, idx) => (
            // <Marker
            //   position={[parseFloat(data?.long), parseFloat(data?.lat)]}
            //   key={idx}
            // >
            <CircleMarker
              center={[parseFloat(data?.long), parseFloat(data?.lat)]}
              key={idx}
              color="#00ac69"
              radius={8}
            >
              <Popup>
                <h1 className="text-base font-semibold mb-2">{data?.state}</h1>
                <div className="flex justify-start gap-2">
                  <span className="font-semibold">Zip:</span>
                  <span>{data?.zip}</span>
                </div>
                <div className="flex justify-start gap-2">
                  <span className="font-semibold">Count:</span>
                  <span>{data?.zip_count}</span>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* <div
        key={Math.random()}
        className="h-full w-[100%] rounded-xl  overflow-hidden mx-auto "
      >
        <MapContainer center={position} zoom={7}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          />
          {MapData?.map((data, idx) => (
            <CircleMarker center={[data?.latitude, data?.longitude]} key={idx}>
              <Popup>
                <h1 className="text-base font-semibold mb-2">{data?.state}</h1>
                <div className="flex justify-start gap-2">
                  <span className="font-semibold">Population:</span>
                  <span>{data?.population}</span>
                </div>
                <div className="flex justify-start gap-2">
                  <span className="font-semibold">City:</span>
                  <span>{data?.city}</span>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div> */}
    </div>
  );
};

export default USMap;
