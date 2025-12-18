"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: any;
  }
}

// 공통 위치 인터페이스
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

// 마커 타입 정의
type MarkerType = "restaurant" | "experience";

// 마커 데이터 인터페이스
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
  specialties?: string[];
  duration?: string;
  tags?: string[];
  type: MarkerType;
}

// 마커 데이터 통합 함수
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
      type: "restaurant" as MarkerType,
    })),
    ...experiences.map((experience) => ({
      id: experience.id,
      name: experience.title || experience.name,
      address: experience.location || experience.address,
      latitude: experience.latitude,
      longitude: experience.longitude,
      duration: experience.duration,
      price: experience.price,
      tags: experience.tags,
      type: "experience" as MarkerType,
    })),
  ];
};

// 마커 생성 함수
const createMarker = (
  data: MarkerData,
  map: any,
  onSelect?: (id: number | null) => void,
  showInfoWindow: boolean = true
) => {
  // 좌표 결정 (x,y 우선, 없으면 latitude, longitude 사용)
  let position: { lat: number; lng: number };

  if (data.x && data.y) {
    position = {
      lat: parseFloat(data.x),
      lng: parseFloat(data.y),
    };
  } else if (data.latitude && data.longitude) {
    position = {
      lat: data.latitude,
      lng: data.longitude,
    };
  } else {
    return null; // 좌표가 없으면 마커 생성하지 않음
  }

  const marker = new window.google.maps.Marker({
    position,
    map,
    title: data.name,
    zIndex: 1,
  });

  // 정보창 내용 생성
  const getInfoContent = (data: MarkerData) => {
    const baseUrl = `/daily/${data.type}`;

    let content = `
      <div style="padding: 8px; max-width: 250px; cursor: pointer;" onclick="window.location.href='${baseUrl}/${data.id}'">
        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #185fa3;">
          ${data.name}
        </h3>
        <p style="margin: 4px 0; font-size: 14px; color: #666;">
          📍 ${data.address}
        </p>
    `;

    // 타입별 특화 정보
    if (data.type === "restaurant" && data.category) {
      content += `
        <p style="margin: 4px 0; font-size: 14px; color: #666;">
          🍽️ ${data.category}
        </p>
      `;
    }

    if (data.type === "experience" && data.duration) {
      content += `
        <p style="margin: 4px 0; font-size: 14px; color: #666;">
          ⏰ ${data.duration}
        </p>
      `;
    }

    if (data.phoneNumber) {
      content += `
        <p style="margin: 4px 0; font-size: 14px; color: #666;">
          📞 ${data.phoneNumber}
        </p>
      `;
    }

    if (data.price) {
      content += `
        <p style="margin: 4px 0; font-size: 14px; color: #666;">
          💰 ${data.price}
        </p>
      `;
    }

    if (data.rating) {
      content += `
        <p style="margin: 4px 0; font-size: 14px; color: #666;">
          ⭐ ${data.rating}
        </p>
      `;
    }

    if (data.tags?.length) {
      content += `
        <p style="margin: 4px 0; font-size: 14px; color: #666;">
          🏷️ ${data.tags.slice(0, 3).join(", ")}
        </p>
      `;
    }

    content += `
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #999;">
          클릭하여 상세 정보 보기
        </p>
      </div>
    `;

    return content;
  };

  let infoWindow = null;

  // showInfoWindow가 true일 때만 정보창 생성
  if (showInfoWindow) {
    infoWindow = new window.google.maps.InfoWindow({
      content: getInfoContent(data),
    });

    // 마커 클릭 이벤트
    marker.addListener("click", () => {
      if (onSelect) {
        onSelect(data.id);
      }
    });
  }

  return { marker, infoWindow };
};

interface GoogleMapProps {
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

type MapForm = "restaurant" | "experience";

export const GoogleMap = ({
  restaurants = [],
  experiences = [],
  center = { lat: 37.5665, lng: 126.978 },
  zoom = 13,
  selectedRestaurantId = null,
  selectedExperienceId = null,
  onRestaurantSelect,
  onExperienceSelect,
  showInfoWindow = true,
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [map, setMap] = useState<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowsRef = useRef<any[]>([]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // 이미 스크립트가 로드되어 있는 경우 즉시 준비 완료 처리
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).google?.maps) {
      setMapLoaded(true);
    }
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (mapLoaded && window.google && mapRef.current && !map) {
      try {
        const newMap = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
        });

        setMap(newMap);
      } catch (error) {
        setMapError("지도를 초기화하는 중 오류가 발생했습니다.");
      }
    }
  }, [mapLoaded, center, zoom, map]);

  // center/zoom 변경 시 지도 위치 업데이트
  useEffect(() => {
    if (!map || !window.google) return;
    try {
      if (center) {
        map.panTo(center);
      }
      if (typeof zoom === "number") {
        map.setZoom(zoom);
      }
    } catch (error) {
      console.error("지도 중심 업데이트 오류:", error);
    }
  }, [map, center?.lat, center?.lng, zoom]);

  // 마커 생성
  useEffect(() => {
    if (!map || !window.google) return;

    // 기존 마커들 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    infoWindowsRef.current.forEach(
      (infoWindow) => infoWindow && infoWindow.close()
    );

    // 새로운 마커들 생성
    const newMarkers: any[] = [];
    const newInfoWindows: any[] = [];

    // 모든 마커 데이터를 통합
    const allMarkerData = getAllMarkerData(restaurants, experiences);

    // 공통 함수를 사용하여 마커 생성
    allMarkerData.forEach((data) => {
      const result = createMarker(
        data,
        map,
        (id) => {
          // 다른 정보창들 닫기
          infoWindowsRef.current.forEach((iw) => iw && iw.close());

          // 현재 정보창 열기
          const markerIndex = newMarkers.findIndex(
            (m) => m.getTitle() === data.name
          );
          if (markerIndex >= 0 && newInfoWindows[markerIndex]) {
            newInfoWindows[markerIndex].open(map, newMarkers[markerIndex]);
          }

          // 타입별 선택 콜백 호출
          if (data.type === "restaurant" && onRestaurantSelect) {
            onRestaurantSelect(id);
          } else if (data.type === "experience" && onExperienceSelect) {
            onExperienceSelect(id);
          }
        },
        showInfoWindow
      );

      if (result) {
        newMarkers.push(result.marker);
        newInfoWindows.push(result.infoWindow);
      }
    });

    // ref에 저장
    markersRef.current = newMarkers;
    infoWindowsRef.current = newInfoWindows;

    // 모든 마커가 보이도록 지도 범위 조정
    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      newMarkers.forEach((marker) => {
        bounds.extend(marker.getPosition());
      });
      map.fitBounds(bounds);

      // 너무 많이 확대되지 않도록 최대 줌 레벨 제한
      const listener = window.google.maps.event.addListener(map, "idle", () => {
        if (map.getZoom() > 16) map.setZoom(16);
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [
    map,
    restaurants,
    experiences,
    onRestaurantSelect,
    onExperienceSelect,
  ]);

  // 선택된 항목 처리
  useEffect(() => {
    if (!map || !window.google) return;

    // 선택된 항목이 있으면 해당 마커로 지도 이동하고 InfoWindow 열기
    if (selectedRestaurantId || selectedExperienceId) {
      let selectedItem: MarkerData | null = null;

      // 모든 마커 데이터를 통합하여 선택된 항목 찾기
      const allMarkerData = getAllMarkerData(
        restaurants,
        experiences
      );

      if (selectedRestaurantId) {
        selectedItem =
          allMarkerData.find(
            (item) =>
              item.id === selectedRestaurantId && item.type === "restaurant"
          ) || null;
      } else if (selectedExperienceId) {
        selectedItem =
          allMarkerData.find(
            (item) =>
              item.id === selectedExperienceId && item.type === "experience"
          ) || null;
      }

      if (selectedItem) {
        // 좌표 결정
        let position: { lat: number; lng: number };
        if (selectedItem.x && selectedItem.y) {
          position = {
            lat: parseFloat(selectedItem.x),
            lng: parseFloat(selectedItem.y),
          };
        } else if (selectedItem.latitude && selectedItem.longitude) {
          position = {
            lat: selectedItem.latitude,
            lng: selectedItem.longitude,
          };
        } else {
          return; // 좌표가 없으면 처리하지 않음
        }

        // 지도를 선택된 위치로 이동
        map.panTo(position);
        map.setZoom(15);

        // 모든 InfoWindow 닫기
        infoWindowsRef.current.forEach((iw) => iw && iw.close());

        // 선택된 마커 찾아서 강조 및 InfoWindow 열기
        const selectedMarker = markersRef.current.find((marker) => {
          const pos = marker.getPosition();
          return (
            Math.abs(pos.lat() - position.lat) < 0.0001 &&
            Math.abs(pos.lng() - position.lng) < 0.0001
          );
        });

        if (selectedMarker) {
          selectedMarker.setZIndex(1000);

          // 해당 마커의 InfoWindow 찾아서 열기
          const selectedIndex = markersRef.current.indexOf(selectedMarker);
          if (selectedIndex >= 0 && infoWindowsRef.current[selectedIndex]) {
            infoWindowsRef.current[selectedIndex].open(map, selectedMarker);
          }
        }
      }
    } else {
      // 선택된 항목이 없으면 모든 마커의 zIndex를 1로 설정
      markersRef.current.forEach((marker) => {
        marker.setZIndex(1);
      });
      // 모든 InfoWindow 닫기
      infoWindowsRef.current.forEach((iw) => iw && iw.close());
    }
  }, [
    map,
    selectedRestaurantId,
    selectedExperienceId,
    restaurants,
    experiences,
  ]);

  if (!apiKey) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="font-semibold text-red-500">
            Google Maps API Key가 설정되지 않았습니다
          </p>
          <p className="mt-2 text-sm text-gray-600">
            .env.local 파일에 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY를 설정해주세요
          </p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="font-semibold text-red-500">지도 로드 오류</p>
          <p className="mt-2 text-sm text-gray-600">{mapError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {!window.google && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=en&region=KR`}
          strategy="afterInteractive"
          onLoad={() => {
            setMapLoaded(true);
          }}
          onError={(e) => {
            setMapError("Google Maps 스크립트를 로드할 수 없습니다.");
          }}
        />
      )}
      {!mapLoaded && (
        <div className="flex h-full items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">지도를 로드하는 중...</p>
            {restaurants.length > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                {`${restaurants.length}개의 레스토랑 정보를 준비 중...`}
              </p>
            )}
          </div>
        </div>
      )}
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </>
  );
};
