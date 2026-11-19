/**
 * Tipos del contenido de la web. Siguen la forma de las tablas de la fase 2
 * (§6.2 de las instrucciones), para pasar los datos al panel sin rehacer páginas.
 *
 * Regla de los huecos: un valor `null` es un dato que falta. En Preview se ve
 * como hueco (`[HORA]`, `PENDIENTE DE ARIADNA`…) y en producción bloquea la
 * compilación (scripts/comprobar-huecos.mts).
 */

export type Idioma = 'es' | 'en';

/** Texto en los dos idiomas. */
export type Texto = { es: string; en: string };

export type DiaSemana = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

/** Tabla `eventos`. */
export interface Evento {
  slug: string;
  orden: number;
  activo: boolean;
  nombre: Texto;
  /** Nota a mano (Caveat) encima del nombre. */
  nota: Texto;
  entradilla: Texto;
  pasos: Texto[];
  diaSemana: DiaSemana;
  /** Hora habitual, «19:00». `null` = sin decidir (D5). */
  hora: string | null;
  duracionMinutos: number;
  precioEuros: number | null;
  /** Qué incluye la entrada. */
  incluye: Texto;
  aforoPorDefecto: number;
  /** Cupo de plazas que se ofrece en la web. `null` = sin decidir. */
  plazasWebPorDefecto: number | null;
  /** Ruta dentro de /public. */
  foto: string;
  fotoAlt: Texto;
}

/** Tabla `sesiones` (días de evento). */
export interface Sesion {
  evento: string;
  /** AAAA-MM-DD */
  fecha: string;
  horaInicio: string;
  horaFin: string;
  aforo: number;
  plazasWeb: number;
  /** Plazas ya ocupadas (en la fase 3 sale de `inscripciones`). */
  ocupadas: number;
  estado: 'abierta' | 'cerrada' | 'cancelada';
}

export interface Tramo {
  abre: string;
  cierra: string;
}

/** Tabla `ajustes`. */
export interface Ajustes {
  direccion: { calle: string; codigoPostal: string; ciudad: string };
  /** Enlace «Cómo llegar». */
  enlaceMapa: string;
  /** Dirección del mapa incrustado (solo se carga al pulsar). */
  mapaIncrustado: string;
  horario: Record<DiaSemana, Tramo[]>;
  cierresEspeciales: { fecha: string; motivo: Texto }[];
  contacto: {
    telefono: string;
    whatsapp: string | null;
    correo: string | null;
    instagram: string;
    tiktok: string;
  };
  /** Carta (PDF o imagen) en /public. */
  carta: string | null;
}

/** Fila de la tabla `contenidos`: página › bloque › texto ES/EN. */
export type Contenido = Texto | null;

export interface SeccionLegal {
  titulo: Texto;
  texto: Contenido;
}

export interface PaginaLegal {
  titulo: Texto;
  secciones: SeccionLegal[];
}
