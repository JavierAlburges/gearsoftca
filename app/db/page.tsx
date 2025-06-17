import React from 'react'
import { sql } from '@vercel/postgres';
 
// Estilos consistentes con el tema oscuro para el fondo general,
// pero las tarjetas internas tendrán fondo blanco y texto azul oscuro.
const { rows } = await sql`SELECT * FROM "user"`;

export default function DB() {
  return (
    <>
      <div className='container mx-auto p-4 bg-[var(--theme-background)] text-[var(--theme-text)] min-h-screen'>
        <h1 className="text-3xl font-bold text-center mb-8">Datos de Usuarios (Vercel Postgres)</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {rows.map((row) => (
            <div key={row.cedula_identidad} className="bg-[var(--brand-white)] p-4 rounded-[var(--radius-md)] shadow-md">
              <p className="font-semibold text-[var(--brand-dark-blue)]">{row.nombre.toString()} {row.apellido.toString()}</p>
              <p className="text-sm text-[var(--brand-dark-blue)] opacity-80">CI: {row.cedula_identidad.toString()}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

