import type { Idioma, PaginaLegal as Pagina } from '@/content/tipos';
import { diccionario } from '@/lib/i18n';
import { TextoOHueco } from './Textos';
import ui from './ui.module.css';

export function PaginaLegal({ pagina, idioma }: { pagina: Pagina; idioma: Idioma }) {
  const d = diccionario(idioma);
  const pendiente = pagina.secciones.some((s) => s.texto === null);
  return (
    <div className={ui.contenedor}>
      <header className={ui.cabeceraPagina}>
        <h1>{pagina.titulo[idioma]}</h1>
        {pendiente && <p className={ui.aviso}>{d.legal.borradorAviso}</p>}
      </header>
      <div className={ui.pila} style={{ paddingBottom: 64, maxWidth: 760 }}>
        {pagina.secciones.map((s, i) => (
          <section key={i} className={ui.pila}>
            <h2 style={{ fontSize: 26 }}>{s.titulo[idioma]}</h2>
            <p className={ui.texto}>
              <TextoOHueco texto={s.texto} idioma={idioma} />
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
