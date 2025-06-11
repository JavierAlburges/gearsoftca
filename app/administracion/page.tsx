"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { auth, db } from "@/firebaseConfig";
import { getUserDataIfAdmin } from "@/lib/firebaseUtils";
import { setDoc, doc, collection, getDocs, query, limit, where, Timestamp } from "firebase/firestore";
import Link from "next/link";
import { Usuario, Servicio } from "@/constantes/interfaces";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export default function ServicioExpressControlPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Usuario>>({
    ci: "",
    email: "",
    linkedin: "",
    telefono: "",
    serviciosHabilitados: [],
    uid: "",
    userName: "",
    numeroServiciosRealizados: 0,
    foto: "",
    fechaRegistro: new Date(),
    tipoUsuario: "empleado" // Por defecto al registrar desde aquí
  });
  const [usuariosEmpleados, setUsuariosEmpleados] = useState<Usuario[]>([]); // Para empleados
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuariosClientes, setUsuariosClientes] = useState<Usuario[]>([]); // Para clientes u otros usuarios
  const [usuarioSearch, setUsuarioSearch] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [serviciosUsuario, setServiciosUsuario] = useState<Servicio[]>([]);
  const [referenciaFiltro, setReferenciaFiltro] = useState("");
  const [editandoEstado, setEditandoEstado] = useState<string | null>(null); // referencia del servicio
  const [nuevoEstadoServicio, setNuevoEstadoServicio] = useState<Servicio['estadoServicio']>('PendientePagoInspeccion'); // Ajustado a estadoServicio

  useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser;
      if (user) {
        // Usa la nueva función getUserDataIfAdmin
        const adminUserData = await getUserDataIfAdmin(user.uid);
        if (adminUserData) { // Si devuelve datos, es un administrador
          setLoading(false);
        } else {
          router.push("/"); // No es admin o no se encontró, redirige
        }
      } else {
        router.push("/"); // No hay usuario logueado
      }
    };

    checkUser();
  }, [router]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      // Busca en 'usuarios' donde tipoUsuario es 'empleado'
      const q = query(collection(db, "usuarios"), where("tipoUsuario", "==", "empleado"), limit(10));
      const querySnapshot = await getDocs(q);
      const empleadosList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { ...data, id: doc.id } as Usuario & { id: string };
      });
      setUsuariosEmpleados(empleadosList);
    };

    fetchEmpleados();
  }, []);

  const handleSearchEmpleados = async (term: string) => {
    if (term.trim() === "") {
      // Podrías recargar la lista inicial de empleados o vaciarla
      const qInit = query(collection(db, "usuarios"), where("tipoUsuario", "==", "empleado"), limit(10));
      const querySnapshotInit = await getDocs(qInit);
      setUsuariosEmpleados(querySnapshotInit.docs.map(doc => ({ ...doc.data(), id: doc.id } as Usuario & { id: string })));
      return;
    }

    const q = query(
      collection(db, "usuarios"),
      where("tipoUsuario", "==", "empleado"),
      where("ci", ">=", term),
      where("ci", "<=", term + "\\uf8ff"),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    const empleadosList = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return { ...data, id: doc.id } as Usuario & { id: string };
    });
    setUsuariosEmpleados(empleadosList);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      handleSearchEmpleados(e.target.value);
    }, 1000);
    setSearchTimeout(timeout);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prevData) => ({
        ...prevData,
        serviciosHabilitados: checked
          ? [...(prevData.serviciosHabilitados || []), value]
          : (prevData.serviciosHabilitados || []).filter((service) => service !== value)
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
    if (!formData.uid) { // Es importante que el UID del empleado (obtenido de Firebase Auth) se asigne
      alert("El UID es requerido para registrar un empleado.");
      return;
    }
    try {
      // Guarda en la colección 'usuarios' con tipoUsuario 'empleado'
      // El ID del documento será el CI o el UID, según tu preferencia. Usaré CI como antes.
      await setDoc(doc(db, "usuarios", formData.ci!), {
        ...formData,
        tipoUsuario: "empleado", // Asegura el tipo de usuario
        fechaRegistro: formData.fechaRegistro instanceof Date ? Timestamp.fromDate(formData.fechaRegistro) : formData.fechaRegistro || Timestamp.now(), // Asegura fecha de registro
        // Otros campos específicos de empleado que estén en formData
      });
      alert("Empleado registrado exitosamente como usuario");
      setFormData({ // Resetea a Partial<Usuario>
        ci: "",
        email: "",
        linkedin: "",
        telefono: "",
        serviciosHabilitados: [],
        uid: "",
        userName: "",
        numeroServiciosRealizados: 0,
        foto: "",
        fechaRegistro: new Date(),
        tipoUsuario: "empleado"
      });
      setNombre("");
      setApellido("");
      // Refrescar lista de empleados
      const q = query(collection(db, "usuarios"), where("tipoUsuario", "==", "empleado"), limit(10));
      const querySnapshot = await getDocs(q);
      setUsuariosEmpleados(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Usuario & { id: string })));
    } catch (error) {
      console.error("Error registrando empleado: ", error);
      alert("Error registrando empleado.");
    }
  };

  const handleUsuarioSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuarioSearch(e.target.value);
    if (e.target.value.trim() === "") {
      setUsuariosClientes([]);
      setUsuarioSeleccionado(null);
      setServiciosUsuario([]);
      return;
    }
    // Busca en 'usuarios' (podrías filtrar por tipoUsuario si solo quieres clientes aquí)
    const q = query(collection(db, "usuarios"), limit(10)); // Podrías añadir where("tipoUsuario", "==", "cliente")
    const querySnapshot = await getDocs(q);
    const usuariosList: Usuario[] = querySnapshot.docs
      .map(doc => doc.data() as Usuario)
      .filter((u: Usuario) =>
        (u.userName?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        u.email?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        u.ci?.toLowerCase().includes(e.target.value.toLowerCase())) &&
        u.tipoUsuario !== 'empleado' // Opcional: excluir empleados de esta búsqueda general
      );
    setUsuariosClientes(usuariosList);
  };

  const handleReferenciaFiltro = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenciaFiltro(e.target.value);
  };

  const handleSelectUsuario = async (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    let serviciosList: Servicio[] = [];
    if (referenciaFiltro.trim() !== "") {
      const q = query(collection(db, "solicitudes"), where("userId", "==", usuario.uid), where("referencia", "==", referenciaFiltro));
      const querySnapshot = await getDocs(q);
      serviciosList = querySnapshot.docs.map(doc => doc.data() as Servicio);
    } else {
      const q = query(collection(db, "solicitudes"), where("userId", "==", usuario.uid), limit(3)); // Considera ordenar por fechaCreacion descendente
      const querySnapshot = await getDocs(q);
      serviciosList = querySnapshot.docs
        .map(doc => doc.data() as Servicio)
        .sort((a, b) => {
          const fechaA = a.fechaCreacion instanceof Timestamp ? a.fechaCreacion.toDate().getTime() : (a.fechaCreacion as Date)?.getTime() || 0;
          const fechaB = b.fechaCreacion instanceof Timestamp ? b.fechaCreacion.toDate().getTime() : (b.fechaCreacion as Date)?.getTime() || 0;
          return fechaB - fechaA;
        });
    }
    setServiciosUsuario(serviciosList);
  };

  const deudaServicios = serviciosUsuario
    .filter(s => s.estadoServicio === "Completado") // Usa estadoServicio
    .reduce((acc, s) => acc + (s.costoFinalAcordado || s.costoTotalCotizado || 0), 0); // Usa costoFinalAcordado o costoTotalCotizado

  const handleEditarEstado = (referencia: string, estadoActual: Servicio['estadoServicio']) => {
    setEditandoEstado(referencia);
    setNuevoEstadoServicio(estadoActual);
  };

  const handleGuardarEstado = async (servicio: Servicio) => {
    if (!nuevoEstadoServicio) return;
    try {
      await setDoc(doc(db, "solicitudes", servicio.referencia), {
        ...servicio,
        estadoServicio: nuevoEstadoServicio // Actualiza estadoServicio
      });
      alert("Estado del servicio actualizado.");
      setEditandoEstado(null);
      if (usuarioSeleccionado) await handleSelectUsuario(usuarioSeleccionado); // Refrescar servicios
    } catch (error) {
      console.error("Error actualizando estado: ", error);
      alert("Error actualizando estado del servicio.");
    }
  };
  
  const estadosServicioPosibles: Servicio['estadoServicio'][] = [
    'PendientePagoInspeccion', 'PendienteAsignacionInspeccion', 'InspeccionAsignada',
    'PendienteCotizacionCliente', 'CotizacionAprobada', 'EnProceso',
    'EnRevisionCliente', 'Completado', 'CanceladoPorCliente', 'CanceladoPorEmpleado', 'Disputa'
  ];


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
        <p className="mb-4 text-gray-700">Bienvenido al panel de administración.</p>
        <Link href="/">
          <span className="text-[var(--color-light-blue)] hover:underline">Volver al inicio</span>
        </Link>
        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-dark-blue)]">Registrar Nuevo Empleado</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
            {/* Campos del formulario para registrar empleado (Usuario con tipoUsuario='empleado') */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--color-dark-blue)]">Nombre:</label>
                <input
                  type="text"
                  name="nombre" // Este input actualiza el estado 'nombre' local
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
                  name="apellido" // Este input actualiza el estado 'apellido' local
                  value={apellido}
                  onChange={handleApellidoChange}
                  className="w-full p-2 border border-[var(--color-gray)] rounded text-black"
                  placeholder="Ej: Alburges"
                  required
                />
              </div>
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
              <label className="block text-[var(--color-dark-blue)]">LinkedIn (Opcional):</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full p-2 border border-[var(--color-gray)] rounded text-black"
                placeholder="Ej: https://www.linkedin.com/company/gearsoftca/"
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
                      name="serviciosHabilitados" // El 'name' aquí es manejado en handleChange para actualizar el array
                      value={service}
                      checked={(formData.serviciosHabilitados || []).includes(service)}
                      onChange={handleChange}
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-[var(--color-dark-blue)]">{service}</span>
                  </label>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-[var(--color-dark-blue)]">UID (Firebase Auth UID):</label>
              <input
                type="text"
                name="uid"
                value={formData.uid}
                onChange={handleChange}
                className="w-full p-2 border border-[var(--color-gray)] rounded text-black"
                placeholder="UID del usuario en Firebase Authentication"
                required
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-[var(--color-dark-blue)] text-[var(--color-white)] rounded hover:bg-opacity-90">Registrar Empleado</button>
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-dark-blue)]">Buscar Empleados</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-[var(--color-gray)] rounded text-black mb-4"
            placeholder="Buscar empleados por CI"
          />
          <ul className="text-black mt-4 space-y-3">
            {usuariosEmpleados.map(empleado => (
              <li key={empleado.uid || empleado.ci} className="p-4 border border-[var(--color-gray)] rounded bg-white shadow">
                <p><strong>Nombre:</strong> {empleado.userName}</p>
                <p><strong>CI:</strong> {empleado.ci}</p>
                <p><strong>Email:</strong> {empleado.email}</p>
                <p><strong>Teléfono:</strong> {empleado.telefono}</p>
                {empleado.linkedin && <p><strong>LinkedIn:</strong> <a href={empleado.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{empleado.linkedin}</a></p>}
                <p><strong>Servicios Habilitados:</strong> {(empleado.serviciosHabilitados || []).join(", ")}</p>
                <p><strong>UID:</strong> {empleado.uid}</p>
                <p><strong>Servicios Realizados:</strong> {empleado.numeroServiciosRealizados || 0}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-dark-blue)]">Buscar Usuarios (Clientes)</h2>
          <input
            type="text"
            value={usuarioSearch}
            onChange={handleUsuarioSearch}
            className="w-full p-2 border border-[var(--color-gray)] rounded text-black mb-2"
            placeholder="Buscar por nombre, email o CI (clientes)"
          />
          <input
            type="text"
            value={referenciaFiltro}
            onChange={handleReferenciaFiltro}
            className="w-full p-2 border border-[var(--color-gray)] rounded text-black mb-4"
            placeholder="Filtrar por número de referencia de servicio (opcional)"
          />
          <ul className="text-black mt-4 space-y-3">
            {usuariosClientes.map(usuario => (
              <li key={usuario.uid} className="p-4 border border-[var(--color-gray)] rounded bg-white shadow cursor-pointer hover:bg-[var(--color-light-blue)]/10" onClick={() => handleSelectUsuario(usuario)}>
                <p><strong>Nombre:</strong> {usuario.userName}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                <p><strong>CI:</strong> {usuario.ci}</p>
                <p><strong>Saldo:</strong> {usuario.saldo ?? "N/A"}</p>
                <p><strong>Deuda:</strong> {usuario.deuda ?? "N/A"}</p>
              </li>
            ))}
          </ul>

          {usuarioSeleccionado && (
            <div className="mt-6 bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-dark-blue)]">Panel de Usuario: {usuarioSeleccionado.userName}</h3>
              <p className="mb-2 text-[var(--color-dark-blue)] font-semibold">Deuda por servicios completados: <span className="text-red-600">{deudaServicios} USD</span></p>
              <h4 className="text-lg font-semibold mb-2 text-[var(--color-dark-blue)]">Servicios solicitados</h4>
              {serviciosUsuario.length === 0 ? (
                <p className="text-gray-500">No se encontraron servicios para este usuario.</p>
              ) : (
                <ul className="text-black mt-2 space-y-3">
                  {serviciosUsuario.map((servicio) => (
                    <li key={servicio.referencia} className="p-4 border border-[var(--color-gray)] rounded">
                      <p><strong>Referencia:</strong> {servicio.referencia}</p>
                      <p><strong>Servicio:</strong> {servicio.servicioSolicitado} - {servicio.descripcion}</p>
                      <p><strong>Estado Actual:</strong> <span className="font-semibold">{servicio.estadoServicio}</span></p>
                      <p><strong>Persona Asignada:</strong> {servicio.personaAsignadaNombre || "No asignado"}</p>
                      <p><strong>Fecha Creación:</strong> {servicio.fechaCreacion instanceof Timestamp ? servicio.fechaCreacion.toDate().toLocaleDateString() : (servicio.fechaCreacion as Date)?.toLocaleDateString() || 'N/A'}</p>
                      {servicio.costoInspeccion > 0 && <p><strong>Costo Inspección:</strong> {servicio.costoInspeccion} USD</p>}
                      {servicio.pagoInspeccionRealizado && <p><strong>Pago Inspección:</strong> Realizado</p>}
                      {servicio.costoTotalCotizado && <p><strong>Costo Cotizado:</strong> {servicio.costoTotalCotizado} USD</p>}
                      {servicio.costoFinalAcordado && <p><strong>Costo Final:</strong> {servicio.costoFinalAcordado} USD</p>}
                      
                      {editandoEstado === servicio.referencia ? (
                        <div className="mt-2">
                          <select
                            value={nuevoEstadoServicio}
                            onChange={(e) => setNuevoEstadoServicio(e.target.value as Servicio['estadoServicio'])}
                            className="w-full p-2 border border-[var(--color-gray)] rounded text-black mb-2"
                          >
                            {estadosServicioPosibles.map(estado => (
                              <option key={estado} value={estado}>{estado}</option>
                            ))}
                          </select>
                          <button onClick={() => handleGuardarEstado(servicio)} className="px-3 py-1 bg-green-500 text-white rounded mr-2 hover:bg-green-600">Guardar</button>
                          <button onClick={() => setEditandoEstado(null)} className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400">Cancelar</button>
                        </div>
                      ) : (
                        <button onClick={() => handleEditarEstado(servicio.referencia, servicio.estadoServicio)} className="mt-2 px-3 py-1 bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] rounded hover:bg-opacity-90">
                          Cambiar Estado
                        </button>
                      )}
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
