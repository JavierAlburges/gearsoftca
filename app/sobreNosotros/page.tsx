import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import React from "react";
import PDFDemoSection from "@/components/PDFDemoSection";

export default function SobreNosotros() {
  return (
    <>
      <NavBar />
      <main className="bg-[var(--theme-background)] text-[var(--theme-text)] p-8">
        <div className="container mx-auto my-10 md:my-20">
          <h1 className="text-3xl font-bold text-[var(--theme-text)] mb-8 text-center">
            Sobre Nosotros
          </h1>
          <p className="text-lg text-[var(--theme-text)] opacity-90 mb-12 text-justify">
            En GearSoftCA, nos apasiona la tecnología y nos mantenemos a la vanguardia de las últimas tendencias para ofrecer soluciones que impulsen la transformación digital de nuestros clientes. Nos comprometemos a superar sus expectativas, ofreciendo soluciones innovadoras, de alta calidad y adaptadas a sus necesidades específicas. Nos esforzamos por construir relaciones de confianza y a largo plazo, basadas en la comunicación, la transparencia y el compromiso con el éxito mutuo.
          </p>
          
          <section className="mb-12 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4 text-center">
              Visión
            </h2>
            <p className="text-lg text-[var(--brand-dark-blue)] opacity-90 text-justify">
              Ser la empresa líder en Venezuela y Latinoamérica, reconocida por nuestra innovación constante y la calidad de nuestro trabajo en todas las plataformas para nuestros clientes.
            </p>
          </section>
          
          <section className="mb-12 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4 text-center">
              Misión
            </h2>
            <p className="text-lg text-[var(--brand-dark-blue)] opacity-90 text-justify">
              Desarrollar soluciones de software innovadoras, personalizadas y de alta calidad en todas las plataformas, superando las expectativas de nuestros clientes e impulsando su crecimiento.
            </p>
          </section>
          
          <div className="bg-[var(--brand-white)] p-6 rounded-[var(--radius-lg)] shadow-lg">
            <PDFDemoSection /> 
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}