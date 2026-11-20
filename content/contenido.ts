/**
 * CONTENIDO DE LA WEB — archivo único (fase 1).
 *
 * Todo lo que el equipo de InmoCafé puede querer cambiar está aquí, con la
 * misma forma que tendrán las tablas de la fase 2 (`eventos`, `sesiones`,
 * `ajustes`, `contenidos`). En la fase 2 estos datos pasan a la base de datos
 * y se editan desde el panel; las páginas no cambian.
 *
 * - `null` = dato que falta → hueco visible en Preview y bloqueo en producción.
 * - Fotos: `{ src, foco }` (ruta dentro de /public y punto de interés como
 *   `object-position`), o `null` si aún no está subida. Se muestran en 4:3.
 * - `*palabra*` = palabra destacada en Terracota (titular de la portada, «+»).
 * - Los textos en inglés son un BORRADOR traducido desde el español, pendiente
 *   de revisión por Ariadna (§8).
 */
import type { Ajustes, Contenido, Evento, FotoContenido, PaginaLegal, Sesion, Texto } from './tipos';

// ─── eventos ──────────────────────────────────────────────────────────────
// 🟡 Duraciones y pasos: modelos de evento B1, PROPUESTA sin aprobar.
// Días habituales sin decidir (null): la web muestra «Día y hora por anunciar».

const INCLUYE: Texto = {
  es: 'dos consumiciones y picoteo',
  en: 'two drinks and snacks',
};

export const eventos: Evento[] = [
  {
    slug: 'idiomas',
    orden: 1,
    activo: true,
    nombre: { es: 'Meeting point · Intercambio de idiomas', en: 'Meeting point · Language exchange' },
    nota: { es: 'idiomas', en: 'languages' },
    entradilla: {
      es: 'Mesas por idioma para practicar español, inglés y otros idiomas con gente de aquí y de fuera. Da igual tu nivel.',
      en: 'Tables by language to practise Spanish, English and other languages with locals and people from abroad. Any level is welcome.',
    },
    pasos: [
      {
        es: 'Llegas, coges tu pegatina con el idioma que hablas y el que quieres practicar',
        en: 'When you arrive, pick up a sticker with the language you speak and the one you want to practise',
      },
      { es: 'Te sentamos en una mesa con gente de otros idiomas', en: 'We seat you at a table with speakers of other languages' },
      { es: 'Dos rondas de 25 minutos, mitad en cada idioma', en: 'Two 25-minute rounds, half in each language' },
      { es: 'Al final, conversación libre con algo para picar', en: 'To finish, open conversation with something to snack on' },
    ],
    diaSemana: null,
    hora: null,
    duracionMinutos: 120,
    precioEuros: 8,
    incluye: INCLUYE,
    aforoPorDefecto: 40,
    plazasWebPorDefecto: null,
    foto: null, // provisional: /fotos/rincon.jpg cuando esté subida
    fotoAlt: { es: 'Rincón con sillones en InmoCafé', en: 'Corner with armchairs at InmoCafé' },
  },
  {
    slug: 'networking',
    orden: 2,
    activo: true,
    nombre: { es: 'Café de networking', en: 'Networking coffee' },
    nota: { es: 'networking', en: 'networking' },
    entradilla: {
      es: 'Para autónomos, emprendedores y gente que teletrabaja. Te presentas en un minuto y conoces a quien puede ayudarte o necesitarte.',
      en: 'For freelancers, entrepreneurs and remote workers. Introduce yourself in one minute and meet people who can help you or need you.',
    },
    pasos: [
      {
        es: 'Llegas y te ponemos una etiqueta con tu nombre y a qué te dedicas',
        en: 'When you arrive, we give you a name tag saying what you do',
      },
      { es: 'Ronda de presentaciones: un minuto cada uno', en: 'Round of introductions: one minute each' },
      { es: 'Conversación libre con algo para picar', en: 'Open conversation with something to snack on' },
      {
        es: 'Cada mes cambia un poco el formato: charla corta o «Necesito / Ofrezco»',
        en: 'The format changes a little each month: a short talk or “I need / I offer”',
      },
    ],
    diaSemana: null,
    hora: null,
    duracionMinutos: 90,
    precioEuros: 8,
    incluye: INCLUYE,
    aforoPorDefecto: 40,
    plazasWebPorDefecto: null,
    foto: null, // provisional: /fotos/rincon.jpg cuando esté subida
    fotoAlt: { es: 'Rincón con sillones en InmoCafé', en: 'Corner with armchairs at InmoCafé' },
  },
  {
    slug: 'club-de-lectura',
    orden: 3,
    activo: true,
    nombre: { es: 'Club de lectura InmoCafé', en: 'InmoCafé book club' },
    nota: { es: 'club de lectura', en: 'book club' },
    entradilla: {
      es: 'Un libro al mes, comentado por partes cada semana. Te puedes unir aunque el mes ya haya empezado.',
      en: 'One book a month, discussed part by part every week. You can join even if the month has already started.',
    },
    pasos: [
      { es: 'Cada semana se comenta una parte del libro del mes', en: 'Each week we discuss one part of the book of the month' },
      { es: 'Ronda rápida: qué te ha parecido', en: 'Quick round: what did you think?' },
      { es: 'Conversación guiada con algo para picar', en: 'Guided conversation with something to snack on' },
      { es: 'La última semana se vota el libro siguiente', en: 'In the last week we vote for the next book' },
    ],
    diaSemana: null,
    hora: null,
    duracionMinutos: 90,
    precioEuros: 8,
    incluye: INCLUYE,
    aforoPorDefecto: 40,
    plazasWebPorDefecto: null,
    foto: null, // provisional: /fotos/rincon.jpg cuando esté subida
    fotoAlt: { es: 'Rincón con sillones en InmoCafé', en: 'Corner with armchairs at InmoCafé' },
  },
];

// ─── sesiones ─────────────────────────────────────────────────────────────
// Fase de interesados (D1): todavía no hay fechas.
export const sesiones: Sesion[] = [];

// ─── ajustes ──────────────────────────────────────────────────────────────
export const ajustes: Ajustes = {
  direccion: { calle: 'C/ Pablo Iglesias, 15', codigoPostal: '03004', ciudad: 'Alicante' },
  enlaceMapa: 'https://www.google.com/maps/dir/?api=1&destination=C%2F+Pablo+Iglesias+15%2C+03004+Alicante',
  mapaIncrustado: 'https://www.google.com/maps?q=C%2F+Pablo+Iglesias+15%2C+03004+Alicante&output=embed',
  horario: {
    lunes: [{ abre: '9:00', cierra: '14:00' }, { abre: '16:00', cierra: '20:00' }],
    martes: [{ abre: '9:00', cierra: '14:00' }, { abre: '16:00', cierra: '20:00' }],
    miercoles: [{ abre: '9:00', cierra: '14:00' }, { abre: '16:00', cierra: '20:00' }],
    jueves: [{ abre: '9:00', cierra: '14:00' }, { abre: '16:00', cierra: '20:00' }],
    viernes: [{ abre: '9:00', cierra: '14:00' }, { abre: '16:00', cierra: '20:00' }],
    sabado: [{ abre: '9:00', cierra: '14:00' }],
    domingo: [],
  },
  cierresEspeciales: [],
  contacto: {
    telefono: '600 65 18 00',
    whatsapp: null,
    correo: null,
    instagram: 'inmo.cafealicante',
    tiktok: 'inmocafealicante',
  },
  carta: null,
};

// ─── contenidos (página › bloque) ─────────────────────────────────────────
export const contenidos = {
  comun: {
    pie: { es: 'InmoCafé, el espacio de SpainShopper', en: 'InmoCafé, a SpainShopper space' },
    descripcion: {
      es: 'Una cafetería dentro de una inmobiliaria en el centro de Alicante: café, desayunos, sitio para trabajar y eventos cada semana.',
      en: 'A café inside an estate agency in central Alicante: coffee, breakfast, a place to work and events every week.',
    },
  },

  inicio: {
    etiqueta: { es: 'En el centro de Alicante', en: 'In the centre of Alicante' },
    titulo: { es: 'Una cafetería dentro de una *inmobiliaria*', en: 'A café inside an *estate agency*' },
    texto: {
      es: 'Entra, pide un café y quédate el rato que quieras: a tomar algo, a trabajar con el portátil o a uno de los eventos de cada semana. Nadie te vende nada por entrar.',
      en: 'Come in, order a coffee and stay as long as you like: for a drink, to work on your laptop or for one of our weekly events. Nobody will try to sell you anything.',
    },
    notaFoto: { es: 'tu espacio, tu café', en: 'tu espacio, tu café' },
    foto: { src: '/fotos/portada.jpg', foco: '50% 50%' } as FotoContenido,
    fotoAlt: {
      es: 'La sala de InmoCafé, con mesas, sillas de bambú y la barra al fondo',
      en: 'The InmoCafé room, with tables, bamboo chairs and the counter at the back',
    },

    conceptoEtiqueta: { es: 'Así funciona', en: 'How it works' },
    conceptoTitulo: { es: 'Inmo *+* café', en: 'Inmo *+* café' },
    inmoNota: { es: 'inmo', en: 'inmo' },
    inmoTitulo: { es: 'El local de una inmobiliaria', en: 'An estate agency’s premises' },
    inmoTexto: {
      es: 'La cafetería está dentro de una inmobiliaria del centro.',
      en: 'The café is inside an estate agency in the city centre.',
    },
    cafeNota: { es: 'café', en: 'café' },
    cafeTitulo: { es: 'Una cafetería de verdad', en: 'A real café' },
    cafeTexto: {
      es: 'Cafés, desayunos, tostadas, batidos y crepes. Mesas, wifi y enchufes.',
      en: 'Coffee, breakfast, toast, milkshakes and crêpes. Tables, wifi and sockets.',
    },
    resultadoTitulo: {
      es: 'Tu espacio para tomar algo, trabajar y conocer gente',
      en: 'Your place to have a drink, work and meet people',
    },
    accesos: [
      { titulo: { es: 'Tomar algo', en: 'Have a drink' }, subtitulo: { es: 'La carta', en: 'The menu' }, ruta: '/espacio' },
      { titulo: { es: 'Trabajar', en: 'Work' }, subtitulo: { es: 'El espacio', en: 'The space' }, ruta: '/espacio' },
      { titulo: { es: 'Eventos', en: 'Events' }, subtitulo: { es: 'Cada semana', en: 'Every week' }, ruta: '/eventos' },
      { titulo: { es: 'Tablón', en: 'Noticeboard' }, subtitulo: { es: 'Compra y vende', en: 'Buy and sell' }, ruta: '/tablon' },
    ],

    eventosEtiqueta: { es: 'Esta semana', en: 'This week' },
    eventosTitulo: { es: 'Próximos eventos', en: 'Upcoming events' },

    tablonEtiqueta: { es: 'Tablón de compraventa', en: 'Buy & sell noticeboard' },
    tablonTitulo: { es: 'Lo último del tablón', en: 'Latest on the noticeboard' },
    tablonVacio: {
      es: 'Todavía no hay anuncios. Muy pronto podrás publicar el tuyo desde aquí.',
      en: 'There are no ads yet. Very soon you will be able to post yours here.',
    },

    visitaTitulo: { es: 'Ven a vernos', en: 'Come and see us' },
  },

  eventos: {
    etiqueta: { es: 'Eventos', en: 'Events' },
    titulo: { es: 'Cada semana, tres eventos', en: 'Three events every week' },
    // 🟡 B4: puede quitarse «dos bebidas».
    texto: {
      es: 'Elige el que te interesa. La entrada incluye dos bebidas y algo para picar.',
      en: 'Choose the one you like. Entry includes two drinks and something to snack on.',
    },
    avisameTitulo: { es: 'Avísame de los próximos', en: 'Let me know about the next ones' },
    avisameTexto: {
      es: 'Déjanos tu correo y te escribimos cuando haya fecha.',
      en: 'Leave us your email and we will write to you when there is a date.',
    },
  },

  espacio: {
    nota: { es: 'pasa y quédate', en: 'come in and stay' },
    titulo: { es: 'El espacio', en: 'The space' },
    // Foco en la taza.
    fotoBarra: { src: '/fotos/espacio-barra.jpg', foco: '32% 38%' } as FotoContenido,
    fotoBarraAlt: { es: 'Un café con leche sobre la barra de InmoCafé', en: 'A white coffee on the InmoCafé counter' },
    cafeTitulo: { es: 'El café', en: 'The café' },
    cafeTexto: null as Contenido,
    mesasTitulo: { es: 'Las mesas', en: 'The tables' },
    // Foco en la mesa con el portátil.
    fotoMesa: { src: '/fotos/espacio-mesa.jpg', foco: '40% 30%' } as FotoContenido,
    fotoMesaAlt: { es: 'Mesa con un portátil y sillas de bambú en InmoCafé', en: 'Table with a laptop and bamboo chairs at InmoCafé' },
    wifi: { es: 'Sí', en: 'Yes' },
    enchufes: { es: 'Sí, en la pared', en: 'Yes, along the wall' },
    mesas: null as Contenido,
    mejorMomento: null as Contenido,
    eventosTitulo: { es: 'Y cada semana, eventos', en: 'And events every week' },
  },

  dondeEstamos: {
    titulo: { es: 'Dónde estamos', en: 'Where to find us' },
    fotoFachada: null as FotoContenido | null,
    fotoFachadaAlt: { es: 'Fachada de InmoCafé', en: 'InmoCafé from the street' },
  },

  tablon: {
    nota: { es: 'el tablón', en: 'the noticeboard' },
    titulo: { es: 'Tablón de compraventa', en: 'Buy & sell noticeboard' },
    texto: {
      es: 'Lo que la gente compra, vende u ofrece. También está en el tablón del local. Publicar es gratis.',
      en: 'What people buy, sell or offer. It is also on the noticeboard in the café. Posting is free.',
    },
  },
};

// ─── páginas legales ──────────────────────────────────────────────────────
// Las decide InmoCafé con su asesor (plan, «Protección de datos»).
const pendiente = (es: string, en: string) => ({ titulo: { es, en }, texto: null });

export const legales: Record<'aviso-legal' | 'privacidad' | 'cookies' | 'normas-del-tablon', PaginaLegal> = {
  'aviso-legal': {
    titulo: { es: 'Aviso legal', en: 'Legal notice' },
    secciones: [
      pendiente('Titular de la web', 'Website owner'),
      pendiente('Condiciones de uso', 'Terms of use'),
      pendiente('Propiedad intelectual', 'Intellectual property'),
      pendiente('Legislación aplicable', 'Applicable law'),
    ],
  },
  privacidad: {
    titulo: { es: 'Política de privacidad', en: 'Privacy policy' },
    secciones: [
      pendiente('Responsable de los datos', 'Data controller'),
      pendiente('Qué datos recogemos y para qué', 'What data we collect and why'),
      pendiente('Base legal', 'Legal basis'),
      pendiente('Cuánto tiempo los guardamos', 'How long we keep them'),
      pendiente('Con quién los compartimos', 'Who we share them with'),
      pendiente('Tus derechos', 'Your rights'),
    ],
  },
  cookies: {
    titulo: { es: 'Política de cookies', en: 'Cookie policy' },
    secciones: [
      pendiente('Qué cookies usa esta web', 'Which cookies this website uses'),
      pendiente('Contenido de terceros', 'Third-party content'),
      pendiente('Cómo gestionarlas', 'How to manage them'),
    ],
  },
  'normas-del-tablon': {
    titulo: { es: 'Normas del tablón', en: 'Noticeboard rules' },
    secciones: [
      pendiente('Qué se puede publicar', 'What you can post'),
      pendiente('Qué no se puede publicar', 'What you cannot post'),
      pendiente('Revisión y duración de los anuncios', 'Review and duration of ads'),
      pendiente('Responsabilidad', 'Liability'),
    ],
  },
};
