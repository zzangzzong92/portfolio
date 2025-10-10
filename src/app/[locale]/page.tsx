"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import BlogCarousel from "@/components/blog-carousel";
import { AnimatedText } from "@/components/animated-text";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="flex-1 flex flex-col w-full">
      <motion.section
        className="py-20 md:py-28 bg-muted/10 dark:bg-muted/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex flex-col items-center text-center">
          <AnimatedText delay={0.1} className="w-full">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              {t("greeting")} <br />
              {t("introduction")} <span className="text-primary">{t("name")}</span>
            </h1>
          </AnimatedText>

          <AnimatedText delay={0.3} className="w-full">
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto mb-8">
              {t("description")}
            </p>
          </AnimatedText>

          <AnimatedText delay={0.5} className="w-full">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/projects">{t("viewProjects")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border/60 text-foreground/80 hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50 dark:focus-visible:ring-primary/60 transition-colors"
              >
                <Link href="/contact">{t("contact")}</Link>
              </Button>
            </div>
          </AnimatedText>
        </div>
      </motion.section>

      <div className="mt-20">
        <BlogCarousel />
      </div>
    </div>
  );
}
