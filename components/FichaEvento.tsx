import Link from 'next/link';
import type { Evento, Idioma } from '@/content/tipos';
import { diccionario, ruta } from '@/lib/i18n';
import { duracion, fechaLarga, plazasLibres, proximasSesiones } from '@/lib/formato';
import { FUNCIONES } from '@/lib/sitio';
import { Avisame } from './Avisame';
import { Foto } from './Foto';
import ui from './ui.module.css';
import estilos from './Eventos.module.css';

export function Cuando({ evento, idioma }: { evento: Evento; idioma: Idioma }) {
  const d = diccionario(idioma);
  // Sin día o sin hora confirmados: «Día y hora por anunciar».
  if (evento.diaSemana === null || evento.hora === null) return <>{d.eventos.diaHoraPorAnunciar}</>;
  return (
    <>
      {d.eventos.dias[evento.diaSemana]} · {evento.hora}
    </>
  );
}

export function FichaEvento({ evento, idioma }: { evento: Evento; idioma: Idioma }) {
  const d = diccionario(idioma);
  const proximas = proximasSesiones(evento);
  return (
    <article className={estilos.ficha}>
      <div className={estilos.fichaIntro}>
        <p className={ui.nota}>{evento.nota[idioma]}</p>
        <h2>{evento.nombre[idioma]}</h2>
        <p className={ui.texto}>{evento.entradilla[idioma]}</p>
      </div>

      <Foto
        foto={evento.foto}
        alt={evento.fotoAlt[idioma]}
        sizes="(min-width: 700px) 640px, calc(100vw - 40px)"
      />

      <dl className={ui.datos}>
        <div className={ui.dato}>
          <dt>{d.eventos.cuando}</dt>
          <dd>
            <Cuando evento={evento} idioma={idioma} />
          </dd>
        </div>
        <div className={ui.dato}>
          <dt>{d.eventos.duracion}</dt>
          <dd>{duracion(evento.duracionMinutos, idioma)}</dd>
        </div>
        {evento.precioEuros !== null && (
          <div className={ui.dato}>
            <dt>{d.eventos.entrada}</dt>
            <dd>
              {d.eventos.precio(evento.precioEuros)} {d.eventos.porPersona}
              <span className={estilos.incluye}>{evento.incluye[idioma]}</span>
            </dd>
          </div>
        )}
      </dl>

      <section aria-labelledby={`como-${evento.slug}`}>
        <h3 id={`como-${evento.slug}`}>{d.eventos.comoFunciona}</h3>
        <ol className={estilos.pasos}>
          {evento.pasos.map((p, i) => (
            <li key={i}>{p[idioma]}</li>
          ))}
        </ol>
      </section>

      {proximas.length > 0 ? (
        <section aria-labelledby={`fechas-${evento.slug}`}>
          <h3 id={`fechas-${evento.slug}`}>{d.eventos.proximasFechas}</h3>
          <ul className={estilos.fechas}>
            {proximas.map((s) => {
              const libres = plazasLibres(s);
              return (
                <li key={s.fecha} className={ui.tarjeta2}>
                  <p className={estilos.fecha}>
                    {fechaLarga(s.fecha, idioma)} · {s.horaInicio}
                  </p>
                  <p className={estilos.plazas}>{libres > 0 ? d.eventos.quedanPlazas(libres) : d.eventos.completo}</p>
                  {libres > 0 && (
                    <Link className={ui.boton} href={ruta(`/eventos/${evento.slug}/${s.fecha}`, idioma)}>
                      {d.botones.apuntate}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        <p className={estilos.porAnunciar}>{d.eventos.fechaPorAnunciar}</p>
      )}

      {FUNCIONES.avisame && <Avisame evento={evento} idioma={idioma} />}
    </article>
  );
}
