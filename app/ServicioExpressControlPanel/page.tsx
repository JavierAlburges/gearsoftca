"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { auth } from "@/firebaseConfig";
import { verifyUserInCollection } from "@/lib/firebaseUtils";
import Link from "next/link";

export default function ServicioExpressControlPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const isVerified = await verifyUserInCollection(user);
        if (!isVerified) {
          router.push("/");
        } else {
          // Agregar un delay de 3 segundos
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      } else {
        router.push("/");
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Panel de Administración</h1>
      <p className="mb-4 text-gray-700">Bienvenido al panel de administración de la base de datos de Servicio Express.</p>
      <Link href="/" target="_blank" rel="noopener noreferrer">
        <span className="text-blue-500 hover:underline">Volver al inicio</span>
      </Link>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Gestión de Usuarios</h2>
        <p className="text-gray-700">Aquí puedes administrar los usuarios de la base de datos.</p>
        {/* Aquí puedes agregar más funcionalidades de administración */}
      </div>
    </div>
  )
}
