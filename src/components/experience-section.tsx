"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function ExperienceSection() {
  const t = useTranslations("about");

  const experiences = [
    {
      period: t("career1Period"),
      title: t("career1Title"),
      company: t("career1Company"),
      description: t("career1Desc"),
      icon: "/cubecore.png",
      techStack: [
        "Next.js",
        "React",
        "TypeScript",
        "Java",
        "Spring Boot",
        "Oracle",
        "Tailwind CSS",
      ],
    },
    {
      period: t("career2Period"),
      title: t("career2Title"),
      company: t("career2Company"),
      description: t("career2Desc"),
      icon: "/korbiztech.png",
      techStack: ["React", "Recoil", "TypeScript", "Styled-Components"],
    },
    {
      period: t("career3Period"),
      title: t("career3Title"),
      company: t("career3Company"),
      description: t("career3Desc"),
      icon: "/cherground.png",
      techStack: ["React", "TypeScript", "JavaScript", "Styled-Components"],
    },
  ];

  return (
    <section className="py-16 bg-black md:py-24">
      <div className="container px-4 mx-auto">
        <div className="grid gap-12 items-start mx-auto max-w-7xl md:grid-cols-2">
          <div className="self-start pt-0 text-white md:pt-12 md:sticky md:top-12">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 leading-[1.3]">
              {t("careerTitle")}{" "}
              <span className="bg-[#6366F1] text-white px-3 py-1 inline-block">
                경력
              </span>
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-400 md:mb-10 md:text-lg">
              {t("intro1")}
            </p>
            <Link href="/about">
              <Button className="bg-white text-black border-[3px] border-black hover:bg-black hover:text-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] transition-all duration-300 cursor-pointer">
                <FileText className="w-5 h-5" />
                전체 이력서 보기
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-white border-4 border-black rounded-3xl min-h-[220px] md:min-h-[240px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="flex justify-between items-center px-6 pt-4 mb-3 md:pt-4 md:mb-3 md:px-8">
                  <div className="text-base md:text-[22px] leading-tight md:leading-[34px] font-bold text-[#0B0B0B]">
                    {exp.period}
                  </div>
                  <div className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32">
                    <Image
                      src={exp.icon}
                      alt={exp.company}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="border-t-[3px] border-black mb-4 md:mb-6"></div>

                <div className="px-6 pb-6 md:px-8 md:pb-8">
                  <h3 className="text-xl md:text-[28px] leading-tight md:leading-[40px] font-bold text-[#0B0B0B] mb-2 md:mb-3">
                    {exp.title}
                  </h3>
                  <p className="text-lg md:text-xl font-semibold text-[#0B0B0B] mb-3">
                    {exp.company}
                  </p>
                  <p className="text-base md:text-[18px] text-[#393939] leading-relaxed whitespace-pre-line break-words mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
