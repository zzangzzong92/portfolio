"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  center: { lat: number; lng: number };
  style?: React.CSSProperties;
  level?: number;
}

export default function KakaoMap({ center, style, level }: KakaoMapProps) {
  return (
    <div className="w-full h-48">
      <Map
        center={center ? center : { lat: 37.494589, lng: 126.868346 }}
        style={style ? style : { width: "100%", height: "100%" }}
        level={level ? level : 3}
        isPanto={true}
      >
        <MapMarker position={center} />
      </Map>
    </div>
  );
}
