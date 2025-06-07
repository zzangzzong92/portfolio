"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Download,
  Calendar,
  Building,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react"
import { Link } from "@/i18n/navigation";
import { Separator } from "@radix-ui/react-separator";

export default function ResumePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
      {/* 헤더 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Card className="overflow-hidden border-none shadow-lg -py-6">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8">
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* 프로필 이미지 */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 md:w-40 md:h-40">
                    <Image
                      src="/zzang.png"
                      alt="프로필 사진"
                      fill
                      className="rounded-full object-cover border-4 border-background shadow-lg"
                    />
                  </div>
                </div>

                {/* 개인 정보 */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">장종현</h1>
                    <p className="text-xl text-primary font-semibold mb-4">풀스택 개발자</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Next.js, TypeScript, React를 활용한 웹 개발 전문가입니다. 사용자 경험을 중시하는 웹 애플리케이션을
                      만듭니다.
                    </p>
                  </div>

                  {/* 연락처 정보 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>contact@example.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>+82 10-1234-5678</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>서울, 대한민국</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-primary" />
                      <span>portfolio.example.com</span>
                    </div>
                  </div>

                  {/* 소셜 링크 */}
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://github.com" target="_blank">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://linkedin.com" target="_blank">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://twitter.com" target="_blank">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* 다운로드 버튼 */}
                {/* <div className="flex-shrink-0">
                  <Button className="w-full md:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    PDF 다운로드
                  </Button>
                </div> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        {/* Career 섹션 */}
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Briefcase className="h-6 w-6 text-primary" />
                Career
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 경력 항목 1 */}
              <div className="border-l-2 border-primary/20 pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">시니어 프론트엔드 개발자</h3>
                    <p className="text-primary font-medium">ABC 테크놀로지</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>2022.03 - 현재</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  Next.js와 TypeScript를 활용한 웹 애플리케이션 개발 및 유지보수를 담당하고 있습니다. 팀 내 코드 리뷰
                  문화를 정착시키고, 주니어 개발자 멘토링을 통해 팀 역량 강화에 기여하고 있습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                </div>
              </div>

              <Separator />

              {/* 경력 항목 2 */}
              <div className="border-l-2 border-primary/20 pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary/60 rounded-full"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">프론트엔드 개발자</h3>
                    <p className="text-primary font-medium">XYZ 소프트웨어</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>2019.06 - 2022.02</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  React와 Redux를 활용한 대시보드 및 관리자 패널 개발을 담당했습니다. 사용자 경험 개선 및 성능 최적화를
                  통해 페이지 로드 시간을 40% 단축했습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Redux</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">SCSS</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Education 섹션 */}
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <GraduationCap className="h-6 w-6 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 교육 항목 1 */}
              <div className="border-l-2 border-primary/20 pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">컴퓨터 공학 석사</h3>
                    <p className="text-primary font-medium">서울대학교</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>2017.03 - 2019.02</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  웹 기술 및 사용자 인터페이스 설계에 중점을 둔 연구를 수행했습니다. "모바일 환경에서의 반응형 웹
                  인터페이스 최적화"를 주제로 논문을 발표했습니다.
                </p>
              </div>

              <Separator />

              {/* 교육 항목 2 */}
              <div className="border-l-2 border-primary/20 pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary/60 rounded-full"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">컴퓨터 공학 학사</h3>
                    <p className="text-primary font-medium">한국대학교</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>2013.03 - 2017.02</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  웹 개발 및 소프트웨어 엔지니어링 과정을 이수했습니다. 학부 연구 프로젝트로 "실시간 협업 플랫폼"을
                  개발하여 우수 프로젝트상을 수상했습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Internship 섹션 */}
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Building className="h-6 w-6 text-primary" />
                Internship
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 인턴십 항목 1 */}
              <div className="border-l-2 border-primary/20 pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">프론트엔드 개발 인턴</h3>
                    <p className="text-primary font-medium">스타트업 ABC</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>2018.07 - 2018.08</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  React를 활용한 웹 애플리케이션 개발에 참여했습니다. 사용자 인터페이스 개선 및 반응형 디자인 구현을
                  담당했습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="outline">CSS3</Badge>
                </div>
              </div>

              <Separator />

              {/* 인턴십 항목 2 */}
              <div className="border-l-2 border-primary/20 pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary/60 rounded-full"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">웹 개발 인턴</h3>
                    <p className="text-primary font-medium">테크 컴퍼니 XYZ</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>2017.12 - 2018.02</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  웹사이트 유지보수 및 신규 기능 개발에 참여했습니다. HTML, CSS, JavaScript를 활용한 프론트엔드 개발
                  경험을 쌓았습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">HTML5</Badge>
                  <Badge variant="outline">CSS3</Badge>
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="outline">jQuery</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Experience 섹션 */}
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Award className="h-6 w-6 text-primary" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 경험 항목 1 */}
              <div className="border-l-2 border-primary/20 pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">오픈소스 프로젝트 기여</h3>
                    <p className="text-primary font-medium">React 생태계</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>2020.01 - 현재</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  React, Next.js 관련 오픈소스 프로젝트에 지속적으로 기여하고 있습니다. 버그 수정, 기능 개선, 문서화
                  작업을 통해 커뮤니티에 기여하고 있습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Open Source</Badge>
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                </div>
              </div>

              <Separator />

              {/* 경험 항목 2 */}
              <div className="border-l-2 border-primary/20 pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary/60 rounded-full"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">기술 블로그 운영</h3>
                    <p className="text-primary font-medium">개인 블로그</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>2019.03 - 현재</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  웹 개발 관련 기술 블로그를 운영하며 지식을 공유하고 있습니다. 월 평균 10,000명의 방문자가 있으며, 개발
                  커뮤니티에서 활발히 활동하고 있습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Technical Writing</Badge>
                  <Badge variant="outline">Knowledge Sharing</Badge>
                  <Badge variant="outline">Community</Badge>
                </div>
              </div>

              <Separator />

              {/* 경험 항목 3 */}
              <div className="border-l-2 border-primary/20 pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary/60 rounded-full"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">해커톤 수상</h3>
                    <p className="text-primary font-medium">서울 웹 해커톤 2021</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>2021.11</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  "지속가능한 도시를 위한 IoT 플랫폼" 프로젝트로 최우수상을 수상했습니다. React와 Node.js를 활용한
                  실시간 데이터 시각화 플랫폼을 개발했습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Hackathon</Badge>
                  <Badge variant="outline">Award</Badge>
                  <Badge variant="outline">IoT</Badge>
                  <Badge variant="outline">Data Visualization</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

