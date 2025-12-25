"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { ChevronDown, X, Search, Home } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface RestaurantFiltersProps {
  activeFilters?: string[];
  onFilterChange?: (filters: string[]) => void;
}

export default function RestaurantFilters({
  activeFilters = [],
  onFilterChange,
}: RestaurantFiltersProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  // 필터 열기/닫기 핸들러
  const handleFilterToggle = (filterType: string) => {
    setOpenFilter(openFilter === filterType ? null : filterType);
  };

  const isCategoryOpen = openFilter === "category";
  const isFacilityOpen = openFilter === "facility";
  const isRegionOpen = openFilter === "region";

  const addFilter = (value: string) => {
    if (!activeFilters.includes(value)) {
      const newFilters = [...activeFilters, value];
      onFilterChange?.(newFilters);
    }
  };

  const removeFilter = (value: string) => {
    const newFilters = activeFilters.filter((filter) => filter !== value);
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange?.([]);
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-gradient-to-b from-white/95 via-white/90 to-white/85 px-3 py-3 shadow-sm backdrop-blur-md border-b border-gray-200/50 supports-[backdrop-filter]:bg-white/20 md:px-6 md:py-4 border border-red-500">
      <div className="flex flex-col items-start gap-2 md:flex-row md:flex-wrap md:items-center md:gap-2">
        {/* 지역 필터 */}
        <RegionFilter
          isOpen={isRegionOpen}
          onOpenChange={(open) => handleFilterToggle(open ? "region" : "")}
          onSelect={addFilter}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
        />

        {/* 카테고리 */}
        <CategoryFilter
          isOpen={isCategoryOpen}
          onOpenChange={(open) => handleFilterToggle(open ? "category" : "")}
          onSelect={addFilter}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
        />

        {/* 원하는 시설 선택 */}
        <FacilityFilter
          isOpen={isFacilityOpen}
          onOpenChange={(open) => handleFilterToggle(open ? "facility" : "")}
          onSelect={addFilter}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
        />

        {/* 메인으로 가기 버튼 */}
        <Link href="/" className="ml-auto md:ml-auto">
          <Button
            size="sm"
            className="h-9 w-9 rounded-full bg-gray-900 border-2 border-gray-900 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-gray-800 hover:border-gray-800 hover:shadow-md hover:scale-105 p-0 flex items-center justify-center cursor-pointer group"
          >
            <Home className="h-4 w-4 text-white transition-colors duration-200 group-hover:text-gray-100" />
          </Button>
        </Link>

        {/* 레스토랑 등록 버튼 */}
        {/* <Link href="/daily/restaurant/new">
          <Button
            size="sm"
            className="ml-auto h-8 rounded-full bg-blue-600 text-sm text-white hover:bg-blue-700"
            style={{ backgroundColor: "#185fa3" }}
          >
            + 레스토랑 등록
          </Button>
        </Link> */}
      </div>

      {/* 활성 필터 표시 */}
      {activeFilters.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">Filters:</span>
          {activeFilters.map((filter) => {
            // 필터 타입과 값 분리
            const [type, value] = filter.split(":");

            // 한국어 라벨로 변환
            let displayLabel = value;
            if (type === "facility") {
              const facilityMap: { [key: string]: string } = {
                BREAKFAST_AVAILABLE: "Breakfast",
                LUNCH_AVAILABLE: "Lunch",
                DINNER_AVAILABLE: "Dinner",
                KIDS_FRIENDLY: "Kids Friendly",
                PET_FRIENDLY: "Pet Friendly",
                RESERVATION_REQUIRED: "Reservation",
                CREDIT_CARD_PAYMENT_AVAILABLE: "Credit Card",
                WIFI_AVAILABLE: "Free WiFi",
                PARKING_AVAILABLE: "Parking",
                DELIVERY_AVAILABLE: "Delivery",
                TAKEOUT_AVAILABLE: "Takeout",
                OUTDOOR_SEATING: "Outdoor Seating",
                NO_SMOKING: "No Smoking",
                WHEELCHAIR_ACCESSIBLE: "Wheelchair Accessible",
              };
              displayLabel = facilityMap[value] || value;
            } else if (type === "location") {
              displayLabel = value;
            }

            return (
              <Badge
                key={filter}
                variant="secondary"
                className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-50 to-blue-100/80 text-xs font-medium text-blue-700 ring-1 ring-blue-200/50 shadow-sm backdrop-blur-sm hover:from-blue-100 hover:to-blue-200/80 transition-all duration-200"
              >
                <span className="text-xs">{displayLabel}</span>
                <button
                  onClick={() => removeFilter(filter)}
                  className="ml-1 rounded-full p-0.5 hover:bg-white/50"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-7 px-3 text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 rounded-full transition-all duration-200 cursor-pointer"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
// 지역 필터 컴포넌트 (Gathering 지역 선택 UX 차용)
function RegionFilter({
  isOpen,
  onOpenChange,
  onSelect,
  activeFilters,
  onFilterChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (value: string) => void;
  activeFilters?: string[];
  onFilterChange?: (filters: string[]) => void;
}) {
  const metropolitanAreas: { value: string; label: string }[] = [
    { value: "서울특별시", label: "Seoul" },
    { value: "부산광역시", label: "Busan" },
    { value: "대구광역시", label: "Daegu" },
    { value: "인천광역시", label: "Incheon" },
    { value: "광주광역시", label: "Gwangju" },
    { value: "대전광역시", label: "Daejeon" },
    { value: "울산광역시", label: "Ulsan" },
    { value: "세종특별자치시", label: "Sejong" },
    { value: "경기도", label: "Gyeonggi-do" },
    { value: "강원도", label: "Gangwon-do" },
    { value: "충청북도", label: "Chungcheongbuk-do" },
    { value: "충청남도", label: "Chungcheongnam-do" },
    { value: "전라북도", label: "Jeollabuk-do" },
    { value: "전라남도", label: "Jeollanam-do" },
    { value: "경상북도", label: "Gyeongsangbuk-do" },
    { value: "경상남도", label: "Gyeongsangnam-do" },
    { value: "제주특별자치도", label: "Jeju" },
  ];

  const metropolitanRegionMap: { [key: string]: string[] } = {
    서울특별시: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    부산광역시: [
      "강서구",
      "금정구",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
      "기장군",
    ],
    대구광역시: [
      "남구",
      "달서구",
      "달성군",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
    ],
    인천광역시: [
      "계양구",
      "남구",
      "남동구",
      "동구",
      "부평구",
      "서구",
      "연수구",
      "중구",
      "강화군",
      "옹진군",
    ],
    광주광역시: ["광산구", "남구", "동구", "북구", "서구"],
    대전광역시: ["대덕구", "동구", "서구", "유성구", "중구"],
    울산광역시: ["남구", "동구", "북구", "중구", "울주군"],
    세종특별자치시: ["세종시"],
    경기도: [
      "수원시",
      "성남시",
      "의정부시",
      "안양시",
      "부천시",
      "광명시",
      "평택시",
      "과천시",
      "오산시",
      "시흥시",
      "군포시",
      "의왕시",
      "하남시",
      "용인시",
      "파주시",
      "이천시",
      "안성시",
      "김포시",
      "화성시",
      "광주시",
      "여주시",
      "양평군",
      "고양시",
      "안산시",
      "양주시",
      "포천시",
      "연천군",
      "가평군",
    ],
    강원도: [
      "춘천시",
      "원주시",
      "강릉시",
      "동해시",
      "태백시",
      "속초시",
      "삼척시",
      "홍천군",
      "횡성군",
      "영월군",
      "평창군",
      "정선군",
      "철원군",
      "화천군",
      "양구군",
      "인제군",
      "고성군",
      "양양군",
    ],
    충청북도: [
      "청주시",
      "충주시",
      "제천시",
      "보은군",
      "옥천군",
      "영동군",
      "증평군",
      "진천군",
      "괴산군",
      "음성군",
      "단양군",
    ],
    충청남도: [
      "천안시",
      "공주시",
      "보령시",
      "아산시",
      "서산시",
      "논산시",
      "계룡시",
      "당진시",
      "금산군",
      "부여군",
      "서천군",
      "청양군",
      "홍성군",
      "예산군",
      "태안군",
    ],
    전라북도: [
      "전주시",
      "군산시",
      "익산시",
      "정읍시",
      "남원시",
      "김제시",
      "완주군",
      "진안군",
      "무주군",
      "장수군",
      "임실군",
      "순창군",
      "고창군",
      "부안군",
    ],
    전라남도: [
      "목포시",
      "여수시",
      "순천시",
      "나주시",
      "광양시",
      "담양군",
      "곡성군",
      "구례군",
      "고흥군",
      "보성군",
      "화순군",
      "장흥군",
      "강진군",
      "해남군",
      "영암군",
      "무안군",
      "함평군",
      "영광군",
      "장성군",
      "완도군",
      "진도군",
      "신안군",
    ],
    경상북도: [
      "포항시",
      "경주시",
      "김천시",
      "안동시",
      "구미시",
      "영주시",
      "영천시",
      "상주시",
      "문경시",
      "경산시",
      "군위군",
      "의성군",
      "청송군",
      "영양군",
      "영덕군",
      "청도군",
      "고령군",
      "성주군",
      "칠곡군",
      "예천군",
      "봉화군",
      "울진군",
      "울릉군",
    ],
    경상남도: [
      "창원시",
      "진주시",
      "통영시",
      "사천시",
      "김해시",
      "밀양시",
      "거제시",
      "양산시",
      "의령군",
      "함안군",
      "창녕군",
      "고성군",
      "남해군",
      "하동군",
      "산청군",
      "함양군",
      "거창군",
      "합천군",
    ],
    제주특별자치도: ["제주시", "서귀포시"],
  };

  const [selectedMetro, setSelectedMetro] = useState("서울특별시");
  const [search, setSearch] = useState("");

  const regionLabelMap: { [key: string]: string } = {
    강남구: "Gangnam-gu",
    강동구: "Gangdong-gu",
    강북구: "Gangbuk-gu",
    강서구: "Gangseo-gu",
    관악구: "Gwanak-gu",
    광진구: "Gwangjin-gu",
    구로구: "Guro-gu",
    금천구: "Geumcheon-gu",
    노원구: "Nowon-gu",
    도봉구: "Dobong-gu",
    동대문구: "Dongdaemun-gu",
    동작구: "Dongjak-gu",
    마포구: "Mapo-gu",
    서대문구: "Seodaemun-gu",
    서초구: "Seocho-gu",
    성동구: "Seongdong-gu",
    성북구: "Seongbuk-gu",
    송파구: "Songpa-gu",
    양천구: "Yangcheon-gu",
    영등포구: "Yeongdeungpo-gu",
    용산구: "Yongsan-gu",
    은평구: "Eunpyeong-gu",
    종로구: "Jongno-gu",
    중구: "Jung-gu",
    중랑구: "Jungnang-gu",
  };

  const selectedLocations = (activeFilters || [])
    .filter((f) => f.startsWith("location:"))
    .map((f) => f.replace("location:", ""));

  const regions = metropolitanRegionMap[selectedMetro] || [];
  const filtered = search
    ? regions.filter((r) => r.toLowerCase().includes(search.toLowerCase()))
    : regions;

  // 다른 특별시/광역시와의 중복 선택 방지: 광역권 변경 시 현재 광역권 외 지역 필터 제거
  useEffect(() => {
    const current = new Set(metropolitanRegionMap[selectedMetro] || []);
    const hasOutside = selectedLocations.some((r) => !current.has(r));
    if (hasOutside) {
      const newFilters = (activeFilters || []).filter((f) => {
        if (!f.startsWith("location:")) return true;
        const region = f.replace("location:", "");
        return current.has(region);
      });
      onFilterChange?.(newFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMetro]);

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-full justify-center rounded-full border-2 border-gray-200/80 bg-white/90 text-sm font-medium shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:border-gray-300 hover:shadow-md md:h-9 md:w-auto md:justify-start"
        >
          Region
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-50 hidden w-[calc(100vw-2rem)] rounded-2xl border-2 border-gray-200/80 bg-white/95 shadow-2xl backdrop-blur-md md:block md:w-[28rem] dark:border-white/10 dark:bg-white/10"
        align="start"
        side="bottom"
        sideOffset={8}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 drop-shadow-sm">
              Select Region
            </h4>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded p-1 text-gray-500 hover:bg-white/60 md:hidden"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-3">
            <div className="max-h-64 w-40 space-y-1 overflow-y-auto rounded-xl border border-gray-200/80 bg-gradient-to-b from-gray-50/80 to-white/80 p-2 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
              {metropolitanAreas.map((area) => (
                <button
                  key={area.value}
                  className={`w-full rounded-lg px-2 py-1.5 text-left text-sm font-medium transition-all duration-200 ${
                    selectedMetro === area.value
                      ? "bg-gradient-to-r from-blue-50 to-blue-100/80 text-blue-700 ring-1 ring-blue-200/50 shadow-sm"
                      : "hover:bg-gray-100/80 hover:shadow-sm"
                  }`}
                  onClick={() => {
                    // 광역권 전환 시, 기존 선택된 지역 전체 해제 후 광역권 변경
                    if (area.value !== selectedMetro) {
                      const withoutLocations = (activeFilters || []).filter(
                        (f) => !f.startsWith("location:")
                      );
                      onFilterChange?.(withoutLocations);
                    }
                    setSelectedMetro(area.value);
                  }}
                >
                  {area.label}
                </button>
              ))}
            </div>
            <div className="flex-1">
              <div className="relative mb-2">
                <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search region"
                  className="w-full rounded-lg border-2 border-gray-200/80 bg-white/90 py-2 pr-3 pl-8 text-sm text-gray-800 backdrop-blur-sm placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-white/10 dark:text-gray-100"
                />
              </div>
              <div className="max-h-64 space-y-1 overflow-y-auto rounded-xl border border-gray-200/80 bg-gradient-to-b from-white/90 to-gray-50/80 p-1 pr-1 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
                {filtered.map((region) => {
                  const checked = selectedLocations.includes(region);
                  return (
                    <label
                      key={region}
                      className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-all duration-200 hover:bg-gray-100/80 hover:shadow-sm"
                    >
                      <Checkbox
                        id={`loc-${region}`}
                        checked={checked}
                        className={
                          checked
                            ? "border-blue-600 bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm data-[state=checked]:text-white"
                            : "border-gray-300 bg-white shadow-sm"
                        }
                        onCheckedChange={(next) => {
                          if (next) {
                            onSelect(`location:${region}`);
                          } else {
                            const newFilters =
                              activeFilters?.filter(
                                (f) => f !== `location:${region}`
                              ) || [];
                            onFilterChange?.(newFilters);
                          }
                        }}
                      />
                      <Label
                        htmlFor={`loc-${region}`}
                        className="cursor-pointer text-sm font-normal text-gray-800 dark:text-gray-100"
                      >
                        {regionLabelMap[region] || region}
                      </Label>
                    </label>
                  );
                })}
              </div>
              <div className="mt-2 flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 bg-gray-100/80 px-3 text-xs font-medium rounded-lg hover:bg-gray-200/80 transition-all duration-200 cursor-pointer"
                  onClick={() => {
                    const withoutLocations = (activeFilters || []).filter(
                      (f) => !f.startsWith("location:")
                    );
                    onFilterChange?.(withoutLocations);
                  }}
                >
                  Clear all
                </Button>
                <Button
                  size="sm"
                  style={{ backgroundColor: "#185fa3" }}
                  className="h-8 px-4 text-xs font-semibold text-white rounded-lg shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-200 cursor-pointer"
                  onClick={() => onOpenChange(false)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
      {isOpen && (
        <div className="mt-2 w-full rounded-2xl border border-white/20 bg-white/40 shadow-2xl backdrop-blur-md md:hidden">
          <div className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 drop-shadow-sm">
                Select Region
              </h4>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded p-1 text-gray-500 hover:bg-white/60 cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-3">
            <div className="max-h-64 w-40 space-y-1 overflow-y-auto rounded-xl border border-white/30 bg-white/50 p-2 backdrop-blur-md">
                {metropolitanAreas.map((area) => (
                  <button
                    key={area.value}
                    className={`w-full rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${
                      selectedMetro === area.value
                        ? "bg-gray-100 text-blue-700"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      if (area.value !== selectedMetro) {
                        const withoutLocations = (activeFilters || []).filter(
                          (f) => !f.startsWith("location:")
                        );
                        onFilterChange?.(withoutLocations);
                      }
                      setSelectedMetro(area.value);
                    }}
                  >
                    {area.label}
                  </button>
                ))}
              </div>
              <div className="flex-1">
                <div className="relative mb-2">
                  <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search region"
                    className="w-full rounded-lg border border-white/40 bg-white/50 py-2 pr-3 pl-8 text-sm backdrop-blur-md"
                  />
                </div>
                <div className="max-h-64 space-y-1 overflow-y-auto rounded-xl border border-white/30 bg-white/40 p-1 pr-1 backdrop-blur-md">
                  {filtered.map((region) => {
                    const checked = selectedLocations.includes(region);
                    return (
                      <label
                        key={region}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-50"
                      >
                        <Checkbox
                          id={`mloc-${region}`}
                          checked={checked}
                          onCheckedChange={(next) => {
                            if (next) onSelect(`location:${region}`);
                            else {
                              const newFilters =
                                activeFilters?.filter(
                                  (f) => f !== `location:${region}`
                                ) || [];
                              onFilterChange?.(newFilters);
                            }
                          }}
                        />
                        <Label
                          htmlFor={`mloc-${region}`}
                          className="cursor-pointer text-sm font-normal"
                        >
                          {regionLabelMap[region] || region}
                        </Label>
                      </label>
                    );
                  })}
                </div>
                <div className="mt-2 flex justify-end gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 bg-white/30 px-2 text-xs backdrop-blur hover:bg-white/50 cursor-pointer"
                    onClick={() => {
                      const withoutLocations = (activeFilters || []).filter(
                        (f) => !f.startsWith("location:")
                      );
                      onFilterChange?.(withoutLocations);
                    }}
                  >
                  Clear all
                  </Button>
                <Button
                    size="sm"
                    className="h-7 px-3 text-xs text-white cursor-pointer"
                    onClick={() => onOpenChange(false)}
                  >
                  Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Popover>
  );
}

// 카테고리 필터 컴포넌트
function CategoryFilter({
  isOpen,
  onOpenChange,
  onSelect,
  activeFilters,
  onFilterChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (value: string) => void;
  activeFilters?: string[];
  onFilterChange?: (filters: string[]) => void;
}) {
  const categories = [
    "Korean",
    "Chinese",
    "Japanese",
    "Izakaya",
    "Gastro Pub",
    "BBQ/Grill",
    "Sashimi",
    "Western",
    "Asian",
    "Vietnamese",
    "Mexican",
    "Indian",
    "Fast Food",
    "Cafe/Dessert",
    "Bakery",
    "Bar/Pub",
    "Etc",
  ];

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-full justify-center rounded-full border-2 border-gray-200/80 bg-white/90 text-sm font-medium shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:border-gray-300 hover:shadow-md md:h-9 md:w-auto md:justify-start"
        >
          Category
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="relative z-50 hidden w-[calc(100vw-2rem)] rounded-2xl border border-l-0 border-white/20 bg-white/40 shadow-xl backdrop-blur-md md:block md:w-80"
        align="start"
        side="bottom"
        sideOffset={8}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="space-y-3" >
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Select Category</h4>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded p-1 text-gray-500 hover:bg-gray-100 md:hidden cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto md:grid-cols-2">
            {categories.map((category) => {
              const isSelected = activeFilters?.includes(
                `category:${category}`
              );
              return (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={isSelected}
                    className={
                      isSelected
                        ? "border-blue-600 bg-blue-600/90 backdrop-blur data-[state=checked]:text-white"
                        : "border-white/40 bg-white/40 backdrop-blur"
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onSelect(`category:${category}`);
                      } else {
                        // 체크 해제 시 필터 제거
                        const newFilters =
                          activeFilters?.filter(
                            (filter) => filter !== `category:${category}`
                          ) || [];
                        onFilterChange?.(newFilters);
                      }
                    }}
                  />
                  <Label
                    htmlFor={category}
                    className="cursor-pointer text-sm font-normal"
                  >
                    {category}
                  </Label>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button
              size="sm"
              style={{ backgroundColor: "#185fa3" }}
              className="text-white cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
      {isOpen && (
        <div className="mt-2 w-full rounded-2xl border border-white/20 bg-white/40 p-4 shadow-2xl backdrop-blur-md md:hidden">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Select Category</h4>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded p-1 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto">
              {categories.map((category) => {
                const isSelected = activeFilters?.includes(
                  `category:${category}`
                );
                return (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mcat-${category}`}
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        if (checked) onSelect(`category:${category}`);
                        else {
                          const newFilters =
                            activeFilters?.filter(
                              (f) => f !== `category:${category}`
                            ) || [];
                          onFilterChange?.(newFilters);
                        }
                      }}
                      className={
                        isSelected
                          ? "border-blue-600 bg-blue-600/90 backdrop-blur data-[state=checked]:text-white"
                          : "border-white/40 bg-white/40 backdrop-blur"
                      }
                    />
                    <Label
                      htmlFor={`mcat-${category}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {category}
                    </Label>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                className="text-white cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </Popover>
  );
}
// 원하는 시설 선택 필터 컴포넌트
function FacilityFilter({
  isOpen,
  onOpenChange,
  onSelect,
  activeFilters,
  onFilterChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (value: string) => void;
  activeFilters?: string[];
  onFilterChange?: (filters: string[]) => void;
}) {
  const facilities = [
    { key: "BREAKFAST_AVAILABLE", label: "Breakfast" },
    { key: "LUNCH_AVAILABLE", label: "Lunch" },
    { key: "DINNER_AVAILABLE", label: "Dinner" },
    { key: "KIDS_FRIENDLY", label: "Kids Friendly" },
    { key: "PET_FRIENDLY", label: "Pet Friendly" },
    { key: "RESERVATION_REQUIRED", label: "Reservation" },
    { key: "CREDIT_CARD_PAYMENT_AVAILABLE", label: "Credit Card" },
    { key: "WIFI_AVAILABLE", label: "Free WiFi" },
    { key: "PARKING_AVAILABLE", label: "Parking" },
    { key: "DELIVERY_AVAILABLE", label: "Delivery" },
    { key: "TAKEOUT_AVAILABLE", label: "Takeout" },
    { key: "OUTDOOR_SEATING", label: "Outdoor Seating" },
    { key: "NO_SMOKING", label: "No Smoking" },
    { key: "WHEELCHAIR_ACCESSIBLE", label: "Wheelchair Accessible" },
  ];

  // 현재 선택된 시설 필터들 확인
  const selectedFacilities = facilities.filter((facility) =>
    activeFilters?.includes(`facility:${facility.key}`)
  );

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-full justify-center rounded-full border-2 border-gray-200/80 bg-white/90 text-sm font-medium shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:border-gray-300 hover:shadow-md md:h-9 md:w-auto md:justify-start"
        >
          Facilities
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="relative z-50 hidden w-[calc(100vw-2rem)] rounded-2xl border border-l-0 border-white/20 bg-white/40 shadow-xl backdrop-blur-md md:block md:w-80"
        align="start"
        side="bottom"
        sideOffset={8}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Choose Facilities</h4>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded p-1 text-gray-500 hover:bg-gray-100 md:hidden"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto md:grid-cols-2">
            {facilities.map((facility) => {
              const isSelected = activeFilters?.includes(
                `facility:${facility.key}`
              );
              return (
                <div key={facility.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={facility.key}
                    checked={isSelected}
                    className={
                      isSelected
                        ? "border-blue-600 bg-blue-600/90 backdrop-blur data-[state=checked]:text-white"
                        : "border-white/40 bg-white/40 backdrop-blur"
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onSelect(`facility:${facility.key}`);
                      } else {
                        // 체크 해제 시 필터 제거
                        const newFilters =
                          activeFilters?.filter(
                            (filter) => filter !== `facility:${facility.key}`
                          ) || [];
                        onFilterChange?.(newFilters);
                      }
                    }}
                  />
                  <Label
                    htmlFor={facility.key}
                    className="cursor-pointer text-sm font-normal"
                  >
                    {facility.label}
                  </Label>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button
              size="sm"
              style={{ backgroundColor: "#185fa3" }}
              className="text-white cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
      {isOpen && (
        <div className="mt-2 w-full rounded-2xl border border-white/20 bg-white/40 p-4 shadow-2xl backdrop-blur-md md:hidden">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Choose Facilities</h4>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded p-1 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto">
              {facilities.map((facility) => {
                const isSelected = activeFilters?.includes(
                  `facility:${facility.key}`
                );
                return (
                  <div
                    key={facility.key}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`mfac-${facility.key}`}
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        if (checked) onSelect(`facility:${facility.key}`);
                        else {
                          const newFilters =
                            activeFilters?.filter(
                              (f) => f !== `facility:${facility.key}`
                            ) || [];
                          onFilterChange?.(newFilters);
                        }
                      }}
                      className={
                        isSelected
                          ? "border-blue-600 bg-blue-600/90 backdrop-blur data-[state=checked]:text-white"
                          : "border-white/40 bg-white/40 backdrop-blur"
                      }
                    />
                    <Label
                      htmlFor={`mfac-${facility.key}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {facility.label}
                    </Label>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                className="text-white cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </Popover>
  );
}
