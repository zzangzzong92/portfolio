"use client";

export default function RestaurantListSkeleton() {
  return (
    <div className="space-y-4 px-6 pb-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-gray-200/80 bg-gradient-to-br from-white to-gray-50/50 p-4 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* 레스토랑 이름 */}
              <div className="h-6 w-3/4 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

              {/* 카테고리 */}
              <div className="mt-2 h-4 w-1/3 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

              {/* 주소 */}
              <div className="mt-2 h-4 w-5/6 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

              {/* 평점 */}
              <div className="mt-3 flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gradient-to-br from-gray-200 to-gray-300"></div>
                <div className="h-4 w-12 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                <div className="h-4 w-16 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
              </div>

              {/* 가격대 */}
              <div className="mt-2 h-4 w-1/4 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

              {/* 편의시설 태그들 */}
              <div className="mt-3 flex gap-2">
                <div className="h-6 w-16 rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
                <div className="h-6 w-20 rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
                <div className="h-6 w-14 rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
              </div>
            </div>

            {/* 이미지 */}
            <div className="ml-4 h-16 w-16 flex-shrink-0 rounded-xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
