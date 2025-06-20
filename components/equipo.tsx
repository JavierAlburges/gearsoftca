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
    <section className="py-16 px-8 bg-[var(--brand-white)]"> {/* Fondo blanco para esta sección */}
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--brand-dark-blue)]">Equipo de trabajo</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[var(--brand-surface-light)] p-6 rounded-lg border border-[var(--theme-border)] shadow-lg transform transition-transform hover:scale-105" // Superficie clara para tarjetas
            >
              <p className="text-lg mb-6 text-[var(--brand-dark-blue)] text-center">{testimonial.quote}</p>
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-[var(--theme-accent)]" // Borde con color de acento
                />
                <div className="text-center">
                  <p className="font-semibold text-[var(--brand-dark-blue)]">{testimonial.author}</p>
                  <p className="text-sm text-[var(--brand-gray)]">{testimonial.role}</p> {/* Texto gris para el rol */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}