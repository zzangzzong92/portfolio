"use client"

import { Badge } from "@/src/app/components/ui/badge"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/app/components/ui/card"
import { Checkbox } from "@/src/app/components/ui/checkbox"
import { Input } from "@/src/app/components/ui/input"
import { Search } from "lucide-react"
import { blogPosts, categories } from "@/src/app/lib/blog-data"

export default function BlogPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Category filtering handler
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  // Filter posts based on selected categories and search query
  const filteredPosts = blogPosts.filter((post) => {
    // Filter by category if any selected
    const matchesCategory =
      selectedCategories.length === 0 || post.categories?.some((category) => selectedCategories.includes(category))

    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">블로그</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-20">
            {/* Search input */}
            <div className="relative mb-6">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="블로그 검색..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <h2 className="text-xl font-semibold mb-4">카테고리</h2>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blog post list */}
        <div className="flex-1">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="flex flex-col h-full">
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    {post.categories && post.categories.length > 0 && (
                      <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end">
                        {post.categories.map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="bg-primary/80 text-primary-foreground text-xs"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                      {post.author && (
                        <div className="flex items-center">
                          <div className="relative w-6 h-6 mr-2">
                            <Image
                              src={post.author.avatar || "/placeholder.svg"}
                              alt={post.author.name}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{post.author.name}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/blog/${post.slug}`} className="text-primary hover:underline font-medium">
                      자세히 보기
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
