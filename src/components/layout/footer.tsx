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
import KakaoMap from "../kakaomap";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-muted py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">DevPortfolio</h3>
          <p className="text-sm text-muted-foreground">
            {t("description")}
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/zzangzzong92"
              target="_blank"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            {/* <Link
              href="https://twitter.com"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link> */}
            <Link
              href="https://www.linkedin.com/in/%EC%A2%85%ED%98%84-%EC%9E%A5-56372423a/"
              target="_blank"
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
          <h3 className="text-lg font-bold">{t("sitemap")}</h3>
          <nav className="flex flex-col space-y-2">
            {/* <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              홈
            </Link> */}
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t("navigation.about")}
            </Link>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t("navigation.projects")}
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t("navigation.blog")}
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t("contact")}</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>zzangzzong92@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>+82 10-1234-5678</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-1" />
              <span>
                {t("address.line1")}
                <br />
                {t("address.line2")}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t("location")}</h3>
          <div
            className="w-full h-48 bg-muted rounded-md"
            aria-label={`${t("address.line1")} ${t("location")}`}
          >
            <KakaoMap center={{ lat: 37.510048, lng: 127.059856 }} />
          </div>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t("copyright")}
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
