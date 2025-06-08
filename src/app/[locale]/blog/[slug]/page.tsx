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

  // 카테고리 이름 가져오기
  const categoryNames =
    post.categories?.map((categoryId) => {
      const category = categories.find((c) => c.id === categoryId);
      return category?.name || categoryId;
    }) || [];

  return <BlogPostClient t={t} post={post} categoryNames={categoryNames} />;
}
