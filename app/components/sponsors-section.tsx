import Image from "next/image"

const sponsors = [
  { name: "Apple", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Microsoft", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Slack", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Google", logo: "/placeholder.svg?height=40&width=40" },
]

export function SponsorsSection() {
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto">
        <h2 className="text-xl font-semibold text-center mb-8">Nuestros patrocinadores</h2>
        <div className="flex justify-center items-center gap-12 flex-wrap">
          {sponsors.map((sponsor) => (
            <Image
              key={sponsor.name}
              src={sponsor.logo}
              alt={sponsor.name}
              width={120}
              height={40}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

