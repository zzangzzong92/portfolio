"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Mail, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FlagIcon, FlagIconCode } from "react-flag-kit";

type LanguageOption = {
  code: string;
  name: string;
  flag: FlagIconCode;
};

const languages: LanguageOption[] = [
  { code: "ko", name: "한국어", flag: "KR" },
  { code: "en", name: "English", flag: "US" },
  { code: "zh", name: "中文", flag: "CN" },
  { code: "ja", name: "日本語", flag: "JP" },
  { code: "vi", name: "Tiếng Việt", flag: "VN" },
  { code: "th", name: "ไทย", flag: "TH" },
  { code: "ru", name: "Русский", flag: "RU" },
];

const locales = ["ko", "en", "zh", "ja", "vi", "th", "ru"];

export function Navigation() {
  const [open, setOpen] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Extract locale from pathname (e.g., "/ko/about" -> "ko")
  const locale = pathname.split("/")[1] || "ko";
  const isValidLocale = locales.includes(locale) ? locale : "ko";
  const currentLanguage =
    languages.find((lang) => lang.code === isValidLocale) || languages[0];

  // Helper function to create localized path
  const getLocalizedPath = (path: string, targetLocale?: string) => {
    const target = targetLocale || isValidLocale;
    if (path === "/") {
      return `/${target}`;
    }
    return `/${target}${path}`;
  };

  // Get current path without locale
  const getPathWithoutLocale = () => {
    const segments = pathname.split("/").slice(2);
    return segments.length > 0 ? "/" + segments.join("/") : "/";
  };

  const selectLanguage = (language: LanguageOption) => {
    if (language.code === isValidLocale) {
      setLangOpen(false);
      return;
    }
    const pathWithoutLocale = getPathWithoutLocale();
    const newPath = getLocalizedPath(pathWithoutLocale, language.code);
    router.push(newPath);
    setLangOpen(false);
  };

  return (
    <div className="container px-4 pt-8 pb-4 mx-auto">
      <nav className="flex items-center justify-between bg-white border-4 border-black rounded-xl px-5 py-3 max-w-2xl mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <Link
          href={getLocalizedPath("/")}
          className="flex overflow-hidden flex-shrink-0 justify-center items-center w-10 h-10 bg-black rounded-full transition-opacity cursor-pointer hover:opacity-70"
        >
          <Image
            src="/zzang.png"
            alt="Avatar"
            width={24}
            height={24}
            className="object-cover w-6 h-6 rounded-full"
            priority
          />
        </Link>

        <div className="hidden flex-1 gap-6 justify-center items-center md:flex">
          <Link
            href={getLocalizedPath("/")}
            className="text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity"
          >
            Home
          </Link>
          <Link
            href={getLocalizedPath("/about")}
            className="text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity"
          >
            About
          </Link>
          <Link
            href={getLocalizedPath("/projects")}
            className="text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity"
          >
            Portfolio
          </Link>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity cursor-pointer">
                Pages
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    open ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={8}
              className="bg-white border-4 border-black rounded-xl p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] min-w-[12rem]"
            >
              <DropdownMenuItem asChild className="rounded-md">
                <Link
                  href={getLocalizedPath("/blog")}
                  className="block w-full px-3 py-2 text-[16px] font-bold leading-[20px] rounded-md hover:bg-black hover:text-white"
                >
                  Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-md">
                <Link
                  href={getLocalizedPath("/resume")}
                  className="block w-full px-3 py-2 text-[16px] font-bold leading-[20px] rounded-md hover:bg-black hover:text-white"
                >
                  Resume
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2 items-center">
          <DropdownMenu open={langOpen} onOpenChange={setLangOpen}>
            <DropdownMenuTrigger asChild>
              <Button className="bg-white border-4 border-black hover:bg-gray-50 rounded-sm px-3 h-12 min-w-[48px] flex-shrink-0 cursor-pointer">
                <FlagIcon code={currentLanguage.flag} size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="bg-white border-4 border-black rounded-xl p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] min-w-[12rem]"
            >
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => selectLanguage(language)}
                  className={cn(
                    "rounded-md px-3 py-2 text-[16px] font-bold leading-[20px] cursor-pointer flex items-center gap-2",
                    isValidLocale === language.code
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  )}
                >
                  <FlagIcon code={language.flag} size={16} />
                  {language.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="bg-black text-white hover:bg-black/90 rounded-sm px-5 h-12 min-w-[48px] flex-shrink-0 cursor-pointer">
            <Mail className="w-5 h-5" strokeWidth={2.5} />
          </Button>
        </div>
      </nav>
    </div>
  );
}
