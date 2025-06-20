import Image from "next/image"
import Link from "next/link"
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"

export function Footer() {
  return (
    <footer className="bg-[var(--theme-primary-background)] text-[var(--theme-text-on-primary)]">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Comience con GearSoftCA hoy</h2>
          <p className="text-[var(--theme-accent)]">
            Transforme su negocio con nuestras soluciones innovadoras
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="mailto:gearsoftca@gmail.com" className="no-underline">
              <button className="button bg-[var(--brand-white)] text-[var(--brand-dark-blue)] hover:bg-opacity-90 border border-[var(--brand-white)]">
                Programe una demostración
              </button>
            </Link>
            <Link href="https://wa.me/584127521730" target="_blank" rel="noopener noreferrer" className="no-underline">
              <button className="button button-primary">
                Contacto
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[var(--theme-primary-background)] border-t border-[var(--theme-border)]">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="mx-auto md:mx-0">
              <Link href="/" className="flex items-center space-x-2 mb-4 no-underline">
                <Image 
                  src="/images/gearsoftlogo.png"
                  alt="GearSoft Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="font-semibold text-xl">GearSoftCA</span>
              </Link>
              <p className="text-[var(--theme-text-on-primary)] opacity-80 text-center md:text-left">
                Impulsando tu negocio con software innovador, en todas las plataformas.
              </p>
              <div className="flex justify-center md:justify-start gap-4 mt-4">
                <a href="https://www.instagram.com/gearsoftca/" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-accent)] hover:text-[var(--brand-white)] text-2xl no-underline">
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/company/gearsoftca" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-accent)] hover:text-blue-400 text-2xl no-underline">
                  <FaLinkedin />
                </a>
                <a href="https://www.youtube.com/@GearSoftCA" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-accent)] hover:text-red-600 text-2xl no-underline">
                  <FaYoutube />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-center md:text-left">Soluciones</h3>
              <ul className="space-y-2 text-[var(--theme-text-on-primary)] opacity-70 hover:opacity-100 transition-colors text-center md:text-left">
                <li><Link href="/desarrolloPersonalizado" hrefLang="Desarrollo Personalizado" className="no-underline">Desarrollo personalizado</Link></li>
                <li><Link href="/solucionesCloud" hrefLang="Soluciones en la Nube" className="no-underline">Soluciones en la nube</Link></li>
                <li><Link href="/softwareEmpresarial" hrefLang="Software Empresarial" className="no-underline">Software empresarial</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-center md:text-left">Compañía</h3>
              <ul className="space-y-2 text-[var(--theme-text-on-primary)] opacity-70 hover:opacity-100 transition-colors text-center md:text-left">
                <li><Link href="/sobreNosotros" hrefLang="Sobre nosotros" className="no-underline">Sobre nosotros</Link></li>
                <li><Link href="https://www.linkedin.com/company/gearsoftca/" target="_blank" rel="noopener noreferrer" className="no-underline">Trabajo</Link></li>
                <li><Link href="mailto:gearsoftca@gmail.com" className="no-underline">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-center md:text-left">Recursos</h3>
              <ul className="space-y-2 text-[var(--theme-text-on-primary)] opacity-70 hover:opacity-100 transition-colors text-center md:text-left">
                <li><Link href="/documentacion" hrefLang="Documentacion" className="no-underline">Documentación</Link></li>
                <li><Link href="/politicas" hrefLang="politicas" className="no-underline">Políticas</Link></li>
                <li><Link href="https://wa.me/584127521730" target="_blank" rel="noopener noreferrer" className="no-underline">Ayuda</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-4 bg-[var(--theme-primary-background)] text-[var(--theme-accent)] opacity-60 hover:opacity-100 transition-colors text-sm flex flex-col items-center gap-2">
        <span>Todos los derechos reservados ©2024 GearSoft.CA</span>
      </div>
    </footer>
  )
}
