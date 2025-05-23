"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useEffect, useRef } from "react";
import KakaoMap from "../kakaomap";

declare global {
  interface Window {
    initMap?: () => void;
  }
}

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">DevPortfolio</h3>
          <p className="text-sm text-muted-foreground">
            Frontend 환경과 더불어 Backend 환경도 함께 공부하는 공간입니다. 웹
            개발의 전반에 대해 공부하며 기록하며 성장합니다.
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://github.com"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://linkedin.com"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://instagram.com"
              className="text-muted-foreground hover:text-foreground"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">사이트맵</h3>
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              홈
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              소개
            </Link>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              프로젝트
            </Link>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              블로그
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              연락처
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">연락처</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>contact@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>+82 10-1234-5678</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-1" />
              <span>
                강남구 삼성로 104길, 28
                <br />
                서울, 대한민국
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">위치</h3>
          <div
            className="w-full h-48 bg-muted rounded-md"
            aria-label="강남구 삼성로 104길, 28 위치 지도"
          >
            <KakaoMap />
          </div>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; ZZ DevPortfolio. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {/* 개인정보 처리방침 */}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {/* 이용약관 */}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
