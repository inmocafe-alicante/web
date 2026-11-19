import type { Metadata } from 'next';
import type { Idioma } from '@/content/tipos';
import { contenidos } from '@/content/contenido';
import { idiomas, ruta } from '@/lib/i18n';

/**
 * Mientras no haya dominio ni OK de publicación (§8), la web no se indexa.
 * Se cambia a `true` solo cuando Ariadna dé el «fusiona y publica» con dominio.
 */
export const INDEXAR = false;

function urlBase(): URL {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return new URL(host ? `https://${host}` : 'http://localhost:3000');
}

/** Metadatos de una página: título, descripción, `hreflang` y `noindex`. */
export function metadatos(idioma: Idioma, camino: string, titulo?: string): Metadata {
  const languages: Record<string, string> = Object.fromEntries(idiomas.map((i) => [i, ruta(camino, i)]));
  languages['x-default'] = ruta(camino, 'es');
  return {
    metadataBase: urlBase(),
    title: titulo ? `${titulo} · InmoCafé` : 'InmoCafé',
    description: contenidos.comun.descripcion[idioma],
    alternates: { canonical: ruta(camino, idioma), languages },
    robots: INDEXAR ? undefined : { index: false, follow: false },
  };
}
