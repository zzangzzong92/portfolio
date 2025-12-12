import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const locales = ["ko", "en", "zh", "ja"];
const defaultLocale = "ko";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 지원하지 않는 언어로 접근한 경우 기본 언어로 리다이렉트
  const locale = request.nextUrl.pathname.split("/")[1];
  if (locale && !locales.includes(locale)) {
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    return Response.redirect(newUrl);
  }

  // 기본 언어로 접근한 경우 리다이렉트하지 않음
  if (pathnameIsMissingLocale) {
    const locale =
      request.headers.get("accept-language")?.split(",")[0].split("-")[0] ||
      defaultLocale;
    const finalLocale = locales.includes(locale) ? locale : defaultLocale;
    const newUrl = new URL(`/${finalLocale}${pathname}`, request.url);
    return Response.redirect(newUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
