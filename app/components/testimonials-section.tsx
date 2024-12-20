import Image from "next/image"

const testimonials = [
  {
    quote: "GearSoft has revolutionized our development workflow.",
    author: "Sarah Johnson",
    role: "CTO",
    avatar: "/images/avatar-1.png",
  },
  {
    quote: "The most reliable software development partner we've worked with.",
    author: "Michael Chen",
    role: "Tech Lead",
    avatar: "/images/avatar-2.png",
  },
  {
    quote: "Outstanding technical expertise and customer service.",
    author: "Emma Davis",
    role: "Project Manager",
    avatar: "/images/avatar-3.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[var(--color-white)]">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-dark-blue)]">Lo que dicen nuestros clientes</h2>
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