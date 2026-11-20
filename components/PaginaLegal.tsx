import { notFound } from 'next/navigation';
import type { Idioma, PaginaLegal as Pagina } from '@/content/tipos';
import { legalCompleta } from '@/lib/formato';
import ui from './ui.module.css';

/** Página legal. Sin todo su texto no se publica (404) ni se enlaza en el pie. */
export function PaginaLegal({ pagina, idioma }: { pagina: Pagina; idioma: Idioma }) {
  if (!legalCompleta(pagina)) notFound();
  return (
    <div className={ui.contenedor}>
      <header className={ui.cabeceraPagina}>
        <h1>{pagina.titulo[idioma]}</h1>
      </header>
      <div className={ui.pila} style={{ paddingBottom: 64, maxWidth: 760 }}>
        {pagina.secciones.map((s, i) => (
          <section key={i} className={ui.pila}>
            <h2 style={{ fontSize: 26 }}>{s.titulo[idioma]}</h2>
            <p className={ui.texto}>{s.texto?.[idioma]}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
