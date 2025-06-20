import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import React from "react"


export default function Nube() {
  return (
    <>
      <NavBar />
      <main className="bg-[var(--theme-background)] text-[var(--theme-text)]">
        <div className="mt-16 flex flex-col justify-center items-center min-h-[calc(100vh-var(--navbar-height,80px)-var(--footer-height,200px))] py-10"> {/* Ajustar min-h y padding */}
          <div className="container mx-auto px-4 py-10 md:py-20"> {/* Ajustar padding */}
            <h1 className="text-4xl font-bold text-center mb-8">Soluciones en la Nube</h1>
            <p className="text-lg text-center mb-4 opacity-90">
              En GearSoftCA, ofrecemos soluciones en la nube que permiten a su empresa operar de manera más eficiente y segura. 
              Nuestras soluciones están diseñadas para escalar con su negocio y adaptarse a sus necesidades cambiantes.
            </p>
            <p className="text-lg text-center mb-4 opacity-90">
              Desde almacenamiento en la nube hasta aplicaciones empresariales, estamos aquí para ayudarle a aprovechar al máximo la tecnología en la nube.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}