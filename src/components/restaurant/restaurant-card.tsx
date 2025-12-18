"use client";

import type React from "react";


import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Restaurant } from "types/restaurant";

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected?: boolean;
  onSelect?: (restaurantId: number) => void;
}

export default function RestaurantCard({
  restaurant,
  isSelected = false,
  onSelect,
}: RestaurantCardProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 기본 이미지 설정
  const images =
    restaurant.images && restaurant.images.length > 0
      ? restaurant.images
      : [`/assets/activity/restaurant.png`];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(restaurant.id);
    }
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 로그인 상태 확인 (실제로는 context나 store에서 가져와야 함)
    const isLoggedIn = false; // 임시로 false로 설정, 실제로는 인증 상태 확인

    if (!isLoggedIn) {
      toast.info("즐겨찾기를 하시려면 로그인이 필요합니다", {
        description: "로그인 후 즐겨찾기 기능을 이용하세요",
        duration: 3000,
      });
      return;
    }

    // 로그인된 경우 즐겨찾기 로직 실행
    toast.success("즐겨찾기에 추가되었습니다");
  };

  return (
    <div
      className={`group relative h-[420px] cursor-pointer overflow-hidden rounded-xl transition-all hover:shadow-lg ${
        isSelected ? "shadow-lg ring-2 ring-blue-500" : "hover:shadow-md"
      }`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={images[currentImageIndex] || "/assets/activity/restaurant.png"}
          alt={`${restaurant.name} view ${currentImageIndex + 1}`}
          className="h-full w-full object-cover transition-transform duration-300"
        />

        {/* Navigation Arrows */}
        {isHovered && images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:bg-white"
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </button>
          </>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleHeartClick}
          className="absolute top-2 right-2 rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110"
        >
          <Heart className="h-5 w-5 text-gray-500 transition-colors hover:text-red-500" />
        </button>

        {/* Image Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(index, e)}
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-white"
                    : "bg-gray-400 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-2 left-2 rounded-full bg-blue-500 p-1">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex h-[156px] flex-col p-3">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold">
              {restaurant.name}
            </h3>
            {restaurant.description && (
              <p
                className="text-muted-foreground mt-1 overflow-hidden text-sm"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {restaurant.description}
              </p>
            )}
          </div>
          {restaurant.rating && (
            <div className="flex items-center text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1 font-medium">{restaurant.rating}</span>
              {restaurant.reviewCount && (
                <span className="text-muted-foreground ml-1 text-xs">
                  ({restaurant.reviewCount})
                </span>
              )}
            </div>
          )}
        </div>

        <p className="text-muted-foreground mt-1 truncate text-sm">
          {restaurant.address}
        </p>

        {/* 좌표 표시 - 주석처리 */}
        {/* <p className="mt-1 text-xs font-bold text-red-600">
          좌표: {restaurant.x || "N/A"}, {restaurant.y || "N/A"}
        </p> */}

        {restaurant.facilities && restaurant.facilities.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {restaurant.facilities.slice(0, 2).map((facility, index) => (
              <span
                key={index}
                className="rounded-full px-2 py-0.5 text-xs"
                style={{ backgroundColor: "#e6f0f8", color: "#185fa3" }}
              >
                {facility}
              </span>
            ))}
          </div>
        )}

        <div className="text-muted-foreground mt-auto flex items-center gap-3 pt-2 text-xs">
          {restaurant.openingHours && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
                style={{ color: "#185fa3" }}
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span>{restaurant.openingHours}</span>
            </div>
          )}
          {restaurant.priceRange && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
                style={{ color: "#185fa3" }}
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span>{restaurant.priceRange}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
