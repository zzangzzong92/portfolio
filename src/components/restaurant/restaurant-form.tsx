"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Baby,
  Building,
  Clock,
  Image as ImageIcon,
  Infinity as InfinityIcon,
  Phone,
  User,
  Users,
  Utensils,
  Wine,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import RestaurantOperatingHours from "./restaurant-operating-hours";

interface RestaurantFormData {
  id?: string;
  name: string;
  description: string;
  address: string;
  x: string; // 경도(Longitude)
  y: string; // 위도(Latitude)
  phone: string;
  email: string;
  website: string;
  is24Hours: boolean;
  hasParking: boolean;
  hasDelivery: boolean;
  hasTakeout: boolean;
  hasWifi: boolean;
  category: string;
  priceRange: string;
  facilities: string[];
  operatingHours: OperatingHour[];
}

interface OperatingHour {
  dayOfWeek: number;
  openTime?: string;
  closeTime?: string;
  breakStartTime?: string;
  breakEndTime?: string;
  isClosedAllDay?: boolean;
  hasBreakTime?: boolean; // 브레이크타임 여부
}

interface RestaurantFormProps {
  initialData?: Partial<RestaurantFormData>;
  onSubmit: (data: RestaurantFormData) => Promise<void>;
  isLoading?: boolean;
  initialImages?: string[];
}

const CATEGORIES = [
  "한식",
  "중식",
  "일식",
  "이자카야",
  "요리주점",
  "육류/고기요리",
  "생선회",
  "양식",
  "아시안",
  "베트남",
  "멕시칸",
  "인도",
  "패스트푸드",
  "카페/디저트",
  "술집",
  "베이커리",
  "기타",
];

const PRICE_RANGES = [
  "₩ (저렴)",
  "₩₩ (보통)",
  "₩₩₩ (비싸)",
  "₩₩₩₩ (매우 비싸)",
];

const FACILITIES = [
  "주차가능",
  "발렛파킹",
  "무선인터넷",
  "예약가능",
  "단체석",
  "야외석",
  "금연석",
  "흡연석",
  "장애인편의",
  "반려동물동반",
  "포장가능",
  "배달가능",
  "24시간",
  "심야영업",
  "유아용의자",
  "남/여 개별화장실",
  "남/여 공용화장실",
  "콜키지 가능",
  "대기공간",
  "무한리필",
];

const FACILITY_DESCRIPTIONS: { [key: string]: string } = {
  주차가능: "고객을 위한 주차 공간 제공",
  발렛파킹: "발렛 서비스로 편리한 주차",
  무선인터넷: "무료 WiFi 인터넷 제공",
  예약가능: "사전 예약으로 안전한 방문",
  단체석: "단체 모임을 위한 공간",
  야외석: "야외에서 즐기는 식사 공간",
  금연석: "금연 구역에서 쾌적한 식사",
  흡연석: "흡연 가능한 별도 공간",
  장애인편의: "휠체어 접근 가능한 편의시설",
  반려동물동반: "반려동물과 함께 방문 가능",
  포장가능: "테이크아웃 포장 서비스",
  배달가능: "배달 주문 서비스 제공",
  "24시간": "24시간 운영으로 언제든 이용",
  심야영업: "늦은 시간까지 운영",
  유아용의자: "영유아를 위한 전용 의자 제공",
  "남/여 개별화장실": "남녀 분리 화장실 구비",
  "남/여 공용화장실": "남녀 공용 화장실 구비",
  "콜키지 가능": "개인 주류 반입 가능 (콜키지)",
  대기공간: "대기 손님을 위한 별도 공간",
  무한리필: "일부 메뉴 무한 리필 제공",
};

const FACILITY_ICONS: { [key: string]: any } = {
  주차가능: Users,
  발렛파킹: Users,
  무선인터넷: Users,
  예약가능: Users,
  단체석: Users,
  야외석: Users,
  금연석: Users,
  흡연석: Users,
  장애인편의: Users,
  반려동물동반: Users,
  포장가능: Users,
  배달가능: Users,
  "24시간": Clock,
  심야영업: Clock,
  유아용의자: Baby,
  "남/여 개별화장실": User,
  "남/여 공용화장실": Users,
  "콜키지 가능": Wine,
  대기공간: Clock,
  무한리필: InfinityIcon,
};

export default function RestaurantForm({
  initialData = {},
  onSubmit,
  isLoading = false,
  initialImages = [],
}: RestaurantFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<RestaurantFormData>({
    name: "",
    description: "",
    address: "",
    x: "",
    y: "",
    phone: "",
    email: "",
    website: "",
    is24Hours: false,
    hasParking: false,
    hasDelivery: false,
    hasTakeout: false,
    hasWifi: false,
    category: "",
    priceRange: "",
    facilities: [],
    operatingHours: Array.from({ length: 7 }, (_, i) => ({
      dayOfWeek: i,
      openTime: "11:00",
      closeTime: "22:00",
      breakStartTime: "15:00",
      breakEndTime: "17:00",
      isClosedAllDay: false,
      hasBreakTime: true, // 기본적으로 브레이크타임 있음
    })),
    ...initialData,
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(initialImages);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "website") {
      // 웹사이트 URL 자동 포맷팅
      let formattedValue = value;
      if (
        value &&
        !value.startsWith("http://") &&
        !value.startsWith("https://")
      ) {
        formattedValue = `https://${value}`;
      }
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFacilityChange = useCallback(
    (facility: string, checked: boolean) => {
      setFormData((prev) => ({
        ...prev,
        facilities: checked
          ? [...prev.facilities, facility]
          : prev.facilities.filter((f) => f !== facility),
      }));
    },
    []
  );

  const handleOperatingHoursChange = (hours: OperatingHour[]) => {
    setFormData((prev) => ({ ...prev, operatingHours: hours }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  useEffect(() => {
    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [imageFiles]);

  useEffect(() => {
    setExistingImageUrls(initialImages || []);
  }, [initialImages]);

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataWithImages = {
      ...formData,
      images: imageFiles,
    };
    await onSubmit(dataWithImages);
  };

  return (
    <form
      id="restaurant-form"
      onSubmit={handleSubmit}
      className="space-y-8 p-6"
    >
      {/* 기본 정보 */}
      <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg shadow-white/10 backdrop-blur-md">
        <div className="mb-4 flex items-center gap-2 border-b border-white/20 pb-3">
          <Building className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">기본 정보</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <span className="text-red-500">*</span>
              레스토랑명
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="레스토랑 이름을 입력하세요"
              className="h-10 border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <span className="text-red-500">*</span>
              카테고리
            </Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="flex h-10 w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 text-sm backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">카테고리를 선택하세요</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="priceRange"
            className="text-sm font-medium text-gray-700"
          >
            가격대
          </Label>
          <select
            id="priceRange"
            name="priceRange"
            value={formData.priceRange}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, priceRange: e.target.value }))
            }
            className="flex h-10 w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 text-sm backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">가격대를 선택하세요</option>
            {PRICE_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            설명
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="레스토랑에 대한 설명을 입력하세요"
            rows={5}
            className="resize-none border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
          />
        </div>
      </div>

      {/* 연락처 정보 */}
      <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg shadow-white/10 backdrop-blur-md">
        <div className="mb-4 flex items-center gap-2 border-b border-white/20 pb-3">
          <Phone className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">연락처 정보</h3>
        </div>

        <div className="mb-4 space-y-2">
          <Label
            htmlFor="address"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <span className="text-red-500">*</span>
            주소
          </Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="레스토랑 주소를 입력하세요"
            className="h-10 border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
            required
          />
        </div>

        {/* 좌표 입력 필드 */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="x"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <span className="text-red-500">*</span>
              X좌표 (경도)
            </Label>
            <Input
              id="x"
              name="x"
              value={formData.x}
              onChange={handleInputChange}
              placeholder="X좌표값을 입력해주세요"
              className="h-10 border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
              required
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="y"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <span className="text-red-500">*</span>
              Y좌표 (위도)
            </Label>
            <Input
              id="y"
              name="y"
              value={formData.y}
              onChange={handleInputChange}
              placeholder="Y좌표값을 입력해주세요"
              className="h-10 border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
              required
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <span className="text-red-500">*</span>
              전화번호
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="02-1234-5678"
              className="h-10 border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              이메일
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="restaurant@example.com"
              className="h-10 border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="website"
            className="text-sm font-medium text-gray-700"
          >
            웹사이트
          </Label>
          <Input
            id="website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="www.example.com 또는 https://www.example.com"
            className="h-10 border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
          />
        </div>
      </div>

      {/* 편의시설 */}
      <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg shadow-white/10 backdrop-blur-md">
        <div className="mb-4 flex items-center gap-2 border-b border-white/20 pb-3">
          <Utensils className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">편의시설</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((facility) => {
            const Icon = FACILITY_ICONS[facility] || Utensils;
            return (
            <div
              key={facility}
              className={`relative cursor-pointer rounded-lg border p-4 backdrop-blur-md transition-all duration-200 ${
                formData.facilities.includes(facility)
                  ? "border-blue-400/30 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                  : "border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10"
              }`}
              onClick={() => {
                const isCurrentlySelected =
                  formData.facilities.includes(facility);
                handleFacilityChange(facility, !isCurrentlySelected);
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                  <h4
                    className={`mb-1 text-sm font-semibold ${
                      formData.facilities.includes(facility)
                        ? "text-blue-900"
                        : "text-gray-800"
                    }`}
                  >
                    {facility}
                  </h4>
                  <p
                    className={`text-xs ${
                      formData.facilities.includes(facility)
                        ? "text-blue-700"
                        : "text-gray-600"
                    }`}
                  >
                    {FACILITY_DESCRIPTIONS[facility] || "편의시설 제공"}
                  </p>
                  </div>
                </div>
                <div className="ml-3" onClick={(e) => e.stopPropagation()}>
                  <div
                    className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 backdrop-blur-sm transition-all duration-200 ${
                      formData.facilities.includes(facility)
                        ? "border-blue-500/50 bg-blue-500/30 shadow-lg shadow-blue-500/30"
                        : "border-white/30 bg-white/20 hover:border-white/50 hover:bg-white/30"
                    }`}
                    onClick={() => {
                      const isCurrentlySelected =
                        formData.facilities.includes(facility);
                      handleFacilityChange(facility, !isCurrentlySelected);
                    }}
                  >
                    {formData.facilities.includes(facility) && (
                      <div className="h-2 w-2 rounded-full bg-white/90 shadow-sm"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );})}
        </div>
      </div>

      {/* 운영시간 */}
      <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg shadow-white/10 backdrop-blur-md">
        <div className="mb-4 flex items-center gap-2 border-b border-white/20 pb-3">
          <Utensils className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">운영시간</h3>
        </div>
        <RestaurantOperatingHours
          operatingHours={formData.operatingHours}
          onChange={handleOperatingHoursChange}
        />
      </div>

      {/* 이미지 업로드 */}
      <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg shadow-white/10 backdrop-blur-md">
        <div className="mb-4 flex items-center gap-2 border-b border-white/20 pb-3">
          <ImageIcon className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">이미지</h3>
        </div>
        <div className="space-y-2">
          <Label htmlFor="images" className="text-sm font-medium text-gray-700">
            레스토랑 사진
          </Label>
          {existingImageUrls.length > 0 && (
            <div className="mt-2">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                {existingImageUrls.map((url, index) => (
                  <div key={`existing-${index}`} className="relative w-full aspect-[4/3] overflow-hidden rounded-md border border-white/20 bg-white/20">
                    <img src={url} alt={`existing-image-${index}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="h-10 border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
          />
          {previewUrls.length > 0 && (
            <div className="mt-2">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative w-full aspect-[4/3] overflow-hidden rounded-md border border-white/20 bg-white/20">
                    <img src={url} alt={`image-${index}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute right-1 top-1 rounded-full border border-white/40 bg-white/80 p-1 text-gray-700 shadow hover:bg-white cursor-pointer"
                      aria-label="remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
