import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[var(--color-dark-blue)] text-[var(--color-white)]">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Comience con GearSoftCA hoy</h2>
          <p className="text-[var(--color-light-blue)]">
            Transforme su negocio con nuestras soluciones innovadoras
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="mailto:gearsoftca@gmail.com">
              <button className="text-[var(--color-dark-blue)] border-[var(--color-white)] bg-[var(--color-white)] hover:bg-[var(--color-white)]/90 hover:text-[var(--color-white)] py-2 px-4 rounded">
                Programe una demostración
              </button>
            </Link>
            <Link href="https://wa.me/584127521730" target="_blank" rel="noopener noreferrer">
              <button className="bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90 py-2 px-4 rounded">
                Contacto
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-dark-blue)] border-t border-[var(--color-light-blue)]/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="mx-auto md:mx-0">
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
              <p className="text-[var(--color-light-blue)]/80 text-center md:text-left">
                Impulsando tu negocio con software innovador, en todas las plataformas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-center md:text-left">Soluciones</h3>
              <ul className="space-y-2 text-[var(--color-white)]/70 hover:text-[var(--color-white)] transition-colors text-center md:text-left">
                <li><Link href="/desarrolloPersonalizado" hrefLang="Desarrollo Personalizado" >Desarrollo personalizado</Link></li>
                <li><Link href="/solucionesCloud" hrefLang="Soluciones en la Nube" >Soluciones en la nube</Link></li>
                <li><Link href="/softwareEmpresarial" hrefLang="Software Empresarial" >Software empresarial</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-center md:text-left">Compañía</h3>
              <ul className="space-y-2 text-[var(--color-white)]/70 hover:text-[var(--color-white)] transition-colors text-center md:text-left">
                <li><Link href="/sobreNosotros" hrefLang="Sobre nosotros">Sobre nosotros</Link></li>
                <li><Link href="https://www.linkedin.com/company/gearsoftca/" target="_blank" rel="noopener noreferrer">Trabajo</Link></li>
                <li><Link href="mailto:gearsoftca@gmail.com">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-center md:text-left">Recursos</h3>
              <ul className="space-y-2 text-[var(--color-white)]/70 hover:text-[var(--color-white)] transition-colors text-center md:text-left">
                <li><Link href="/documentacion" hrefLang="Documentacion">Documentación</Link></li>
                <li><Link href="/politicas" hrefLang="politicas">Políticas</Link></li>
                <li><Link href="https://wa.me/584127521730" target="_blank" rel="noopener noreferrer">Ayuda</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-4 bg-[var(--color-dark-blue)] text-[var(--color-light-blue)]/60 hover:text-[var(--color-light-blue)] transition-colors text-sm">
        Todos los derechos reservados ©2024 GearSoft.CA
      </div>
    </footer>
  )
}
