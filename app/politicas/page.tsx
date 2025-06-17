import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import React from "react";

export default function Politicas() {
  return (
    <>
      <NavBar />
      <main className="bg-[var(--theme-background)] text-[var(--theme-text)] p-8">
        <div className="container mx-auto my-10 md:my-20">
          <h1 className="text-3xl font-bold text-[var(--theme-text)] mb-8 text-center">Políticas Internas de GearSoftCA</h1>
          
          <section className="mb-8 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4">1. Código de Conducta:</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--brand-dark-blue)] opacity-90">
              <li>Respeto: Fomentar un ambiente de trabajo respetuoso y colaborativo entre todos los miembros del equipo.</li>
              <li>Confidencialidad: Proteger la información confidencial de la empresa y de los clientes.</li>
              <li>Integridad: Actuar con honestidad y transparencia en todas las interacciones.</li>
              <li>Ética profesional: Cumplir con las normas éticas de la industria del software.</li>
            </ul>
          </section>

          <section className="mb-8 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4">2. Uso de Equipos y Software:</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--brand-dark-blue)] opacity-90">
              <li>Asignación de equipos: Definir cómo se asignarán los equipos a cada empleado (propios o proporcionados por la empresa).</li>
              <li>Mantenimiento: Establecer procedimientos para el mantenimiento y cuidado de los equipos.</li>
              <li>Software: Especificar el software autorizado para uso laboral y personal en los equipos de la empresa.</li>
              <li>Acceso remoto: Establecer reglas para el acceso remoto a los sistemas de la empresa.</li>
            </ul>
          </section>

          <section className="mb-8 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4">3. Horarios de Trabajo y Flexibilidad:</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--brand-dark-blue)] opacity-90">
              <li>Horario base: Definir un horario base de trabajo, considerando la naturaleza del trabajo de desarrollo de software y la necesidad de flexibilidad.</li>
              <li>Horario flexible: Permitir cierta flexibilidad en los horarios, siempre y cuando se cumplan los objetivos del proyecto.</li>
              <li>Horas extras: Establecer las condiciones para realizar horas extras y cómo se compensarán.</li>
            </ul>
          </section>

          <section className="mb-8 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4">4. Comunicación Interna:</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--brand-dark-blue)] opacity-90">
              <li>Canales de comunicación: Definir los canales de comunicación formales e informales (reuniones, correo electrónico, plataformas de mensajería).</li>
              <li>Transparencia: Fomentar una comunicación abierta y transparente entre todos los miembros del equipo.</li>
            </ul>
          </section>

          <section className="mb-8 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4">5. Desarrollo Profesional:</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--brand-dark-blue)] opacity-90">
              <li>Capacitación: Fomentar el desarrollo profesional de los empleados a través de cursos, talleres y conferencias.</li>
              <li>Ascenso: Establecer criterios claros para los ascensos y promociones.</li>
            </ul>
          </section>

          {/* Añadir más secciones si es necesario, siguiendo el mismo patrón */}

        </div>
      </main>
      <Footer />
    </>
  );
}