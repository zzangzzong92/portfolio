"use client";

import { GoogleMap } from "@/components/GoogleMap";
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
      <GoogleMap
        restaurants={restaurants}
        selectedRestaurantId={selectedRestaurantId}
        onRestaurantSelect={onRestaurantSelect}
        center={center}
        zoom={zoom}
      />
    </div>
  );
}
