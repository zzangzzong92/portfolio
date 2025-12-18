import { AboutSection } from "@/components/about-section";
import { ArticlesSection } from "@/components/articles-section";
import { ExperienceSection } from "@/components/experience-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { LogoMarquee } from "@/components/logo-marquee";
import { Navigation } from "@/components/navigation";
import { PortfolioSection } from "@/components/portfolio-section";
import { ServicesSection } from "@/components/service-section";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <Navigation />
      <HeroSection />
      <LogoMarquee />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <ExperienceSection />
      {/* <TestimonialsSection /> */}
      <ArticlesSection />
      <Footer />
    </main>
  )
}
