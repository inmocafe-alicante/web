import type { Contenido, Idioma } from '@/content/tipos';
import { diccionario } from '@/lib/i18n';
import { Hueco } from './Hueco';
import ui from './ui.module.css';

/** Pinta en Terracota lo que va entre asteriscos: «Una cafetería dentro de una *inmobiliaria*». */
export function ConAcento({ texto }: { texto: string }) {
  const partes = texto.split('*');
  return (
    <>
      {partes.map((parte, i) =>
        i % 2 === 1 ? (
          <span key={i} className={ui.acento}>
            {parte}
          </span>
        ) : (
          parte
        ),
      )}
    </>
  );
}

/** Texto del contenido, o hueco «PENDIENTE DE ARIADNA» si falta. */
export function TextoOHueco({ texto, idioma }: { texto: Contenido; idioma: Idioma }) {
  return texto ? <>{texto[idioma]}</> : <Hueco etiqueta={diccionario(idioma).huecos.pendiente} />;
}
