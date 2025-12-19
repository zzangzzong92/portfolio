import { Metadata } from "next";
import RestaurantClient from "./RestaurantClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const BASE = "https://www.zzangzzong.com";
  const canonical = `${BASE}/daily/restaurant`;

  return {
    title: "한국 식당 찾기",
    description:
      "외국인을 위한 한국 식당 찾기 - 맛집, 한식, 양식, 일식, 중식 등 다양한 음식점을 지역별로 검색하고 리뷰를 확인하세요.",
    keywords: [
      "한국 식당",
      "한국 맛집",
      "한국 음식점",
      "한국 한식",
      "한국 양식",
      "한국 일식",
      "한국 중식",
      "한국 분식",
      "한국 카페",
      "한국 디저트",
      "한국 술집",
      "한국 맛집 추천",
      "한국 음식점 리뷰",
      "한국 음식점 위치",
      "한국 음식점 메뉴",
      "한국 음식점 가격",
      "한국 음식점 영업시간",
      "한국 음식점 예약",
      "한국 음식점 배달",
      "한국 음식점 테이크아웃",
    ],
    alternates: { canonical },
    openGraph: {
      title: "한국 식당 찾기 - With KO",
      description:
        "외국인을 위한 한국 식당 찾기 - 맛집, 한식, 양식, 일식, 중식 등 다양한 음식점을 지역별로 검색하고 리뷰를 확인하세요.",
      url: canonical,
      siteName: "With KO",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "한국 식당 찾기 - With KO",
      description:
        "외국인을 위한 한국 식당 찾기 - 맛집, 한식, 양식, 일식, 중식 등 다양한 음식점을 지역별로 검색하고 리뷰를 확인하세요.",
    },
  };
}

export default function RestaurantPage() {
  return <RestaurantClient />;
}
