"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import parse from "html-react-parser";
import { BlogPostType } from "@/lib/blog-data";

interface BlogPostClientProps {
  t: (key: string) => string;
  post: BlogPostType;
  categoryNames: string[];
}

export default function BlogPostClient({
  t,
  post,
  categoryNames,
}: BlogPostClientProps) {
  return (
    <div className="container py-12">
      <Link
        href="/blog"
        className="flex items-center mb-8 text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-2 w-4 h-4" />
        {t("backToAllPosts") /* 번역키 예시, 실제 메시지에 맞게 수정 */}
      </Link>

      <article className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              {post.author && (
                <>
                  <div className="relative mr-3 w-10 h-10">
                    <Image
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      fill
                      className="object-cover rounded-full"
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

          <div className="relative mb-8 w-full h-64 md:h-96">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="max-w-none prose prose-lg dark:prose-invert">
          <div>{parse(post.content)}</div>
        </div>
      </article>
    </div>
  );
}
