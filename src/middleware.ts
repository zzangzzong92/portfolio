import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // 지원하는 언어 목록
  locales: ["ko", "en", "zh", "ja", "vi", "th", "ru"],
  // 기본 언어
  defaultLocale: "ko",
  // 로케일 감지 전략 설정
  localeDetection: true,
  // 로케일 접두사 항상 사용
  localePrefix: "always",
});

export const config = {
  // 정적 파일, API, _next, public 폴더 등을 제외한 경로에만 미들웨어 적용
  matcher: [
    // 모든 경로에 대해 미들웨어 적용
    "/((?!api|_next|.*\\..*|_vercel|.*\\.[^/]*$).*)",
    // 로케일이 없는 경로에 대해서만 리다이렉션
    "/((?!_next|.*\\..*|_vercel|.*\\.[^/]*$).*)",
  ],
};
