"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function AboutSection() {
  const t = useTranslations("aboutSection");

  return (
    <section className="container px-4 py-16 mx-auto md:py-32">
      <div className="grid gap-12 items-center mx-auto max-w-7xl md:grid-cols-2 md:gap-16">
        <div className="flex justify-center">
          <div className="relative w-full max-w-lg aspect-square border-[4px] border-black rounded-full overflow-hidden bg-[#FF6B6B] shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src="/images/about-me.svg"
              alt="About me illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {t("title")}{" "}
              <span className="bg-[#2F81F7] text-white px-3 py-1 inline-block">
                {t("titleHighlight")}
              </span>
            </h2>
            <p className="text-base leading-relaxed text-gray-600 md:text-lg">
              {t("description")}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-5 h-5 bg-[#6366F1] border-2 border-black rounded-[5px] flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="mb-2 text-lg font-bold md:text-xl">
                  {t("experience1Title")}
                </h3>
                <p className="text-sm text-gray-600 md:text-base">
                  {t("experience1Description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-5 h-5 bg-[#FF6B7A] border-2 border-black rounded-[5px] flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="mb-2 text-lg font-bold md:text-xl">
                  {t("experience2Title")}
                </h3>
                <p className="text-sm text-gray-600 md:text-base">
                  {t("experience2Description")}
                </p>
              </div>
            </div>
          </div>

          <Link href="/about">
            <Button className="bg-[#0B0B0B] text-white border-[3px] border-black hover:bg-white hover:text-black hover:border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] cursor-pointer transition-all duration-300">
              <User className="w-5 h-5" />
              {t("button")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
