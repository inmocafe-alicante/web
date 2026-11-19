import type { Idioma } from '@/content/tipos';
import { contenidos } from '@/content/contenido';
import { diccionario } from '@/lib/i18n';
import { metadatos } from '@/lib/sitio';
import ui from '@/components/ui.module.css';

export async function generateMetadata({ params }: PageProps<'/[lang]/tablon'>) {
  const idioma = (await params).lang as Idioma;
  return metadatos(idioma, '/tablon', contenidos.tablon.titulo[idioma]);
}

/** Tablón: en la fase 1 solo la cabecera; anuncios y publicación llegan en la fase 4. */
export default async function Tablon({ params }: PageProps<'/[lang]/tablon'>) {
  const idioma = (await params).lang as Idioma;
  const d = diccionario(idioma);
  const c = contenidos.tablon;
  return (
    <div className={ui.contenedor} style={{ padding: '32px var(--margen) 64px' }}>
      <header className={`${ui.tarjeta} ${ui.pila}`}>
        <p className={ui.nota}>{c.nota[idioma]}</p>
        <h1>{c.titulo[idioma]}</h1>
        <p className={ui.texto}>{c.texto[idioma]}</p>
        <span className={ui.boton} aria-disabled="true">
          {d.botones.publicarAnuncio}
        </span>
      </header>
      <p className={ui.texto} style={{ marginTop: 28 }}>
        {contenidos.inicio.tablonVacio[idioma]}
      </p>
      <p className={ui.aviso} style={{ marginTop: 8 }}>
        {d.tablon.proximamente}
      </p>
    </div>
  );
}
