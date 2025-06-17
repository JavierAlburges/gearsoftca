"use client";

// 1. IMPORTACIONES Y TIPOS
import { useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { auth, db } from "@/firebaseConfig";
import { getUserDataIfAdmin } from "@/lib/firebaseUtils";
import { setDoc, doc, collection, getDocs, query, limit, where, Timestamp, updateDoc, orderBy, getDoc } from "firebase/firestore";
import { Usuario, Servicio } from "@/constantes/interfaces";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { AdminSidebar } from "@/components/AdminSidebar";

// 2. COMPONENTE PRINCIPAL
export default function ServicioExpressControlPanel() {
  // 2.1 HOOKS DE ESTADO
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("registrarUsuario");
  const [formData, setFormData] = useState<Partial<Usuario>>({
    ci: "",
    email: "",
    linkedin: "",
    telefono: "",
    serviciosHabilitados: [],
    nombreUsuario: "",
    numeroServiciosRealizados: 0,
    foto: "",
    fechaRegistro: new Date(),
    tipoUsuario: "empleado"
  });
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuariosClientes, setUsuariosClientes] = useState<Usuario[]>([]);
  const [usuarioSearch, setUsuarioSearch] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [serviciosUsuario, setServiciosUsuario] = useState<Servicio[]>([]);
  const [allServices, setAllServices] = useState<Servicio[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [serviceSearchTerm, setServiceSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState<Servicio[]>([]);
  const [editandoEstado, setEditandoEstado] = useState<string | null>(null);
  const [nuevoEstadoServicio, setNuevoEstadoServicio] = useState<Servicio['estadoServicio']>('pendientePago');
  const [usuarioExistente, setUsuarioExistente] = useState<Usuario | null>(null);
  const [tipoDocumento, setTipoDocumento] = useState("V");
  const [ciNumero, setCiNumero] = useState("");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState(false);

  // 2.2 HOOKS DE EFECTO Y CALLBACK
  useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const adminUserData = await getUserDataIfAdmin(user.uid);
        if (adminUserData) {
          setLoading(false);
        } else {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    };
    checkUser();
  }, [router]);

  const fetchEmpleados = useCallback(async () => {
    const q = query(collection(db, "usuarios"), where("tipoUsuario", "==", "empleado"), limit(10));
    await getDocs(q);
  }, []);

  useEffect(() => {
    if (currentView === "registrarUsuario" || currentView === "verificarUsuarios") {
      fetchEmpleados();
    }
  }, [currentView, fetchEmpleados]);

  const fetchAllServices = useCallback(async () => {
    setLoadingServices(true);
    try {
      const q = query(collection(db, "solicitudes"), orderBy("fechaCreacion", "desc"));
      const querySnapshot = await getDocs(q);
      const servicesList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          referencia: doc.id, // El ID es el número de referencia
          fechaCreacion: data.fechaCreacion instanceof Timestamp ? data.fechaCreacion.toDate() : new Date(data.fechaCreacion),
          fechaAsignacion: data.fechaAsignacion instanceof Timestamp ? data.fechaAsignacion.toDate() : (data.fechaAsignacion ? new Date(data.fechaAsignacion) : undefined),
          fechaFinalizacion: data.fechaFinalizacion instanceof Timestamp ? data.fechaFinalizacion.toDate() : (data.fechaFinalizacion ? new Date(data.fechaFinalizacion) : undefined),
        } as Servicio;
      });
      setAllServices(servicesList);
      setFilteredServices(servicesList);
    } catch (error) {
      console.error("Error fetching all services: ", error);
      alert("Error al cargar los servicios.");
    }
    setLoadingServices(false);
  }, []);

  useEffect(() => {
    if (currentView === "verificarServicios") {
      fetchAllServices();
    }
  }, [currentView, fetchAllServices]);

  useEffect(() => {
    if (serviceSearchTerm.trim() === "") {
      setFilteredServices(allServices);
    } else {
      const lowercasedFilter = serviceSearchTerm.toLowerCase();
      const filtered = allServices.filter(service =>
        service.referencia.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredServices(filtered);
    }
  }, [serviceSearchTerm, allServices]);

  useEffect(() => {
    const buscarUsuarioPorCI = async () => {
      if (formData.ci && formData.ci.length > 3) {
        const docRef = doc(db, "usuarios", formData.ci);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as Usuario;
          setUsuarioExistente(data);
          setFormData({ ...data });
          setNombre(data.nombreUsuario?.split(" ")[0] || "");
          setApellido(data.nombreUsuario?.split(" ").slice(1).join(" ") || "");
        } else {
          setUsuarioExistente(null);
        }
      } else {
        setUsuarioExistente(null);
      }
    };
    buscarUsuarioPorCI();
  }, [formData.ci]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ci: ciNumero ? tipoDocumento + ciNumero : ""
    }));
  }, [tipoDocumento, ciNumero]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // 3. FUNCIONES AUXILIARES Y HANDLERS
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const validateEmail = (email: string) => /.+@.+\..+/.test(email);
  const validatePhone = (phone: string) => /^\d{10,15}$/.test(phone.replace(/\D/g, ''));

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
      nombreUsuario: `${e.target.value} ${apellido}`
    }));
  };

  const handleApellidoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApellido(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      nombreUsuario: `${nombre} ${e.target.value}`
    }));
  };

  const handleSelectView = (view: string) => {
    setCurrentView(view);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.ci) {
      showToast("El CI es requerido para registrar un empleado.", "error");
      return;
    }
    if (!validateEmail(formData.email || "")) {
      showToast("Email inválido.", "error");
      return;
    }
    if (!validatePhone(formData.telefono || "")) {
      showToast("Teléfono inválido. Debe tener entre 10 y 15 dígitos.", "error");
      return;
    }
    setSaving(true);
    try {
      const userToSave: Usuario = {
        ...formData,
        uid: formData.uid || doc(collection(db, "usuarios")).id,
        ci: formData.ci!,
        email: formData.email!,
        nombreUsuario: `${nombre} ${apellido}`,
        telefono: formData.telefono!,
        fechaRegistro: formData.fechaRegistro instanceof Date ? Timestamp.fromDate(formData.fechaRegistro) : formData.fechaRegistro || Timestamp.now(),
        tipoUsuario: formData.tipoUsuario || "empleado",
        serviciosHabilitados: formData.serviciosHabilitados || [],
        numeroServiciosRealizados: formData.numeroServiciosRealizados || 0,
      };
      await setDoc(doc(db, "usuarios", userToSave.ci), userToSave);
      showToast("Empleado registrado/actualizado exitosamente", "success");
      setFormData({
        ci: "",
        email: "",
        linkedin: "",
        telefono: "",
        serviciosHabilitados: [],
        nombreUsuario: "",
        numeroServiciosRealizados: 0,
        foto: "",
        fechaRegistro: new Date(),
        tipoUsuario: "empleado"
      });
      setNombre("");
      setApellido("");
      fetchEmpleados();
      setUsuarioExistente(null);
    } catch (error) {
      console.error("Error registrando empleado: ", error);
      showToast("Error registrando empleado.", "error");
    }
    setSaving(false);
  };

  const fetchUsuarios = async (term: string) => {
    if (term.trim() === "") {
      setUsuariosClientes([]);
      return;
    }
    const q = query(collection(db, "usuarios"), limit(10));
    const querySnapshot = await getDocs(q);
    const usuariosList = querySnapshot.docs
      .map(doc => doc.data() as Usuario)
      .filter(u =>
        u.nombreUsuario?.toLowerCase().includes(term.toLowerCase()) ||
        u.ci?.toLowerCase().includes(term.toLowerCase())
      );
    setUsuariosClientes(usuariosList);
  };

  const handleUsuarioSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setUsuarioSearch(term);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      fetchUsuarios(term);
    }, 500);
    setSearchTimeout(timeout);
  };

  const handleSelectUsuario = async (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setUsuarioSearch(usuario.nombreUsuario); 
    setUsuariosClientes([]); 
    if (usuario.uid) {
      const qServicios = query(collection(db, "servicios"), where("uidCliente", "==", usuario.uid));
      const snapshotServicios = await getDocs(qServicios);
      const serviciosList = snapshotServicios.docs.map(doc => ({
        ...doc.data(),
        referencia: doc.id,
        fechaCreacion: doc.data().fechaCreacion instanceof Timestamp ? doc.data().fechaCreacion.toDate() : new Date(doc.data().fechaCreacion),
        fechaAsignacion: doc.data().fechaAsignacion instanceof Timestamp ? doc.data().fechaAsignacion.toDate() : (doc.data().fechaAsignacion ? new Date(doc.data().fechaAsignacion) : undefined),
        fechaFinalizacion: doc.data().fechaFinalizacion instanceof Timestamp ? doc.data().fechaFinalizacion.toDate() : (doc.data().fechaFinalizacion ? new Date(doc.data().fechaFinalizacion) : undefined),
      } as Servicio));
      setServiciosUsuario(serviciosList);
    }
  };

  const handleUpdateEstadoServicio = async (referencia: string, nuevoEstado: Servicio['estadoServicio']) => {
    try {
      const servicioRef = doc(db, "servicios", referencia);
      await updateDoc(servicioRef, { estadoServicio: nuevoEstado });
      showToast("Estado del servicio actualizado.", "success");
      setEditandoEstado(null);
      if (usuarioSeleccionado && usuarioSeleccionado.uid) {
        const qServicios = query(collection(db, "servicios"), where("uidCliente", "==", usuarioSeleccionado.uid));
        const snapshotServicios = await getDocs(qServicios);
        const serviciosList = snapshotServicios.docs.map(sDoc => ({
            ...sDoc.data(),
            referencia: sDoc.id,
            fechaCreacion: sDoc.data().fechaCreacion instanceof Timestamp ? sDoc.data().fechaCreacion.toDate() : new Date(sDoc.data().fechaCreacion),
            fechaAsignacion: sDoc.data().fechaAsignacion instanceof Timestamp ? sDoc.data().fechaAsignacion.toDate() : (sDoc.data().fechaAsignacion ? new Date(sDoc.data().fechaAsignacion) : undefined),
            fechaFinalizacion: sDoc.data().fechaFinalizacion instanceof Timestamp ? sDoc.data().fechaFinalizacion.toDate() : (sDoc.data().fechaFinalizacion ? new Date(sDoc.data().fechaFinalizacion) : undefined),
        } as Servicio));
        setServiciosUsuario(serviciosList);
      }
      if (currentView === "verificarServicios") {
        fetchAllServices();
      }
    } catch (error) {
      console.error("Error actualizando estado del servicio: ", error);
      showToast("Error al actualizar el estado.", "error");
    }
  };

  const limpiarSeleccionUsuario = () => {
    setUsuarioSeleccionado(null);
    setUsuarioSearch("");
    setServiciosUsuario([]);
  };

  const handleUsuarioFieldEdit = async (field: keyof Usuario, value: string) => {
    if (!usuarioSeleccionado) return;
    try {
      const usuarioRef = doc(db, "usuarios", usuarioSeleccionado.ci);
      await updateDoc(usuarioRef, { [field]: value });
      setUsuarioSeleccionado({ ...usuarioSeleccionado, [field]: value });
      showToast("Usuario actualizado", "success");
    } catch {
      showToast("Error al actualizar usuario", "error");
    }
  };

  type ServicioEditableField = keyof Pick<Servicio, 'estadoServicio' | 'nombreEmpleado' | 'telefonoEmpleado'>;
  const handleServicioFieldEdit = async (referencia: string, field: ServicioEditableField, value: string) => {
    try {
      const servicioRef = doc(db, "servicios", referencia);
      await updateDoc(servicioRef, { [field]: value });
      showToast("Servicio actualizado", "success");
      fetchAllServices();
    } catch {
      showToast("Error al actualizar servicio", "error");
    }
  };

  // 4. RENDER (JSX)
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex flex-1 pt-16">
          <AdminSidebar onSelectView={handleSelectView} currentView={currentView} />
          <main className="flex-1 p-6 bg-gray-100 text-gray-800 min-h-[600px] flex items-center justify-center">
            {/* Skeleton loader */}
            <div className="w-full max-w-2xl space-y-6 animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto" />
              <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto" />
              <div className="h-40 bg-gray-200 rounded" />
              <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto" />
              <div className="h-10 bg-gray-300 rounded w-full" />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{toast.message}</div>
      )}
      <NavBar />
      <div className="flex flex-1 pt-[72px] min-h-[calc(100vh-72px)] bg-[var(--theme-background)]"> {/* Padding top igual a nav-bar y fondo de marca */}
        <AdminSidebar onSelectView={handleSelectView} currentView={currentView} />
        <main className="flex-1 p-6 bg-gray-100 text-gray-800 min-h-[600px] rounded-tl-[var(--radius-lg)] rounded-[var(--radius-lg)] shadow-lg ml-2 mt-6" style={{ minHeight: 'calc(100vh - 72px)' }}> {/* Material 3: radio, sombra, separación, margen superior */}
          {currentView === "registrarUsuario" && (
            <section id="registrar-empleado">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">{usuarioExistente ? "Editar Usuario Existente" : "Registrar Nuevo Empleado"}</h2>
              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
                    <input type="text" name="nombre" id="nombre" value={nombre} onChange={handleNombreChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" />
                  </div>
                  <div>
                    <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido:</label>
                    <input type="text" name="apellido" id="apellido" value={apellido} onChange={handleApellidoChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" />
                  </div>
                  <div className="flex gap-2 items-end">
                    <div className="w-1/3">
                      <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700">Tipo:</label>
                      <select
                        id="tipoDocumento"
                        name="tipoDocumento"
                        value={tipoDocumento}
                        onChange={e => setTipoDocumento(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                      >
                        <option value="V">V</option>
                        <option value="E">E</option>
                        <option value="J">J</option>
                        <option value="G">G</option>
                        <option value="R">R</option>
                        <option value="P">P</option>
                      </select>
                    </div>
                    <div className="w-2/3">
                      <label htmlFor="ci" className="block text-sm font-medium text-gray-700">CI (solo número):</label>
                      <input
                        type="text"
                        name="ci"
                        id="ci"
                        value={ciNumero}
                        onChange={e => setCiNumero(e.target.value.replace(/\D/g, ""))}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                        placeholder="Ej: 23893393"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono:</label>
                    <input type="tel" name="telefono" id="telefono" value={formData.telefono} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" />
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn (Opcional):</label>
                    <input type="url" name="linkedin" id="linkedin" value={formData.linkedin} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" />
                  </div>
                  <div>
                    <label htmlFor="uid" className="block text-sm font-medium text-gray-700">UID (Opcional, si ya existe en Firebase Auth):</label>
                    <input type="text" name="uid" id="uid" value={formData.uid || ""} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Servicios Habilitados:</label>
                  <div className="mt-2 space-y-2">
                    {["Plomería", "Electricidad", "Albañilería", "Pintura", "Jardinería", "Otros"].map((servicio) => (
                      <div key={servicio} className="flex items-center">
                        <input
                          id={`servicio-${servicio}`}
                          name="serviciosHabilitados"
                          type="checkbox"
                          value={servicio}
                          checked={formData.serviciosHabilitados?.includes(servicio) || false}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor={`servicio-${servicio}`} className="ml-2 block text-sm text-gray-900">
                          {servicio}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Usuario:</label>
                  <select
                    name="tipoUsuario"
                    value={formData.tipoUsuario}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  >
                    <option value="empleado">Empleado</option>
                    <option value="administrador">Administrador</option>
                  </select>
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={saving}>
                  {saving ? 'Guardando...' : (usuarioExistente ? "Actualizar Usuario" : "Registrar Empleado")}
                </button>
              </form>
            </section>
          )}

          {currentView === "verificarUsuarios" && (
            <section id="verificar-usuarios">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Verificar Usuarios</h2>
              <div className="mb-4">
                <label htmlFor="buscador-usuario" className="block text-sm font-medium text-gray-700 mb-1">Buscar usuario por CI o nombre:</label>
                <input 
                  id="buscador-usuario"
                  type="text" 
                  placeholder="Ej: V2389 o Juan Pérez"
                  value={usuarioSearch}
                  onChange={handleUsuarioSearchChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                />
                {usuariosClientes.length > 0 && (
                  <ul className="border border-gray-300 rounded-md mt-1 bg-white absolute z-10 w-auto max-h-60 overflow-y-auto shadow-lg">
                    {usuariosClientes.map((user) => (
                      <li 
                        key={user.uid} 
                        onClick={() => handleSelectUsuario(user)} 
                        className="p-2 hover:bg-gray-100 cursor-pointer text-gray-900"
                      >
                        {user.nombreUsuario} ({user.ci}) - {user.tipoUsuario}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {usuarioSeleccionado && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <button onClick={limpiarSeleccionUsuario} className="mb-2 px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Limpiar selección</button>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Detalles de {usuarioSeleccionado.nombreUsuario}</h3>
                  <p className="text-gray-700"><strong>CI:</strong> {usuarioSeleccionado.ci}</p>
                  <p className="text-gray-700"><strong>Email:</strong> <input type="email" className="border rounded px-2 py-1 text-gray-900" value={usuarioSeleccionado.email} onChange={e => handleUsuarioFieldEdit('email', e.target.value)} /></p>
                  <p className="text-gray-700"><strong>Teléfono:</strong> <input type="tel" className="border rounded px-2 py-1 text-gray-900" value={usuarioSeleccionado.telefono} onChange={e => handleUsuarioFieldEdit('telefono', e.target.value)} /></p>
                  <p className="text-gray-700"><strong>Tipo:</strong> <select className="border rounded px-2 py-1 text-gray-900" value={usuarioSeleccionado.tipoUsuario} onChange={e => handleUsuarioFieldEdit('tipoUsuario', e.target.value)}><option value="cliente">Cliente</option><option value="empleado">Empleado</option><option value="administrador">Administrador</option></select></p>
                  {/* ...otros campos... */}
                  <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-800">Servicios Asociados</h4>
                  {serviciosUsuario.length > 0 ? (
                    <ul className="space-y-3">
                      {serviciosUsuario.map(servicio => (
                        <li key={servicio.referencia} className="p-3 border rounded-md bg-gray-50 shadow-sm">
                          <p className="text-gray-700"><strong>Ref:</strong> {servicio.referencia}</p>
                          <p className="text-gray-700"><strong>Servicio:</strong> {servicio.servicioSolicitado}</p>
                          <p className="text-gray-700"><strong>Descripción:</strong> {servicio.descripcion}</p>
                          <p className="text-gray-700"><strong>Estado:</strong> 
                            {editandoEstado === servicio.referencia ? (
                              <select 
                                value={nuevoEstadoServicio}
                                onChange={(e) => setNuevoEstadoServicio(e.target.value as Servicio['estadoServicio'])}
                                className="ml-2 p-1 border rounded text-gray-900 bg-white"
                              >
                                <option value="pendientePago">Pendiente de Pago</option>
                                <option value="pendienteAsignacion">Pendiente de Asignación</option>
                                <option value="asignado">Asignado</option>
                                <option value="pendienteAprobacion">Pendiente de Aprobación</option>
                                <option value="aprobado">Aprobado</option>
                                <option value="enCurso">En Curso</option>
                                <option value="revision">Revisión</option>
                                <option value="completado">Completado</option>
                                <option value="canceladoCliente">Cancelado por Cliente</option>
                                <option value="canceladoEmpleado">Cancelado por Empleado</option>
                                <option value="disputa">En Disputa</option>
                              </select>
                            ) : <span className="font-medium">{servicio.estadoServicio}</span>}
                          </p>
                          <p className="text-gray-700"><strong>Fecha Creación:</strong> {servicio.fechaCreacion instanceof Date ? servicio.fechaCreacion.toLocaleDateString() : (servicio.fechaCreacion ? new Date(servicio.fechaCreacion.toString()).toLocaleDateString() : 'N/A')}</p>
                          {editandoEstado === servicio.referencia ? (
                            <div className="mt-2">
                              <button onClick={() => handleUpdateEstadoServicio(servicio.referencia, nuevoEstadoServicio)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
                              <button onClick={() => setEditandoEstado(null)} className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancelar</button>
                            </div>
                          ) : (
                            <button onClick={() => { setEditandoEstado(servicio.referencia); setNuevoEstadoServicio(servicio.estadoServicio); }} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                              Cambiar Estado
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No hay servicios asociados a este usuario.</p>
                  )}
                </div>
              )}
            </section>
          )}

          {currentView === "verificarServicios" && (
            <section id="verificar-servicios">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Verificar Todos los Servicios</h2>
              <div className="mb-4">
                <label htmlFor="buscador-servicio" className="block text-sm font-medium text-gray-700 mb-1">Buscar servicio por número de referencia:</label>
                <input
                  id="buscador-servicio"
                  type="text"
                  placeholder="Ej: 00000001"
                  value={serviceSearchTerm}
                  onChange={e => setServiceSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                />
              </div>

              {loadingServices ? (
                <p className="text-gray-600">Cargando servicios...</p>
              ) : filteredServices.length > 0 ? (
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referencia</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Creación</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredServices.map(servicio => (
                        <tr key={servicio.referencia}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{servicio.referencia}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{servicio.servicioSolicitado}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{servicio.nombreCliente}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {editandoEstado === servicio.referencia ? (
                              <input value={servicio.nombreEmpleado || ''} onChange={e => handleServicioFieldEdit(servicio.referencia, 'nombreEmpleado', e.target.value)} className="border rounded px-2 py-1 text-gray-900 text-xs" />
                            ) : (
                              <span>{servicio.nombreEmpleado || 'N/A'}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {servicio.fechaCreacion instanceof Date ? servicio.fechaCreacion.toLocaleDateString() : (servicio.fechaCreacion ? new Date(servicio.fechaCreacion.toString()).toLocaleDateString() : 'N/A')}
                          </td>
                          {/* Estado editable */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {editandoEstado === servicio.referencia ? (
                              <select value={nuevoEstadoServicio} onChange={e => setNuevoEstadoServicio(e.target.value as Servicio['estadoServicio'])} className="p-1 border rounded text-gray-900 bg-white text-xs">
                                <option value="pendientePago">Pendiente Pago</option>
                                <option value="pendienteAsignacion">Pend. Asignación</option>
                                <option value="asignado">Asignado</option>
                                <option value="pendienteAprobacion">Pend. Aprobación</option>
                                <option value="aprobado">Aprobado</option>
                                <option value="enCurso">En Curso</option>
                                <option value="revision">Revisión</option>
                                <option value="completado">Completado</option>
                                <option value="canceladoCliente">Cancelado (Cli)</option>
                                <option value="canceladoEmpleado">Cancelado (Emp)</option>
                                <option value="disputa">Disputa</option>
                              </select>
                            ) : (
                              <span className="font-medium">{servicio.estadoServicio}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {editandoEstado === servicio.referencia ? (
                              <>
                                <button onClick={() => handleUpdateEstadoServicio(servicio.referencia, nuevoEstadoServicio)} className="text-green-600 hover:text-green-900 mr-2 text-xs">Guardar</button>
                                <button onClick={() => setEditandoEstado(null)} className="text-gray-600 hover:text-gray-900 text-xs">Cancelar</button>
                              </>
                            ) : (
                              <button onClick={() => { setEditandoEstado(servicio.referencia); setNuevoEstadoServicio(servicio.estadoServicio); }} className="text-indigo-600 hover:text-indigo-900 text-xs">
                                Cambiar Estado
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">No se encontraron servicios con los criterios de búsqueda o no hay servicios registrados.</p>
              )}
            </section>
          )}

          {currentView === "verificarPagos" && (
            <section id="verificar-pagos">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Verificar Pagos de Servicios</h2>
              <div className="mb-4">
                <label htmlFor="buscador-pago" className="block text-sm font-medium text-gray-700 mb-1">Buscar servicio por número de referencia:</label>
                <input
                  id="buscador-pago"
                  type="text"
                  placeholder="Ej: 00000001"
                  value={serviceSearchTerm}
                  onChange={e => setServiceSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                />
              </div>
              {loadingServices ? (
                <p className="text-gray-600">Cargando servicios...</p>
              ) : filteredServices.length > 0 ? (
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referencia</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ref. Bancaria Inspección</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ref. Bancaria Servicio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado del Servicio</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredServices.map(servicio => (
                        <tr key={servicio.referencia}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{servicio.referencia}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{servicio.nombreCliente || '—'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{servicio.telefonoCliente || '—'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{servicio.idPagoInspeccion || '—'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{servicio.idPagoServicioTotal || '—'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <select
                              value={servicio.estadoServicio}
                              onChange={e => handleServicioFieldEdit(servicio.referencia, 'estadoServicio', e.target.value)}
                              className="p-1 border rounded text-gray-900 bg-white text-xs"
                            >
                              <option value="pendientePago">Pendiente de Pago</option>
                              <option value="pendienteAsignacion">Pendiente de Asignación</option>
                              <option value="asignado">Asignado</option>
                              <option value="pendienteAprobacion">Pendiente de Aprobación</option>
                              <option value="aprobado">Aprobado</option>
                              <option value="enCurso">En Curso</option>
                              <option value="revision">Revisión</option>
                              <option value="completado">Completado</option>
                              <option value="canceladoCliente">Cancelado por Cliente</option>
                              <option value="canceladoEmpleado">Cancelado por Empleado</option>
                              <option value="disputa">En Disputa</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">No se encontraron servicios con los criterios de búsqueda o no hay servicios registrados.</p>
              )}
            </section>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
