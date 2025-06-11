import { GeoPoint } from 'firebase/firestore'; // Importar GeoPoint de Firebase

// Modelo de datos para un empleado
export interface Empleado {
  ci: string; // Cédula de identidad del empleado
  email: string; // Correo electrónico del empleado
  linkedin: string; // Perfil de LinkedIn del empleado
  telefono: string; // Número de teléfono del empleado
  serviciosHabilitados: string[]; // Lista de servicios que el empleado puede realizar
  fechaRegistro: Date; // Fecha de creación del registro del empleado
  uid: string; // UID del empleado
  userName: string; // Nombre del empleado
  numeroServiciosRealizados?: number; // Número de servicios realizados por el empleado
  foto?: string; // URL de la foto del empleado
  saldo?: number; // Saldo acumulado por servicios completados (nuevo)
  deuda?: number; // Deuda acumulada (nuevo)
  diferencia?: number; // Diferencia entre saldo y deuda (nuevo)
  disponibilidad?: string; // Disponibilidad del empleado (e.g., "disponible", "ocupado") (opcional)
  calificacion?: number; // Calificación promedio del empleado (opcional)
  comentarios?: string[]; // Comentarios de los usuarios sobre el empleado (opcional)
  pushToken?: string; // Token de notificaciones push (opcional)
}

export interface Usuario {
  uid: string; // UID del usuario
  ci: string; // Cédula de identidad del usuario
  email: string; // Correo electrónico del usuario
  telefono: string; // Número de teléfono del usuario
  saldo: number; // Saldo a favor del usuario
  deuda: number; // Deuda del usuario
  userName: string; // Nombre del usuario
  fechaRegistro: Date; // Fecha de registro del usuario
  numeroServiciosSolicitados: number; // Número de servicios solicitados por el usuario
  foto: string; // URL de la foto del usuario
  serviciosSolicitados?: string[]; // Lista de IDs de servicios solicitados por el usuario (opcional)
  comentarios?: string[]; // Comentarios sobre el usuario (opcional)
  ubicacionGoogleMaps?: GeoPoint; // Ubicación del usuario en Google Maps (opcional)
  pushToken?: string; // Token de notificaciones push (opcional)
}

export interface Servicio {
  descripcion: string; // Descripción del servicio solicitado
  estado: 'Pendiente' | 'En proceso' | 'En Revisión' | 'Completado' | 'Cancelado'; // Estados del servicio
  fechaCreacion: Date; // Fecha en que se creó la solicitud del servicio
  personaAsignadaUid: string; // UID de la persona asignada
  personaAsignadaNombre: string; // Nombre de la persona asignada
  referencia: string; // Identificador único para la solicitud del servicio
  servicioSolicitado: string; // Tipo de servicio solicitado
  userId: string; // UID del usuario que solicitó el servicio
  userName: string; // Nombre del usuario que solicitó el servicio
  telefonoCliente: string; // Número de teléfono del cliente
  fechaAsignacion?: Date; // Fecha en que se asignó el servicio (opcional)
  fechaFinalizacion?: Date; // Fecha en que se completó el servicio (opcional)
  comentarios?: string; // Comentarios adicionales sobre el servicio (opcional)
  ubicacionGoogleMaps: GeoPoint; // Ubicación del servicio en Google Maps
  costo: number; // Costo del servicio
}