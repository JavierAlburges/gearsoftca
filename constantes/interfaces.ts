import { Timestamp, GeoPoint } from 'firebase/firestore'; // Asegúrate que Timestamp esté importado si no lo estaba.

// Modelo de datos para un servicio
export interface Servicio {
  // --- Información General del Servicio ---
  referencia: string; // ID único de la solicitud (puede ser el ID del documento de Firestore)
  servicioSolicitado: string; // Tipo de servicio principal (ej: "Plomería")
  descripcion: string; // Subservicio o descripción inicial del problema dada por el cliente
  comentario?: string; // Comentario adicional del cliente al solicitar (opcional)
  fechaCreacion: Date | Timestamp; // Fecha de creación de la solicitud
  ubicacionGoogleMaps: GeoPoint; // Ubicación donde se requiere el servicio
  estadoServicio:
    | 'pendientePago'       // Cliente: solicita servicio, pendiente de pagar inspección
    | 'pendienteAsignacion' // Admin: habilita tras pago, empleados pueden aceptar
    | 'asignado'            // Empleado: acepta, debe inspeccionar y cotizar
    | 'pendienteAprobacion' // Cliente: debe aprobar/rechazar cotización
    | 'aprobado'            // Cliente: aprueba cotización, empleado debe iniciar trabajo
    | 'enCurso'             // Empleado: trabajo en ejecución
    | 'revision'            // Cliente: califica y comenta, esperando revisión/cierre del admin
    | 'completado'          // Admin: confirma y cierra el servicio
    | 'canceladoCliente'    // Cliente: cancela la solicitud
    | 'canceladoEmpleado'   // Empleado: cancela la solicitud
    | 'disputa';            // Cualquier usuario: problema/disputa
  fechaAsignacion?: Date | Timestamp;    // Fecha de asignación al empleado
  fechaFinalizacion?: Date | Timestamp;  // Fecha de cierre o cancelación del servicio

  // --- Información del Cliente relacionada con este Servicio ---
  uidCliente: string;         // UID del cliente que solicita el servicio
  nombreCliente: string;      // Nombre del cliente (copiado al momento de crear el servicio)
  telefonoCliente: string;    // Teléfono del cliente (copiado)
  ciCliente: string;         // CI del cliente (copiado)

  // --- Información del Empleado relacionada con este Servicio ---
  uidEmpleado?: string;        // UID del empleado asignado
  nombreEmpleado?: string;     // Nombre del empleado asignado (copiado al momento de asignar)
  telefonoEmpleado?: string;   // Teléfono del empleado asignado (copiado)
  ciEmpleado?: string;         // CI del empleado asignado (copiado)

  // --- Detalles de la Inspección (si aplica) ---
  costoInspeccion: number;        // Costo fijo de la inspección (definido por el admin o tipo de servicio)
  pagoInspeccionRealizado: boolean; // Si el cliente ya pagó la inspección
  idPagoInspeccion?: string;     // ID de la transacción de pago de inspección (opcional)
  idPagoServicioTotal?: string; // ID de la transacción de pago del servicio total (opcional)

  // --- Detalles de la Cotización (generada por el empleado) ---
  infoCotizacion?: InfoCotizacion; // Nueva interfaz para agrupar detalles de cotización

  // --- Satisfacción del Cliente (post-servicio) ---
  satisfaccionCliente?: number;     // Valor de 1 a 5
  comentarioSatisfaccion?: string;  // Comentario del cliente tras finalizar
}

// Interfaz para los detalles de la cotización
export interface InfoCotizacion {
  descripcionTrabajoRealizar?: string;
  materiales?: Material[];
  costoTotalMateriales?: number;

  // Campos para mano de obra por horas
  horasEstimadas?: number;        // Horas estimadas para el trabajo
  precioPorHora?: number;         // Precio que cobra el empleado o la empresa por hora
  costoManoObra?: number;         // Calculado (horasEstimadas * precioPorHora), pero se almacena

  costoTotal?: number; 
  fechaEnvio?: Date | Timestamp;
  fechaAprobacion?: Date | Timestamp;
}

// Modelo de datos para un usuario (cliente, empleado o admin)
export interface Usuario {
  uid: string; // UID único
  email: string; // Correo electrónico
  nombreUsuario: string; // Nombre completo
  ci: string; // Cédula de identidad
  telefono: string; // Teléfono
  fechaRegistro: Date | Timestamp; // Fecha de registro
  foto?: string; // URL de foto de perfil (opcional)
  pushToken?: string; // Token de notificaciones push (opcional)
  tipoUsuario: 'cliente' | 'empleado' | 'administrador'; // Rol del usuario

  // Solo clientes
  saldo?: number; // Saldo a favor
  deuda?: number; // Deuda pendiente
  numeroServiciosSolicitados?: number; // Servicios solicitados
  serviciosSolicitados?: string[]; // IDs de servicios solicitados
  ubicacionGoogleMaps?: GeoPoint; // Ubicación del cliente (opcional)
  comentariosCliente?: string[]; // Comentarios sobre el cliente (opcional)

  // Solo empleados
  linkedin?: string; // Perfil de LinkedIn (opcional)
  serviciosHabilitados?: string[]; // Servicios que puede realizar
  numeroServiciosRealizados?: number; // Servicios realizados
  saldoEmpleado?: number; // Saldo acumulado por servicios
  deudaEmpleado?: number; // Deuda acumulada
  diferenciaSaldoDeudaEmpleado?: number; // Saldo - deuda
  estado?: 'activo' | 'baneado' | 'inhabilitado'; // Estado del empleado
  calificacionPromedio?: number; // Calificación promedio
  comentariosSobreEmpleado?: string[]; // Comentarios de clientes (opcional)
}

export interface Material {
  id?: string; // Puede ser un UUID o similar generado en el frontend
  nombre: string;
  unidad: string; // Ej: 'unidad', 'mts', 'kg', 'lt'
  cantidad: number;
  precioUnitario: number;
}

export interface DatosBancarios {
  banco: string;
  tipoCuenta?: string;
  numeroCuenta?: string;
  titular: string;
  rif: string;
  telefono?: string; // Opcional, usado para Pago Móvil
  pagoMovil?: boolean;
}