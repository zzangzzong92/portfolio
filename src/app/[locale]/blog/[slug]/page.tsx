"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts, categories } from "@/lib/blog-data";
import parse from "html-react-parser";
// import ParseHTML from "@/components/htmlparser";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = (await params).slug;
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  // 카테고리 이름 가져오기
  const categoryNames =
    post.categories?.map((categoryId) => {
      const category = categories.find((c) => c.id === categoryId);
      return category?.name || categoryId;
    }) || [];

  return (
    <div className="container py-12">
      <Link
        href="/blog"
        className="flex items-center text-muted-foreground hover:text-foreground mb-8"
      >
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
          {/* <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} /> */}
          {/* <ParseHTML data={post.content} /> */}
          <div>{parse(post.content)}</div>
        </div>
      </article>
    </div>
  );
}
