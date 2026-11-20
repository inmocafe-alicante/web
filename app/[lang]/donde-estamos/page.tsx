import { Fragment } from 'react';
import type { Idioma } from '@/content/tipos';
import { ajustes, contenidos } from '@/content/contenido';
import { Foto } from '@/components/Foto';
import { MapaDiferido } from '@/components/MapaDiferido';
import { diccionario } from '@/lib/i18n';
import { diasSemana, enlacesContacto, tramos } from '@/lib/formato';
import { metadatos } from '@/lib/sitio';
import ui from '@/components/ui.module.css';
import estilos from './donde.module.css';

export async function generateMetadata({ params }: PageProps<'/[lang]/donde-estamos'>) {
  const idioma = (await params).lang as Idioma;
  return metadatos(idioma, '/donde-estamos', contenidos.dondeEstamos.titulo[idioma]);
}

export default async function DondeEstamos({ params }: PageProps<'/[lang]/donde-estamos'>) {
  const idioma = (await params).lang as Idioma;
  const d = diccionario(idioma);
  const { direccion } = ajustes;
  const e = enlacesContacto();
  // Solo los datos de contacto que existen.
  const filas = [
    { dt: d.donde.telefono, enlace: e.telefono, externo: false },
    { dt: d.donde.whatsapp, enlace: e.whatsapp, externo: true },
    { dt: d.donde.correo, enlace: e.correo, externo: false },
    { dt: d.donde.instagram, enlace: e.instagram, externo: true },
    { dt: d.donde.tiktok, enlace: e.tiktok, externo: true },
  ].flatMap((f) => (f.enlace ? [{ ...f, enlace: f.enlace }] : []));

  return (
    <div className={ui.contenedor}>
      <header className={ui.cabeceraPagina}>
        <h1>{contenidos.dondeEstamos.titulo[idioma]}</h1>
      </header>

      <div className={estilos.rejilla}>
        <div className={ui.pila}>
          <MapaDiferido
            src={ajustes.mapaIncrustado}
            titulo={d.donde.tituloMapa}
            boton={d.donde.cargarMapa}
            aviso={d.donde.avisoMapa}
          />
          <Foto
            foto={contenidos.dondeEstamos.fotoFachada}
            alt={contenidos.dondeEstamos.fotoFachadaAlt[idioma]}
            sizes="(min-width: 1100px) 518px, (min-width: 900px) 47vw, calc(100vw - 40px)"
          />
        </div>

        <div className={ui.pila}>
          <section className={ui.pila} aria-labelledby="direccion">
            <h2 id="direccion" className="sr-only">
              {d.donde.direccion}
            </h2>
            <p className={estilos.direccion}>
              {direccion.calle} · {direccion.codigoPostal} {direccion.ciudad}
            </p>
            <a href={ajustes.enlaceMapa} className={ui.boton} target="_blank" rel="noopener noreferrer">
              {d.botones.comoLlegar}
            </a>
          </section>

          <section className={ui.tarjeta} aria-labelledby="horario">
            <h2 id="horario" className={estilos.h2}>
              {d.donde.horario}
            </h2>
            <table className={estilos.tabla}>
              <thead className="sr-only">
                <tr>
                  <th scope="col">{d.donde.dia}</th>
                  <th scope="col">{d.donde.horas}</th>
                </tr>
              </thead>
              <tbody>
                {diasSemana.map((dia) => (
                  <tr key={dia}>
                    <th scope="row">{d.eventos.dias[dia]}</th>
                    <td>{ajustes.horario[dia].length ? tramos(ajustes.horario[dia], idioma) : d.donde.cerrado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className={ui.tarjeta} aria-labelledby="contacto">
            <h2 id="contacto" className={estilos.h2}>
              {d.donde.contacto}
            </h2>
            <dl className={estilos.contacto}>
              {filas.map((f) => (
                <Fragment key={f.dt}>
                  <dt>{f.dt}</dt>
                  <dd>
                    <a href={f.enlace.href} {...(f.externo ? { rel: 'noopener noreferrer' } : {})}>
                      {f.enlace.texto}
                    </a>
                  </dd>
                </Fragment>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
