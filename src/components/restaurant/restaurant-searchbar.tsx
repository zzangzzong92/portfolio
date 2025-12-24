"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface RestaurantSearchProps {
  value?: string;
  onChange?: (query: string) => void;
}

export default function RestaurantSearch({
  value = "",
  onChange,
}: RestaurantSearchProps) {
  return (
    <div className="w-full">
      <div className="relative">
        <Search className="text-gray-400 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transition-colors" />
        <Input
          placeholder="레스토랑명, 카테고리, 지역으로 검색"
          className="h-12 rounded-2xl border-2 border-gray-200/80 bg-white/90 backdrop-blur-sm pl-12 pr-4 text-base shadow-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:shadow-md focus:ring-2 focus:ring-blue-500/20 hover:border-gray-300"
          style={{ "--tw-ring-color": "#185fa3" } as React.CSSProperties}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </div>
  );
}
