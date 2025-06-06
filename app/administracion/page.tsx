"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { auth, db } from "@/firebaseConfig";
import { verifyUserInCollection } from "@/lib/firebaseUtils";
import { setDoc, doc, collection, getDocs, query, limit, where } from "firebase/firestore";
import Link from "next/link";
import { Empleado, Usuario, Servicio } from "@/constantes/interfaces";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { FaEdit } from "react-icons/fa";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSearch, setUsuarioSearch] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [serviciosUsuario, setServiciosUsuario] = useState<Servicio[]>([]);
  const [referenciaFiltro, setReferenciaFiltro] = useState("");
  const [editandoEstado, setEditandoEstado] = useState<string | null>(null);
  const [nuevoEstado, setNuevoEstado] = useState<string>("");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "empleados", formData.ci), {
        ...formData,
        foto: ""
      });
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
    } catch (error) {
      console.error("Error registrando empleado: ", error);
    }
  };

  const handleUsuarioSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuarioSearch(e.target.value);
    if (e.target.value.trim() === "") {
      setUsuarios([]);
      setUsuarioSeleccionado(null);
      setServiciosUsuario([]);
      return;
    }
    const q = query(collection(db, "usuarios"), limit(10));
    const querySnapshot = await getDocs(q);
    const usuariosList: Usuario[] = querySnapshot.docs
      .map(doc => doc.data() as Usuario)
      .filter((u: Usuario) =>
        u.userName?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        u.email?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        u.ci?.toLowerCase().includes(e.target.value.toLowerCase())
      );
    setUsuarios(usuariosList);
  };

  const handleReferenciaFiltro = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenciaFiltro(e.target.value);
  };

  const handleSelectUsuario = async (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    let serviciosList: Servicio[] = [];
    if (referenciaFiltro.trim() !== "") {
      // Buscar por referencia exacta
      const q = query(collection(db, "solicitudes"), where("referencia", "==", referenciaFiltro));
      const querySnapshot = await getDocs(q);
      serviciosList = querySnapshot.docs.map(doc => doc.data() as Servicio);
    } else {
      // Traer los 3 últimos servicios del usuario
      const q = query(collection(db, "solicitudes"), where("userId", "==", usuario.uid), limit(3));
      const querySnapshot = await getDocs(q);
      serviciosList = querySnapshot.docs
        .map(doc => doc.data() as Servicio)
        .sort((a, b) => {
          const fechaA = a.fechaCreacion instanceof Date ? a.fechaCreacion.getTime() : new Date(a.fechaCreacion).getTime();
          const fechaB = b.fechaCreacion instanceof Date ? b.fechaCreacion.getTime() : new Date(b.fechaCreacion).getTime();
          return fechaB - fechaA;
        });
    }
    setServiciosUsuario(serviciosList);
  };

  // Suma de deuda de servicios completados
  const deudaServicios = serviciosUsuario
    .filter(s => s.estado === "Completado")
    .reduce((acc, s) => acc + (s.costo || 0), 0);

  const handleEditarEstado = (referencia: string, estadoActual: string) => {
    setEditandoEstado(referencia);
    setNuevoEstado(estadoActual);
  };

  const handleGuardarEstado = async (servicio: Servicio) => {
    if (!nuevoEstado) return;
    await setDoc(doc(db, "solicitudes", servicio.referencia), {
      ...servicio,
      estado: nuevoEstado
    });
    setEditandoEstado(null);
    // Refrescar servicios
    if (usuarioSeleccionado) await handleSelectUsuario(usuarioSeleccionado);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen pt-32 pb-40">
        <h1 className="text-3xl font-bold mb-6 text-[var(--color-dark-blue)]">Panel de Administración</h1>
        <p className="mb-4 text-gray-700">Bienvenido al panel de administración de la base de datos de Servicio Express.</p>
        <Link href="/">
          <span className="text-[var(--color-light-blue)] hover:underline">Volver al inicio</span>
        </Link>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-dark-blue)]">Gestión de Usuarios</h2>
          <p className="text-gray-700">Aquí puedes administrar los usuarios de la base de datos.</p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-dark-blue)]">Registrar Empleado</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[var(--color-dark-blue)]">CI:</label>
              <input
                type="text"
                name="ci"
                value={formData.ci}
                onChange={handleChange}
                className="w-full p-2 border border-[var(--color-gray)] rounded text-black"
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
                className="w-full p-2 border border-[var(--color-gray)] rounded text-black"
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
                className="w-full p-2 border border-[var(--color-gray)] rounded text-black"
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
                className="w-full p-2 border border-[var(--color-gray)] rounded text-black"
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
                className="w-full p-2 border border-[var(--color-gray)] rounded text-black"
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
                className="w-full p-2 border border-[var(--color-gray)] rounded text-black"
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
                className="w-full p-2 border border-[var(--color-gray)] rounded text-black"
                placeholder="Ej: Esta informacion la obtienes en Firebase"
                required
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-[var(--color-dark-blue)] text-[var(--color-white)] rounded">Registrar</button>
          </form>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-dark-blue)]">Buscar Empleados</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-[var(--color-gray)] rounded text-black"
            placeholder="Buscar por CI"
          />
          <ul className="text-black mt-4">
            {empleados.map(empleado => (
              <li key={empleado.ci} className="p-2 border-b border-[var(--color-gray)]">
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
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-dark-blue)]">Buscar Usuarios</h2>
          <input
            type="text"
            value={usuarioSearch}
            onChange={handleUsuarioSearch}
            className="w-full p-2 border border-[var(--color-gray)] rounded text-black mb-2"
            placeholder="Buscar por nombre, email o CI"
          />
          <input
            type="text"
            value={referenciaFiltro}
            onChange={handleReferenciaFiltro}
            className="w-full p-2 border border-[var(--color-gray)] rounded text-black mb-2"
            placeholder="Filtrar por número de referencia (opcional)"
          />
          <ul className="text-black mt-4">
            {usuarios.map(usuario => (
              <li key={usuario.uid} className="p-2 border-b border-[var(--color-gray)] cursor-pointer hover:bg-[var(--color-light-blue)]/10" onClick={() => handleSelectUsuario(usuario)}>
                <p><strong>Nombre:</strong> {usuario.userName}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                <p><strong>Saldo:</strong> {usuario.saldo ?? "No encontrado"}</p>
                <p><strong>Deuda:</strong> {usuario.deuda ?? "No encontrado"}</p>
                <p><strong>Push Token:</strong> {usuario.pushToken ?? "No encontrado"}</p>
              </li>
            ))}
          </ul>
          {usuarioSeleccionado && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-dark-blue)]">Panel de Usuario: {usuarioSeleccionado.userName}</h3>
              <p className="mb-2 text-[var(--color-dark-blue)] font-semibold">Deuda por servicios completados: <span className="text-red-600">{deudaServicios}</span></p>
              <h4 className="text-lg font-semibold mb-2 text-[var(--color-dark-blue)]">Servicios solicitados</h4>
              {serviciosUsuario.length === 0 ? (
                <p className="text-gray-500">No se encontraron servicios para este usuario.</p>
              ) : (
                <ul className="text-black mt-2">
                  {serviciosUsuario.map((servicio, idx) => (
                    <li key={servicio.referencia + idx} className="p-2 border-b border-[var(--color-gray)]">
                      <p><strong>Nombre:</strong> {servicio.userName}</p>
                      <p><strong>Persona Asignada:</strong> {servicio.personaAsignadaNombre}</p>
                      <p><strong>Referencia:</strong> {servicio.referencia}</p>
                      <p><strong>Fecha de Inicio:</strong> {servicio.fechaCreacion ? new Date(servicio.fechaCreacion).toLocaleString() : "No encontrada"}</p>
                      <p><strong>Fecha de Finalización:</strong> {servicio.fechaFinalizacion ? new Date(servicio.fechaFinalizacion).toLocaleString() : "No encontrada"}</p>
                      <p className="flex items-center">
                        <strong>Estado:</strong>
                        {editandoEstado === servicio.referencia ? (
                          <>
                            <select value={nuevoEstado} onChange={e => setNuevoEstado(e.target.value)} className="ml-2 p-1 border rounded">
                              <option value="En proceso">En proceso</option>
                              <option value="Completado">Completado</option>
                              <option value="Cancelado">Cancelado</option>
                              <option value="Pendiente">Pendiente</option>
                              <option value="Pagado">Pagado</option>
                            </select>
                            <button onClick={() => handleGuardarEstado(servicio)} className="ml-2 px-2 py-1 bg-green-500 text-white rounded">Guardar</button>
                            <button onClick={() => setEditandoEstado(null)} className="ml-2 px-2 py-1 bg-gray-400 text-white rounded">Cancelar</button>
                          </>
                        ) : (
                          <>
                            <span className="ml-2">{servicio.estado}</span>
                            <button onClick={() => handleEditarEstado(servicio.referencia, servicio.estado)} className="ml-2 text-blue-600"><FaEdit /></button>
                          </>
                        )}
                      </p>
                      <p><strong>Costo:</strong> {servicio.costo}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
