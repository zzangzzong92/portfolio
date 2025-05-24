"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { blogPosts } from "@/src/app/lib/blog-data";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import { Badge as ShadcnBadge } from "@/src/app/components/ui/badge";

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
  const [autoPlay, setAutoPlay] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalSlides = blogPosts.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, 5000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoPlay, totalSlides]);

  const handleMouseEnter = () => {
    setAutoPlay(false);
  };

  const handleMouseLeave = () => {
    setAutoPlay(true);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    if (autoPlay && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, 5000);
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    if (autoPlay && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, 5000);
    }
  };

  return (
    <motion.section
      className="relative bg-muted/30 py-10"
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
            인기 블로그 포스트
          </motion.h2>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoPlay(!autoPlay)}
              className="hidden sm:flex items-center gap-2"
            >
              {autoPlay ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>자동 재생 중지</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>자동 재생 시작</span>
                </>
              )}
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                aria-label="이전 슬라이드"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                aria-label="다음 슬라이드"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-lg"
          tabIndex={0}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {blogPosts.map((post) => (
              <div key={post.id} className="min-w-full flex-shrink-0 px-0">
                <Card className="border-0 overflow-hidden -py-6">
                  <CardContent className="p-0">
                    <div className="relative h-[400px] w-full">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="w-full h-full"
                      />
                      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
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
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm md:text-base mb-4 text-white/80 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
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
                                    className="rounded-full object-cover"
                                  />
                                </div>
                                <span className="text-sm">
                                  {post.author.name}
                                </span>
                              </>
                            )}
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <Button variant="secondary" size="sm">
                              자세히 보기
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                if (autoPlay && timerRef.current) {
                  clearInterval(timerRef.current);
                  timerRef.current = setInterval(() => {
                    setCurrentIndex((prev) =>
                      prev === totalSlides - 1 ? 0 : prev + 1
                    );
                  }, 5000);
                }
              }}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
