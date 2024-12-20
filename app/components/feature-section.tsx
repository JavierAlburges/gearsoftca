import { Button } from "@/app/components/button"
import Image from "next/image"

interface FeatureSectionProps {
  title: string
  description: string
  imageUrl: string
  reverse?: boolean
}

export function FeatureSection({ title, description, imageUrl, reverse }: FeatureSectionProps) {
  return (
    <section className="py-20 bg-[var(--color-white)]">
      <div className="container">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-dark-blue)]">{title}</h2>
            <p className="text-lg text-[var(--color-dark-blue)]/80">{description}</p>
            <Button className="bg-[var(--color-dark-blue)] hover:bg-[var(--color-dark-blue)]/90 text-[var(--color-white)]">Más información</Button>
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
