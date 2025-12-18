// Facility enum 정의
export enum Facility {
  BREAKFAST_AVAILABLE = "BREAKFAST_AVAILABLE",
  LUNCH_AVAILABLE = "LUNCH_AVAILABLE",
  DINNER_AVAILABLE = "DINNER_AVAILABLE",
  KIDS_FRIENDLY = "KIDS_FRIENDLY",
  PET_FRIENDLY = "PET_FRIENDLY",
  RESERVATION_REQUIRED = "RESERVATION_REQUIRED",
  CREDIT_CARD_PAYMENT_AVAILABLE = "CREDIT_CARD_PAYMENT_AVAILABLE",
  WIFI_AVAILABLE = "WIFI_AVAILABLE",
  PARKING_AVAILABLE = "PARKING_AVAILABLE",
  DELIVERY_AVAILABLE = "DELIVERY_AVAILABLE",
  TAKEOUT_AVAILABLE = "TAKEOUT_AVAILABLE",
  OUTDOOR_SEATING = "OUTDOOR_SEATING",
  NO_SMOKING = "NO_SMOKING",
  WHEELCHAIR_ACCESSIBLE = "WHEELCHAIR_ACCESSIBLE",
}

// OperatingHour 타입 정의
export interface OperatingHour {
  day: string;
  startTime: string | null;
  endTime: string | null;
  isClosed: boolean;
}

// Restaurant 타입 정의
export interface Restaurant {
  id: number;
  name: string;
  images?: string[];
  imageUrl?: string;
  category: string;
  address: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  priceRange?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  facilities?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  latitude?: number;
  longitude?: number;
  x?: string;
  y?: string;
  price?: string;
  viewCount?: number;
}

// CreateRestaurantPostRequest 타입 정의
export interface CreateRestaurantPostRequest {
  name: string;
  address: string;
  phoneNumber: string;
  category: string;
  description: string;
  images: string[];
  facilities: string[];
  operatingHours: OperatingHour[];
}
