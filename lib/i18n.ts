import { es } from '@/diccionarios/es';
import { en } from '@/diccionarios/en';
import type { Diccionario } from '@/diccionarios/es';
import type { Idioma, Texto } from '@/content/tipos';

export const idiomas: Idioma[] = ['es', 'en'];
export const idiomaPorDefecto: Idioma = 'es';

export function esIdioma(valor: string): valor is Idioma {
  return (idiomas as string[]).includes(valor);
}

export function diccionario(idioma: Idioma): Diccionario {
  return idioma === 'en' ? en : es;
}

/** Texto en el idioma pedido; `null` si es un hueco. */
export function tx(texto: Texto | null | undefined, idioma: Idioma): string | null {
  return texto ? texto[idioma] : null;
}

/** Ruta con prefijo de idioma: ruta('/eventos', 'en') → '/en/eventos'. */
export function ruta(camino: string, idioma: Idioma): string {
  return camino === '/' || camino === '' ? `/${idioma}` : `/${idioma}${camino}`;
}
