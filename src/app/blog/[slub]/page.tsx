import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
import { Badge } from "@/src/app/components/ui/badge"
import { blogPosts, categories } from "@/src/app/lib/blog-data"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "블로그 포스트를 찾을 수 없습니다",
      description: "요청하신 블로그 포스트를 찾을 수 없습니다.",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // 카테고리 이름 가져오기
  const categoryNames =
    post.categories?.map((categoryId) => {
      const category = categories.find((c) => c.id === categoryId)
      return category?.name || categoryId
    }) || []

  return (
    <div className="container py-12">
      <Link href="/blog" className="flex items-center text-muted-foreground hover:text-foreground mb-8">
        <ChevronLeft className="mr-2 h-4 w-4" />
        모든 포스트로 돌아가기
      </Link>

      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {post.author && (
                <>
                  <div className="relative w-10 h-10 mr-3">
                    <Image
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{post.author.name}</span>
                </>
              )}
            </div>
            <time className="text-muted-foreground">{post.date}</time>
          </div>

          {categoryNames.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categoryNames.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          )}

          <div className="relative w-full h-64 md:h-96 mb-8">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* 마크다운 콘텐츠를 HTML로 변환하여 표시 */}
          <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
        </div>
      </article>
    </div>
  )
}

// 간단한 마크다운 변환 함수 (실제로는 remark, rehype 등의 라이브러리 사용 권장)
function markdownToHtml(markdown: string): string {
  return (
    markdown
      // 제목
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      // 강조
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // 목록
      .replace(/^- (.*$)/gm, "<li>$1</li>")
      // 코드 블록
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
      // 인라인 코드
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // 단락
      .replace(/^\s*$/gm, "</p><p>")
      // 최종 래핑
      .replace(/^(.+)$/gm, "$1<br>")
  )
}
