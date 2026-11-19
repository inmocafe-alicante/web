import type { Idioma } from '@/content/tipos';
import { ajustes, contenidos } from '@/content/contenido';
import { Foto } from '@/components/Foto';
import { Hueco } from '@/components/Hueco';
import { MapaDiferido } from '@/components/MapaDiferido';
import { diccionario } from '@/lib/i18n';
import { diasSemana, tramos } from '@/lib/formato';
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
  const { direccion, contacto } = ajustes;
  const telefono = contacto.telefono.replace(/\s/g, '');

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
            src="/fotos/fachada.jpg"
            alt={contenidos.dondeEstamos.fotoFachadaAlt[idioma]}
            alto={220}
            pendiente={d.huecos.foto}
            sizes="(min-width: 900px) 550px, 100vw"
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
              <dt>{d.donde.telefono}</dt>
              <dd>
                <a href={`tel:+34${telefono}`}>{contacto.telefono}</a>
              </dd>
              <dt>{d.donde.whatsapp}</dt>
              <dd>
                {contacto.whatsapp ? (
                  <a href={`https://wa.me/34${contacto.whatsapp.replace(/\s/g, '')}`}>{contacto.whatsapp}</a>
                ) : (
                  <Hueco etiqueta={d.huecos.pendiente} />
                )}
              </dd>
              <dt>{d.donde.instagram}</dt>
              <dd>
                <a href={`https://www.instagram.com/${contacto.instagram}/`} rel="noopener noreferrer">
                  @{contacto.instagram}
                </a>
              </dd>
              <dt>{d.donde.tiktok}</dt>
              <dd>
                <a href={`https://www.tiktok.com/@${contacto.tiktok}`} rel="noopener noreferrer">
                  @{contacto.tiktok}
                </a>
              </dd>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
