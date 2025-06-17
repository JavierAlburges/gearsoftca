"use client"

import Link from "next/link"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { authenticateWithGoogle, getUserDataIfAdmin } from "@/lib/firebaseUtils"; // Cambiado verifyUserInCollection a getUserDataIfAdmin
import { signOut, onAuthStateChanged, User } from "firebase/auth"; // Importar User
import { auth } from "@/firebaseConfig";
import { FaBars } from "react-icons/fa"; // Icono hamburguesa

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false); 
  const [menuOpen, setMenuOpen] = useState(false);
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
    <nav className="bg-[var(--theme-primary-background)] text-[var(--theme-text-on-primary)] p-4 border-b border-[var(--theme-border)] fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center space-x-2 no-underline">
          <Image src={"/images/gearsoftlogo.png"} width={50} height={50} alt="GearSoftCA Logo"/>
          <span className="text-xl font-bold">GearSoftCA</span>
        </Link>
        {/* Menú móvil: hamburguesa */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none p-2"
            aria-label="Abrir menú"
          >
            <FaBars size={28} />
          </button>
        </div>
        {/* Menú móvil desplegable */}
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-[var(--theme-primary-background)] border border-[var(--theme-border)] rounded-lg shadow-lg p-4 flex flex-col space-y-4 md:hidden z-50">
            <Link href="/#servicios" className="no-underline text-[var(--theme-text-on-primary)] font-bold rounded-md transition-colors hover:bg-[var(--brand-white)] hover:text-[var(--brand-dark-blue)] active:bg-[var(--brand-white)] active:text-[var(--brand-dark-blue)] px-2 py-2" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
              Servicios
            </Link>
            <Link href="/#precios" className="no-underline text-[var(--theme-text-on-primary)] font-bold rounded-md transition-colors hover:bg-[var(--brand-white)] hover:text-[var(--brand-dark-blue)] active:bg-[var(--brand-white)] active:text-[var(--brand-dark-blue)] px-2 py-2" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
              Precios
            </Link>
            <Link href="/#equipo" className="no-underline text-[var(--theme-text-on-primary)] font-bold rounded-md transition-colors hover:bg-[var(--brand-white)] hover:text-[var(--brand-dark-blue)] active:bg-[var(--brand-white)] active:text-[var(--brand-dark-blue)] px-2 py-2" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
              Equipo
            </Link>
            <Link href="/politicasDePrivacidad" className="no-underline text-[var(--theme-text-on-primary)] font-bold rounded-md transition-colors hover:bg-[var(--brand-white)] hover:text-[var(--brand-dark-blue)] active:bg-[var(--brand-white)] active:text-[var(--brand-dark-blue)] px-2 py-2" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
              Políticas
            </Link>
            {isLoggedIn && isVerified && (
              <button onClick={() => { router.push("/administracion"); setMenuOpen(false); }} className="button button-primary text-sm font-medium flex items-center">
                <Image src="/images/admin-panel-icon.png" width={20} height={20} alt="Admin Panel Icon" className="mr-2"/>
                Admin
              </button>
            )}
            {isLoggedIn && (
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="button button-secondary text-sm font-medium">
                Logout
              </button>
            )}
          </div>
        )}
        {/* Menú para Desktop */}
        <div className="hidden md:flex items-center space-x-1">
          <Link href="/#servicios" className="inline-flex items-center justify-center min-h-[var(--button-height)] px-[var(--spacing-md)] py-[var(--spacing-xs)] text-[var(--theme-text-on-primary)] font-bold rounded-[var(--radius-md)] hover:text-[var(--theme-accent)] hover:bg-[rgba(var(--brand-white-rgb),0.1)] transition-colors no-underline">
            Servicios
          </Link>
          <Link href="/#precios" className="inline-flex items-center justify-center min-h-[var(--button-height)] px-[var(--spacing-md)] py-[var(--spacing-xs)] text-[var(--theme-text-on-primary)] font-bold rounded-[var(--radius-md)] hover:text-[var(--theme-accent)] hover:bg-[rgba(var(--brand-white-rgb),0.1)] transition-colors no-underline">
            Precios
          </Link>
          <Link href="/#equipo" className="inline-flex items-center justify-center min-h-[var(--button-height)] px-[var(--spacing-md)] py-[var(--spacing-xs)] text-[var(--theme-text-on-primary)] font-bold rounded-[var(--radius-md)] hover:text-[var(--theme-accent)] hover:bg-[rgba(var(--brand-white-rgb),0.1)] transition-colors no-underline">
            Equipo
          </Link>
          <Link href="/politicasDePrivacidad" className="inline-flex items-center justify-center min-h-[var(--button-height)] px-[var(--spacing-md)] py-[var(--spacing-xs)] text-[var(--theme-text-on-primary)] font-bold rounded-[var(--radius-md)] hover:text-[var(--theme-accent)] hover:bg-[rgba(var(--brand-white-rgb),0.1)] transition-colors no-underline">
            Políticas
          </Link>
          {/* Botones de login/admin/logout solo en desktop */}
          {!isLoggedIn && (
            <button 
              onClick={handleLogin} 
              className="button button-primary text-sm font-medium flex items-center ml-2"
            >
              <Image src="/images/logo-google.png" width={20} height={20} alt="Google Icon" className="mr-2"/>
              Login
            </button>
          )}
          {isLoggedIn && isVerified && (
            <button 
              onClick={() => router.push("/administracion")} 
              className="button button-primary text-sm font-medium flex items-center ml-2"
            >
              <Image src="/images/admin-panel-icon.png" width={20} height={20} alt="Admin Panel Icon" className="mr-2"/>
              Admin
            </button>
          )}
          {isLoggedIn && (
            <button 
              onClick={handleLogout} 
              className="button button-secondary text-sm font-medium ml-2"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
