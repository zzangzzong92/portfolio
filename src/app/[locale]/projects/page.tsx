"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Navigation } from "@/components/navigation";

const projects = [
  {
    id: 1,
    titleKey: "project1.title",
    descriptionKey: "project1.description",
    image: "/withko.png",
    tags: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    demoUrl: "",
    githubUrl: "https://github.com/zzangzzong/first-step-korea",
    featured: true,
  },
  {
    id: 2,
    titleKey: "project2.title",
    descriptionKey: "project2.description",
    image: "/loa-project.png",
    tags: ["React", "Socket.io", "Express", "MongoDB"],
    demoUrl: "https://loa.kakao.gg",
    githubUrl: "",
    featured: false,
  },
  {
    id: 3,
    titleKey: "project3.title",
    descriptionKey: "project3.description",
    image: "/dnf-project.png",
    tags: ["Next.js", "TypeScript", "shadcn/ui", "Tailwind CSS"],
    demoUrl: "https://dnf.kakao.gg",
    githubUrl: "",
    featured: false,
  },
];

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <Navigation />
      <section className="container px-4 py-16 mx-auto md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-[#0B0B0B]">
              {t("title")}
            </h1>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="mb-6 text-2xl font-bold md:text-3xl text-[#0B0B0B]">
                {t("featured")}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white border-4 border-black rounded-3xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative h-48 w-full bg-[#EDEDED]">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={t(project.titleKey)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-grow p-6">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2 text-[#0B0B0B]">
                        {t(project.titleKey)}
                      </h3>
                      <p className="text-base md:text-lg text-[#393939] mb-4 flex-grow leading-relaxed">
                        {t(project.descriptionKey)}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className="bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full border-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <Button
                            asChild
                            className="bg-black text-white border-[3px] border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 flex-1"
                          >
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-2 w-4 h-4" />
                              {t("github")}
                            </Link>
                          </Button>
                        )}
                        {project.demoUrl && (
                          <Button
                            asChild
                            className="bg-black text-white border-[3px] border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 flex-1"
                          >
                            <Link
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 w-4 h-4" />
                              {t("demo")}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold md:text-3xl text-[#0B0B0B]">
                {t("others")}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white border-4 border-black rounded-3xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative h-48 w-full bg-[#EDEDED]">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={t(project.titleKey)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-grow p-6">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2 text-[#0B0B0B]">
                        {t(project.titleKey)}
                      </h3>
                      <p className="text-base md:text-lg text-[#393939] mb-4 flex-grow leading-relaxed">
                        {t(project.descriptionKey)}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className="bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full border-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <Button
                            asChild
                            className="bg-white border-[3px] border-black hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 flex-1"
                          >
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-2 w-4 h-4" />
                              {t("github")}
                            </Link>
                          </Button>
                        )}
                        {project.demoUrl && (
                          <Button
                            asChild
                            className="bg-black text-white border-[3px] border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 flex-1"
                          >
                            <Link
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 w-4 h-4" />
                              {t("demo")}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
