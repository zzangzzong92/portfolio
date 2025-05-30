import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // next-intl을 사용하므로 기본 i18n 설정 제거
};

export default withNextIntl(nextConfig);
