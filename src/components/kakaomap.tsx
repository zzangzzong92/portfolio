"use client";

import { Map } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  return (
    <div className="w-full h-48">
      <Map
        center={{ lat: 37.494589, lng: 126.868346 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
      />
    </div>
  );
}
