"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";

interface RestaurantImageGalleryProps {
  restaurantId: number;
  images?: string[];
}

export default function RestaurantImageGallery({
  restaurantId,
  images: propImages,
}: RestaurantImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const images =
    propImages && propImages.length > 0
      ? propImages
      : [`/assets/activity/restaurantDefault.png`];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + images.length) % images.length
      );
    }
  };

  return (
    <>
      <div className="grid h-96 grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-xl">
        {/* Main large image */}
        <div
          className="group relative col-span-2 row-span-2 cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0] || "/placeholder.svg"}
            alt="Restaurant main view"
            className="h-full w-full object-cover transition-all group-hover:brightness-90"
          />
        </div>

        {/* Smaller images */}
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index + 1}
            className="group relative cursor-pointer"
            onClick={() => openLightbox(index + 1)}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Restaurant view ${index + 2}`}
              className="h-full w-full object-cover transition-all group-hover:brightness-90"
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="font-semibold text-white">
                  +{images.length - 5} 더보기
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* <div className="mt-4 cursor-pointer">
        <Button variant="outline" onClick={() => openLightbox(0)}>
          모든 사진 보기 / View all photos ({images.length})
        </Button>
      </div> */}

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="relative max-h-full max-w-4xl p-4">
            <img
              src={images[selectedImageIndex] || "/placeholder.svg"}
              alt={`Restaurant view ${selectedImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
