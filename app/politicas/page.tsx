import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import React from "react"


export default function Home() {
  return (
    <>
      <NavBar />
      <main className="bg-[var(--color-white)] p-8">
        <div className="container mx-auto my-20">
          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">1. Código de Conducta:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Respeto: Fomentar un ambiente de trabajo respetuoso y colaborativo entre todos los miembros del equipo.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Confidencialidad: Proteger la información confidencial de la empresa y de los clientes.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Integridad: Actuar con honestidad y transparencia en todas las interacciones.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Ética profesional: Cumplir con las normas éticas de la industria del software.</p>

          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">2. Uso de Equipos y Software:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Asignación de equipos: Definir cómo se asignarán los equipos a cada empleado (propios o proporcionados por la empresa).</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Mantenimiento: Establecer procedimientos para el mantenimiento y cuidado de los equipos.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Software: Especificar el software autorizado para uso laboral y personal en los equipos de la empresa.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Acceso remoto: Establecer reglas para el acceso remoto a los sistemas de la empresa.</p>

          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">3. Horarios de Trabajo y Flexibilidad:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Horario base: Definir un horario base de trabajo, considerando la naturaleza del trabajo de desarrollo de software y la necesidad de flexibilidad.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Horario flexible: Permitir cierta flexibilidad en los horarios, siempre y cuando se cumplan los objetivos del proyecto.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Horas extras: Establecer las condiciones para realizar horas extras y cómo se compensarán.</p>

          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">4. Comunicación Interna:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Canales de comunicación: Definir los canales de comunicación formales e informales (reuniones, correo electrónico, plataformas de mensajería).</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Transparencia: Fomentar una comunicación abierta y transparente entre todos los miembros del equipo.</p>

          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">5. Desarrollo Profesional:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Capacitación: Fomentar el desarrollo profesional de los empleados a través de cursos, talleres y conferencias.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Ascenso: Establecer criterios claros para los ascensos y promociones.</p>

          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">6. Conflictos y Resolución de Problemas:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Procedimiento: Establecer un procedimiento para la resolución de conflictos de manera justa y equitativa.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Mediación: Designar a un mediador interno o externo para ayudar a resolver disputas.</p>

          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">7. Propiedad Intelectual:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Autoría: Definir quién es el propietario de los derechos de autor sobre el software desarrollado.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Uso de código abierto: Establecer las reglas para el uso de código abierto en los proyectos.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}