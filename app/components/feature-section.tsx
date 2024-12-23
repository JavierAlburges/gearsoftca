import { Button } from "@/app/components/button"
import Image from "next/image"
import Link from "next/link"

interface FeatureSectionProps {
  title: string
  description: string
  imageUrl: string
  reverse?: boolean
}

export function FeatureSection({ title, description, imageUrl, reverse }: FeatureSectionProps) {
  return (
    <section className="py-20 bg-[var(--color-white)]">
      <div className="container mx-auto">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-dark-blue)]">{title}</h2>
            <p className="text-lg text-[var(--color-dark-blue)]">{description}</p>
            <Link href="https://api.whatsapp.com/send?phone=584127521730">
              <Button className="bg-[var(--color-dark-blue)] hover:bg-[var(--color-dark-blue)]/90 text-[var(--)]">Más información</Button>
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
