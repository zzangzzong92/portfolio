import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import Navbar from "../../components/layout/navbar";
import { routing } from "../../i18n/routing";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return [
    { locale: "ko" },
    { locale: "en" },
    { locale: "zh" },
    { locale: "ja" },
    { locale: "vi" },
    { locale: "th" },
    { locale: "ru" },
  ];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // //locale 유효성 체크
  // if (!routing.locales.includes(locale as any)) {
  //   notFound();
  // }

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound(); // 지원하지 않는 언어일 경우 404
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
