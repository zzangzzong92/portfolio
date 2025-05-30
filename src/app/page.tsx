"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import BlogCarousel from "@/components/blog-carousel";
import { AnimatedText } from "@/components/animated-text";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col w-full">
      <motion.section
        className="py-20 md:py-28 bg-muted/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex flex-col items-center text-center">
          <AnimatedText delay={0.1} className="w-full">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              안녕하세요, <br />
              아름다운 개발자 <span className="text-primary">장종현</span>입니다
            </h1>
          </AnimatedText>

          <AnimatedText delay={0.3} className="w-full">
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto mb-8">
              Next.js, TypeScript, React를 활용한 웹 개발 전문가입니다. 사용자
              경험을 중시하는 웹 애플리케이션을 만듭니다.
            </p>
          </AnimatedText>

          <AnimatedText delay={0.5} className="w-full">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/projects">프로젝트 보기</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">연락하기</Link>
              </Button>
            </div>
          </AnimatedText>
        </div>
      </motion.section>

      <div className="mt-20">
        <BlogCarousel />
      </div>
    </div>
  );
}
