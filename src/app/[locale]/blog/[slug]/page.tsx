import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { blogPosts, categories } from "@/lib/blog-data";
import BlogPostClient from "./BlogPostClient";

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const t = await getTranslations("blog");
  const slug = params.slug;
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  // 카테고리 ID 전달 (클라이언트에서 번역)
  const categoryIds = post.categories || [];

  return <BlogPostClient t={t} post={post} categoryIds={categoryIds} />;
}
