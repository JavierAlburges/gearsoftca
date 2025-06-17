import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import React from "react"

export default function Desarrollo() {
  return (
    <>
      <NavBar />
      <main className="bg-[var(--theme-background)] text-[var(--theme-text)]">
        <div className="mt-16 flex flex-col justify-center items-center min-h-[calc(100vh-var(--navbar-height,80px)-var(--footer-height,200px))] py-10"> {/* Ajustar min-h y padding */}
          <div className="container mx-auto px-4 py-10 md:py-20"> {/* Ajustar padding */}
            <h1 className="text-4xl font-bold text-center mb-8">Desarrollo Personalizado</h1>
            <p className="text-lg text-center mb-4 opacity-90">
              En GearSoftCA, ofrecemos soluciones de desarrollo personalizado adaptadas a las necesidades únicas de su negocio. 
              Nuestro equipo de expertos trabaja en estrecha colaboración con usted para crear aplicaciones y sistemas que optimizan sus procesos y mejoran la eficiencia.
            </p>
            <p className="text-lg text-center mb-4 opacity-90">
              Desde aplicaciones web hasta soluciones móviles, estamos aquí para ayudarle a llevar su negocio al siguiente nivel.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}