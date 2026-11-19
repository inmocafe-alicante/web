import { notFound } from 'next/navigation';
import type { Idioma } from '@/content/tipos';
import { contenidos, eventos } from '@/content/contenido';
import { diccionario, ruta } from '@/lib/i18n';
import { FichaEvento } from './FichaEvento';
import { PestanasEventos } from './PestanasEventos';
import ui from './ui.module.css';

export const eventosActivos = () => eventos.filter((e) => e.activo).sort((a, b) => a.orden - b.orden);

/** Cabecera de Eventos + pestañas. Va en el layout para conservar el foco al cambiar de pestaña. */
export function CabeceraEventos({ idioma }: { idioma: Idioma }) {
  const d = diccionario(idioma);
  const c = contenidos.eventos;
  const lista = eventosActivos();
  return (
    <section className={ui.banda}>
      <div className={`${ui.contenedor} ${ui.cabeceraPagina}`}>
        <p className={ui.etiqueta}>{c.etiqueta[idioma]}</p>
        <h1>{c.titulo[idioma]}</h1>
        <p className={ui.texto}>{c.texto[idioma]}</p>
        <PestanasEventos
          etiqueta={d.eventos.pestanas}
          pestanas={lista.map((e) => ({
            slug: e.slug,
            href: ruta(`/eventos/${e.slug}`, idioma),
            texto: e.nombre[idioma].split(' · ')[0],
          }))}
        />
      </div>
    </section>
  );
}

/** Panel de la pestaña elegida (por defecto, el primer evento). */
export function PanelEvento({ idioma, slug }: { idioma: Idioma; slug?: string }) {
  const lista = eventosActivos();
  const evento = slug ? lista.find((e) => e.slug === slug) : lista[0];
  if (!evento) notFound();
  return (
    <div
      id="panel-evento"
      role="tabpanel"
      aria-labelledby={`pestana-${evento.slug}`}
      className={`${ui.contenedor} ${ui.seccion}`}
    >
      <FichaEvento evento={evento} idioma={idioma} />
    </div>
  );
}
