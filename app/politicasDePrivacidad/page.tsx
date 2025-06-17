import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import React from "react";

export default function politicasDePrivacidad() {
  return (
    <>
      <NavBar />
      <main className="bg-[var(--theme-background)] text-[var(--theme-text)] p-8">
        <div className="container mx-auto my-10 md:my-20">
          <h1 className="text-3xl font-bold text-[var(--theme-text)] mb-8 text-center" id="politicas-de-privacidad">Políticas de Privacidad</h1>
          
          <section className="mb-8 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4">1. Recopilación de Información:</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--brand-dark-blue)] opacity-90">
              <li>Datos personales: Recopilamos información personal como nombre, dirección de correo electrónico y número de teléfono cuando los usuarios se registran en ServicioExpress.</li>
              <li>Datos de uso: Recopilamos información sobre cómo los usuarios interactúan con nuestro servicio, incluyendo las páginas visitadas y las acciones realizadas.</li>
            </ul>
          </section>

          <section className="mb-8 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4">2. Uso de la Información:</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--brand-dark-blue)] opacity-90">
              <li>Proveer servicios: Utilizamos la información recopilada para proporcionar y mejorar nuestros servicios.</li>
              <li>Comunicación: Utilizamos la información de contacto para enviar notificaciones importantes y actualizaciones sobre el servicio.</li>
            </ul>
          </section>

          <section className="mb-8 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4">3. Compartición de Información:</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--brand-dark-blue)] opacity-90">
              <li>Terceros: No compartimos información personal con terceros, excepto cuando es necesario para proporcionar nuestros servicios o cuando la ley lo requiere.</li>
              <li>Proveedores de servicios: Podemos compartir información con proveedores de servicios que nos ayudan a operar nuestro negocio.</li>
            </ul>
          </section>

          <section className="mb-8 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4">4. Seguridad de la Información:</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--brand-dark-blue)] opacity-90">
              <li>Medidas de seguridad: Implementamos medidas de seguridad para proteger la información personal contra el acceso no autorizado y la divulgación.</li>
              <li>Actualizaciones de seguridad: Revisamos y actualizamos regularmente nuestras prácticas de seguridad para mejorar la protección de los datos.</li>
            </ul>
          </section>

          <section className="mb-8 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4">5. Derechos de los Usuarios:</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--brand-dark-blue)] opacity-90">
              <li>Acceso y corrección: Los usuarios tienen derecho a acceder y corregir su información personal.</li>
              <li>Eliminación: Los usuarios pueden solicitar la eliminación de su información personal en cualquier momento.</li>
            </ul>
          </section>

          <section className="mb-8 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-4">6. Cambios en la Política de Privacidad:</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--brand-dark-blue)] opacity-90">
              <li>Actualizaciones: Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Notificaremos a los usuarios sobre cambios significativos.</li>
              <li>Fecha de vigencia: Esta política de privacidad es efectiva a partir de la fecha de publicación.</li>
            </ul>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}