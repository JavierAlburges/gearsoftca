import React from 'react'
import { sql } from '@vercel/postgres';
 

const { rows } = await sql`SELECT * FROM "user"`;

export default function PaginaDB() {
  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='grid grid-cols-3 gap-4'>
          {rows.map((row) => (
            <>
            <p>{row.nombre.toString()}</p>
            <p> {row.apellido.toString()}</p>
            <p> {row.cedula_identidad.toString()}</p></>
          ))}
        </div>
      </div>
      
    </>
  )
}
