"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { auth, db } from "@/firebaseConfig"; // Importar la base de datos de Firebase
import { verifyUserInCollection } from "@/lib/firebaseUtils";
import { setDoc, doc, collection, getDocs, query, orderBy, limit } from "firebase/firestore"; // Importar funciones necesarias de Firestore
import Link from "next/link";

interface Prestador {
  ci: string;
  email: string;
  linkedin: string;
  phoneNumber: string;
  serviciosHabilitados: string[];
  uid: string;
  userName: string;
}

export default function ServicioExpressControlPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Prestador>({
    ci: "",
    email: "",
    linkedin: "",
    phoneNumber: "",
    serviciosHabilitados: [],
    uid: "",
    userName: ""
  });
  const [docName, setDocName] = useState("");
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);

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

  useEffect(() => {
    const fetchPrestadores = async () => {
      const q = query(collection(db, "prestadoresDeServicios"), orderBy("timestamp", "desc"), limit(3));
      const querySnapshot = await getDocs(q);
      const prestadoresList = querySnapshot.docs.map(doc => doc.data() as Prestador);
      setPrestadores(prestadoresList);
    };

    fetchPrestadores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        serviciosHabilitados: checked
          ? [...prevData.serviciosHabilitados, value]
          : prevData.serviciosHabilitados.filter((service) => service !== value)
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "ci" ? value.charAt(0).toUpperCase() + value.slice(1) : value
      }));
    }
  };

  const handleDocNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "prestadoresDeServicios", docName), formData);
      alert("Prestador de servicio registrado exitosamente");
      setFormData({
        ci: "",
        email: "",
        linkedin: "",
        phoneNumber: "",
        serviciosHabilitados: [],
        uid: "",
        userName: ""
      });
      setDocName("");
    } catch (error) {
      console.error("Error registrando prestador de servicio: ", error);
    }
  };

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
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Registrar Prestador de Servicio</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[var(--color-dark-blue)]">Nombre del Documento:</label>
            <input
              type="text"
              value={docName}
              onChange={handleDocNameChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Ej: V12345678"
              required
            />
          </div>
          <div>
            <label className="block text-[var(--color-dark-blue)]">CI:</label>
            <input
              type="text"
              name="ci"
              value={formData.ci}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Ej: V12345678"
              required
            />
          </div>
          <div>
            <label className="block text-[var(--color-dark-blue)]">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Ej: gearsoftca@gmail.com"
              required
            />
          </div>
          <div>
            <label className="block text-[var(--color-dark-blue)]">LinkedIn:</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Ej: https://www.linkedin.com/company/gearsoftca/"
              required
            />
          </div>
          <div>
            <label className="block text-[var(--color-dark-blue)]">Número de Teléfono:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Ej: 04127521730"
              required
            />
          </div>
          <div>
            <label className="block text-[var(--color-dark-blue)]">Servicios Habilitados:</label>
            {["Electricidad", "Plomería", "Refrigeración", "Construcción", "Servicio Doméstico"].map((service) => (
              <div key={service}>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="serviciosHabilitados"
                    value={service}
                    checked={formData.serviciosHabilitados.includes(service)}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2 text-[var(--color-dark-blue)]">{service}</span>
                </label>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-[var(--color-dark-blue)]">UID:</label>
            <input
              type="text"
              name="uid"
              value={formData.uid}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Ej: Esta informacion la obtienes en Firebase"
              required
            />
          </div>
          <div>
            <label className="block text-[var(--color-dark-blue)]">Nombre de Usuario:</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Ej: Javier Alburges"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Registrar</button>
        </form>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Lista de Prestadores de Servicio</h2>
        <ul className="text-black">
          {prestadores.map(prestador => (
            <li key={prestador.ci} className="p-2 border-b border-gray-300">
              <p><strong>CI:</strong> {prestador.ci}</p>
              <p><strong>Email:</strong> {prestador.email}</p>
              <p><strong>LinkedIn:</strong> {prestador.linkedin}</p>
              <p><strong>Número de Teléfono:</strong> {prestador.phoneNumber}</p>
              <p><strong>Servicios Habilitados:</strong> {prestador.serviciosHabilitados.join(", ")}</p>
              <p><strong>UID:</strong> {prestador.uid}</p>
              <p><strong>Nombre de Usuario:</strong> {prestador.userName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
