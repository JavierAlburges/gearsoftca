import { NavBar } from "@/app/components/nav-bar"
import { HeroSection } from "@/app/components/hero-section"
import { FeatureSection } from "@/app/components/feature-section"
import { PricingSection } from "@/app/components/pricing-section"
import { TestimonialsSection } from "@/app/components/testimonials-section"
import { SponsorsSection } from "@/app/components/sponsors-section";
import { Footer } from "@/app/components/footer"


export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <SponsorsSection />
        <section id="servicios">
          <FeatureSection
            title="Desarrollo de software personalizado"
            description="Creamos soluciones de software a medida que se alinean perfectamente con las necesidades y objetivos de su negocio."
            imageUrl="/images/custom-software.png"
          />
          <FeatureSection
            title="Soluciones en la nube"
            description="Aproveche el poder de la computación en la nube con nuestras soluciones en la nube escalables y seguras."
            imageUrl="/images/cloud-solutions.png"
            reverse
          />
          <FeatureSection
            title="Integración empresarial"
            description="Integre perfectamente nuestras soluciones con sus sistemas y flujos de trabajo empresariales existentes."
            imageUrl="/images/enterprise-integration.png"
          />
          
        </section>
        <section id="precios">
          <PricingSection />
        </section>
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
