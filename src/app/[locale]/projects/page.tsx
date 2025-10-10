"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

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
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">{t("featured")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                className="flex flex-col h-full cursor-pointer -py-6 hover:shadow-lg"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={t(project.titleKey)}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    {t(project.titleKey)}
                  </CardTitle>
                  <CardDescription className="flex-grow min-h-10">
                    {t(project.descriptionKey)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-3">
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      {t("github")}
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("demo")}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">{t("others")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card
                key={project.id}
                className="flex flex-col h-full cursor-pointer -py-6 hover:shadow-lg"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={t(project.titleKey)}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    {t(project.titleKey)}
                  </CardTitle>
                  <CardDescription className="flex-grow min-h-10">
                    {t(project.descriptionKey)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-3">
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      {t("github")}
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("demo")}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
