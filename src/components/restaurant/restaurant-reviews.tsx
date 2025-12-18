import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp } from "lucide-react";

interface RestaurantReviewsProps {
  restaurantId: number;
  rating: number;
  reviewCount: number;
}

export default function RestaurantReviews({
  restaurantId,
  rating,
  reviewCount,
}: RestaurantReviewsProps) {
  const reviews = [
    {
      id: 1,
      author: "김민수 / Kim Minsu",
      rating: 5,
      date: "2024년 1월",
      content:
        "외국인 친구와 함께 방문했는데 영어로 친절하게 설명해주셔서 정말 좋았습니다. 음식도 맛있고 분위기도 좋았어요.",
      englishContent:
        "Visited with my foreign friend and the staff kindly explained everything in English. The food was delicious and the atmosphere was great.",
      helpful: 12,
    },
    {
      id: 2,
      author: "Sarah Johnson",
      rating: 4,
      date: "January 2024",
      content:
        "Very good experience overall. The staff spoke excellent English and the food was authentic. Service was prompt and friendly.",
      helpful: 8,
    },
    {
      id: 3,
      author: "이영희 / Lee Younghee",
      rating: 5,
      date: "2023년 12월",
      content:
        "24시간 운영해서 늦은 시간에도 방문할 수 있어서 좋았습니다. 직원들이 매우 친절하고 음식도 신선했어요.",
      englishContent:
        "The 24-hour operation was very convenient for late-night dining. The staff was very kind and the food was fresh.",
      helpful: 15,
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">리뷰 / Reviews</h2>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{rating}</span>
          <span className="text-muted-foreground">({reviewCount} 리뷰)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{review.author}</p>
                    <p className="text-muted-foreground text-sm">
                      {review.date}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mb-2 text-gray-700">{review.content}</p>
                {review.englishContent && (
                  <p className="mb-3 text-sm text-gray-600">
                    {review.englishContent}
                  </p>
                )}
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                  >
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    도움됨 / Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full cursor-pointer bg-transparent"
        >
          리뷰 더 보기 / Show more reviews
        </Button>
      </div>
    </div>
  );
}
