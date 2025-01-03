"use client"

import Link from "next/link"
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { authenticateWithGoogle, verifyUserInCollection } from "@/lib/firebaseUtils"

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await authenticateWithGoogle();
      const userVerified = await verifyUserInCollection(user);
      if (userVerified) {
        setIsLoggedIn(true);
        router.push("/ServicioExpressControlPanel");
      } else {
        alert("Usuario no autorizado.");
      }
    } catch (error) {
      alert("Error durante la autenticación.");
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
          <button onClick={handleLogin} className="bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90 py-1 px-2 rounded text-base text-center flex items-center">
            <Image src="/images/logo-google.png" width={20} height={20} alt="Google Icon" className="mr-2"/>
            {isLoggedIn ? "Logeado" : "Iniciar Sesión con Google"}
          </button>
        </div>
        <div className={`flex-col md:flex-row md:flex space-x-4 ${isMenuOpen ? "flex flex-col space-y-2" : "hidden"} md:flex md:space-y-0`}>
          <Link href="/#servicios">
            <button className="text-[var(--color-dark-blue)] border-[var(--color-white)] bg-[var(--color-white)] hover:bg-[var(--color-white)]/90 hover:text-[var(--color-white] py-2 px-4 rounded">Servicios</button>
          </Link>
          <Link href="/#precios">
            <button className="text-[var(--color-dark-blue)] border-[var(--color-white)] bg-[var(--color-white)] hover:bg-[var(--color-white)]/90 hover:text-[var(--color-white] py-2 px-4 rounded">Precios</button>
          </Link>
          <Link href="/#equipo">
            <button className="text-[var(--color-dark-blue)] border-[var(--color-white)] bg-[var(--color-white)] hover:bg-[var(--color-white)]/90 hover:text-[var(--color-white] py-2 px-4 rounded">Equipo</button>
          </Link>
          <button onClick={handleLogin} className="hidden md:flex bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90 py-1 px-2 rounded text-base text-center items-center">
            <Image src="/images/logo-google.png" width={20} height={20} alt="Google Icon" className="mr-2"/>
            {isLoggedIn ? "Logeado" : "Iniciar Sesión con Google"}
          </button>
        </div>
      </div>
    </nav>
  )
}
