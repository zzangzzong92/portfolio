"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Navigation } from "@/components/navigation";

// Tech stack data
const techStack = [
  { name: "Next.js", level: "Expert", category: "Frontend" },
  { name: "React", level: "Expert", category: "Frontend" },
  { name: "TypeScript", level: "Expert", category: "Language" },
  { name: "JavaScript", level: "Expert", category: "Language" },
  { name: "Node.js", level: "Advanced", category: "Backend" },
  { name: "Express", level: "Advanced", category: "Backend" },
  { name: "MongoDB", level: "Advanced", category: "Database" },
  { name: "PostgreSQL", level: "Intermediate", category: "Database" },
  { name: "Tailwind CSS", level: "Expert", category: "Frontend" },
  { name: "Docker", level: "Intermediate", category: "DevOps" },
  { name: "Kubernetes", level: "Beginner", category: "DevOps" },
  { name: "GraphQL", level: "Intermediate", category: "API" },
  { name: "Redux", level: "Advanced", category: "Frontend" },
  { name: "Jest", level: "Advanced", category: "Testing" },
  { name: "Git", level: "Expert", category: "Tools" },
];

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <Navigation />
      <section className="container px-4 py-16 mx-auto md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {t("title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="bg-[#FF6B7A] text-white px-3 py-1 inline-block">
                {t("title").split(" ").slice(-1)[0]}
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="p-6 bg-white rounded-3xl border-4 border-black md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0B0B0B]">
                  {t("greeting")}
                </h2>
                <p className="text-base md:text-lg text-[#393939] leading-relaxed mb-4">
                  {t("intro1")}
                </p>
                <p className="text-base md:text-lg text-[#393939] leading-relaxed">
                  {t("intro2")}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
                  {t("careerTitle").split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="bg-[#2F81F7] text-white px-3 py-1 inline-block">
                    {t("careerTitle").split(" ").slice(-1)[0]}
                  </span>
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-white border-4 border-black rounded-3xl min-h-[220px] md:min-h-[240px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <div className="flex justify-between items-center px-6 pt-6 mb-4 md:mb-6 md:pt-8 md:px-8">
                    <div className="text-base md:text-[22px] leading-tight md:leading-[34px] font-bold text-[#0B0B0B]">
                      {t("career1Period")}
                    </div>
                  </div>

                  <div className="border-t-[3px] border-black mb-4 md:mb-6"></div>

                  <div className="px-6 pb-6 md:px-8 md:pb-8">
                    <h3 className="text-xl md:text-[28px] leading-tight md:leading-[40px] font-bold text-[#0B0B0B] mb-2 md:mb-3">
                      {t("career1Title")}
                    </h3>
                    <p className="text-lg md:text-xl font-semibold text-[#0B0B0B] mb-3">
                      {t("career1Company")}
                    </p>
                    <p className="text-base md:text-[18px] text-[#393939] leading-relaxed mb-4">
                      {t("career1Desc")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Next.js",
                        "React",
                        "TypeScript",
                        "Java",
                        "Spring Boot",
                        "Oracle",
                        "Tailwind CSS",
                      ].map((tech) => (
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

                <div className="bg-white border-4 border-black rounded-3xl min-h-[220px] md:min-h-[240px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <div className="flex justify-between items-center px-6 pt-6 mb-4 md:mb-6 md:pt-8 md:px-8">
                    <div className="text-base md:text-[22px] leading-tight md:leading-[34px] font-bold text-[#0B0B0B]">
                      {t("career2Period")}
                    </div>
                  </div>

                  <div className="border-t-[3px] border-black mb-4 md:mb-6"></div>

                  <div className="px-6 pb-6 md:px-8 md:pb-8">
                    <h3 className="text-xl md:text-[28px] leading-tight md:leading-[40px] font-bold text-[#0B0B0B] mb-2 md:mb-3">
                      {t("career2Title")}
                    </h3>
                    <p className="text-lg md:text-xl font-semibold text-[#0B0B0B] mb-3">
                      {t("career2Company")}
                    </p>
                    <p className="text-base md:text-[18px] text-[#393939] leading-relaxed whitespace-pre-line break-words mb-4">
                      {t("career2Desc")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Recoil",
                        "TypeScript",
                        "Styled-Components",
                      ].map((tech) => (
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
              </div>

              <div className="mb-8">
                <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
                  {t("educationTitle").split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="bg-[#FFC224] text-black px-3 py-1 inline-block">
                    {t("educationTitle").split(" ").slice(-1)[0]}
                  </span>
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-white border-4 border-black rounded-3xl min-h-[180px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <div className="flex justify-between items-center px-6 pt-6 mb-4 md:mb-6 md:pt-8 md:px-8">
                    <div className="text-base md:text-[22px] leading-tight md:leading-[34px] font-bold text-[#0B0B0B]">
                      {t("education1Period")}
                    </div>
                  </div>

                  <div className="border-t-[3px] border-black mb-4 md:mb-6"></div>

                  <div className="px-6 pb-6 md:px-8 md:pb-8">
                    <h3 className="text-xl md:text-[28px] leading-tight md:leading-[40px] font-bold text-[#0B0B0B] mb-2 md:mb-3">
                      {t("education1Title")}
                    </h3>
                    <p className="text-lg md:text-xl font-semibold text-[#0B0B0B] mb-3">
                      {t("education1School")}
                    </p>
                    <p className="text-base md:text-[18px] text-[#393939] leading-relaxed">
                      {t("education1Desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-8">
                <div className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0B0B0B]">
                    {t("profileTitle")}
                  </h2>
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4 w-40 h-40 border-4 border-black rounded-full overflow-hidden bg-[#FF6B6B] shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <Image
                        src="/zzang.png"
                        alt="프로필 이미지"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mb-1 text-xl md:text-2xl font-bold text-[#0B0B0B]">
                      {t("profileName")}
                    </h3>
                    <p className="mb-6 text-base md:text-lg text-[#393939]">
                      {t("profilePosition")}
                    </p>

                    <div className="space-y-3 w-full">
                      <div className="flex justify-between text-sm md:text-base">
                        <span className="font-semibold text-[#0B0B0B]">
                          {t("profileLocation")}:
                        </span>
                        <span className="text-[#393939]">
                          {t("profileLocationValue")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm md:text-base">
                        <span className="font-semibold text-[#0B0B0B]">
                          {t("profileExperience")}:
                        </span>
                        <span className="text-[#393939]">
                          {t("profileExperienceValue")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm md:text-base">
                        <span className="font-semibold text-[#0B0B0B]">
                          {t("profileEmail")}:
                        </span>
                        <span className="text-[#393939] break-all text-right">
                          {t("profileEmailValue")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm md:text-base">
                        <span className="font-semibold text-[#0B0B0B]">
                          {t("profileLanguage")}:
                        </span>
                        <span className="text-[#393939]">
                          {t("profileLanguageValue")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0B0B0B]">
                    {t("techStackTitle")}
                  </h2>
                  <div className="space-y-4">
                    {Array.from(
                      new Set(techStack.map((tech) => tech.category))
                    ).map((category) => (
                      <div key={category}>
                        <h4 className="mb-3 text-sm md:text-base font-bold text-[#0B0B0B]">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {techStack
                            .filter((tech) => tech.category === category)
                            .map((tech) => {
                              let bgColor = "bg-[#0B0B0B]";
                              if (tech.level === "Expert")
                                bgColor = "bg-[#0B0B0B]";
                              else if (tech.level === "Advanced")
                                bgColor = "bg-[#6366F1]";
                              else if (tech.level === "Intermediate")
                                bgColor = "bg-[#FFC224]";
                              else bgColor = "bg-gray-400";

                              return (
                                <span
                                  key={tech.name}
                                  className={`${bgColor} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}
                                >
                                  {tech.name}
                                </span>
                              );
                            })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
