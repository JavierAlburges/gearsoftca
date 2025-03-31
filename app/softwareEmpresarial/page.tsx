import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import React from "react"


export default function Software() {
  return (
    <>
      <NavBar />
        <main>
          <div className="mt-16 flex flex-col justify-center items-center">
            <div className="container mx-auto px-4 py-20">
              <h1 className="text-4xl font-bold text-center mb-8">Software Empresarial</h1>
              <p className="text-lg text-center mb-4">
                En GearSoftCA, ofrecemos soluciones de software empresarial diseñadas para optimizar la gestión y operación de su negocio. 
                Nuestro enfoque personalizado garantiza que cada solución se adapte a las necesidades específicas de su empresa.
              </p>
              <p className="text-lg text-center mb-4">
                Desde sistemas de gestión empresarial hasta aplicaciones específicas del sector, estamos aquí para ayudarle a alcanzar sus objetivos empresariales.
              </p>
            </div>
          </div>
        </main>
      <Footer />
    </>
  )
}