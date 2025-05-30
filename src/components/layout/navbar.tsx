"use client";

import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type LanguageOption = {
  code: string;
  name: string;
};

const languages: LanguageOption[] = [
  { code: "ko", name: "한국어" },
  { code: "en", name: "English" },
  { code: "zh", name: "中文 (중국어)" },
  { code: "ja", name: "日本語 (일본어)" },
  { code: "vi", name: "Tiếng Việt (베트남어)" },
  { code: "th", name: "ภาษาไทย (태국어)" },
  { code: "ru", name: "Русский (러시아어)" },
];

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("navigation");

  const menuItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/projects", label: t("projects") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectLanguage = (language: LanguageOption) => {
    if (language.code === locale) {
      setIsLanguageDropdownOpen(false);
      return;
    }
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
    router.replace(pathname, { locale: language.code });
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between mx-auto">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="font-bold text-xl flex gap-3">
            <Image
              src="/zzang.png"
              alt="logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <h1 className="leading-nomal">ZZ</h1>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item, index) => {
            const isActive =
              pathname === `/${locale}${item.href === "/" ? "" : item.href}`;
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
                  locale={locale}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-primary/70"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="navbar-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            );
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
                  const href = `/${locale}${
                    item.href === "/" ? "" : item.href
                  }`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={item.href}
                      href={href}
                      locale={locale}
                      className={`text-lg font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-foreground/70 hover:text-primary/70"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                {mounted && (
                  <Button
                    variant="outline"
                    className="flex items-center justify-start gap-2 mt-4"
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                      setIsMenuOpen(false);
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

          {/* 언어 선택 드롭다운 */}
          <div className="relative" ref={languageDropdownRef}>
            <button
              type="button"
              className="flex items-center justify-center text-black transition-colors hover:text-gray-600"
              aria-label="Select language"
              onClick={toggleLanguageDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="fill-none stroke-current"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                  d="M8 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                  d="M2.4 6h11.2M2.4 10h11.2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                  d="M8 2a10 10 0 0 1 0 12"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                  d="M8 2a10 10 0 0 0 0 12"
                />
              </svg>
            </button>

            {/* 언어 드롭다운 메뉴 */}
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white py-2 shadow-lg">
                <div className="py-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() => selectLanguage(language)}
                      className={`${
                        selectedLanguage.code === language.code
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700"
                      } flex w-full items-center px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50`}
                    >
                      {language.name}
                      {selectedLanguage.code === language.code && (
                        <svg
                          className="ml-auto h-4 w-4 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
