import { Timestamp, GeoPoint } from 'firebase/firestore'; // Asegúrate que Timestamp esté importado si no lo estaba.

// Modelo de datos para un servicio
export interface Servicio {
  referencia: string; // Identificador único para la solicitud del servicio
  userId: string; // UID del usuario que solicitó el servicio
  userName: string; // Nombre del usuario que solicitó el servicio
  telefonoCliente: string; // Número de teléfono del cliente
  servicioSolicitado: string; // Tipo de servicio principal, ej: "Plomería"
  descripcion: string; // Nombre del subservicio seleccionado o descripción inicial
  comentarios?: string; // Comentarios adicionales sobre el servicio (opcional)
  fechaCreacion: Date | Timestamp; // Fecha en que se creó la solicitud del servicio
  ubicacionGoogleMaps: GeoPoint; // Ubicación del servicio en Google Maps

  // --- Campos para el nuevo flujo de Inspección y Cotización ---
  costoInspeccion: number; // Costo fijo de la inspección (ej: 15 USD)
  pagoInspeccionRealizado: boolean; // Indica si el cliente ya pagó la inspección
  idPagoInspeccion?: string; // Opcional: ID de la transacción del pago de inspección

  estadoServicio: // Nuevo campo de estado más detallado
    | 'PendientePagoInspeccion' // Cliente solicitó, pendiente de pagar la inspección
    | 'PendienteAsignacionInspeccion' // Cliente pagó, esperando que un empleado acepte la inspección
    | 'InspeccionAsignada' // Empleado aceptó, pendiente de realizar inspección física y cotizar
    | 'PendienteCotizacionCliente' // Empleado realizó inspección y envió cotización, cliente debe aprobar/rechazar
    | 'CotizacionAprobada' // Cliente aprobó la cotización, se define costoFinalAcordado
    | 'EnProceso' // Trabajo en curso después de cotización aprobada
    | 'EnRevisionCliente' // Empleado marcó como completado, cliente debe revisar y confirmar
    | 'Completado' // Cliente confirmó la finalización
    | 'CanceladoPorCliente' // Cliente canceló
    | 'CanceladoPorEmpleado' // Empleado canceló
    | 'Disputa'; // En caso de problemas

  personaAsignadaUid?: string; // UID de la persona asignada (puede ser undefined hasta la asignación)
  personaAsignadaNombre?: string; // Nombre de la persona asignada (puede ser undefined)
  fechaAsignacionInspeccion?: Date | Timestamp; // Fecha en que se asignó la inspección al empleado

  // Campos para la cotización formal post-inspección
  detallesCotizacion?: string; // Descripción detallada del trabajo a realizar por el empleado
  costoMaterialesEstimado?: number; // Estimación de materiales por el empleado
  costoManoObraCotizado?: number; // Costo de mano de obra cotizado por el empleado
  costoTotalCotizado?: number; // (ManoDeObra + Materiales) - Esto es lo que el cliente ve.
  fechaEnvioCotizacion?: Date | Timestamp;
  fechaAprobacionCotizacion?: Date | Timestamp;
  // El costo de inspección se descuenta del costoTotalCotizado si se realiza el trabajo.

  costoFinalAcordado?: number; // El costo total que el cliente pagará por el servicio (sin incluir la inspección si ya se pagó por separado, o incluyéndola si se maneja así)
                                // Este sería el costoTotalCotizado.

  // --- Fin de campos para el nuevo flujo ---

  // Campos existentes que se mantienen o ajustan
  // estado: 'Pendiente' | 'En proceso' | 'En Revisión' | 'Completado' | 'Cancelado'; // Reemplazado por estadoServicio
  // costo: number; // Reemplazado por costoInspeccion y costoFinalAcordado
  fechaAsignacion?: Date | Timestamp; // Puede renombrarse o usarse para fechaAsignacionInspeccion si aplica
  fechaFinalizacion?: Date | Timestamp; // Fecha en que se completó el servicio
}

// Modelo de datos para un usuario unificado (antes Usuario y Empleado)
export interface Usuario {
  uid: string; // UID del usuario/empleado
  email: string; // Correo electrónico
  userName: string; // Nombre del usuario/empleado
  ci: string; // Cédula de identidad
  telefono: string; // Número de teléfono
  fechaRegistro: Date | Timestamp; // Fecha de registro
  foto?: string; // URL de la foto
  pushToken?: string; // Token de notificaciones push (opcional)
  tipoUsuario: 'cliente' | 'empleado' | 'administrador'; // Tipo de usuario

  // Campos específicos para clientes
  saldo?: number; // Saldo a favor del cliente (revisar si aplica a empleado también)
  deuda?: number; // Deuda del cliente (revisar si aplica a empleado también)
  numeroServiciosSolicitados?: number; // Número de servicios solicitados por el cliente
  serviciosSolicitados?: string[]; // Lista de IDs de servicios solicitados por el cliente (opcional)
  ubicacionGoogleMaps?: GeoPoint; // Ubicación del cliente en Google Maps (opcional)
  comentariosCliente?: string[]; // Comentarios sobre el cliente (opcional, renombrado para claridad)

  // Campos específicos para empleados
  linkedin?: string; // Perfil de LinkedIn del empleado (opcional)
  serviciosHabilitados?: string[]; // Lista de servicios que el empleado puede realizar (opcional)
  numeroServiciosRealizados?: number; // Número de servicios realizados por el empleado (opcional)
  saldoEmpleado?: number; // Saldo acumulado por servicios completados para el empleado (opcional, renombrado)
  deudaEmpleado?: number; // Deuda acumulada del empleado (opcional, renombrado)
  diferenciaSaldoDeudaEmpleado?: number; // Diferencia entre saldo y deuda del empleado (opcional, renombrado)
  disponibilidad?: 'disponible' | 'ocupado' | 'desconectado'; // Disponibilidad del empleado (opcional)
  calificacionPromedio?: number; // Calificación promedio del empleado (opcional)
  comentariosSobreEmpleado?: string[]; // Comentarios de los usuarios sobre el empleado (opcional, renombrado)
}
