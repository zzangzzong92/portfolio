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

const projects = [
  {
    id: 1,
    title: "First Step Korea",
    description: "외국인에게 한국의 생활정보를 제공하는 웹 애플리케이션입니다.",
    image: "/placeholder.svg?height=200&width=400&text=AI+Image+Generator",
    tags: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    demoUrl: "",
    githubUrl: "https://github.com/username/ai-image-generator",
    featured: true,
  },
  {
    id: 2,
    title: "로스트아크 커뮤니티",
    description: "로스트아크 유저들을 위한 커뮤니티 애플리케이션입니다.",
    image: "/loa-project.png",
    tags: ["React", "Socket.io", "Express", "MongoDB"],
    demoUrl: "https://loa.kakao.gg",
    githubUrl: "",
    featured: false,
  },
  {
    id: 3,
    title: "던전앤파이터 커뮤니티",
    description: "던전앤파이터 유저들을 위한 커뮤니티 애플리케이션입니다.",
    image: "/dnf-project.png",
    tags: ["Next.js", "TypeScript", "shadcn/ui", "Tailwind CSS"],
    demoUrl: "https://dnf.kakao.gg",
    githubUrl: "",
    featured: false,
  },
];

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">프로젝트</h1>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">주요 프로젝트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                className="flex flex-col h-full cursor-pointer -py-6 hover:shadow-lg"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="flex-grow min-h-10">
                    {project.description}
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
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      데모
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">기타 프로젝트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card
                key={project.id}
                className="flex flex-col h-full cursor-pointer -py-6 hover:shadow-lg"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="flex-grow min-h-10">
                    {project.description}
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
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      데모
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
