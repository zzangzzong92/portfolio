"use client";

import MapSkeleton from "@/components/hospital/map-skeleton";
import RestaurantFilters from "@/components/restaurant/restaurant-filters";
import RestaurantInfiniteList from "@/components/restaurant/restaurant-infinite-list";
import RestaurantListSkeleton from "@/components/restaurant/restaurant-list-skeleton";
import RestaurantSearchBar from "@/components/restaurant/restaurant-searchbar";
import { Button } from "@/components/ui/button";
import { getAllRestaurants } from "@/lib/restaurant.action";
import { Restaurant } from "@/types/restaurant";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

const GoogleMap = dynamic(
  () => import("@/components/GoogleMap").then((m) => m.GoogleMap),
  { ssr: false, loading: () => <MapSkeleton /> }
);

export default function RestaurantClient() {
  // 모바일에서는 기본적으로 닫힘, 웹에서는 기본적으로 열림
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  // 필터 상태
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpenMobile, setFiltersOpenMobile] = useState(false);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragTranslate, setDragTranslate] = useState(0);
  const [showFilterHint, setShowFilterHint] = useState(true);

  // 컴포넌트 마운트 시 웹에서는 사이드바 열기 - 최적화된 이벤트 리스너
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth >= 768) {
          // md 브레이크포인트
          setIsSidebarOpen(true);
        } else {
          setIsSidebarOpen(false);
        }
      }, 100); // 디바운싱 추가
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 (passive: true로 최적화)
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  // 시트 핸들 클릭 시 사이드바 열기
  const handleSheetHandleClick = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  // 레스토랑 데이터 로드
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setIsLoadingRestaurants(true);
        const data = await getAllRestaurants();
        setAllRestaurants(data);
      } catch (error) {
        console.error("레스토랑 데이터 로드 실패:", error);
      } finally {
        setIsLoadingRestaurants(false);
      }
    };

    loadRestaurants();
  }, []);

  // 필터링된 레스토랑 데이터 계산
  const filteredRestaurants = useMemo(() => {
    let filtered = [...allRestaurants];

    // 검색어 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.category.toLowerCase().includes(query) ||
          restaurant.facilities?.some((facility: string) =>
            facility.toLowerCase().includes(query)
          )
      );
    }

    // 활성 필터 적용
    if (activeFilters.length > 0) {
      filtered = filtered.filter((restaurant) => {
        const locationFilters = activeFilters
          .filter((f) => f.startsWith("location:"))
          .map((f) => f.replace("location:", ""));

        if (locationFilters.length > 0) {
          const matchesAnyLocation = locationFilters.some((loc) =>
            restaurant.address.includes(loc)
          );
          if (!matchesAnyLocation) return false;
        }

        // 나머지 필터는 AND로 적용
        for (const filter of activeFilters) {
          if (filter.startsWith("location:")) continue;

          if (filter.startsWith("category:")) {
            const category = filter.replace("category:", "");
            if (restaurant.category !== category) return false;
            continue;
          }

          if (filter.startsWith("facility:")) {
            const facility = filter.replace("facility:", "");
            if (!restaurant.facilities?.includes(facility)) return false;
            continue;
          }

          if (filter.startsWith("price:")) {
            const price = filter.replace("price:", "");
            if (restaurant.priceRange !== price) return false;
            continue;
          }
        }

        return true;
      });
    }

    return filtered;
  }, [allRestaurants, searchQuery, activeFilters]);

  const handleRestaurantSelect = useCallback(
    (restaurantId: number | null) => {
      setSelectedRestaurantId(restaurantId);
      if (
        restaurantId &&
        typeof window !== "undefined" &&
        window.innerWidth < 768
      ) {
        router.push(`/daily/restaurant/${restaurantId}`);
      }
    },
    [router]
  );

  const handleFilterChange = useCallback((filters: string[]) => {
    setActiveFilters(filters);
    // 필터가 변경되면 선택된 레스토랑 초기화
    setSelectedRestaurantId(null);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    // 검색어가 변경되면 선택된 레스토랑 초기화
    setSelectedRestaurantId(null);
  }, []);

  // 초기에 힌트 배너 잠시 노출
  useEffect(() => {
    const timer = setTimeout(() => setShowFilterHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex overflow-hidden flex-col h-screen">
      {/* SEO를 위한 h1 태그 - 스크린 리더에서만 읽히도록 숨김 */}
      <h1 className="sr-only">
        한국 식당 찾기 - 맛집, 한식, 양식, 일식, 중식 등 다양한 음식점을
        지역별로 검색하고 리뷰를 확인하세요 - WithKO
      </h1>

      {/* 모바일: 세로 레이아웃, 데스크톱: 가로 레이아웃 */}
      <div className="flex overflow-hidden relative flex-col flex-1 md:flex-row">
        {/* 모바일: 하단 시트 형태의 사이드바, 데스크톱: 왼쪽에서 나타나는 사이드바 */}
        <div
          className={`transition-all duration-300 ease-in-out md:flex-shrink-0 md:overflow-hidden ${
            isSidebarOpen
              ? "fixed inset-x-0 bottom-0 z-50 pointer-events-auto h-[70vh] md:static md:h-auto md:w-[600px] md:transform-none lg:w-[800px]"
              : "fixed inset-x-0 z-50 h-0 pointer-events-none -bottom-[70vh] md:static md:h-auto md:w-0 md:transform-none"
          }`}
        >
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl md:w-[600px] md:rounded-none md:shadow-none lg:w-[800px]">
            {/* 모바일: 시트 핸들 */}
            <div
              className="flex justify-center py-2 transition-colors cursor-pointer hover:bg-gray-50 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="close bottom sheet"
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* 검색바 */}
            <div className="flex-shrink-0 px-4 py-3 md:px-6 md:py-4">
              <RestaurantSearchBar
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {/* 레스토랑 리스트 */}
            <div className="overflow-hidden flex-1">
              <Suspense fallback={<RestaurantListSkeleton />}>
                <div className="overflow-y-auto overflow-x-hidden px-4 pb-6 h-full md:px-6 md:pb-8">
                  <RestaurantInfiniteList
                    restaurants={filteredRestaurants}
                    selectedRestaurantId={selectedRestaurantId}
                    onRestaurantSelect={handleRestaurantSelect}
                  />
                </div>
              </Suspense>
            </div>
          </div>
        </div>

        {/* 지도 영역 - 모바일에서는 전체 배경, 데스크톱에서는 기존과 동일 */}
        <div className="overflow-hidden relative flex-1">
          {/* 모바일 상단 드래그 핸들 (탭하면 필터 열기) */}
          <div
            className="absolute top-2 left-1/2 z-10 -translate-x-1/2 md:hidden"
            onClick={() => setFiltersOpenMobile(true)}
            role="button"
            aria-label="필터 열기"
          >
            <div className="h-1.5 w-24 rounded-full border border-white/60 bg-gradient-to-r from-gray-300/40 via-gray-300/80 to-gray-300/40 shadow-sm" />
          </div>

          {/* 상단 힌트 배너 */}
          {!filtersOpenMobile && showFilterHint && (
            <div
              className="flex absolute right-0 left-0 top-10 z-10 justify-center md:hidden"
              role="button"
              onClick={() => setFiltersOpenMobile(true)}
            >
              <div className="mx-4 w-full max-w-[640px] rounded-xl bg-white/90 px-4 py-2 text-center text-sm font-semibold shadow">
                아래로 스와이프하여 필터 보기
              </div>
            </div>
          )}

          {/* 모바일: 필터 슬라이드다운 패널 (상단에서 리스트처럼) */}
          <div
            className={`fixed inset-x-0 top-12 z-50 transition-transform duration-300 ease-out md:hidden ${
              filtersOpenMobile ? "translate-y-0" : "-translate-y-full"
            }`}
            aria-hidden={!filtersOpenMobile}
            style={{
              transform: `translateY(${
                filtersOpenMobile ? dragTranslate : -100
              }%)`,
            }}
          >
            <div
              className="bg-white rounded-b-2xl border-t border-gray-200 shadow-2xl"
              onTouchStart={(e) => {
                setDragStartY(e.touches[0].clientY);
                setDragTranslate(0);
              }}
              onTouchMove={(e) => {
                if (dragStartY === null) return;
                const dy = e.touches[0].clientY - dragStartY; // 아래로 양수, 위로 음수
                if (dy < 0) setDragTranslate(Math.max(dy, -300));
              }}
              onTouchEnd={() => {
                if (Math.abs(dragTranslate) > 120) {
                  setFiltersOpenMobile(false);
                }
                setDragStartY(null);
                setDragTranslate(0);
              }}
            >
              <div className="max-h-[70vh] overflow-y-auto px-2 pt-6 pb-3">
                <RestaurantFilters
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>
              {/* 하단 닫기 핸들 */}
              <div className="flex justify-center pb-3">
                <button
                  className="h-1.5 w-24 rounded-full border border-white/60 bg-gradient-to-r from-gray-300/40 via-gray-300/80 to-gray-300/40 shadow-sm"
                  onClick={() => setFiltersOpenMobile(false)}
                  aria-label="닫기"
                />
              </div>
            </div>
            {/* 배경 클릭으로 닫기 */}
            {filtersOpenMobile && (
              <div
                className="fixed inset-0 -z-10 bg-black/30"
                onClick={() => setFiltersOpenMobile(false)}
              />
            )}
          </div>
          {/* 필터 영역: 모바일에선 제거, 데스크톱에서만 표시 */}
          <div className="hidden px-6 pt-3 md:block">
            <RestaurantFilters
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          <Suspense fallback={<MapSkeleton />}>
            <div className="h-[calc(100vh-80px)] w-full overflow-hidden md:h-[calc(100vh-80px)]">
              {isLoadingRestaurants ? (
                <div className="flex justify-center items-center h-full bg-gray-100">
                  <div className="px-4 text-center">
                    <div className="mx-auto w-6 h-6 rounded-full border-b-2 border-blue-500 animate-spin md:h-8 md:w-8"></div>
                    <p className="mt-2 text-sm text-gray-600 md:text-base">
                      레스토랑 데이터를 로드하는 중...
                    </p>
                  </div>
                </div>
              ) : (
                <GoogleMap
                  restaurants={filteredRestaurants}
                  selectedRestaurantId={selectedRestaurantId}
                  onRestaurantSelect={handleRestaurantSelect}
                />
              )}
            </div>
          </Suspense>

          {/* 토글 버튼 - 모바일에서는 하단에, 데스크톱에서는 지도 왼쪽에 */}
          <div className="absolute right-2 bottom-4 z-50 md:absolute md:top-1/2 md:right-auto md:bottom-auto md:left-0 md:z-50 md:-translate-y-1/2">
            <Button
              onClick={toggleSidebar}
              variant="outline"
              size="icon"
              className="w-12 h-12 bg-white rounded-full border shadow-lg hover:bg-gray-50 md:h-10 md:w-6 md:rounded-l-none md:rounded-r-lg md:border-l-0 lg:h-12 lg:w-8"
            >
              {isSidebarOpen ? (
                <ChevronDown className="w-6 h-6 md:hidden" />
              ) : (
                <ChevronUp className="w-6 h-6 md:hidden" />
              )}
              {isSidebarOpen ? (
                <ChevronLeft className="hidden w-3 h-3 md:block lg:h-4 lg:w-4" />
              ) : (
                <ChevronRight className="hidden w-3 h-3 md:block lg:h-4 lg:w-4" />
              )}
            </Button>
          </div>

          {/* 모바일: 하단 시트 핸들 - 시트가 닫혀있을 때만 표시 */}
          {!isSidebarOpen && (
            <div className="absolute right-0 bottom-0 left-0 md:hidden">
              <div
                className="p-4 bg-white rounded-t-3xl shadow-2xl transition-colors cursor-pointer hover:bg-gray-50"
                onClick={handleSheetHandleClick}
              >
                {/* 시트 핸들 */}
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-1 rounded-full"></div>
                </div>

                {/* 힌트 텍스트 */}
                <div className="mb-3 text-center">
                  <p className="text-sm text-gray-600">
                    위로 스와이프하여 레스토랑 목록 보기
                  </p>
                </div>

                {/* 레스토랑 개수 표시 */}
                <div className="text-center">
                  <p className="text-lg font-semibold text-blue-600">
                    {filteredRestaurants.length}개의 레스토랑
                  </p>
                  <p className="text-xs text-gray-500">
                    지도에서 선택하거나 위로 스와이프
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
