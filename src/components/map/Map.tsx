"use client";
import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
//@ts-ignore
import L from "leaflet";
import styles from "./map.module.css";
//@ts-ignore
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

interface MapProps {
  lat: number;
  long: number;
}

const Map:React.FC<MapProps> = ({lat,long}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: long, lat: lat };
  const [zoom] = useState(12);

  useEffect(() => {
    if (map.current) return;

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom,
    });

    const mtLayer = new MaptilerLayer({
      apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
    }).addTo(map.current);
  }, [center.lng, center.lat, zoom]);

  return (
    <div className={"w-screen h-screen relative z-0"}>
      <div ref={mapContainer} className={"absolute w-full h-full"} />
    </div>
  );
};

export default Map;
