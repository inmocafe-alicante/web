import Image from 'next/image';
import Link from 'next/link';
import type { Idioma } from '@/content/tipos';
import { diccionario, ruta } from '@/lib/i18n';
import { MenuMovil } from './MenuMovil';
import { SelectorIdioma } from './SelectorIdioma';
import estilos from './Cabecera.module.css';

export function enlacesMenu(idioma: Idioma) {
  const m = diccionario(idioma).menu;
  return [
    { href: ruta('/', idioma), texto: m.inicio },
    { href: ruta('/eventos', idioma), texto: m.eventos },
    { href: ruta('/espacio', idioma), texto: m.espacio },
    { href: ruta('/tablon', idioma), texto: m.tablon },
    { href: ruta('/donde-estamos', idioma), texto: m.dondeEstamos },
  ];
}

export function Cabecera({ idioma }: { idioma: Idioma }) {
  const d = diccionario(idioma);
  const enlaces = enlacesMenu(idioma);
  return (
    <header className={estilos.cabecera}>
      <div className={estilos.fila}>
        <Link href={ruta('/', idioma)} className={estilos.logo} aria-label={`${d.nombreSitio} · ${d.inicio}`}>
          <Image src="/marca/logo-crema.png" alt="" width={68} height={52} priority />
        </Link>
        <nav aria-label={d.menuPrincipal} className={estilos.navEscritorio}>
          <ul>
            {enlaces.slice(1).map((e) => (
              <li key={e.href}>
                <Link href={e.href}>{e.texto}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={estilos.acciones}>
          <SelectorIdioma idioma={idioma} etiqueta={d.idioma} />
          <MenuMovil enlaces={enlaces} abrir={d.abrirMenu} cerrar={d.cerrarMenu} etiqueta={d.menuPrincipal} />
        </div>
      </div>
    </header>
  );
}
