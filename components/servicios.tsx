import Image from "next/image"
import Link from "next/link"

interface ServiciosProps {
  title: string
  description: string
  imageUrl: string
  reverse?: boolean
}

export function Servicios({ title, description, imageUrl, reverse }: ServiciosProps) {
  return (
    <section className="py-8 bg-[var(--color-white)]">
      <div className="container mx-auto">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <div className="m-16 space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-dark-blue)]">{title}</h2>
            <p className="text-lg text-[var(--color-dark-blue)]">{description}</p>
            <Link href="https://wa.me/584127521730" target="_blank" rel="noopener noreferrer">
              <button className="mt-8 bg-[var(--color-dark-blue)] hover:bg-[var(--color-dark-blue)]/90 text-[var(--)]">Más información</button>
            </Link>
          </div>
          <div className="relative h-[300px]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
