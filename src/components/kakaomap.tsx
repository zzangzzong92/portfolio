"use client";

import { Map, MapMarker, MapInfoWindow } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";

interface LocationData {
  id: number;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  x?: string;
  y?: string;
  phoneNumber?: string;
  phone?: string;
  category?: string;
  price?: string;
  priceRange?: string;
  rating?: number;
}

interface KakaoMapProps {
  center?: { lat: number; lng: number };
  style?: React.CSSProperties;
  level?: number;
  restaurants?: LocationData[];
  selectedRestaurantId?: number | null;
  onRestaurantSelect?: (restaurantId: number | null) => void;
  showInfoWindow?: boolean;
}

export default function KakaoMap({
  center = { lat: 37.5665, lng: 126.978 },
  style,
  level = 3,
  restaurants = [],
  selectedRestaurantId = null,
  onRestaurantSelect,
  showInfoWindow = true,
}: KakaoMapProps) {
  const [map, setMap] = useState<any>(null);
  const [infoWindowOpenId, setInfoWindowOpenId] = useState<number | null>(null);
  
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY || "";
  const mapProps = kakaoKey ? { JavascriptKey: kakaoKey } : {};

  const getPosition = (restaurant: LocationData): { lat: number; lng: number } | null => {
    if (restaurant.x && restaurant.y) {
      return {
        lat: parseFloat(restaurant.x),
        lng: parseFloat(restaurant.y),
      };
    } else if (restaurant.latitude && restaurant.longitude) {
      return {
        lat: restaurant.latitude,
        lng: restaurant.longitude,
      };
    }
    return null;
  };

  const handleMarkerClick = (restaurantId: number) => {
    setInfoWindowOpenId(restaurantId);
    if (onRestaurantSelect) {
      onRestaurantSelect(restaurantId);
    }
  };

  useEffect(() => {
    if (selectedRestaurantId && map && typeof window !== "undefined" && (window as any).kakao?.maps) {
      const selectedRestaurant = restaurants.find(
        (r) => r.id === selectedRestaurantId
      );
      if (selectedRestaurant) {
        const position = getPosition(selectedRestaurant);
        if (position) {
          const kakao = (window as any).kakao;
          map.setCenter(new kakao.maps.LatLng(position.lat, position.lng));
          setInfoWindowOpenId(selectedRestaurantId);
        }
      }
    } else if (!selectedRestaurantId) {
      setInfoWindowOpenId(null);
    }
  }, [selectedRestaurantId, restaurants, map]);

  useEffect(() => {
    if (map && restaurants.length > 0 && typeof window !== "undefined" && (window as any).kakao?.maps) {
      const kakao = (window as any).kakao;
      const bounds = new kakao.maps.LatLngBounds();
      let hasValidPosition = false;

      restaurants.forEach((restaurant) => {
        const position = getPosition(restaurant);
        if (position) {
          bounds.extend(new kakao.maps.LatLng(position.lat, position.lng));
          hasValidPosition = true;
        }
      });

      if (hasValidPosition) {
        map.setBounds(bounds);
      }
    }
  }, [map, restaurants]);

  if (restaurants.length === 0) {
    return (
      <div className="w-full h-48" style={style}>
        <Map
          center={center}
          style={style || { width: "100%", height: "100%" }}
          level={level}
          isPanto={true}
          onCreate={setMap}
          {...mapProps}
        >
          <MapMarker position={center} />
        </Map>
      </div>
    );
  }

  const validRestaurants = restaurants.filter((r) => getPosition(r) !== null);

  return (
    <div className="w-full h-full" style={style}>
      <Map
        center={center}
        style={style || { width: "100%", height: "100%" }}
        level={level}
        isPanto={true}
        onCreate={setMap}
        {...mapProps}
      >
        {validRestaurants.map((restaurant) => {
          const position = getPosition(restaurant);
          if (!position) return null;

          const isSelected = restaurant.id === selectedRestaurantId;
          const isInfoWindowOpen = infoWindowOpenId === restaurant.id && showInfoWindow;

          return (
            <div key={restaurant.id}>
              <MapMarker
                position={position}
                onClick={() => handleMarkerClick(restaurant.id)}
                image={{
                  src: isSelected
                    ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"
                    : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker.png",
                  size: {
                    width: 29,
                    height: 42,
                  },
                  options: {
                    offset: {
                      x: 14,
                      y: 42,
                    },
                  },
                }}
              />
              {isInfoWindowOpen && (
                <MapInfoWindow
                  position={position}
                  removable={true}
                  onClose={() => setInfoWindowOpenId(null)}
                >
                  <div
                    style={{
                      padding: "8px",
                      maxWidth: "250px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.location.href = `/daily/restaurant/${restaurant.id}`;
                      }
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#185fa3",
                      }}
                    >
                      {restaurant.name}
                    </h3>
                    <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
                      📍 {restaurant.address}
                    </p>
                    {restaurant.category && (
                      <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
                        🍽️ {restaurant.category}
                      </p>
                    )}
                    {(restaurant.phoneNumber || restaurant.phone) && (
                      <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
                        📞 {restaurant.phoneNumber || restaurant.phone}
                      </p>
                    )}
                    {(restaurant.price || restaurant.priceRange) && (
                      <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
                        💰 {restaurant.price || restaurant.priceRange}
                      </p>
                    )}
                    {restaurant.rating && (
                      <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
                        ⭐ {restaurant.rating}
                      </p>
                    )}
                    <p
                      style={{
                        margin: "8px 0 0 0",
                        fontSize: "12px",
                        color: "#999",
                      }}
                    >
                      클릭하여 상세 정보 보기
                    </p>
                  </div>
                </MapInfoWindow>
              )}
            </div>
          );
        })}
      </Map>
    </div>
  );
}