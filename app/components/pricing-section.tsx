import { Button } from "@/app/components/button"
import { Check } from 'lucide-react'

const plans = [
  {
    name: "Básico",
    price: "$0",
    features: ["Core features", "Up to 3 users", "1GB storage"],
  },
  {
    name: "Profesional",
    price: "$49.99",
    features: ["Advanced features", "Up to 20 users", "10GB storage", "Priority support"],
  },
  {
    name: "Empresa",
    price: "Personalizado",
    features: ["Custom features", "Unlimited users", "Unlimited storage", "24/7 support", "Custom integrations"],
  },
]

export function PricingSection() {
  return (
    <section className="py-20 bg-[var(--color-light-blue)]/10">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-white)]">Elige tu plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-[var(--color-white)] p-8 rounded-lg shadow-lg border border-[var(--color-light-blue)]/20">
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-dark-blue)]">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6 text-[var(--color-dark-blue)]">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="text-[var(--color-light-blue)]" size={20} />
                    <span className="text-[var(--color-dark-blue)]">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-[var(--color-black)] hover:bg-[var(--color-black)]/90 text-[var(--color-white)]">Get Started</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
