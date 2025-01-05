"use client"

import { NavBar } from "@/components/nav-bar"
import { Presentacion } from "@/components/presentacion"
import { Servicios } from "@/components/servicios"
import { Precios } from "@/components/precios"
import { Equipo } from "@/components/equipo"
import { Clientes } from "@/components/clientes";
import { Footer } from "@/components/footer"

export default function Home() {
 
  return (
    <>
      <NavBar />
      <main className="pt-16">
        <Presentacion />
        <Clientes />
        <section id="servicios">
          <Servicios
            title="Desarrollo de software personalizado"
            description="Creamos soluciones de software a medida que se alinean perfectamente con las necesidades y objetivos de su negocio."
            imageUrl="/images/custom-software.png"
          />
          <Servicios
            title="Soluciones en la nube"
            description="Aproveche el poder de la computación en la nube con nuestras soluciones en la nube escalables y seguras."
            imageUrl="/images/cloud-solutions.png"
            reverse
          />
          <Servicios
            title="Integración empresarial"
            description="Integre perfectamente nuestras soluciones con sus sistemas y flujos de trabajo empresariales existentes."
            imageUrl="/images/enterprise-integration.png"
          />
          
        </section>
        <section id="precios">
          <Precios />
        </section>
        <section id="equipo">
          <Equipo />
        </section>
      </main>
      <Footer />
    </>
  )
}
