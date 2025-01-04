import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import React from "react"

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="bg-[var(--color-white)] p-8">
        <div className="container mx-auto my-20">
          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">1. Recopilación de Información:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Datos personales: Recopilamos información personal como nombre, dirección de correo electrónico y número de teléfono cuando los usuarios se registran en ServicioExpress.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Datos de uso: Recopilamos información sobre cómo los usuarios interactúan con nuestro servicio, incluyendo las páginas visitadas y las acciones realizadas.</p>

          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">2. Uso de la Información:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Proveer servicios: Utilizamos la información recopilada para proporcionar y mejorar nuestros servicios.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Comunicación: Utilizamos la información de contacto para enviar notificaciones importantes y actualizaciones sobre el servicio.</p>

          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">3. Compartición de Información:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Terceros: No compartimos información personal con terceros, excepto cuando es necesario para proporcionar nuestros servicios o cuando la ley lo requiere.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Proveedores de servicios: Podemos compartir información con proveedores de servicios que nos ayudan a operar nuestro negocio.</p>

          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">4. Seguridad de la Información:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Medidas de seguridad: Implementamos medidas de seguridad para proteger la información personal contra el acceso no autorizado y la divulgación.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Actualizaciones de seguridad: Revisamos y actualizamos regularmente nuestras prácticas de seguridad para mejorar la protección de los datos.</p>

          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">5. Derechos de los Usuarios:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Acceso y corrección: Los usuarios tienen derecho a acceder y corregir su información personal.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Eliminación: Los usuarios pueden solicitar la eliminación de su información personal en cualquier momento.</p>

          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-4">6. Cambios en la Política de Privacidad:</h2>
          <p className="text-lg text-[var(--color-black)] mb-2">Actualizaciones: Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Notificaremos a los usuarios sobre cambios significativos.</p>
          <p className="text-lg text-[var(--color-black)] mb-2">Fecha de vigencia: Esta política de privacidad es efectiva a partir de la fecha de publicación.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}