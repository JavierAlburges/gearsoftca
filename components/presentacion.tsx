import Link from "next/link"
import Image from "next/image"

export function Presentacion() {
  return (
    <section className="py-12 bg-[var(--theme-background)] text-[var(--theme-text)] h-screen flex flex-col justify-center"> {/* Ajuste para centrar contenido verticalmente */}
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
        <div className="p-8 text-center md:text-left flex flex-col justify-center"> {/* Eliminado align-center, justify-center ya lo hace */}
          <h1 className="text-5xl font-bold mb-4">GearSoftCA: Impulsando tu negocio con software innovador, en todas las plataformas.</h1>
          <p className="text-lg mb-8 opacity-90"> {/* Ligera opacidad para el párrafo */}
          Desarrollamos soluciones de software personalizadas, con un enfoque colaborativo, para impulsar el crecimiento de tu negocio en Maracaibo, Zulia y Venezuela.
          </p>
          <Link href="https://wa.me/584127521730" target="_blank" rel="noopener noreferrer">
            <button className="button button-primary mt-8"> {/* Botón primario */}
            ¡Hablemos de tu Proyecto!
            </button>
          </Link>
        </div>
        <div className="p-8 justify-center items-center hidden md:flex">
          <Image src="/images/gearsoftlogo.png" alt="GearSoft Logo" width={400} height={400} className="w-full max-w-sm"/>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="var(--theme-accent)"> {/* Flecha con color de acento */}
          <path d="M12 17l-5-5h10z" />
        </svg>
      </div>
    </section>
  )
}
