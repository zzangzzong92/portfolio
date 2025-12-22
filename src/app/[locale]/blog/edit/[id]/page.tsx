import { notFound } from "next/navigation";
import { blogPosts, categories, BlogPostType } from "@/lib/blog-data";
import BlogEditClient from "./BlogEditClient";

interface BlogEditPageProps {
  params: { id: string };
}

export default async function BlogEditPage({ params }: BlogEditPageProps) {
  const { id } = params;

  let post: BlogPostType | null = null;

  if (id === "new") {
    post = {
      id: 0,
      title: "",
      slug: "",
      date: new Date().toISOString().split("T")[0],
      excerpt: "",
      content: "",
      coverImage: "",
      categories: [],
      author: {
        name: "짱쫑",
        avatar: "/zzang.png",
      },
    };
  } else {
    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
      notFound();
    }
    post = blogPosts.find((p) => p.id === postId) || null;
    if (!post) {
      notFound();
    }
  }

  return <BlogEditClient post={post} categories={categories} isNew={id === "new"} />;
}

