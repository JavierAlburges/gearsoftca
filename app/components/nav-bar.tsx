"use client"

import Link from "next/link"
import { Button } from "@/app/components/button"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from 'lucide-react'

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#141d48] border-b border-[var(--color-light-blue)]/10">
      <div className="container flex items-center justify-around h-16">
        <Link href="/" className="flex items-center space-x-3">
          <Image 
            src="/images/gearsoftlogo.png"
            alt="GearSoft Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-semibold text-xl text-[var(--color-white)]">GearSoft</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-[var(--color-white)] hover:text-[var(--color-light-blue)]">Servicios</Button>
          <Button variant="ghost" className="text-[var(--color-white)] hover:text-[var(--color-light-blue)]">Precios</Button>
          <Button variant="ghost" className="text-[var(--color-white)] hover:text-[var(--color-light-blue)]">Contacto</Button>
          <Button variant="outline" className="text-[var(--color-white)] border-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-dark-blue)]">Inicio de sesion</Button>
          <Button className="bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90">Registro</Button>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="text-[var(--color-white)]" /> : <Menu className="text-[var(--color-white)]" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--color-black)] p-4">
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" className="text-[var(--color-white)] hover:text-[var(--color-light-blue)] w-full justify-start">Servicios</Button>
            <Button variant="ghost" className="text-[var(--color-white)] hover:text-[var(--color-light-blue)] w-full justify-start">Precios</Button>
            <Button variant="ghost" className="text-[var(--color-white)] hover:text-[var(--color-light-blue)] w-full justify-start">Contacto</Button>
            <Button variant="outline" className="text-[var(--color-white)] border-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-dark-blue)] w-full">Inicio de sesion</Button>
            <Button className="bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/90 w-full">Registro</Button>
          </div>
        </div>
      )}
    </nav>
  )
}