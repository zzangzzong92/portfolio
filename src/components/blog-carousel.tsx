"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Badge, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import { Badge as ShadcnBadge } from "@/components/ui/badge";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
}

export default function BlogCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalSlides = blogPosts.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <motion.section
      className="relative py-10 bg-muted/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            className="text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            블로그 포스트
          </motion.h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                aria-label="이전 슬라이드"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                aria-label="다음 슬라이드"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg" tabIndex={0}>
          <motion.div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {blogPosts.map((post) => (
              <div key={post.id} className="flex-shrink-0 min-w-full px-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block group focus:outline-none"
                >
                  <Card className="overflow-hidden transition-shadow border-0 -py-6 group-hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative h-[400px] w-full">
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent" />
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="w-full h-full"
                        />
                        <div className="absolute z-20 flex flex-wrap gap-2 top-4 left-4">
                          {post.categories?.map((category) => (
                            <ShadcnBadge
                              key={category}
                              variant="secondary"
                              className="bg-primary/80 text-primary-foreground"
                            >
                              {category}
                            </ShadcnBadge>
                          ))}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
                          <h3 className="mb-2 text-2xl font-bold md:text-3xl">
                            {post.title}
                          </h3>
                          <p className="mb-4 text-sm md:text-base text-white/80 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center">
                            {post.author && (
                              <>
                                <div className="relative w-8 h-8 mr-2">
                                  <Image
                                    src={
                                      post.author.avatar || "/placeholder.svg"
                                    }
                                    alt={post.author.name}
                                    fill
                                    className="object-cover rounded-full"
                                  />
                                </div>
                                <span className="text-sm">
                                  {post.author.name}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === index ? "bg-primary" : "bg-muted-foreground/30"
              }`}
              onClick={() => {
                setCurrentIndex(index);
              }}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
