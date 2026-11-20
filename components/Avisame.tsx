import type { Evento, Idioma } from '@/content/tipos';
import { contenidos } from '@/content/contenido';
import { diccionario } from '@/lib/i18n';
import ui from './ui.module.css';

/**
 * «Avísame de los próximos». En la fase 1 se ve pero no envía nada: la lista
 * de interesados (con consentimiento y doble confirmación) llega en la fase 2.
 */
export function Avisame({ evento, idioma }: { evento: Evento; idioma: Idioma }) {
  const d = diccionario(idioma).avisame;
  const c = contenidos.eventos;
  const id = `avisame-${evento.slug}`;
  return (
    <section id="avisame" className={ui.tarjetaBanda} aria-labelledby={`${id}-titulo`}>
      <h3 id={`${id}-titulo`}>{c.avisameTitulo[idioma]}</h3>
      <p className={ui.texto} style={{ margin: '8px 0 20px' }}>
        {c.avisameTexto[idioma]}
      </p>
      <form aria-describedby={`${id}-aviso`}>
        <fieldset className={ui.formulario} disabled>
          <div className={ui.campo}>
            <label htmlFor={`${id}-correo`}>{d.correo}</label>
            <input id={`${id}-correo`} name="correo" type="email" autoComplete="email" required />
          </div>
          <label className={ui.casilla}>
            <input type="checkbox" name="avisos" />
            <span>{d.quieroAvisos}</span>
          </label>
          <label className={ui.casilla}>
            <input type="checkbox" name="privacidad" required />
            <span>{d.aceptoPrivacidad}</span>
          </label>
          <div>
            <button type="submit" className={ui.boton}>
              {d.enviar}
            </button>
          </div>
        </fieldset>
        <p id={`${id}-aviso`} className={ui.aviso} style={{ marginTop: 12 }}>
          {d.proximamente}
        </p>
      </form>
    </section>
  );
}
