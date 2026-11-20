import type { DiaSemana, Evento, Idioma, Sesion, Tramo } from '@/content/tipos';
import { ajustes, legales, sesiones } from '@/content/contenido';
import type { PaginaLegal } from '@/content/tipos';
import { diccionario } from '@/lib/i18n';

export const diasSemana: DiaSemana[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

export function duracion(minutos: number, idioma: Idioma): string {
  const d = diccionario(idioma).eventos;
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return m === 0 ? d.horas(h) : d.horasMinutos(h, m);
}

export function tramos(lista: Tramo[], idioma: Idioma): string {
  const d = diccionario(idioma).horario;
  if (lista.length === 0) return d.cerrado;
  return lista.map((t) => `${t.abre}–${t.cierra}`).join(` ${d.y} `);
}

/** «Lunes a viernes 9:00–14:00 y 16:00–20:00 · Sábado 9:00–14:00 · Domingo cerrado» */
export function resumenHorario(idioma: Idioma): string {
  const dic = diccionario(idioma);
  const grupos: { desde: DiaSemana; hasta: DiaSemana; texto: string }[] = [];
  for (const dia of diasSemana) {
    const texto = tramos(ajustes.horario[dia], idioma);
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.texto === texto) ultimo.hasta = dia;
    else grupos.push({ desde: dia, hasta: dia, texto });
  }
  return grupos
    .map((g) => {
      const desde = dic.eventos.dias[g.desde];
      const dias =
        g.desde === g.hasta ? desde : `${desde} ${dic.horario.a} ${idioma === 'es' ? dic.eventos.dias[g.hasta].toLowerCase() : dic.eventos.dias[g.hasta]}`;
      return `${dias} ${g.texto}`;
    })
    .join(' · ');
}

/** Fechas abiertas y futuras de un evento, ordenadas. */
export function proximasSesiones(evento: Evento, hoy = new Date()): Sesion[] {
  const hoyIso = hoy.toISOString().slice(0, 10);
  return sesiones
    .filter((s) => s.evento === evento.slug && s.estado !== 'cancelada' && s.fecha >= hoyIso)
    .sort((a, b) => (a.fecha + a.horaInicio).localeCompare(b.fecha + b.horaInicio));
}

export function plazasLibres(s: Sesion): number {
  return Math.max(0, s.plazasWeb - s.ocupadas);
}

export function fechaLarga(iso: string, idioma: Idioma): string {
  const fecha = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat(idioma === 'es' ? 'es-ES' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(fecha);
}

/** Una página legal se publica (y se enlaza en el pie) solo con todo su texto. */
export function legalCompleta(pagina: PaginaLegal): boolean {
  return pagina.secciones.every((s) => s.texto !== null);
}

export const paginasLegales = (Object.keys(legales) as (keyof typeof legales)[]).filter((k) => legalCompleta(legales[k]));

const soloDigitos = (n: string) => n.replace(/\D/g, '');

/** Enlaces de contacto que existen; los que faltan no salen. */
export function enlacesContacto() {
  const c = ajustes.contacto;
  return {
    telefono: c.telefono ? { texto: c.telefono, href: `tel:+34${soloDigitos(c.telefono)}` } : null,
    whatsapp: c.whatsapp ? { texto: c.whatsapp, href: `https://wa.me/34${soloDigitos(c.whatsapp)}` } : null,
    correo: c.correo ? { texto: c.correo, href: `mailto:${c.correo}` } : null,
    instagram: c.instagram ? { texto: `@${c.instagram}`, href: `https://www.instagram.com/${c.instagram}/` } : null,
    tiktok: c.tiktok ? { texto: `@${c.tiktok}`, href: `https://www.tiktok.com/@${c.tiktok}` } : null,
  };
}
