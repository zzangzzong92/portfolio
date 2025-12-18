"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import RestaurantOperatingHours from "@/components/restaurant/restaurant-operating-hours";
import RestaurantForm from "@/components/restaurant/restaurant-form";
import { getRestaurant, uploadRestaurantImages } from "@/lib/restaurant.action";
import { ArrowLeft, Save, Upload, X, Users, Clock, Baby, User, Wine, Infinity as InfinityIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FormData {
  name: string;
  category: string;
  address: string;
  phoneNumber: string;
  description: string;
  x: string;
  y: string;
  hours: Record<string, { open: string; close: string; closed: boolean }>;
}

interface OperatingHour {
  dayOfWeek: number;
  openTime?: string;
  closeTime?: string;
  breakStartTime?: string;
  breakEndTime?: string;
  isClosedAllDay?: boolean;
  hasBreakTime?: boolean;
}

export default function EditRestaurantPage() {
  const router = useRouter();
  const params = useParams();

  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isAddressSearchOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [operatingHours, setOperatingHours] = useState<OperatingHour[]>(
    Array.from({ length: 7 }, (_, i) => ({
      dayOfWeek: i,
      openTime: "",
      closeTime: "",
      isClosedAllDay: false,
      hasBreakTime: false,
    }))
  );

  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    address: "",
    phoneNumber: "",
    description: "",
    x: "",
    y: "",
    hours: {
      월요일: { open: "", close: "", closed: false },
      화요일: { open: "", close: "", closed: false },
      수요일: { open: "", close: "", closed: false },
      목요일: { open: "", close: "", closed: false },
      금요일: { open: "", close: "", closed: false },
      토요일: { open: "", close: "", closed: false },
      일요일: { open: "", close: "", closed: false },
    },
  });

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

  useEffect(() => {
    const loadRestaurantData = async () => {
      try {
        setIsLoadingData(true);
        setError(null);

        const data = await getRestaurant(Number(params.id));

        if (data) {
          // 운영시간 데이터를 올바르게 매핑
          const hoursData: Record<
            string,
            { open: string; close: string; closed: boolean }
          > = {
            월요일: { open: "", close: "", closed: false },
            화요일: { open: "", close: "", closed: false },
            수요일: { open: "", close: "", closed: false },
            목요일: { open: "", close: "", closed: false },
            금요일: { open: "", close: "", closed: false },
            토요일: { open: "", close: "", closed: false },
            일요일: { open: "", close: "", closed: false },
          };

          // API에서 받은 운영시간 데이터를 매핑 (영문 요일 → 한글 요일 지원)
          const apiDayToKorean: Record<string, string> = {
            MONDAY: "월요일",
            TUESDAY: "화요일",
            WEDNESDAY: "수요일",
            THURSDAY: "목요일",
            FRIDAY: "금요일",
            SATURDAY: "토요일",
            SUNDAY: "일요일",
          };

          if (data.operatingHours && Array.isArray(data.operatingHours)) {
            data.operatingHours.forEach((hour: any) => {
              const rawDay = hour.day;
              const mappedDay = hoursData[rawDay]
                ? rawDay // 이미 한글 요일인 경우
                : apiDayToKorean[rawDay]; // 영문 요일을 한글로 변환

              if (mappedDay && hoursData[mappedDay]) {
                hoursData[mappedDay] = {
                  open: hour.startTime || "",
                  close: hour.endTime || "",
                  closed: !!hour.closed,
                };
              }
            });
          }

          setFormData({
            name: data.name || "",
            category: data.category || "",
            address: data.address || "",
            phoneNumber: data.phoneNumber || "",
            description: data.description || "",
            x: data.x || "",
            y: data.y || "",
            hours: hoursData,
          });

          setImages(data.images || []);

          // 제공시설: 서버 값(영문 키 가능)을 한글 표기로 매핑 후 설정
          const englishToKorean: Record<string, string> = {
            PARKING_AVAILABLE: "주차가능",
            VALET_PARKING: "발렛파킹",
            WIFI_AVAILABLE: "무선인터넷",
            RESERVATION_REQUIRED: "예약가능",
            GROUP_SEATING: "단체석",
            OUTDOOR_SEATING: "야외석",
            NO_SMOKING: "금연석",
            SMOKING_AREA: "흡연석",
            WHEELCHAIR_ACCESSIBLE: "장애인편의",
            PET_FRIENDLY: "반려동물동반",
            TAKEOUT_AVAILABLE: "포장가능",
            DELIVERY_AVAILABLE: "배달가능",
            OPEN_24_HOURS: "24시간",
            LATE_NIGHT: "심야영업",
            INFANT_CHAIR: "유아용의자",
            SEPARATE_RESTROOMS: "남/여 개별화장실",
            UNISEX_RESTROOM: "남/여 공용화장실",
            CORKAGE_ALLOWED: "콜키지 가능",
            WAITING_AREA: "대기공간",
            ALL_YOU_CAN_EAT: "무한리필",
          };
          const facilityFeatures: string[] = (data.facilities || [])
            .map((f: string) => englishToKorean[f] || f)
            .filter((f: string) => FACILITIES.includes(f));
          setFeatures(facilityFeatures);

          // hours 레코드를 운영시간 컴포넌트 포맷으로 변환하여 상태 업데이트
          const koreanDays = [
            "월요일",
            "화요일",
            "수요일",
            "목요일",
            "금요일",
            "토요일",
            "일요일",
          ];
          const nextHours: OperatingHour[] = koreanDays.map((day, idx) => ({
            dayOfWeek: idx,
            openTime: hoursData[day]?.open || "",
            closeTime: hoursData[day]?.close || "",
            isClosedAllDay: !!hoursData[day]?.closed,
            hasBreakTime: false,
          }));
          setOperatingHours(nextHours);
        }
      } catch (err) {
        console.error("레스토랑 데이터 로드 실패:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "알 수 없는 오류가 발생했습니다.";
        setError(`레스토랑 정보를 불러오는데 실패했습니다: ${errorMessage}`);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (params.id) {
      loadRestaurantData();
    }
  }, [params.id]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    let processedValue = value;
    if (field === "phoneNumber") {
      if (value.startsWith(" ")) processedValue = value.trim();
      processedValue = processedValue
        .replace(/-/g, "")
        .replace(/[^\d\s]/g, "")
        .replace(/\s/g, "");
    } else if (field === "x" || field === "y") {
      // 좌표 입력 시 숫자와 소수점만 허용
      processedValue = value.replace(/[^\d.-]/g, "");
    }
    setFormData((prev) => ({ ...prev, [field]: processedValue }));
  };

  const handleOperatingHoursChange = (hours: OperatingHour[]) => {
    setOperatingHours(hours);
    const koreanDays = [
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
      "일요일",
    ];
    const nextRecord: Record<string, { open: string; close: string; closed: boolean }> = {};
    hours.forEach((h, idx) => {
      nextRecord[koreanDays[idx]] = {
        open: h.isClosedAllDay ? "" : h.openTime || "",
        close: h.isClosedAllDay ? "" : h.closeTime || "",
        closed: !!h.isClosedAllDay,
      };
    });
    setFormData((prev) => ({ ...prev, hours: nextRecord }));
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFeatures((prev) =>
      checked ? [...prev, feature] : prev.filter((f) => f !== feature)
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImageFiles = Array.from(files);
    setImageFiles([...imageFiles, ...newImageFiles]);
    const newImages = newImageFiles.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.address) {
      alert("가게 이름, 카테고리, 주소는 필수 입력 항목입니다.");
      return;
    }
    setIsSubmitting(true);
    try {
      const updateData = {
        name: formData.name,
        category: formData.category,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        description: formData.description,
        x: formData.x,
        y: formData.y,
        facilities: features,
        operatingHours: Object.entries(formData.hours).map(([day, hours]) => {
          const koreanToApiDay: Record<string, string> = {
            월요일: "MONDAY",
            화요일: "TUESDAY",
            수요일: "WEDNESDAY",
            목요일: "THURSDAY",
            금요일: "FRIDAY",
            토요일: "SATURDAY",
            일요일: "SUNDAY",
          };

          return {
            day: koreanToApiDay[day] || day,
          startTime: hours.closed ? null : hours.open,
          endTime: hours.closed ? null : hours.close,
          closed: hours.closed,
          };
        }),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/restaurants/posts/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        throw new Error("레스토랑 수정 실패");
      }

      alert("맛집이 성공적으로 수정되었습니다!");
      router.push("/admin/withko/daily/restaurant");
    } catch (error) {
      console.error("맛집 수정 실패:", error);
      alert("맛집 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitFromForm = async (data: any) => {
    setIsSubmitting(true);
    try {
      let imageUrls: string[] = [];
      if (data.images && data.images.length > 0) {
        imageUrls = await uploadRestaurantImages(data.images);
      }

      const DAY_OF_WEEK = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ];
      const operatingHoursPayload = (data.operatingHours || []).map(
        (hour: any, index: number) => {
          const idx =
            typeof hour?.dayOfWeek === "number" ? hour.dayOfWeek : index;
          const day = DAY_OF_WEEK[idx] || DAY_OF_WEEK[index] || "MONDAY";
          return {
            day,
            startTime: hour.isClosedAllDay ? null : hour.openTime,
            endTime: hour.isClosedAllDay ? null : hour.closeTime,
            closed: !!hour.isClosedAllDay,
          };
        }
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/restaurants/posts/${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            address: data.address,
            x: data.x,
            y: data.y,
            phoneNumber: data.phone,
            category: data.category,
            description: data.description,
            images: imageUrls.length ? imageUrls : images,
            facilities: data.facilities,
            operatingHours: operatingHoursPayload,
          }),
        }
      );

      if (!response.ok) throw new Error("레스토랑 수정 실패");
      alert("맛집이 성공적으로 수정되었습니다!");
      router.push("/admin/withko/daily/restaurant");
    } catch (error) {
      console.error(error);
      alert("맛집 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">레스토랑 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 text-red-500">⚠️</div>
          <div className="mb-2 text-lg text-red-600">데이터 로드 실패</div>
          <div className="mb-4 text-sm text-gray-600">{error}</div>
          <div className="space-x-4">
            <Button onClick={() => window.location.reload()}>다시 시도</Button>
            <Link href="/admin/withko/daily/restaurant">
              <Button variant="outline">목록으로 돌아가기</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between border-b border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/admin/withko/daily/restaurant">
            <Button variant="outline" size="sm" className="cursor-pointer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              목록으로
            </Button>
              </Link>
                <div>
            <h1 className="text-2xl font-bold text-gray-900">레스토랑 수정</h1>
            <p className="text-sm text-gray-600">레스토랑 정보를 수정해주세요</p>
              </div>
            </div>
          </div>

      <div className="bg-white/5 backdrop-blur-sm">
        <RestaurantForm
          initialData={{
            name: formData.name,
            description: formData.description,
            address: formData.address,
            x: formData.x,
            y: formData.y,
            phone: formData.phoneNumber,
            category: formData.category,
            facilities: features,
            operatingHours: operatingHours,
          }}
          initialImages={images}
          onSubmit={handleSubmitFromForm}
          isLoading={isSubmitting}
        />
              </div>

      <div className="flex justify-end gap-3 border-t border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md">
        <Link href="/admin/withko/daily/restaurant">
          <Button variant="outline">
            <X className="mr-2 h-4 w-4" />
              취소
            </Button>
        </Link>
        <Button type="submit" form="restaurant-form" disabled={isSubmitting} className="min-w-[100px]">
          {isSubmitting ? "저장 중..." : (<><Save className="mr-2 h-4 w-4" />저장</>)}
            </Button>
          </div>
    </div>
  );
}
