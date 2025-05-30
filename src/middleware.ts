import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // 지원하는 언어 목록
  locales: ["ko", "en", "zh", "ja", "vi", "th", "ru"],
  // 기본 언어
  defaultLocale: "ko",
});

export const config = {
  // 모든 경로에 대해 미들웨어 적용
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
