import { Button } from "@/app/components/button"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex flex-col items-center bg-[var(--color-dark-blue)] text-[var(--color-white)]">
      <div className="container py-20">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Comience con GearSoftCA hoy</h2>
          <p className="text-[var(--color-light-blue)]">
            Transforme su negocio con nuestras soluciones innovadoras
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="text-[var(--color-dark-blue)] border-[var(--color-white)] bg-[var(--color-white)] hover:bg-[var(--color-white)]/90 hover:text-[var(--color-black)]">
              Programe una demostración
            </Button>
            <Button className="bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90">
              Contacto
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center bg-[var(--color-dark-blue))] border-t border-[var(--color-light-blue)]/10">
        <div className="container py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Image 
                  src="/images/gearsoftlogo.png"
                  alt="GearSoft Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="font-semibold text-xl">GearSoftCA</span>
              </Link>
              <p className="text-[var(--color-light-blue)]/80">
                Soluciones de software innovadoras para empresas modernas
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Soluciones</h3>
              <ul className="space-y-2 text-[var(--color-white)]/70 hover:text-[var(--color-white)] transition-colors">
                <li><Link href="#">Desarrollo personalizado</Link></li>
                <li><Link href="#">Soluciones en la nube</Link></li>
                <li><Link href="#">Software empresarial</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Compañía</h3>
              <ul className="space-y-2 text-[var(--color-white)]/70 hover:text-[var(--color-white)] transition-colors">
                <li><Link href="#">Sobre nosotros</Link></li>
                <li><Link href="#">Trabajo</Link></li>
                <li><Link href="#">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2 text-[var(--color-white)]/70 hover:text-[var(--color-white)] transition-colors">
                <li><Link href="#">Documentación</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">Ayuda</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-4 bg-[var(--color-dark-blue))] text-[var(--color-light-blue)]/60 hover:text-[var(--color-light-blue)] transition-colors text-sm">
          Todos los derechos reservados ©2024 GearSoft.CA
      </div>
    </footer>
  )
}
