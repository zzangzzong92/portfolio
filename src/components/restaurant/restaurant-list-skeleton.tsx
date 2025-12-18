"use client";

export default function RestaurantListSkeleton() {
  return (
    <div className="space-y-4 px-6 pb-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-lg border border-gray-200 bg-white p-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* 레스토랑 이름 */}
              <div className="h-6 w-3/4 rounded bg-gray-200"></div>

              {/* 카테고리 */}
              <div className="mt-2 h-4 w-1/3 rounded bg-gray-200"></div>

              {/* 주소 */}
              <div className="mt-2 h-4 w-5/6 rounded bg-gray-200"></div>

              {/* 평점 */}
              <div className="mt-3 flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-200"></div>
                <div className="h-4 w-12 rounded bg-gray-200"></div>
                <div className="h-4 w-16 rounded bg-gray-200"></div>
              </div>

              {/* 가격대 */}
              <div className="mt-2 h-4 w-1/4 rounded bg-gray-200"></div>

              {/* 편의시설 태그들 */}
              <div className="mt-3 flex gap-2">
                <div className="h-6 w-16 rounded-full bg-gray-200"></div>
                <div className="h-6 w-20 rounded-full bg-gray-200"></div>
                <div className="h-6 w-14 rounded-full bg-gray-200"></div>
              </div>
            </div>

            {/* 이미지 */}
            <div className="ml-4 h-16 w-16 flex-shrink-0 rounded-lg bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
