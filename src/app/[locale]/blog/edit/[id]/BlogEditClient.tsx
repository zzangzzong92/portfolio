"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ChevronLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BlogPostType } from "@/lib/blog-data";
import { Navigation } from "@/components/navigation";
import TinyMCEEditor from "@/components/blog/tinymce-editor";

interface BlogEditClientProps {
  post: BlogPostType;
  categories: { id: string; name: string }[];
  isNew: boolean;
}

export default function BlogEditClient({
  post: initialPost,
  categories,
  isNew,
}: BlogEditClientProps) {
  const t = useTranslations("blog");
  const router = useRouter();
  const [title, setTitle] = useState(initialPost.title);
  const [slug, setSlug] = useState(initialPost.slug);
  const [date, setDate] = useState(initialPost.date);
  const [excerpt, setExcerpt] = useState(initialPost.excerpt);
  const [content, setContent] = useState(initialPost.content);
  const [coverImage, setCoverImage] = useState(initialPost.coverImage);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialPost.categories || []
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  useEffect(() => {
    if (isNew && title) {
      setSlug(generateSlug(title));
    }
  }, [title, isNew]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const postData = {
        ...initialPost,
        title,
        slug,
        date,
        excerpt,
        content,
        coverImage,
        categories: selectedCategories,
      };

      console.log("Saving post:", postData);

      // TODO: 실제 API 호출로 변경
      // await saveBlogPost(postData);

      alert(isNew ? "새 글이 저장되었습니다!" : "글이 수정되었습니다!");
      router.push(`/blog/${slug}`);
    } catch (error) {
      console.error("Failed to save post:", error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <Navigation />
      <section className="container px-4 py-16 mx-auto md:py-24">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/blog"
            className="inline-flex items-center mb-8 text-[#393939] hover:text-[#0B0B0B] transition-colors"
          >
            <ChevronLeft className="mr-2 w-4 h-4" />
            블로그로 돌아가기
          </Link>

          <div className="bg-white rounded-3xl border-4 border-black p-6 md:p-8">
            <div className="mb-8 pb-6 border-b-[3px] border-black">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0B0B0B] mb-2">
                {isNew ? "새 글 작성" : "글 수정"}
              </h1>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-base font-bold text-[#0B0B0B] mb-2 block">
                  제목
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-4 border-black rounded-lg px-4 py-3 text-base"
                  placeholder="글 제목을 입력하세요"
                />
              </div>

              <div>
                <Label htmlFor="slug" className="text-base font-bold text-[#0B0B0B] mb-2 block">
                  URL 슬러그
                </Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="border-4 border-black rounded-lg px-4 py-3 text-base"
                  placeholder="url-slug"
                />
              </div>

              <div>
                <Label htmlFor="date" className="text-base font-bold text-[#0B0B0B] mb-2 block">
                  날짜
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-4 border-black rounded-lg px-4 py-3 text-base"
                />
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-base font-bold text-[#0B0B0B] mb-2 block">
                  요약
                </Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="border-4 border-black rounded-lg px-4 py-3 text-base min-h-[100px]"
                  placeholder="글의 요약을 입력하세요"
                />
              </div>

              <div>
                <Label htmlFor="coverImage" className="text-base font-bold text-[#0B0B0B] mb-2 block">
                  커버 이미지 URL
                </Label>
                <Input
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="border-4 border-black rounded-lg px-4 py-3 text-base"
                  placeholder="/image.png"
                />
              </div>

              <div>
                <Label className="text-base font-bold text-[#0B0B0B] mb-4 block">
                  카테고리
                </Label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category.id}
                      className={`cursor-pointer text-xs font-semibold px-4 py-1.5 rounded-full transition-all ${
                        selectedCategories.includes(category.id)
                          ? "bg-black text-white"
                          : "bg-white text-black border-2 border-black hover:bg-gray-100"
                      }`}
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-bold text-[#0B0B0B] mb-2 block">
                  내용
                </Label>
                <div className="border-4 border-black rounded-lg overflow-hidden">
                  <TinyMCEEditor value={content} onChange={setContent} height={600} />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t-[3px] border-black">
                <Button
                  onClick={handleSave}
                  disabled={isSaving || !title || !slug || !content}
                  className="bg-black text-white hover:bg-black/90 px-6 py-3 text-base font-bold rounded-lg border-4 border-black flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "저장 중..." : "저장"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

