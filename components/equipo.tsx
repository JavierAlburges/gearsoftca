import Image from "next/image"

const testimonials = [
  {
    quote: "Gerente de proyectos con sólidos conocimientos en desarrollo web y móvil. Experiencia en el ciclo de vida completo del desarrollo de software, desde el diseño hasta la implementación. Mis habilidades incluyen programación en HTML, CSS, JavaScript, React, Node.js, React Native y Firebase.",
    author: "Javier Alburges",
    role: "Fundador",
    avatar: "/images/javier.jpg",
  },
  {
    quote: "Diseñadora apasionada y desarrolladora front-end. Centrado en crear experiencias de usuario significativas y atractivas a través del diseño y la resolución de problemas.",
    author: "María Fernanda Ferrer",
    role: "Graphic Designer | Front-End Developer",
    avatar: "/images/maria.jpeg",
  },
  {
    quote: "Apasionado por crear experiencias móviles excepcionales. Experiencia en el diseño, desarrollo y mantenimiento de aplicaciones Android nativas utilizando Kotlin. Contribuyo activamente al crecimiento de GearSoftCA, optimizando y escalando nuestras soluciones.",
    author: "Andonyth Espinoza",
    role: "FullStack | Android | Kotlin | SQL",
    avatar: "/images/andonyth.jpg",
  },
]

export function Equipo() {
  return (
    <section className="py-8 px-8 bg-[var(--color-white)]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-dark-blue)]">Equipo de trabajo</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[var(--color-light-blue)]/10 p-6 rounded-lg border border-[var(--color-light-blue)]/20">
              <p className="text-lg mb-4 text-[var(--color-dark-blue)]">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-[var(--color-dark-blue)]">{testimonial.author}</p>
                  <p className="text-sm text-[var(--color-dark-blue)]/70">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}