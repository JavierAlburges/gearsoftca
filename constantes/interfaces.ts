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
    numeroServiciosRealizados: number; // Número de servicios realizados por el empleado
    foto: string; // URL de la foto del empleado
    disponibilidad?: string; // Disponibilidad del empleado (e.g., "disponible", "ocupado") (opcional)
    calificacion?: number; // Calificación promedio del empleado (opcional)
    comentarios?: string[]; // Comentarios de los usuarios sobre el empleado (opcional)
  }