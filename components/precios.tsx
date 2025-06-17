import Link from "next/link";

// Definición de tipos para los planes y características
interface Feature {
  id: string; // o number, si es más apropiado
  text: string;
}

interface Plan {
  name: string;
  price: string;
  features: Feature[];
}

// Datos de los planes (definidos localmente)
const plans: Plan[] = [
  {
    name: "Básico",
    price: "$50",
    features: [
      { id: "1", text: "Característica 1 del plan básico" },
      { id: "2", text: "Característica 2 del plan básico" },
      { id: "3", text: "Característica 3 del plan básico" },
    ],
  },
  {
    name: "Pro",
    price: "$100",
    features: [
      { id: "1", text: "Característica 1 del plan pro" },
      { id: "2", text: "Característica 2 del plan pro" },
      { id: "3", text: "Característica 3 del plan pro" },
      { id: "4", text: "Característica 4 del plan pro" },
    ],
  },
  {
    name: "Empresarial",
    price: "$200",
    features: [
      { id: "1", text: "Característica 1 del plan empresarial" },
      { id: "2", text: "Característica 2 del plan empresarial" },
      { id: "3", text: "Característica 3 del plan empresarial" },
      { id: "4", text: "Característica 4 del plan empresarial" },
      { id: "5", text: "Característica 5 del plan empresarial" },
    ],
  },
];

export function Precios() {
  return (
    <section className="px-8 py-8 bg-[var(--theme-background)]"> {/* Fondo principal oscuro */}
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--theme-text)]">Elige tu plan para la Web o Aplicaciones Moviles</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan: Plan) => (
            <div key={plan.name} className="flex flex-col justify-between bg-[var(--brand-white)] p-8 rounded-[var(--radius-lg)] shadow-lg border border-[var(--theme-border)]">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--brand-dark-blue)]">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6 text-[var(--brand-dark-blue)]">{plan.price}</p> {/* Precio con color azul oscuro, o puedes mantener el acento si prefieres: text-[var(--theme-accent)] */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature: Feature) => (
                    <li key={feature.id} className="flex items-start text-[var(--brand-dark-blue)] opacity-90">
                      <svg className="flex-shrink-0 h-6 w-6 text-[var(--brand-dark-blue)] mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="https://wa.me/584127521730" target="_blank" rel="noopener noreferrer">
                <button className="button button-primary w-full mt-4"> {/* Botón primario para 'Contactanos' en este contexto de tarjeta blanca */}
                  Contactanos
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
