import Image from 'next/image';
import { Hueco } from './Hueco';
import ui from './ui.module.css';

interface Props {
  /** Ruta dentro de /public, p. ej. «/fotos/portada.jpg»; `null` = pendiente. */
  src: string | null;
  alt: string;
  alto: number;
  /** Texto del recuadro mientras la foto está pendiente. */
  pendiente: string;
  prioridad?: boolean;
  sizes?: string;
  children?: React.ReactNode;
}

/**
 * Foto con `next/image` (sirve WebP). Si la foto está pendiente (`null` en el
 * contenido), deja el recuadro. Que el archivo exista lo comprueba la compilación.
 */
export function Foto({ src, alt, alto, pendiente, prioridad, sizes = '(min-width: 1100px) 1100px, 100vw', children }: Props) {
  return (
    <div className={ui.foto} style={{ height: alto }}>
      {src ? (
        <Image src={src} alt={alt} fill priority={prioridad} sizes={sizes} />
      ) : (
        <div className={ui.fotoHueco} role="img" aria-label={alt}>
          <span>
            <Hueco etiqueta={pendiente} />
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
