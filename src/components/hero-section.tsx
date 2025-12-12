"use client";

import { Mail, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";

export function HeroSection() {
  const t = useTranslations("hero");

  // Parse title with placeholders
  const greeting = t("greeting");
  const tagline = t("tagline");
  const developerSuffix = t("developerSuffix");
  const name = t("name");
  const ending = t("ending");

  // #region agent log
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch(
        "http://127.0.0.1:7242/ingest/de02e8f3-8b82-416d-b8f9-67d24f8faab7",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "hero-section.tsx:8",
            message: "Hero translation values",
            data: { greeting, tagline, developerSuffix, name, ending },
            timestamp: Date.now(),
            sessionId: "debug-session",
            runId: "run1",
            hypothesisId: "A",
          }),
        }
      ).catch(() => {});
    }
  }, [greeting, tagline, developerSuffix, name, ending]);
  // #endregion

  // Render title with styled spans
  const renderedTitle = useMemo(() => {
    return (
      <>
        {greeting}
        <br />
        <span className="bg-[#FF6B7A] text-white px-2 py-1 inline-block">
          {tagline}
        </span>
        <br />
        <span>
          {developerSuffix}{" "}
          <span className="bg-[#2F81F7] text-white px-3 py-1 inline-block">
            {name}
          </span>
          {ending}
        </span>
      </>
    );
  }, [greeting, tagline, developerSuffix, name, ending]);

  return (
    <section className="container px-4 py-16 mx-auto md:py-24">
      <div className="grid gap-12 items-center mx-auto max-w-7xl md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-[42px] leading-[50px] md:text-[72px] font-bold md:leading-[85px]">
            {renderedTitle}
          </h1>

          <p className="text-[#393939] text-[16px] md:text-[18px] font-medium leading-[28px] md:leading-[30px] max-w-xl">
            {t("description")}
          </p>

          <div className="flex flex-col flex-wrap gap-4 pt-4 sm:flex-row sm:gap-7">
            <Button className="group bg-[#0B0B0B] text-white hover:bg-white hover:text-black rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] cursor-pointer border-[3px] border-black hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
              <Mail className="w-5 h-5 group-hover:text-black" />
              {t("getInTouch")}
            </Button>
            <Button
              variant="outline"
              className="bg-white border-[3px] border-black hover:bg-gray-50 rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] cursor-pointer hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
            >
              <FolderOpen className="w-5 h-5" />
              {t("viewPortfolio")}
            </Button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-md aspect-square bg-[#FDB927] border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <img
              src="/images/design-mode/63407fbdc2d4ac5270385fd4_home-he.png"
              alt="Illustrated character avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
