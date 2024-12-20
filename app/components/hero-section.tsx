import { Button } from "@/app/components/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="pt-32 pb-16 bg-[var(--color-dark-blue)]">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center self-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-[var(--color-white)]">
              Soluciones de software innovadoras con GearSoftCA
            </h1>
            <p className="text-lg text-[var(--color-light-blue)]">
              Empoderar a las empresas con soluciones tecnológicas de vanguardia y desarrollo de software experto.
            </p>
            <Button size="lg" className="bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90">
              Pruébalo gratis
            </Button>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/images/gearsoftlogo.png"
              alt="GearSoft"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
