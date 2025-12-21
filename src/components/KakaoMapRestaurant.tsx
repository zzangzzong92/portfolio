"use client";

import { useEffect, useRef, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

interface LocationData {
  id: number;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  x?: string;
  y?: string;
  phoneNumber?: string;
  category?: string;
  price?: string;
  rating?: number;
}

interface MarkerData {
  id: number;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  x?: string;
  y?: string;
  phoneNumber?: string;
  category?: string;
  price?: string;
  rating?: number;
  type: "restaurant" | "experience";
}

interface KakaoMapRestaurantProps {
  restaurants?: LocationData[];
  experiences?: any[];
  center?: { lat: number; lng: number };
  zoom?: number;
  selectedRestaurantId?: number | null;
  selectedExperienceId?: number | null;
  onRestaurantSelect?: (restaurantId: number | null) => void;
  onExperienceSelect?: (experienceId: number | null) => void;
  showInfoWindow?: boolean;
}

const getAllMarkerData = (
  restaurants: LocationData[],
  experiences: any[]
): MarkerData[] => {
  return [
    ...restaurants.map((restaurant) => ({
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      x: restaurant.x,
      y: restaurant.y,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      phoneNumber: restaurant.phoneNumber,
      category: restaurant.category,
      price: restaurant.price,
      rating: restaurant.rating,
      type: "restaurant" as const,
    })),
    ...experiences.map((experience) => ({
      id: experience.id,
      name: experience.title || experience.name,
      address: experience.location || experience.address,
      latitude: experience.latitude,
      longitude: experience.longitude,
      type: "experience" as const,
    })),
  ];
};

const getPosition = (data: MarkerData): { lat: number; lng: number } | null => {
  if (data.x && data.y) {
    return {
      lat: parseFloat(data.x),
      lng: parseFloat(data.y),
    };
  } else if (data.latitude && data.longitude) {
    return {
      lat: data.latitude,
      lng: data.longitude,
    };
  }
  return null;
};

export const KakaoMapRestaurant = ({
  restaurants = [],
  experiences = [],
  center = { lat: 37.5665, lng: 126.978 },
  zoom = 13,
  selectedRestaurantId = null,
  selectedExperienceId = null,
  onRestaurantSelect,
  onExperienceSelect,
  showInfoWindow = true,
}: KakaoMapRestaurantProps) => {
  const [map, setMap] = useState<any>(null);
  const [openInfoWindowId, setOpenInfoWindowId] = useState<number | null>(null);
  const mapRef = useRef<any>(null);

  const allMarkerData = getAllMarkerData(restaurants, experiences);

  const selectedItem = allMarkerData.find(
    (item) =>
      (selectedRestaurantId && item.id === selectedRestaurantId && item.type === "restaurant") ||
      (selectedExperienceId && item.id === selectedExperienceId && item.type === "experience")
  );

  useEffect(() => {
    if (selectedItem && map && typeof window !== "undefined" && (window as any).kakao?.maps) {
      const position = getPosition(selectedItem);
      if (position) {
        try {
          const moveLatLon = new (window as any).kakao.maps.LatLng(position.lat, position.lng);
          map.panTo(moveLatLon);
          map.setLevel(3);
          setOpenInfoWindowId(selectedItem.id);
        } catch (error) {
          console.error("Error moving map to selected item:", error);
        }
      }
    } else if (!selectedItem) {
      setOpenInfoWindowId(null);
    }
  }, [selectedItem?.id, map, selectedRestaurantId, selectedExperienceId]);

  const calculateBounds = () => {
    if (allMarkerData.length === 0) return null;
    
    const positions = allMarkerData
      .map(getPosition)
      .filter((pos): pos is { lat: number; lng: number } => pos !== null);

    if (positions.length === 0) return null;

    const lats = positions.map((p) => p.lat);
    const lngs = positions.map((p) => p.lng);

    return {
      sw: { lat: Math.min(...lats), lng: Math.min(...lngs) },
      ne: { lat: Math.max(...lats), lng: Math.max(...lngs) },
    };
  };

  const bounds = calculateBounds();
  const mapCenter = bounds
    ? {
        lat: (bounds.sw.lat + bounds.ne.lat) / 2,
        lng: (bounds.sw.lng + bounds.ne.lng) / 2,
      }
    : center;

  // 카카오 맵 level: 1(전체) ~ 14(가장 가까움)
  // Google Maps zoom: 0(전체) ~ 21(가장 가까움)
  // 대략적인 변환: level = 15 - zoom
  const mapLevel = zoom ? Math.max(1, Math.min(14, 15 - zoom)) : 3;

  const handleMarkerClick = (item: MarkerData) => {
    if (item.type === "restaurant" && onRestaurantSelect) {
      onRestaurantSelect(item.id);
    } else if (item.type === "experience" && onExperienceSelect) {
      onExperienceSelect(item.id);
    }
    setOpenInfoWindowId(item.id);
  };

  const handleMapLoad = (map: any) => {
    mapRef.current = map;
    setMap(map);
  };

  return (
    <>
        <Map
          center={mapCenter}
          level={mapLevel}
          style={{ width: "100%", height: "100%" }}
          onCreate={handleMapLoad}
          isPanto={true}
        >
          {allMarkerData.map((item) => {
            const position = getPosition(item);
            if (!position) return null;

            const isSelected = openInfoWindowId === item.id;
            const baseUrl = `/daily/${item.type}`;

            return (
              <div key={`marker-${item.id}`}>
                <MapMarker
                  position={position}
                  onClick={() => handleMarkerClick(item)}
                  zIndex={isSelected ? 1000 : 1}
                />
                {showInfoWindow && isSelected && (
                  <CustomOverlayMap position={position} yAnchor={2.5}>
                    <div
                      className="bg-white rounded-lg shadow-lg p-3 max-w-[250px] cursor-pointer border border-gray-200"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.location.href = `${baseUrl}/${item.id}`;
                        }
                      }}
                    >
                      <h3 className="text-base font-bold text-blue-600 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        📍 {item.address}
                      </p>
                      {item.category && (
                        <p className="text-sm text-gray-600 mb-1">
                          🍽️ {item.category}
                        </p>
                      )}
                      {item.phoneNumber && (
                        <p className="text-sm text-gray-600 mb-1">
                          📞 {item.phoneNumber}
                        </p>
                      )}
                      {item.price && (
                        <p className="text-sm text-gray-600 mb-1">
                          💰 {item.price}
                        </p>
                      )}
                      {item.rating && (
                        <p className="text-sm text-gray-600 mb-1">
                          ⭐ {item.rating}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        클릭하여 상세 정보 보기
                      </p>
                    </div>
                  </CustomOverlayMap>
                )}
              </div>
            );
          })}
        </Map>
    </>
  );
};

