"use client";

import { Restaurant } from "types/restaurant";
import { Utensils } from "lucide-react";
import RestaurantCard from "./restaurant-card";

interface RestaurantInfiniteListProps {
  restaurants: Restaurant[];
  selectedRestaurantId: number | null;
  onRestaurantSelect: (restaurantId: number | null) => void;
}

export default function RestaurantInfiniteList({
  restaurants,
  selectedRestaurantId,
  onRestaurantSelect,
}: RestaurantInfiniteListProps) {
  return (
    <div className="space-y-4">
      {restaurants.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-4">
            <Utensils className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-lg font-semibold text-gray-700">검색 결과가 없습니다</p>
          <p className="text-sm text-gray-500 mt-1">다른 조건으로 검색해보세요</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isSelected={selectedRestaurantId === restaurant.id}
              onSelect={onRestaurantSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
