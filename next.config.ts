/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["ko", "en", "cn", "jp"], // 지원할 언어 코드 배열
    defaultLocale: "ko", // 기본 언어
    localeDetection: true, // 브라우저 언어 감지(원하면 false로)
  },
};

export default nextConfig;
