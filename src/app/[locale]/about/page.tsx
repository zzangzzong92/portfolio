import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

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
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>{t("greeting")}</h2>
            <p>{t("intro1")}</p>
            <p>{t("intro2")}</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8">{t("careerTitle")}</h1>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-semibold">{t("career1Title")}</h3>
                  <p className="text-muted-foreground">{t("career1Period")}</p>
                </div>
                <p className="text-lg font-medium mb-2">
                  {t("career1Company")}
                </p>
                <p className="text-muted-foreground">{t("career1Desc")}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge>Next.js</Badge>
                  <Badge>React</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Java</Badge>
                  <Badge>Spring Boot</Badge>
                  <Badge>Oracle</Badge>
                  <Badge>Tailwind CSS</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-semibold">{t("career2Title")}</h3>
                  <p className="text-muted-foreground">2022.02 - 2022.07</p>
                </div>
                <p className="text-lg font-medium mb-2">(주)쉐어그라운드</p>
                <p className="text-muted-foreground">{t("career2Desc")}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge>React</Badge>
                  <Badge>Recoil</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Styled-Components</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8">{t("educationTitle")}</h1>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-semibold">
                    {t("education1Title")}
                  </h3>
                  <p className="text-muted-foreground">2011 - 2018</p>
                </div>
                <p className="text-lg font-medium">{t("education1School")}</p>
                <p className="text-muted-foreground mt-2">
                  {t("education1Desc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-8 sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle>{t("profileTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-4">
                  <Image
                    src="/zzang.png"
                    alt="프로필 이미지"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">장종현</h3>
                <p className="text-muted-foreground mb-4">
                  {t("profilePosition")}
                </p>

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t("profileLocation")}:</span>
                    <span className="text-muted-foreground">
                      서울, 대한민국
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t("profileExperience")}:</span>
                    <span className="text-muted-foreground">3년+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t("profileEmail")}:</span>
                    <span className="text-muted-foreground">
                      zzangzzong92@gmail.com
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t("profileLanguage")}:</span>
                    <span className="text-muted-foreground">
                      한국어, 중국어
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("techStackTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from(
                    new Set(techStack.map((tech) => tech.category))
                  ).map((category) => (
                    <div key={category}>
                      <h4 className="text-sm font-semibold mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {techStack
                          .filter((tech) => tech.category === category)
                          .map((tech) => {
                            let variant = "default";
                            if (tech.level === "Expert") variant = "default";
                            else if (tech.level === "Advanced")
                              variant = "secondary";
                            else if (tech.level === "Intermediate")
                              variant = "outline";
                            else variant = "ghost";

                            return (
                              <Badge
                                key={tech.name}
                                variant={variant as any}
                                className="text-xs"
                              >
                                {tech.name}
                              </Badge>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
