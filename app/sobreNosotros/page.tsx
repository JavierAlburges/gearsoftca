import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import React from "react"

export default function SobreNosotros() {
  return (
    <>
      <NavBar />
      <main className="bg-[var(--color-white)] p-8">
        <div className="container mx-auto my-20">
          <h1 className="text-3xl font-bold text-[var(--color-dark-blue)] mb-4 text-center">
            Sobre Nosotros
          </h1>
          <p className="text-lg text-[var(--color-black)] mb-8 text-justify">
            En GearSoftCA, nos comprometemos a superar las expectativas de nuestros clientes, ofreciendo soluciones innovadoras, de alta calidad y adaptadas a sus necesidades específicas. Nos apasiona la tecnología y nos mantenemos a la vanguardia de las últimas tendencias para ofrecer soluciones que impulsen la transformación digital de nuestros clientes. Nos esforzamos por construir relaciones de confianza y a largo plazo, basadas en la comunicación, la transparencia y el compromiso con el éxito mutuo.
          </p>
          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4 text-center">
            Visión
          </h2>
          <p className="text-lg text-[var(--color-black)] mb-8 text-justify">
            Ser una empresa líder en soluciones de software innovadoras en Venezuela y Latinoamérica, reconocida por nuestra especialización en aplicaciones móviles y nuestra capacidad para ofrecer soluciones integrales de alta calidad.
          </p>
          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4 text-center">
            Misión
          </h2>
          <p className="text-lg text-[var(--color-black)] mb-8 text-justify">
            Desarrollar soluciones de software personalizadas y de alta calidad, con un enfoque estratégico en aplicaciones móviles, utilizando las mejores prácticas y tecnologías de punta para satisfacer las necesidades de nuestros clientes y potenciar su crecimiento.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}