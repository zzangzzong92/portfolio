"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { blogPosts, categories } from "@/lib/blog-data";
import { useTranslations } from "next-intl";
import { Navigation } from "@/components/navigation";

export default function BlogPage() {
  const t = useTranslations("blog");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      post.categories?.some((category) =>
        selectedCategories.includes(category)
      );

    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <Navigation />
      <section className="container px-4 py-16 mx-auto md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
          </div>

          <div className="flex flex-col gap-8 md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="sticky top-20">
                {/* Search input */}
                <div className="relative mb-6">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t("searchPlaceholder")}
                    className="pl-8 rounded-lg border-4 border-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="p-6 bg-white rounded-3xl border-4 border-black">
                  <h2 className="text-xl font-semibold mb-4 text-[#0B0B0B]">
                    {t("categories")}
                  </h2>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() =>
                            handleCategoryChange(category.id)
                          }
                          className="border-2 border-black data-[state=checked]:bg-black"
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="text-sm font-medium leading-none cursor-pointer text-[#0B0B0B]"
                        >
                          {t(`categoryNames.${category.id}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Blog post list */}
            <div className="flex-1">
              {filteredPosts.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-[#393939] text-lg">{t("noResults")}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {filteredPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="block group focus:outline-none"
                    >
                      <div className="bg-white border-4 border-black rounded-3xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col h-full">
                        <div className="relative h-48 w-full bg-[#EDEDED]">
                          <Image
                            src={post.coverImage || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                          {post.categories && post.categories.length > 0 && (
                            <div className="flex absolute top-2 right-2 flex-wrap gap-1 justify-end">
                              {post.categories.map((category) => (
                                <Badge
                                  key={category}
                                  className="bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full border-0"
                                >
                                  {t(`categoryNames.${category}`)}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-grow p-6">
                          <h3 className="text-xl md:text-2xl font-bold mb-4 line-clamp-2 text-[#0B0B0B]">
                            {post.title}
                          </h3>
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-[#393939]">
                              {post.date}
                            </p>
                            {post.author && (
                              <div className="flex items-center">
                                <div className="relative mr-2 w-6 h-6">
                                  <Image
                                    src={
                                      post.author.avatar || "/placeholder.svg"
                                    }
                                    alt={post.author.name}
                                    fill
                                    className="object-cover rounded-full"
                                  />
                                </div>
                                <span className="text-xs text-[#393939]">
                                  {post.author.name}
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="text-[#393939] line-clamp-3 flex-grow">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
