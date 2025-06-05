import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/layout/footer";
import { PageTransition } from "@/components/page-transition";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/layout/navbar";
import Script from "next/script";
import { Messages } from "types/message";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My Portfolio Website",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ko" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let messages: Messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  console.log("locale", locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme-preference"
          >
            <Script
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services,clusterer`}
              strategy="afterInteractive"
            />
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="max-w-7xl w-2/3 mx-auto">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
