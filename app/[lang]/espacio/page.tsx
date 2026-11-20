import Link from 'next/link';
import type { Idioma } from '@/content/tipos';
import { ajustes, contenidos } from '@/content/contenido';
import { Foto } from '@/components/Foto';
import { Hueco } from '@/components/Hueco';
import { TextoOHueco } from '@/components/Textos';
import { diccionario, ruta } from '@/lib/i18n';
import { metadatos } from '@/lib/sitio';
import ui from '@/components/ui.module.css';

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
  ];

  return (
    <div className={ui.contenedor}>
      <header className={ui.cabeceraPagina}>
        <p className={ui.nota}>{c.nota[idioma]}</p>
        <h1>{c.titulo[idioma]}</h1>
      </header>

      <div className={ui.pila} style={{ paddingBottom: 64 }}>
        <Foto src={c.fotoBarra} alt={c.fotoBarraAlt[idioma]} alto={280} pendiente={d.huecos.foto} />

        <section className={ui.pila} aria-labelledby="el-cafe" style={{ paddingTop: 16 }}>
          <h2 id="el-cafe">{c.cafeTitulo[idioma]}</h2>
          <p className={ui.texto}>
            <TextoOHueco texto={c.cafeTexto} idioma={idioma} />
          </p>
          {ajustes.carta ? (
            <a href={ajustes.carta} className={ui.boton}>
              {d.botones.verCarta}
            </a>
          ) : (
            <p>
              <span className={ui.boton} aria-disabled="true">
                {d.botones.verCarta}
              </span>{' '}
              <Hueco etiqueta={d.huecos.pendiente} />
            </p>
          )}
        </section>

        <section className={`${ui.tarjeta} ${ui.pila}`} aria-labelledby="las-mesas">
          <h2 id="las-mesas">{c.mesasTitulo[idioma]}</h2>
          <Foto src={c.fotoMesa} alt={c.fotoMesaAlt[idioma]} alto={240} pendiente={d.huecos.foto} />
          <dl className={ui.datos}>
            {datos.map((x) => (
              <div key={x.dt} className={ui.dato}>
                <dt>{x.dt}</dt>
                <dd>
                  <TextoOHueco texto={x.dd} idioma={idioma} />
                </dd>
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
