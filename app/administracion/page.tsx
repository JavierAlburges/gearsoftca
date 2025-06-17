"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { auth, db } from "@/firebaseConfig";
import { getUserDataIfAdmin } from "@/lib/firebaseUtils";
import { setDoc, doc, collection, getDocs, query, limit, where, Timestamp, updateDoc, orderBy } from "firebase/firestore"; // Asegúrate de importar orderBy
import { Usuario, Servicio } from "@/constantes/interfaces";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function ServicioExpressControlPanel() {
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
  
  // Estados para la vista "Verificar Servicios"
  const [allServices, setAllServices] = useState<Servicio[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [serviceSearchTerm, setServiceSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState<Servicio[]>([]);

  const [editandoEstado, setEditandoEstado] = useState<string | null>(null); // ID del servicio cuyo estado se está editando
  const [nuevoEstadoServicio, setNuevoEstadoServicio] = useState<Servicio['estadoServicio']>('pendientePago');


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
    /* const querySnapshot = await getDocs(q); // Comentado para resolver linting
    const empleadosList = querySnapshot.docs.map(doc => { 
      const data = doc.data();
      return { ...data, id: doc.id } as Usuario & { id: string };
    });
    console.log("Empleados cargados:", empleadosList); */ 
    await getDocs(q); // Llamada para mantener la lógica de fetch si es necesaria, pero sin asignar a variable no usada
  }, []);


  useEffect(() => {
    if (currentView === "registrarUsuario" || currentView === "verificarUsuarios") {
        fetchEmpleados();
    }
  }, [currentView, fetchEmpleados]);

  // Función para obtener todos los servicios
  const fetchAllServices = useCallback(async () => {
    setLoadingServices(true);
    try {
      const q = query(collection(db, "servicios"), orderBy("fechaCreacion", "desc"));
      const querySnapshot = await getDocs(q);
      const servicesList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          referencia: doc.id,
          fechaCreacion: data.fechaCreacion instanceof Timestamp ? data.fechaCreacion.toDate() : new Date(data.fechaCreacion),
          fechaAsignacion: data.fechaAsignacion instanceof Timestamp ? data.fechaAsignacion.toDate() : (data.fechaAsignacion ? new Date(data.fechaAsignacion) : undefined),
          fechaFinalizacion: data.fechaFinalizacion instanceof Timestamp ? data.fechaFinalizacion.toDate() : (data.fechaFinalizacion ? new Date(data.fechaFinalizacion) : undefined),
        } as Servicio;
      });
      setAllServices(servicesList);
      setFilteredServices(servicesList); // Inicialmente mostrar todos
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

  // Filtrar servicios en "Verificar Servicios"
  useEffect(() => {
    if (serviceSearchTerm.trim() === "") {
      setFilteredServices(allServices);
    } else {
      const lowercasedFilter = serviceSearchTerm.toLowerCase();
      const filtered = allServices.filter(service =>
        service.referencia.toLowerCase().includes(lowercasedFilter) ||
        service.servicioSolicitado.toLowerCase().includes(lowercasedFilter) ||
        service.nombreCliente.toLowerCase().includes(lowercasedFilter) ||
        (service.nombreEmpleado && service.nombreEmpleado.toLowerCase().includes(lowercasedFilter)) ||
        service.estadoServicio.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredServices(filtered);
    }
  }, [serviceSearchTerm, allServices]);


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
      alert("El CI es requerido para registrar un empleado.");
      return;
    }
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
      alert("Empleado registrado exitosamente como usuario");
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
    } catch (error) {
      console.error("Error registrando empleado: ", error);
      alert("Error registrando empleado.");
    }
  };

  const fetchUsuarios = async (term: string) => {
    if (term.trim() === "") {
      setUsuariosClientes([]);
      return;
    }
    const q = query(
      collection(db, "usuarios"),
      limit(10)
    );
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
      alert("Estado del servicio actualizado.");
      setEditandoEstado(null);
      
      // Actualizar la lista de servicios del usuario seleccionado si existe
      if (usuarioSeleccionado && usuarioSeleccionado.uid) {
        const qServicios = query(collection(db, "servicios"), where("uidCliente", "==", usuarioSeleccionado.uid));
        const snapshotServicios = await getDocs(qServicios);
        const serviciosList = snapshotServicios.docs.map(sDoc => ({ // Renombrado doc a sDoc para evitar conflicto
            ...sDoc.data(),
            referencia: sDoc.id,
            fechaCreacion: sDoc.data().fechaCreacion instanceof Timestamp ? sDoc.data().fechaCreacion.toDate() : new Date(sDoc.data().fechaCreacion),
            fechaAsignacion: sDoc.data().fechaAsignacion instanceof Timestamp ? sDoc.data().fechaAsignacion.toDate() : (sDoc.data().fechaAsignacion ? new Date(sDoc.data().fechaAsignacion) : undefined),
            fechaFinalizacion: sDoc.data().fechaFinalizacion instanceof Timestamp ? sDoc.data().fechaFinalizacion.toDate() : (sDoc.data().fechaFinalizacion ? new Date(sDoc.data().fechaFinalizacion) : undefined),
        } as Servicio));
        setServiciosUsuario(serviciosList);
      }
      // Actualizar la lista general de servicios si estamos en esa vista
      if (currentView === "verificarServicios") {
        fetchAllServices(); // Esto recargará y actualizará filteredServices a través de los useEffects
      }

    } catch (error) {
      console.error("Error actualizando estado del servicio: ", error);
      alert("Error al actualizar el estado.");
    }
  };
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Cargando panel de administración...</p></div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1 pt-16">
        <AdminSidebar onSelectView={handleSelectView} currentView={currentView} />
        <main className="flex-1 p-6 bg-gray-100 text-gray-800"> {/* Asegurar contraste */}
          {currentView === "registrarUsuario" && (
            <section id="registrar-empleado">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Registrar Nuevo Empleado</h2>
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
                  <div>
                    <label htmlFor="ci" className="block text-sm font-medium text-gray-700">CI (Será el ID del empleado):</label>
                    <input type="text" name="ci" id="ci" value={formData.ci} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" />
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
                          checked={formData.serviciosHabilitados?.includes(servicio)}
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
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Registrar Empleado
                </button>
              </form>
            </section>
          )}

          {currentView === "verificarUsuarios" && (
            <section id="verificar-usuarios">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Verificar Usuarios</h2>
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="Buscar usuario por CI o Nombre..."
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
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Detalles de {usuarioSeleccionado.nombreUsuario}</h3>
                  <p className="text-gray-700"><strong>CI:</strong> {usuarioSeleccionado.ci}</p>
                  <p className="text-gray-700"><strong>Email:</strong> {usuarioSeleccionado.email}</p>
                  <p className="text-gray-700"><strong>Teléfono:</strong> {usuarioSeleccionado.telefono}</p>
                  <p className="text-gray-700"><strong>Tipo:</strong> {usuarioSeleccionado.tipoUsuario}</p>
                  <p className="text-gray-700"><strong>Fecha Registro:</strong> {usuarioSeleccionado.fechaRegistro instanceof Timestamp ? usuarioSeleccionado.fechaRegistro.toDate().toLocaleDateString() : (usuarioSeleccionado.fechaRegistro ? new Date(usuarioSeleccionado.fechaRegistro).toLocaleDateString() : 'N/A')}</p>
                  
                  {usuarioSeleccionado.tipoUsuario === 'empleado' && (
                    <>
                      <p className="text-gray-700"><strong>Servicios Habilitados:</strong> {usuarioSeleccionado.serviciosHabilitados?.join(', ')}</p>
                      <p className="text-gray-700"><strong>Servicios Realizados:</strong> {usuarioSeleccionado.numeroServiciosRealizados}</p>
                    </>
                  )}
                  {usuarioSeleccionado.tipoUsuario === 'cliente' && (
                    <>
                      <p className="text-gray-700"><strong>Servicios Solicitados:</strong> {usuarioSeleccionado.numeroServiciosSolicitados}</p>
                    </>
                  )}

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
                              <button onClick={() => handleUpdateEstadoServicio(servicio.referencia, nuevoEstadoServicio)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2">Guardar</button>
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
                <input
                  type="text"
                  placeholder="Buscar servicios por Ref, Tipo, Cliente, Empleado o Estado..."
                  value={serviceSearchTerm}
                  onChange={(e) => setServiceSearchTerm(e.target.value)}
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{servicio.nombreEmpleado || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {servicio.fechaCreacion instanceof Date ? servicio.fechaCreacion.toLocaleDateString() : (servicio.fechaCreacion ? new Date(servicio.fechaCreacion.toString()).toLocaleDateString() : 'N/A')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {editandoEstado === servicio.referencia ? (
                              <select 
                                value={nuevoEstadoServicio}
                                onChange={(e) => setNuevoEstadoServicio(e.target.value as Servicio['estadoServicio'])}
                                className="p-1 border rounded text-gray-900 bg-white text-xs" // Reducido tamaño para tabla
                              >
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
                            ) : <span className="font-medium">{servicio.estadoServicio}</span>}
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
        </main>
      </div>
      <Footer />
    </div>
  );
}
