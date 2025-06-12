/*"use client";

import { useState, useEffect } from 'react';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';
import { Usuario } from '@/constantes/interfaces';
import { NavBar } from '@/components/nav-bar';
import { Footer } from '@/components/footer';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Importar useRouter

export default function AdminSetupPage() {
  const router = useRouter(); // Obtener la instancia de router
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleBecomeAdmin = async () => {
    setIsLoading(true);
    setMessage('');

    if (!currentUser) {
      setMessage("Error: Debes iniciar sesión primero.");
      setIsLoading(false);
      return;
    }

    // UID del usuario que se convertirá en administrador (el tuyo)
    const adminUID = "t3opX5AMKsewyQWCdHOMNbxC30B3";

    if (currentUser.uid !== adminUID) {
      setMessage("Error: Estás autenticado con una cuenta diferente a la que intentas configurar como administrador.");
      setIsLoading(false);
      return;
    }

    // Convertir la fecha de string a Timestamp de Firestore
    // "24 de abril de 2025, 4:49:51 p.m. UTC-4" es 2025-04-24T16:49:51-04:00
    // Esto es 2025-04-24T20:49:51Z en UTC.
    const fechaRegistroTimestamp = Timestamp.fromDate(new Date(Date.UTC(2025, 3, 24, 20, 49, 51))); // Mes 3 es Abril (0-indexado)

    // Asegurarse de que adminData cumpla con la interfaz Usuario
    const adminData: Usuario = {
      uid: adminUID, // El UID de autenticación se sigue guardando en el documento
      ci: "V23893393", // Corregido
      email: "javieralburges@gmail.com",
      userName: "Javier Alburges",
      telefono: "04127521730",
      fechaRegistro: fechaRegistroTimestamp,
      foto: "", // Opcional, puede ser undefined si la interfaz lo permite
      pushToken: "chl4OVaxQpSD1WtGnWJ51U:APA91bH_2YUnVQ8a2u0WrfEr2TqEkrowNDS02KQ6ZrnbkJUgytzKkIcrg9yvSnM4bDr2LLC8khS0udCUNAsiKg3-KRcAUuXTmANNyeJla-3zw26EWQFPPrU", // Opcional
      tipoUsuario: "administrador",
      // Campos específicos de empleado (asegúrate que sean opcionales o proporciona valores)
      deudaEmpleado: 459, // Opcional o 0 si no aplica
      diferenciaSaldoDeudaEmpleado: 1071, // Opcional o 0
      linkedin: "https://www.linkedin.com/in/javieralburges/", // Opcional
      numeroServiciosRealizados: 11, // Opcional o 0
      saldoEmpleado: 1530, // Opcional o 0
      serviciosHabilitados: ["Electricidad", "Refrigeración"], // Opcional o []
      // Rellenar otros campos opcionales de Usuario si es necesario, o asegurarse que son opcionales en la interfaz
      // Ejemplo: saldo, deuda (para clientes), ubicacionGoogleMaps, etc.
    };

    if (!adminData.ci) {
      setMessage("Error: El número de CI es obligatorio para registrar al administrador.");
      setIsLoading(false);
      return;
    }

    try {
      // UID del usuario específico que puede convertirse en administrador
      const adminUID = "t3opX5AMKsewyQWCdHOMNbxC30B3";
      const currentUser = auth.currentUser;

      if (currentUser && currentUser.uid === adminUID) {
        const adminData = {
          uid: adminUID, // UID de autenticación de Firebase
          nombre: "Andony",
          apellido: "Soto",
          ci: "V23893393", // CI del administrador, se usará como ID del documento
          email: "sth.andony@gmail.com", // Email del administrador
          telefono: "04126405408",
          cargo: "Gerente de Operaciones", // O el cargo que corresponda
          departamento: "Gerencia", // O el departamento
          fechaContratacion: Timestamp.now(), // Fecha actual como ejemplo
          tipoUsuario: "administrador", // Establecer como administrador
          estado: "activo", // Estado inicial
          direccion: "Maracaibo", // Dirección del administrador
          // fotoURL: // Opcional: URL a una foto de perfil si se gestiona
        };

        // Usar la CI como ID del documento
        await setDoc(doc(db, "usuarios", adminData.ci), adminData, { merge: true });
        alert("¡Felicidades! Ahora eres administrador.");
        router.push("/administracion"); // Redirigir al panel de administración
      } else {
        alert("Esta acción solo puede ser realizada por el usuario designado.");
      }
    } catch (error) {
      console.error("Error al configurar el perfil de administrador:", error);
      let errorMessage = 'Error al configurar el perfil de administrador. Revisa la consola para más detalles.';
      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 min-h-screen pt-32 pb-40 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-6 text-[var(--color-dark-blue)]">Configuración de Administrador</h1>
          
          {!currentUser ? (
            <p className="mb-4 text-red-500">Debes iniciar sesión para continuar.</p>
          ) : (
            <p className="mb-4 text-gray-700">
              Autenticado como: {currentUser.email} (UID: {currentUser.uid})
            </p>
          )}

          <p className="mb-4 text-sm text-gray-500">
            Haz clic en el botón para configurar la cuenta con UID <strong className="text-black">t3opX5AMKsewyQWCdHOMNbxC30B3</strong> como administrador.
            Asegúrate de estar autenticado con esta cuenta.
          </p>
          
          <button
            onClick={handleBecomeAdmin}
            disabled={isLoading || !currentUser || currentUser.uid !== "t3opX5AMKsewyQWCdHOMNbxC30B3"}
            className="bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-150 ease-in-out w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Procesando...' : 'Convertirme en Administrador'}
          </button>
          
          {message && (
            <p className={`mt-6 text-sm ${message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
           <p className="mt-4 text-xs text-gray-400">
            Esta página es solo para fines de desarrollo y configuración inicial.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
  */