import Link from 'next/link'
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/images/404.png" alt="Pagina no encontrada" width={200} height={200} style={{ filter: 'invert(1)' }} />
      <h2 className="text-4xl font-bold mb-4 text-white">Página No Encontrada</h2>
      <p className="text-lg mb-4 text-white">No se pudo encontrar el recurso solicitado.</p>
      <Link href="/" className="bg-[var(--color-dark-blue)] hover:bg-[var(--color-dark-blue)]/90 text-white py-2 px-4 rounded">
        Volver al Inicio
      </Link>
    </div>
  )
}