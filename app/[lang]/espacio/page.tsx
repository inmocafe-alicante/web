import Link from 'next/link';
import type { Idioma } from '@/content/tipos';
import { ajustes, contenidos } from '@/content/contenido';
import { Foto } from '@/components/Foto';
import { diccionario, ruta } from '@/lib/i18n';
import { metadatos } from '@/lib/sitio';
import ui from '@/components/ui.module.css';
import estilos from './espacio.module.css';

export async function generateMetadata({ params }: PageProps<'/[lang]/espacio'>) {
  const idioma = (await params).lang as Idioma;
  return metadatos(idioma, '/espacio', contenidos.espacio.titulo[idioma]);
}

export default async function Espacio({ params }: PageProps<'/[lang]/espacio'>) {
  const idioma = (await params).lang as Idioma;
  const d = diccionario(idioma);
  const c = contenidos.espacio;
  const datos = [
    { dt: d.espacio.wifi, dd: c.wifi },
    { dt: d.espacio.enchufes, dd: c.enchufes },
    { dt: d.espacio.mesas, dd: c.mesas },
    { dt: d.espacio.mejorMomento, dd: c.mejorMomento },
  ].filter((x) => x.dd !== null); // lo que falta no se muestra

  return (
    <div className={ui.contenedor}>
      <header className={ui.cabeceraPagina}>
        <p className={ui.nota}>{c.nota[idioma]}</p>
        <h1>{c.titulo[idioma]}</h1>
      </header>

      <div className={estilos.filas}>
        <section className={`${estilos.cafe} ${c.fotoBarra ? '' : estilos.sinFoto}`} aria-labelledby="el-cafe">
          <Foto
            foto={c.fotoBarra}
            alt={c.fotoBarraAlt[idioma]}
            sizes="(min-width: 1100px) 494px, (min-width: 900px) 46vw, calc(100vw - 40px)"
          />
          <div className={ui.pila}>
            <h2 id="el-cafe">{c.cafeTitulo[idioma]}</h2>
            {c.cafeTexto && <p className={ui.texto}>{c.cafeTexto[idioma]}</p>}
            {ajustes.carta && (
              <a href={ajustes.carta} className={ui.boton}>
                {d.botones.verCarta}
              </a>
            )}
          </div>
        </section>

        <section className={`${ui.tarjeta} ${estilos.mesas} ${c.fotoMesa ? '' : estilos.sinFoto}`} aria-labelledby="las-mesas">
          <h2 id="las-mesas" className={estilos.mesasTitulo}>
            {c.mesasTitulo[idioma]}
          </h2>
          <Foto
            foto={c.fotoMesa}
            alt={c.fotoMesaAlt[idioma]}
            sizes="(min-width: 1100px) 466px, (min-width: 900px) 42vw, calc(100vw - 88px)"
            className={estilos.mesasFoto}
          />
          <dl className={`${ui.datos} ${estilos.mesasDatos}`}>
            {datos.map((x) => (
              <div key={x.dt} className={ui.dato}>
                <dt>{x.dt}</dt>
                <dd>{x.dd?.[idioma]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={`${ui.tarjetaBanda} ${ui.pila}`} aria-labelledby="y-eventos">
          <h2 id="y-eventos">{c.eventosTitulo[idioma]}</h2>
          <Link href={ruta('/eventos', idioma)} className={ui.boton}>
            {d.botones.verEventos}
          </Link>
        </section>
      </div>
    </div>
  );
}
