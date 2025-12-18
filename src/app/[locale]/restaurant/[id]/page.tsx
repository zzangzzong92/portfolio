"use client";

import RestaurantImageGallery from "@/components/restaurant/restaurant-image-gallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRestaurant, RestaurantResponse } from "@/lib/restaurant.action";
import {
  Accessibility,
  ArrowLeft,
  Baby,
  Car,
  Cigarette,
  Clock,
  Edit,
  Heart,
  MapPin,
  Moon,
  Music,
  Package,
  Phone,
  Star,
  Thermometer,
  Trash2,
  Truck,
  Tv,
  Users,
  Utensils,
  Wifi,
  Wind,
  Wine,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// 시설에 맞는 아이콘을 반환하는 함수
const getFacilityIcon = (facility: string) => {
  const iconMap: Record<string, any> = {
    // 한국어 키
    발렛파킹: Car,
    예약가능: Users,
    단체석: Users,
    야외석: Utensils,
    주차가능: Car,
    반려동물동반: Heart,
    심야영업: Moon,
    배달가능: Truck,
    장애인편의: Accessibility,
    포장가능: Package,
    와이파이: Wifi,
    "어린이 메뉴": Baby,
    "주류 판매": Wine,
    "흡연 구역": Cigarette,
    "라이브 음악": Music,
    TV: Tv,
    에어컨: Wind,
    난방: Thermometer,
    // 영어 키
    TAKEOUT_AVAILABLE: Package,
    WIFI_AVAILABLE: Wifi,
    PARKING_AVAILABLE: Car,
    DELIVERY_AVAILABLE: Truck,
    RESERVATION_AVAILABLE: Users,
    PRIVATE_ROOM: Users,
    WHEELCHAIR_ACCESSIBLE: Accessibility,
    KIDS_MENU: Baby,
    ALCOHOL_AVAILABLE: Wine,
    SMOKING_AREA: Cigarette,
    OUTDOOR_SEATING: Utensils,
    LIVE_MUSIC: Music,
    AIR_CONDITIONING: Wind,
    HEATING: Thermometer,
    CREDIT_CARD: Star,
    CASH_ONLY: Star,
    VEGETARIAN_OPTIONS: Utensils,
    VEGAN_OPTIONS: Utensils,
    GLUTEN_FREE_OPTIONS: Utensils,
    BREAKFAST_AVAILABLE: Clock,
    LUNCH_AVAILABLE: Clock,
    DINNER_AVAILABLE: Clock,
    LATE_NIGHT: Moon,
    PET_FRIENDLY: Heart,
    KIDS_FRIENDLY: Baby,
    RESERVATION_REQUIRED: Users,
    CREDIT_CARD_PAYMENT_AVAILABLE: Star,
    NO_SMOKING: Cigarette,
  };

  return iconMap[facility] || Utensils; // 기본 아이콘
};

// 시설 데이터를 한글로 매핑하는 함수
const getFacilityDisplayName = (facility: string): string => {
  // 영어 키 매핑
  const facilityMap: Record<string, string> = {
    TAKEOUT_AVAILABLE: "포장 가능",
    WIFI_AVAILABLE: "WiFi",
    PARKING_AVAILABLE: "주차 가능",
    DELIVERY_AVAILABLE: "배달 가능",
    RESERVATION_AVAILABLE: "예약 가능",
    PRIVATE_ROOM: "단체석",
    WHEELCHAIR_ACCESSIBLE: "휠체어 접근 가능",
    KIDS_MENU: "어린이 메뉴",
    ALCOHOL_AVAILABLE: "주류 판매",
    SMOKING_AREA: "흡연 구역",
    OUTDOOR_SEATING: "야외석",
    LIVE_MUSIC: "라이브 음악",
    TV: "TV",
    AIR_CONDITIONING: "에어컨",
    HEATING: "난방",
    CREDIT_CARD: "신용카드",
    CASH_ONLY: "현금만",
    VEGETARIAN_OPTIONS: "채식 옵션",
    VEGAN_OPTIONS: "비건 옵션",
    GLUTEN_FREE_OPTIONS: "글루텐 프리",
    BREAKFAST_AVAILABLE: "아침식사",
    LUNCH_AVAILABLE: "점심식사",
    DINNER_AVAILABLE: "저녁식사",
    LATE_NIGHT: "심야영업",
    PET_FRIENDLY: "반려동물 동반",
    KIDS_FRIENDLY: "유아의자",
    RESERVATION_REQUIRED: "예약 필수",
    CREDIT_CARD_PAYMENT_AVAILABLE: "카드결제",
    NO_SMOKING: "금연",
  };

  // 한국어 키는 그대로 반환
  return facilityMap[facility] || facility;
};

export default function RestaurantDetailPage() {
  const params = useParams();
  const [restaurant, setRestaurant] = useState<RestaurantResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getRestaurant(Number(params.id));
        console.log("=== API 응답 데이터 ===");
        console.log("전체 데이터:", data);
        console.log("시설 정보:", data.facilities);
        console.log("시설 정보 타입:", typeof data.facilities);
        console.log("시설 정보 길이:", data.facilities?.length);
        setRestaurant(data);
      } catch (err) {
        console.error("레스토랑 상세 정보 로드 실패:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "알 수 없는 오류가 발생했습니다.";
        setError(`레스토랑 정보를 불러오는데 실패했습니다: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      loadRestaurant();
    }
  }, [params.id]);

  const getCategoryText = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      KOREAN: "한식",
      CHINESE: "중식",
      JAPANESE: "일식",
      WESTERN: "양식",
      ITALIAN: "이탈리안",
      MEXICAN: "멕시칸",
      INDIAN: "인도",
      OTHER: "기타",
    };
    return categoryMap[category] || category;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <div className="text-lg">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 text-red-500">⚠️</div>
          <div className="mb-2 text-lg text-red-600">데이터 로드 실패</div>
          <div className="mb-4 text-sm text-gray-600">{error}</div>
          <Link href="/admin/withko/daily/restaurant">
            <Button>목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* 헤더 */}
      <div className="mb-10 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/withko/daily/restaurant">
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-white/40 bg-white/40 backdrop-blur-md transition-all duration-200 hover:bg-white/60"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  목록으로
                </Button>
              </Link>
              <div className="flex gap-50">
                <h1 className="text-2xl font-bold text-gray-900">
                  {restaurant.name}
                </h1>
                <p className="text-sm text-gray-600">관리자 상세 정보</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* 이미지 섹션 */}
        <div className="mb-8 px-4 sm:px-6 lg:px-8">
          <RestaurantImageGallery
            restaurantId={Number(restaurant.id)}
            images={restaurant.images}
          />
        </div>

        {/* 메인 컨텐츠 - 플렉스 레이아웃 */}
        <div className="flex flex-col items-start gap-8 px-4 sm:px-6 lg:flex-row lg:px-8">
          {/* 메인 컨텐츠 영역 - 플렉스-1 */}
          <div className="min-w-0 flex-1">
            {/* 네비게이션 탭 */}
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="scrollbar-hide flex overflow-x-auto border-b border-gray-200 px-6 pt-4">
                {[
                  { key: "overview", label: "개요" },
                  { key: "location", label: "위치" },
                  { key: "reviews", label: "리뷰" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`mr-6 flex-shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 탭 컨텐츠 */}
              <div>
                {activeTab === "overview" && (
                  <div className="space-y-6 p-6">
                    {/* 레스토랑 정보 */}
                    <div className="border-b border-gray-200 pb-6">
                      <h2 className="mb-4 text-xl font-semibold text-gray-900">
                        한눈에 보기
                      </h2>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-start">
                          <MapPin className="mt-1 mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900">위치</p>
                            <p className="leading-relaxed break-words text-gray-600">
                              {restaurant.address}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="mt-1 mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900">
                              전화번호
                            </p>
                            <p className="leading-relaxed break-words text-gray-600">
                              {restaurant.phoneNumber || "정보 없음"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 소개 */}
                    <div className="border-b border-gray-200 pb-6">
                      <h2 className="mb-4 text-xl font-semibold text-gray-900">
                        소개
                      </h2>
                      <p className="leading-relaxed text-gray-700">
                        {restaurant.address}에 위치한 {restaurant.name}는{" "}
                        {getCategoryText(restaurant.category)} 전문점입니다.
                        {restaurant.likeCount || 0}점의 높은 평점과{" "}
                        {restaurant.viewCount || 0}개의 조회수를 보유하고 있어
                        많은 고객들로부터 사랑받고 있습니다. 품질 높은 음식과
                        서비스를 제공하며, 특별한 식사 경험을 원하시는 분들께
                        추천합니다.
                      </p>
                    </div>

                    {/* 특징 */}
                    {restaurant.facilities &&
                      restaurant.facilities.length > 0 && (
                        <div>
                          <h2 className="mb-4 text-xl font-semibold text-gray-900">
                            특징
                          </h2>
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {restaurant.facilities.map((facility, index) => {
                              const IconComponent = getFacilityIcon(facility);
                              return (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
                                >
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                    <IconComponent className="h-4 w-4" />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">
                                    {getFacilityDisplayName(facility)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                  </div>
                )}

                {/* 위치 탭 */}
                {activeTab === "location" && (
                  <div className="p-6">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">
                      위치 정보
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900">주소</h3>
                        <p className="text-gray-600">{restaurant.address}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">좌표</h3>
                        <p className="text-gray-600">
                          X: {restaurant.x}, Y: {restaurant.y}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 리뷰 탭 */}
                {activeTab === "reviews" && (
                  <div className="p-6">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">
                      리뷰 정보
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900">평점</h3>
                        <p className="text-gray-600">
                          {restaurant.likeCount || 0}점
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">조회수</h3>
                        <p className="text-gray-600">
                          {restaurant.viewCount || 0}회
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 사이드바 정보 */}
          <div className="w-full space-y-6 lg:w-80">
            {/* 관리 정보 */}
            <Card className="border-white/30 bg-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg">관리 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    생성일:
                  </span>
                  <p className="text-sm text-gray-600">
                    {restaurant.createdAt
                      ? new Date(restaurant.createdAt).toLocaleDateString(
                          "ko-KR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "정보 없음"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    수정일:
                  </span>
                  <p className="text-sm text-gray-600">
                    {restaurant.updatedAt
                      ? new Date(restaurant.updatedAt).toLocaleDateString(
                          "ko-KR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "정보 없음"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    작성자 ID:
                  </span>
                  <p className="text-sm text-gray-600">
                    {restaurant.authorId || "-"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 액션 버튼 */}
            <Card className="border-white/30 bg-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Link
                    href={`/admin/withko/daily/restaurant/edit/${restaurant.id}`}
                    className="block"
                  >
                    <Button className="w-full cursor-pointer border-blue-200 bg-blue-50 text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-md">
                      <Edit className="mr-2 h-4 w-4" />
                      수정하기
                    </Button>
                  </Link>
                  <Button className="w-full cursor-pointer bg-red-50 text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white hover:shadow-md">
                    <Trash2 className="mr-2 h-4 w-4" />
                    삭제하기
                  </Button>
                  {/* <Link href={`/${restaurant.id}`} className="block">
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer border-white/40 bg-white/40 backdrop-blur-md transition-all duration-200 hover:bg-white/60"
                    >
                      사용자 페이지에서 보기
                    </Button>
                  </Link> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
