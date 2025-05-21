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

declare global {
  interface Window {
    initMap?: () => void;
  }
}

export default function Footer() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 지도 초기화 함수
    const initMap = () => {
      if (typeof google === "undefined" || !mapRef.current) return;

      // 강남구 삼성로 104길, 28의 대략적인 좌표
      const location = { lat: 37.5087, lng: 127.0632 };

      const map = new google.maps.Map(mapRef.current, {
        center: location,
        zoom: 16,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6c7b88" }],
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{ color: "#f6f6f6" }],
          },
        ],
      });

      // 마커 추가
      new google.maps.Marker({
        position: location,
        map,
        title: "강남구 삼성로 104길, 28",
      });
    };

    // Google Maps API 로드
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;

      // 콜백 함수 정의
      window.initMap = initMap;

      document.head.appendChild(script);
    };

    loadGoogleMapsScript();

    // 클린업 함수
    return () => {
      // Google Maps 콜백 제거
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  return (
    <footer className="bg-muted py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">DevPortfolio</h3>
          <p className="text-sm text-muted-foreground">
            Next.js 15, TypeScript, shadcn/ui로 구축된 개발자 포트폴리오
            웹사이트입니다. 최신 웹 기술을 활용한 프로젝트와 블로그 포스트를
            공유합니다.
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
            ref={mapRef}
            className="w-full h-48 bg-muted rounded-md"
            aria-label="강남구 삼성로 104길, 28 위치 지도"
          ></div>
          <p className="text-xs text-muted-foreground">
            * 지도를 보려면 Google Maps API 키가 필요합니다.
          </p>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DevPortfolio. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              개인정보 처리방침
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
