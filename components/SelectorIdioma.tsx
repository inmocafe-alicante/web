'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import estilos from './Cabecera.module.css';

const opciones = [
  { codigo: 'es', texto: 'ES', nombre: 'Español' },
  { codigo: 'en', texto: 'EN', nombre: 'English' },
] as const;

/** «ES · EN»: cambia de idioma y se queda en la misma página. */
export function SelectorIdioma({ idioma, etiqueta }: { idioma: string; etiqueta: string }) {
  const pathname = usePathname() ?? `/${idioma}`;
  const resto = pathname.replace(/^\/(es|en)(?=\/|$)/, '');
  return (
    <nav aria-label={etiqueta} className={estilos.idiomas}>
      {opciones.map((o, i) => (
        <span key={o.codigo}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          <Link
            href={`/${o.codigo}${resto}`}
            hrefLang={o.codigo}
            lang={o.codigo}
            aria-current={o.codigo === idioma ? 'true' : undefined}
            aria-label={o.nombre}
          >
            {o.texto}
          </Link>
        </span>
      ))}
    </nav>
  );
}
