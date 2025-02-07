"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { auth, db } from "@/firebaseConfig";
import { verifyUserInCollection } from "@/lib/firebaseUtils";
import { setDoc, doc, collection, getDocs, query, limit, serverTimestamp, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
import { Empleado } from "@/constantes/interfaces";

export default function ServicioExpressControlPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Empleado>({
    ci: "",
    email: "",
    linkedin: "",
    telefono: "",
    serviciosHabilitados: [],
    uid: "",
    userName: "",
    numeroServiciosRealizados: 0,
    foto: "",
    fechaRegistro: new Date()
  });
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const isVerified = await verifyUserInCollection(user);
        if (!isVerified) {
          router.push("/");
        } else {
          setLoading(false); // Muestra el panel si está verificado
        }
      } else {
        router.push("/");
      }
    };

    checkUser();
  }, [router]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      const q = query(collection(db, "empleados"), limit(10));
      const querySnapshot = await getDocs(q);
      const empleadosList = querySnapshot.docs.map(doc => {
        const data = doc.data();

        return { ...data, id: doc.id } as Empleado & { id: string };
      });
      setEmpleados(empleadosList);
    };

    fetchEmpleados();
  }, []);

  const handleSearch = async (term: string) => {
    if (term.trim() === "") {
      setEmpleados([]);
      return;
    }

    const q = query(collection(db, "empleados"), where("ci", ">=", term), where("ci", "<=", term + "\uf8ff"), limit(5));
    const querySnapshot = await getDocs(q);
    const empleadosList = querySnapshot.docs.map(doc => {
      const data = doc.data();

      return { ...data, id: doc.id } as Empleado & { id: string };
    });
    setEmpleados(empleadosList);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      handleSearch(e.target.value);
    }, 1000);
    setSearchTimeout(timeout);
  };

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

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      userName: `${e.target.value} ${apellido}`
    }));
  };

  const handleApellidoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApellido(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      userName: `${nombre} ${e.target.value}`
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (file) {
        const storage = getStorage();
        const fileRef = ref(storage, `fotosEmpleados/${formData.ci}`);
        await uploadBytes(fileRef, file);
        const fotoURL = await getDownloadURL(fileRef);
        await setDoc(doc(db, "empleados", formData.ci), {
          ...formData,
          foto: fotoURL,
          timestamp: serverTimestamp()
        });
      } else {
        await setDoc(doc(db, "empleados", formData.ci), {
          ...formData,
          timestamp: serverTimestamp()
        });
      }
      alert("Empleado registrado exitosamente");
      setFormData({
        ci: "",
        email: "",
        linkedin: "",
        telefono: "",
        serviciosHabilitados: [],
        uid: "",
        userName: "",
        numeroServiciosRealizados: 0,
        foto: "",
        fechaRegistro: new Date()
      });
      setNombre("");
      setApellido("");
      setFile(null);
    } catch (error) {
      console.error("Error registrando empleado: ", error);
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
      <Link href="/">
        <span className="text-blue-500 hover:underline">Volver al inicio</span>
      </Link>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Gestión de Usuarios</h2>
        <p className="text-gray-700">Aquí puedes administrar los usuarios de la base de datos.</p>
        {/* Aquí puedes agregar más funcionalidades de administración */}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Registrar Empleado</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-[var(--color-dark-blue)]">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={handleNombreChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Ej: Javier"
              required
            />
          </div>
          <div>
            <label className="block text-[var(--color-dark-blue)]">Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={apellido}
              onChange={handleApellidoChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Ej: Alburges"
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
              name="telefono"
              value={formData.telefono}
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
            <label className="block text-[var(--color-dark-blue)]">Foto:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Registrar</button>
        </form>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Buscar Empleados</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded text-black"
          placeholder="Buscar por CI"
        />
        <ul className="text-black mt-4">
          {empleados.map(empleado => (
            <li key={empleado.ci} className="p-2 border-b border-gray-300">
              <p><strong>CI:</strong> {empleado.ci}</p>
              <p><strong>Email:</strong> {empleado.email}</p>
              <p><strong>LinkedIn:</strong> {empleado.linkedin}</p>
              <p><strong>Número de Teléfono:</strong> {empleado.telefono}</p>
              <p><strong>Servicios Habilitados:</strong> {empleado.serviciosHabilitados.join(", ")}</p>
              <p><strong>UID:</strong> {empleado.uid}</p>
              <p><strong>Nombre de Usuario:</strong> {empleado.userName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
