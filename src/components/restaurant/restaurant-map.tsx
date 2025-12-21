"use client";

import KakaoMap from "@/components/kakaomap";
import { Restaurant } from "types/restaurant";

interface RestaurantMapProps {
  restaurants: Restaurant[];
  selectedRestaurantId?: number | null;
  onRestaurantSelect?: (restaurantId: number | null) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

export default function RestaurantMap({
  restaurants,
  selectedRestaurantId = null,
  onRestaurantSelect,
  center = { lat: 37.5665, lng: 126.978 }, // 서울 시청 기본값
  zoom = 13,
}: RestaurantMapProps) {
  return (
    <div className="h-full w-full">
      <KakaoMap
        restaurants={restaurants}
        selectedRestaurantId={selectedRestaurantId}
        onRestaurantSelect={onRestaurantSelect}
        center={center}
        level={zoomToLevel(zoom)}
      />
    </div>
  );
}

function zoomToLevel(zoom: number): number {
  const levelMap: { [key: number]: number } = {
    20: 1, 19: 1, 18: 2, 17: 2, 16: 3, 15: 3, 14: 4, 13: 4,
    12: 5, 11: 5, 10: 6, 9: 6, 8: 7, 7: 7, 6: 8, 5: 8,
    4: 9, 3: 9, 2: 10, 1: 10
  };
  return levelMap[zoom] || 3;
}
