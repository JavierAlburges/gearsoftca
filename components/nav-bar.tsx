"use client"

import Link from "next/link"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { authenticateWithGoogle, getUserDataIfAdmin } from "@/lib/firebaseUtils"; // Cambiado verifyUserInCollection a getUserDataIfAdmin
import { signOut, onAuthStateChanged, User } from "firebase/auth"; // Importar User
import { auth } from "@/firebaseConfig";

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => { 
      if (user) {
        setIsLoggedIn(true);
        const adminUserData = await getUserDataIfAdmin(user.uid); 
        setIsVerified(!!adminUserData); 
      } else {
        setIsLoggedIn(false);
        setIsVerified(false);
      }
    });

    return () => unsubscribe();
  }, []); // Removido router de las dependencias si no se usa directamente en este efecto para evitar re-ejecuciones innecesarias.

  const handleLogin = async () => {
    try {
      // Inicia el proceso de autenticación.
      // onAuthStateChanged se encargará de actualizar los estados isLoggedIn e isVerified
      // una vez que el estado de autenticación cambie.
      await authenticateWithGoogle();
      // No es necesario establecer isLoggedIn, setIsVerified, o mostrar alertas aquí,
      // ya que onAuthStateChanged manejará la lógica de post-autenticación.
    } catch (error) {
      // Esto capturará errores si authenticateWithGoogle() falla (ej. popup cerrado).
      alert("Error durante el proceso de inicio de sesión o fue cancelado.");
      console.error("Error en handleLogin durante la autenticación:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setIsVerified(false);
      router.push("/");
    } catch (error) {
      alert("Error durante el cierre de sesión.");
      console.error(error);
    }
  };

  return (
    <nav className="bg-[var(--color-dark-blue)] text-[var(--color-white)] p-4 border-b border-[var(--color-white)] fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <div className="flex items-center space-x-2">
            <Image src={"/images/gearsoftlogo.png"} width={50} height={50} alt="GearSoftCA Logo"/>
            <span className="text-xl font-bold">GearSoftCA</span>
          </div>  
        </Link>
        <div className="flex items-center space-x-4 md:hidden">
          {!isLoggedIn && (
            <button onClick={handleLogin} className="bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90 py-2 px-4 rounded text-sm font-medium flex items-center">
              <Image src="/images/logo-google.png" width={20} height={20} alt="Google Icon" className="mr-2 md:hidden"/>
              <span className="hidden md:inline">Iniciar Sesión con Google</span>
            </button>
          )}
          {isLoggedIn && isVerified && (
            <button onClick={() => router.push("/administracion")} className="bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90 py-2 px-4 rounded text-sm font-medium flex items-center">
              <Image src="/images/admin-panel-icon.png" width={20} height={20} alt="Admin Panel Icon" className="mr-2"/>
            </button>
          )}
          {isLoggedIn && (
            <button onClick={handleLogout} className="bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90 py-2 px-4 rounded text-sm font-medium flex items-center">
              <Image src="/images/singing-out.png" width={20} height={20} alt="Sign Out Icon" className="mr-2"/>
            </button>
          )}
        </div>
        <div className="flex-col md:flex-row md:flex space-x-4 hidden md:space-y-0">
          <Link href="/#servicios">
            <button className="text-[var(--color-dark-blue)] border-[var(--color-white)] bg-[var(--color-white)] hover:bg-[var(--color-white)]/90 hover:text-[var(--color-white)] py-2 px-4 rounded text-sm font-medium">
              Servicios
            </button>
          </Link>
          <Link href="/#precios">
            <button className="text-[var(--color-dark-blue)] border-[var(--color-white)] bg-[var(--color-white)] hover:bg-[var(--color-white)]/90 hover:text-[var(--color-white)] py-2 px-4 rounded text-sm font-medium">
              Precios
            </button>
          </Link>
          <Link href="/#equipo">
            <button className="text-[var(--color-dark-blue)] border-[var(--color-white)] bg-[var(--color-white)] hover:bg-[var(--color-white)]/90 hover:text-[var(--color-white)] py-2 px-4 rounded text-sm font-medium">
              Equipo
            </button>
          </Link>
          <Link href="/politicasDePrivacidad">
            <button className="text-[var(--color-dark-blue)] border-[var(--color-white)] bg-[var(--color-white)] hover:bg-[var(--color-white)]/90 hover:text-[var(--color-white)] py-2 px-4 rounded text-sm font-medium">
              Política de Privacidad
            </button>
          </Link>
          {!isLoggedIn && (
            <button onClick={handleLogin} className="hidden md:flex bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90 py-2 px-4 rounded text-sm font-medium items-center">
              <Image src="/images/logo-google.png" width={20} height={20} alt="Google Icon" className="mr-2"/>
              Iniciar Sesión con Google
            </button>
          )}
          {isLoggedIn && isVerified && (
            <button onClick={() => router.push("/administracion")} className="hidden md:flex bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90 py-2 px-4 rounded text-sm font-medium items-center">
              <Image src="/images/admin-panel-icon.png" width={20} height={20} alt="Admin Panel Icon" className="mr-2"/>
              Panel de Administración
            </button>
          )}
          {isLoggedIn && (
            <button onClick={handleLogout} className="hidden md:flex bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90 py-2 px-4 rounded text-sm font-medium items-center">
              <Image src="/images/singing-out.png" width={20} height={20} alt="Sign Out Icon" className="mr-2"/>
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
