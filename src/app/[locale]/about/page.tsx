import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">소개</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Scrollable content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>안녕하세요, 저는 개발자입니다</h2>
            <p>
              웹 개발에 대한 열정을 가진 풀스택 개발자로, 사용자 중심의 웹
              애플리케이션을 만드는 것을 좋아합니다. Next.js, React,
              TypeScript를 주로 사용하며, 최신 웹 기술 트렌드를 항상 탐구하고
              있습니다.
            </p>

            <p>
              저는 복잡한 문제를 해결하고 사용자 경험을 개선하는 데 중점을 두고
              있습니다. 클린 코드와 최신 웹 표준을 준수하는 것을 중요하게
              생각하며, 지속적인 학습과 성장을 통해 더 나은 개발자가 되기 위해
              노력하고 있습니다.
            </p>

            <h2>경력</h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-semibold">
                    주니어 프론트엔드 개발자
                  </h3>
                  <p className="text-muted-foreground">2022 - 현재</p>
                </div>
                <p className="text-lg font-medium mb-2">ABC 테크놀로지</p>
                <p className="text-muted-foreground">
                  Next.js와 TypeScript를 활용한 웹 애플리케이션 개발 및
                  유지보수를 담당하고 있습니다. 팀 내 코드 리뷰 문화를
                  정착시키고, 주니어 개발자 멘토링을 통해 팀 역량 강화에
                  기여하고 있습니다.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge>Next.js</Badge>
                  <Badge>React</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Tailwind CSS</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-semibold">프론트엔드 개발자</h3>
                  <p className="text-muted-foreground">2019 - 2022</p>
                </div>
                <p className="text-lg font-medium mb-2">XYZ 소프트웨어</p>
                <p className="text-muted-foreground">
                  React와 Redux를 활용한 대시보드 및 관리자 패널 개발을
                  담당했습니다. 사용자 경험 개선 및 성능 최적화를 통해 페이지
                  로드 시간을 40% 단축했습니다.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge>React</Badge>
                  <Badge>Redux</Badge>
                  <Badge>JavaScript</Badge>
                  <Badge>SCSS</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8">교육</h1>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-semibold">컴퓨터 공학 석사</h3>
                  <p className="text-muted-foreground">2017 - 2019</p>
                </div>
                <p className="text-lg font-medium">서울대학교</p>
                <p className="text-muted-foreground mt-2">
                  웹 기술 및 사용자 인터페이스 설계에 중점을 둔 연구를
                  수행했습니다. "모바일 환경에서의 반응형 웹 인터페이스
                  최적화"를 주제로 논문을 발표했습니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-semibold">컴퓨터 공학 학사</h3>
                  <p className="text-muted-foreground">2013 - 2017</p>
                </div>
                <p className="text-lg font-medium">한국대학교</p>
                <p className="text-muted-foreground mt-2">
                  `웹 개발 및 소프트웨어 엔지니어링 과정을 이수했습니다. 학부
                  연구 프로젝트로 '실시간 협업 플랫폼'을 개발하여 우수
                  프로젝트상을 수상했습니다.`
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right column: Sticky cards */}
        <div className="lg:col-span-1">
          <div className="space-y-8 sticky top-20">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle>프로필</CardTitle>
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
                <p className="text-muted-foreground mb-4">풀스택 웹 개발자</p>

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>위치:</span>
                    <span className="text-muted-foreground">
                      서울, 대한민국
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>경력:</span>
                    <span className="text-muted-foreground">3년+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>이메일:</span>
                    <span className="text-muted-foreground">
                      zzangzzong92@gmail.com
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>언어:</span>
                    <span className="text-muted-foreground">
                      한국어, 중국어
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tech Stack Card */}
            <Card>
              <CardHeader>
                <CardTitle>기술 스택</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Group tech stack by category */}
                  {Array.from(
                    new Set(techStack.map((tech) => tech.category))
                  ).map((category) => (
                    <div key={category}>
                      <h4 className="text-sm font-semibold mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {techStack
                          .filter((tech) => tech.category === category)
                          .map((tech) => {
                            // Determine badge variant based on skill level
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
