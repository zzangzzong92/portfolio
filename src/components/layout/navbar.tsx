"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function Navbar() {
  const { setTheme, theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname()

  // useEffect를 사용하여 컴포넌트가 마운트된 후에만 테마 관련 UI를 렌더링
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // 메뉴 아이템 정의
  const menuItems = [
    { href: "/", label: "홈" },
    { href: "/about", label: "소개" },
    { href: "/projects", label: "프로젝트" },
    { href: "/blog", label: "블로그" },
    { href: "/contact", label: "연락처" },
  ]

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="font-bold text-xl">
            DevPortfolio
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-primary font-semibold" : "text-foreground/70 hover:text-primary/70"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="테마 변경"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">테마 변경</span>
              </Button>
            </motion.div>
          )}

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg font-medium transition-colors duration-200 ${
                        isActive ? "text-primary font-semibold" : "text-foreground/70 hover:text-primary/70"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                {mounted && (
                  <Button
                    variant="outline"
                    className="flex items-center justify-start gap-2 mt-4"
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark")
                      setIsMenuOpen(false)
                    }}
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="h-4 w-4" />
                        <span>라이트 모드로 전환</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4" />
                        <span>다크 모드로 전환</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
