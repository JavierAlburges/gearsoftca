"use client";
import React from "react";

interface AdminSidebarProps {
  onSelectView: (view: string) => void;
  currentView: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onSelectView, currentView }) => {
  const menuItems = [
    { id: "registrarUsuario", label: "Registrar Usuario" },
    { id: "verificarUsuarios", label: "Verificar Usuarios" },
    { id: "verificarServicios", label: "Verificar Servicios" },
    { id: "verificarPagos", label: "Verificar Pagos de Servicios" }, // Nueva sección
  ];

  return (
    <aside className="w-64 min-h-screen bg-[var(--brand-white)] text-[var(--brand-dark-blue)] p-4 space-y-2 shadow-lg flex flex-col mt-6 rounded-[var(--radius-lg)]">
      <h2 className="text-xl font-semibold mb-4 text-[var(--brand-dark-blue)]">Panel de Admin</h2>
      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelectView(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[var(--button-height)]
                  ${
                    currentView === item.id
                      ? "bg-[var(--brand-dark-blue)] text-[var(--brand-white)] shadow-md"
                      : "bg-[var(--brand-white)] text-[var(--brand-dark-blue)] hover:bg-[var(--brand-light-blue)] hover:text-[var(--brand-dark-blue)] border border-[var(--brand-dark-blue)]"
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
