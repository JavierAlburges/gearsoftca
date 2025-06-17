import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import React from "react"


export default function Software() {
  return (
    <>
      <NavBar />
        <main className="bg-[var(--theme-background)] text-[var(--theme-text)]">
          <div className="mt-16 flex flex-col justify-center items-center min-h-[calc(100vh-var(--navbar-height,80px)-var(--footer-height,200px))] py-10"> {/* Ajustar min-h y padding */}
            <div className="container mx-auto px-4 py-10 md:py-20"> {/* Ajustar padding */}
              <h1 className="text-4xl font-bold text-center mb-8">Software Empresarial</h1>
              <p className="text-lg text-center mb-4 opacity-90">
                En GearSoftCA, ofrecemos soluciones de software empresarial diseñadas para optimizar la gestión y operación de su negocio. 
                Nuestro enfoque personalizado garantiza que cada solución se adapte a las necesidades específicas de su empresa.
              </p>
              <p className="text-lg text-center mb-4 opacity-90">
                Desde sistemas de gestión empresarial hasta aplicaciones específicas del sector, estamos aquí para ayudarle a alcanzar sus objetivos empresariales.
              </p>
            </div>
          </div>
        </main>
      <Footer />
    </>
  )
}