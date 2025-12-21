
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface RestaurantRequest {
  name: string;
  address: string;
  phoneNumber: string;
  category: string;
  description: string;
  images: string[];
  facilities: string[];
  authorId: string;
  operatingHours: {
    day: string;
    startTime: string | null;
    endTime: string | null;
    closed: boolean;
  }[];
}

export interface RestaurantResponse {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  category: string;
  description: string;
  images: string[];
  viewCount: number;
  likeCount: number;
  facilities: string[];
  operatingHours: {
    day: string;
    startTime: string | null;
    endTime: string | null;
    closed: boolean;
  }[];
  price: string;
  authorId?: number; // 작성자 ID (백엔드에서 제공해야 함)
  x?: string; // X 좌표
  y?: string; // Y 좌표
  createdAt?: string; // 생성일
  updatedAt?: string; // 수정일
}

export async function createRestaurant(
  request: RestaurantRequest
): Promise<RestaurantResponse> {
  const res = await fetch(`${API_BASE_URL}/api/restaurants/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!res.ok) throw new Error("맛집 등록 실패");
  return res.json();
}

export async function getRestaurant(id: number): Promise<RestaurantResponse> {
  const url = `${API_BASE_URL}/api/restaurants/${id}`;

  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`맛집 조회 실패: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

export async function getAllRestaurants(): Promise<RestaurantResponse[]> {
  // Next.js API Route를 통해 프록시로 요청
  const url = typeof window !== "undefined" 
    ? "/api/restaurants"  // 클라이언트 사이드: 상대 경로 사용
    : `${API_BASE_URL}/api/restaurants`;  // 서버 사이드: 직접 호출

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error: ${res.status} ${res.statusText}`, errorText);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);
    return [];
  }
}

export async function updateRestaurant(
  id: number,
  request: RestaurantRequest
): Promise<RestaurantResponse> {
  const res = await fetch(`${API_BASE_URL}/api/restaurants/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!res.ok) throw new Error("맛집 수정 실패");
  return res.json();
}

export async function deleteRestaurant(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/restaurants/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("맛집 삭제 실패");
}

export async function searchRestaurantWithFilters(
  filters: Record<string, any>,
  options?: { page?: number; size?: number }
): Promise<RestaurantResponse[]> {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.append(key, value);
  });

  if (options?.page !== undefined) params.append("page", String(options.page));
  if (options?.size !== undefined) params.append("size", String(options.size));

  const res = await fetch(
    `${API_BASE_URL}/api/restaurants/search?${params.toString()}`
  );
  if (!res.ok) throw new Error("맛집 검색 실패");
  return res.json();
}

export async function uploadRestaurantImages(
  images: File[]
): Promise<string[]> {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images", image);
  });

  const res = await fetch(`${API_BASE_URL}/api/restaurants/images`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) throw new Error("이미지 업로드 실패");
  return res.json();
}

export async function getRestaurantById(
  id: number
): Promise<RestaurantResponse> {
  const res = await fetch(`${API_BASE_URL}/api/restaurants/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("레스토랑 정보 조회 실패");
  }

  return res.json();
}
