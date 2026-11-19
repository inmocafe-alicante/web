import Link from 'next/link';
import type { Idioma } from '@/content/tipos';
import { contenidos } from '@/content/contenido';
import { diccionario, ruta } from '@/lib/i18n';
import ui from './ui.module.css';
import estilos from './Pie.module.css';

export function Pie({ idioma }: { idioma: Idioma }) {
  const d = diccionario(idioma).pie;
  const enlaces = [
    { href: '/aviso-legal', texto: d.avisoLegal },
    { href: '/privacidad', texto: d.privacidad },
    { href: '/cookies', texto: d.cookies },
    { href: '/normas-del-tablon', texto: d.normasTablon },
  ];
  return (
    <footer className={estilos.pie}>
      <div className={ui.contenedor}>
        <p className={estilos.marca}>{contenidos.comun.pie[idioma]}</p>
        <nav aria-label={d.enlacesLegales}>
          <ul className={estilos.enlaces}>
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={ruta(e.href, idioma)}>{e.texto}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
