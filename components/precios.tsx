import Link from "next/link"

const plans = [
  {
    name: "Paquete Básico (Web)",
    price: "$300",
    features: ["Diseño de página web de hasta 5 páginas.", "Diseño responsivo (adaptable a móviles y tables).", "Integración básica de redes sociales.", "Formulario de contacto", "Optimización básica para motores de búsqueda (SEO)."],
  },
  {
    name: "Paquete Intermedio (Web)",
    price: "$800",
    features: ["Todo lo del Paquete Básico.", "Hasta 10 páginas.", "Integración con Google Analytics.", "Optimización avanzada para motores de búsqueda (SEO).", "Soporte técnico durante 3 meses"],
  },
  {
    name: "Paquete Avanzado (Web)",
    price: "$6.000 en adelante",
    features: ["Todo lo del Paquete Intermedio.", "Páginas ilimitadas.", "Tienda en línea (e-comerse) con hasta 50 productos.", "24/7 support", "Integración con sistemas de pago.", "Funcionalidades personalizadas (formularios avanzados, bases de datos, etc.).", "Soporte técnico durante 6 meses."],
  },
  {
    name: "Paquete Premium (Web)",
    price: "Personalizado",
    features: ["Todo lo del Paquete Avanzado", "Desarrollo de aplicaciones web personalizadas.", "Integraciones avanzadas (CRM, ERP, etc.).", "Mantenimiento y soporte técnico durante 1 año.", "Consultoría y análisis de rendimiento."],
  },
  {
    name: "Paquete Básico (Móvil)",
    price: "$2.500",
    features: ["Desarrollo de una aplicación con hasta 5 pantallas.", "Diseño responsivo.", "Funcionalidades básicas (formularios, navegación simple).", "Publicación en Google Play y App Store.", "Soporte técnico durante 1 mes."],
  },
  {
    name: "Paquete Intermedio (Móvil)",
    price: "$6.000",
    features: ["Todo lo del Paquete Básico.", "Hasta 10 pantallas.", "Integración con APIs externas.", "Notificaciones push", "Optimización para rendimiento", "Soporte técnico durante 3 meses."],
  },
  {
    name: "Paquete Avanzado (Móvil)",
    price: "$12.000 en adelante",
    features: ["Todo lo del Paquete Intermedio" ,"Pantallas ilimitadas.", "Funcionalidades avanzadas (geolocalización, pagos en línea).", "Integración con bases de datos.", "Pruebas y control de calidad exhaustivos.", "Soporte técnico durante 6 meses."],
  },
  {
    name: "Paquete Premium (Móvil)",
    price: "$25,000 USD en adelante",
    features: ["Todo lo del Paquete Avanzado." ,"Desarrollo de funcionalidades personalizadas.", "Integraciones avanzadas (CRM, ERP, etc.).", "Mantenimiento y soporte técnico durante 1 año.", "Consultoría y análisis de rendimiento."],
  },
]

export function Precios() {
  return (
    <section className="px-8 py-8 bg-[var(--color-light-blue)]/10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-white)]">Elige tu plan para la Web o Aplicaciones Moviles</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-[var(--color-white)] p-8 rounded-lg shadow-lg border border-[var(--color-light-blue)]/20">
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-dark-blue)]">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6 text-[var(--color-dark-blue)]">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-[var(--color-dark-blue)]">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="https://api.whatsapp.com/send?phone=584127521730" target="_blank" rel="noopener noreferrer">
                <button className="w-full bg-[var(--color-black)] hover:bg-[var(--color-black)]/90 text-[var(--color-white)] py-2 px-4 rounded">Contactanos</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
