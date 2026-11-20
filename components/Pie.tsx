import Link from 'next/link';
import type { Idioma } from '@/content/tipos';
import { contenidos } from '@/content/contenido';
import { diccionario, ruta } from '@/lib/i18n';
import { enlacesContacto, paginasLegales } from '@/lib/formato';
import ui from './ui.module.css';
import estilos from './Pie.module.css';

export function Pie({ idioma }: { idioma: Idioma }) {
  const dic = diccionario(idioma);
  const d = dic.pie;
  const textos: Record<(typeof paginasLegales)[number], string> = {
    'aviso-legal': d.avisoLegal,
    privacidad: d.privacidad,
    cookies: d.cookies,
    'normas-del-tablon': d.normasTablon,
  };
  // Las páginas legales sin texto no se enlazan hasta tenerlo.
  const legales = paginasLegales.map((k) => ({ href: `/${k}`, texto: textos[k] }));
  const e = enlacesContacto();
  const contacto = [
    { etiqueta: dic.donde.telefono, enlace: e.telefono, externo: false },
    { etiqueta: dic.donde.whatsapp, enlace: e.whatsapp, externo: true },
    { etiqueta: dic.donde.correo, enlace: e.correo, externo: false },
  ].flatMap((c) => (c.enlace ? [{ ...c, enlace: c.enlace }] : []));

  return (
    <footer className={estilos.pie}>
      <div className={ui.contenedor}>
        <p className={estilos.marca}>{contenidos.comun.pie[idioma]}</p>
        {contacto.length > 0 && (
          <ul className={estilos.enlaces} aria-label={dic.donde.contacto}>
            {contacto.map((c) => (
              <li key={c.etiqueta}>
                <a href={c.enlace.href} {...(c.externo ? { rel: 'noopener noreferrer' } : {})}>
                  <span className={estilos.etiqueta}>{c.etiqueta}</span> {c.enlace.texto}
                </a>
              </li>
            ))}
          </ul>
        )}
        {legales.length > 0 && (
          <nav aria-label={d.enlacesLegales}>
            <ul className={estilos.enlaces}>
              {legales.map((l) => (
                <li key={l.href}>
                  <Link href={ruta(l.href, idioma)}>{l.texto}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </footer>
  );
}
