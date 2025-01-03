import Link from "next/link"
import Image from "next/image"

export function Presentacion() {
  return (
    <section className="py-12 bg-[var(--color-dark-blue)] text-[var(--color-white)] h-screen">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
        <div className="p-8 text-center md:text-left flex flex-col justify-center align-center">
          <h1 className="text-5xl font-bold mb-4">Bienvenido a GearSoftCA</h1>
          <p className="text-lg mb-8">
            Somos una empresa de desarrollo de software dedicada a crear soluciones innovadoras para su negocio.
          </p>
          <Link href="https://api.whatsapp.com/send?phone=584127521730" target="_blank" rel="noopener noreferrer">
            <button className="mt-8 bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90 py-2 px-4 rounded">
              Contáctanos
            </button>
          </Link>
        </div>
        <div className="p-8 justify-center items-center hidden md:flex">
          <Image src="/images/gearsoftlogo.png" alt="GearSoft Logo" width={300} height={300} className="w-full max-w-xs"/>
        </div>
      </div>
    </section>
  )
}
