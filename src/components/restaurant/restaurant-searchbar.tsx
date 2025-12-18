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
        <Search className="text-muted-foreground absolute top-4 left-3 h-4 w-4" />
        <Input
          placeholder="레스토랑명, 카테고리, 지역으로 검색"
          className="h-12 rounded-full border-gray-300 pl-10 text-base focus:border-blue-600 focus:ring-blue-600"
          style={{ "--tw-ring-color": "#185fa3" } as React.CSSProperties}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </div>
  );
}
