import Image from "next/image"

const sponsors = [
  { name: "Urbe", logo: "/images/logo-urbe.png?height=40&width=40" },
  { name: "Logros", logo: "/images/logo-logros.jpg?height=40&width=40" },
  { name: "Lukiven", logo: "/images/logo-lukiven.jpg?height=40&width=40" },
  { name: "PressStart", logo: "/images/pressstart.webp?height=40&width=40" },
]

export function Clientes() {
  return (
    <section className="py-16 bg-[var(--theme-primary-background)]"> {/* Fondo principal oscuro */}
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-[var(--theme-text-on-primary)] mb-4">Nuestros Clientes</h2>
        <p className="text-lg text-[var(--theme-text-on-primary)] opacity-80 mb-12"> {/* Texto sobre fondo primario, con ligera opacidad */}
          Estas son algunas de las empresas que confían en nosotros.
        </p>
        <div className="flex justify-center items-center gap-12 flex-wrap">
          {sponsors.map((sponsor) => (
            <div key={sponsor.name}>
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={120}
                height={40}
                className="opacity-70 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

