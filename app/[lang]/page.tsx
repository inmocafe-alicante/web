import Link from 'next/link';
import type { Idioma } from '@/content/tipos';
import { ajustes, contenidos, eventos } from '@/content/contenido';
import { Foto } from '@/components/Foto';
import { Icono } from '@/components/Icono';
import { ConAcento } from '@/components/Textos';
import { Cuando } from '@/components/FichaEvento';
import { diccionario, ruta } from '@/lib/i18n';
import { fechaLarga, plazasLibres, proximasSesiones, resumenHorario } from '@/lib/formato';
import { metadatos } from '@/lib/sitio';
import ui from '@/components/ui.module.css';
import ev from '@/components/Eventos.module.css';
import estilos from './inicio.module.css';

export async function generateMetadata({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  return metadatos(lang as Idioma, '/');
}

export default async function Inicio({ params }: PageProps<'/[lang]'>) {
  const idioma = (await params).lang as Idioma;
  const d = diccionario(idioma);
  const c = contenidos.inicio;
  const activos = eventos.filter((e) => e.activo).sort((a, b) => a.orden - b.orden);

  return (
    <>
      {/* 1. Entrada */}
      <section className={`${ui.contenedor} ${estilos.entrada}`}>
        <div className={estilos.entradaTexto}>
          <p className={ui.etiqueta}>{c.etiqueta[idioma]}</p>
          <h1 className={estilos.titular}>
            <ConAcento texto={c.titulo[idioma]} />
          </h1>
          <p className={ui.texto}>{c.texto[idioma]}</p>
          <div className={ui.botones}>
            <Link href={ruta('/eventos', idioma)} className={ui.boton}>
              {d.botones.verEventos}
            </Link>
            <Link href={ruta('/donde-estamos', idioma)} className={ui.botonSec}>
              {d.botones.comoLlegar}
            </Link>
          </div>
        </div>
        <div className={estilos.entradaFoto}>
          <Foto src={c.foto} alt={c.fotoAlt[idioma]} alto={260} pendiente={d.huecos.foto} prioridad>
            <div className={estilos.velo} aria-hidden="true" />
            <p className={`${ui.nota} ${estilos.notaFoto}`} lang="es">
              {c.notaFoto[idioma]}
            </p>
          </Foto>
        </div>
      </section>

      {/* 2. Así funciona — Inmo + café */}
      <section className={ui.seccion} aria-labelledby="concepto">
        <div className={ui.contenedor}>
          <p className={ui.etiqueta}>{c.conceptoEtiqueta[idioma]}</p>
          <h2 id="concepto" className={estilos.h2}>
            <ConAcento texto={c.conceptoTitulo[idioma]} />
          </h2>
          <div className={estilos.concepto}>
            <div className={`${ui.tarjeta} ${estilos.pieza}`}>
              <span className={estilos.icono}>
                <Icono nombre="edificio" tamano={32} />
              </span>
              <p className={ui.nota}>{c.inmoNota[idioma]}</p>
              <h3>{c.inmoTitulo[idioma]}</h3>
              <p className={ui.texto}>{c.inmoTexto[idioma]}</p>
            </div>
            <span className={estilos.mas} aria-hidden="true">
              +
            </span>
            <div className={`${ui.tarjetaBanda} ${estilos.pieza}`}>
              <span className={estilos.icono}>
                <Icono nombre="taza" tamano={32} />
              </span>
              <p className={ui.nota}>{c.cafeNota[idioma]}</p>
              <h3>{c.cafeTitulo[idioma]}</h3>
              <p className={ui.texto}>{c.cafeTexto[idioma]}</p>
            </div>
            <span className={estilos.igual} aria-hidden="true">
              =
            </span>
            <div className={estilos.resultado}>
              <h3>{c.resultadoTitulo[idioma]}</h3>
              <ul className={estilos.accesos}>
                {c.accesos.map((a) => (
                  <li key={a.titulo.es}>
                    <Link href={ruta(a.ruta, idioma)}>
                      <strong>{a.titulo[idioma]}</strong>
                      <span>{a.subtitulo[idioma]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Esta semana — Próximos eventos */}
      <section className={`${ui.seccion} ${ui.banda}`} aria-labelledby="proximos">
        <div className={ui.contenedor}>
          <p className={ui.etiqueta}>{c.eventosEtiqueta[idioma]}</p>
          <h2 id="proximos" className={estilos.h2}>
            {c.eventosTitulo[idioma]}
          </h2>
          <ul className={ev.lista}>
            {activos.map((e) => {
              const sesion = proximasSesiones(e)[0];
              return (
                <li key={e.slug} className={ev.tarjeta}>
                  <p className={ev.fecha}>
                    {sesion ? `${fechaLarga(sesion.fecha, idioma)} · ${sesion.horaInicio}` : d.eventos.fechaPorAnunciar}
                  </p>
                  <h3>{e.nombre[idioma]}</h3>
                  {sesion ? (
                    <>
                      <p className={ev.plazas}>{d.eventos.quedanPlazas(plazasLibres(sesion))}</p>
                      <Link className={`${ui.boton} ${ev.accion}`} href={ruta(`/eventos/${e.slug}/${sesion.fecha}`, idioma)}>
                        {d.botones.apuntate}
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className={ev.plazas}>
                        <Cuando evento={e} idioma={idioma} />
                      </p>
                      <Link className={`${ui.boton} ${ev.accion}`} href={`${ruta(`/eventos/${e.slug}`, idioma)}#avisame`}>
                        {d.botones.avisame}
                      </Link>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
          <Link href={ruta('/eventos', idioma)} className={ui.enlace}>
            {d.botones.verTodosEventos} <Icono nombre="flecha" tamano={20} />
          </Link>
        </div>
      </section>

      {/* 4. Tablón de compraventa */}
      <section className={ui.seccion} aria-labelledby="tablon">
        <div className={ui.contenedor}>
          <p className={ui.etiqueta}>{c.tablonEtiqueta[idioma]}</p>
          <h2 id="tablon" className={estilos.h2}>
            {c.tablonTitulo[idioma]}
          </h2>
          <p className={ui.texto} style={{ margin: '16px 0 24px' }}>
            {c.tablonVacio[idioma]}
          </p>
          <div className={ui.botones}>
            <Link href={ruta('/tablon', idioma)} className={ui.boton}>
              {d.botones.verTablon}
            </Link>
            <span className={ui.botonSec} aria-disabled="true">
              {d.botones.publicarAnuncio}
            </span>
          </div>
        </div>
      </section>

      {/* 5. Ven a vernos */}
      <section className={estilos.visita} aria-labelledby="visita">
        <div className={ui.contenedor}>
          <div className={`${ui.tarjeta} ${ui.pila}`}>
            <h2 id="visita" className={estilos.h2}>
              {c.visitaTitulo[idioma]}
            </h2>
            <p>
              {ajustes.direccion.calle} · {ajustes.direccion.ciudad}
            </p>
            <p className={ui.texto}>{resumenHorario(idioma)}</p>
            <Link href={ruta('/donde-estamos', idioma)} className={ui.enlace}>
              {d.botones.comoLlegar} <Icono nombre="flecha" tamano={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
