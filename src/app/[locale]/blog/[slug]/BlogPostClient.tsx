"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, Edit, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPostType } from "@/lib/blog-data";
import { Navigation } from "@/components/navigation";

interface BlogPostClientProps {
  t: (key: string) => string;
  post: BlogPostType;
  categoryIds: string[];
}

export default function BlogPostClient({
  t,
  post,
  categoryIds,
}: BlogPostClientProps) {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <Navigation />
      <section className="container px-4 py-16 mx-auto md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#393939] hover:text-[#0B0B0B] transition-colors"
            >
              <ChevronLeft className="mr-2 w-4 h-4" />
              {t("backToAllPosts")}
            </Link>
            <div className="flex gap-3">
              <Link href="/blog/edit/new">
                <Button className="bg-black text-white hover:bg-black/90 border-4 border-black rounded-lg px-4 py-2 font-bold flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  새 글 작성
                </Button>
              </Link>
              <Link href={`/blog/edit/${post.id}`}>
                <Button className="bg-white text-black hover:bg-gray-100 border-4 border-black rounded-lg px-4 py-2 font-bold flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  수정
                </Button>
              </Link>
            </div>
          </div>

          <article className="overflow-hidden bg-white rounded-3xl border-4 border-black">
            <div className="relative w-full h-64 md:h-96 bg-[#EDEDED]">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6 md:p-8">
              <h1 className="mb-6 text-3xl md:text-4xl font-bold text-[#0B0B0B]">
                {post.title}
              </h1>

              <div className="flex justify-between items-center mb-6 pb-6 border-b-[3px] border-black">
                <div className="flex items-center">
                  {post.author && (
                    <>
                      <div className="overflow-hidden relative mr-3 w-10 h-10 rounded-full border-2 border-black">
                        <Image
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-semibold text-[#0B0B0B]">
                        {post.author.name}
                      </span>
                    </>
                  )}
                </div>
                <time className="text-[#393939]">{post.date}</time>
              </div>

              {categoryIds.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {categoryIds.map((categoryId) => (
                    <Badge
                      key={categoryId}
                      className="bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-full border-0"
                    >
                      {t(`categoryNames.${categoryId}`)}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="max-w-none prose prose-lg dark:prose-invert prose-headings:text-[#0B0B0B] prose-p:text-[#393939] prose-a:text-[#0B0B0B]">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
