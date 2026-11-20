import Image from 'next/image';
import type { FotoContenido } from '@/content/tipos';
import { Hueco } from './Hueco';
import ui from './ui.module.css';

interface Props {
  /** Foto del contenido; `null` = pendiente. */
  foto: FotoContenido | null;
  alt: string;
  /** Texto del recuadro mientras la foto está pendiente. */
  pendiente: string;
  /** Ancho real de la columna donde va la foto (atributo `sizes`). */
  sizes: string;
  prioridad?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Foto en 4:3 con `next/image` (WebP). El recorte, si lo hay, respeta el punto
 * de interés (`foco`). Next nunca la amplía por encima del original, y con
 * `sizes` el navegador pide solo el ancho que necesita la columna.
 */
export function Foto({ foto, alt, pendiente, sizes, prioridad, className, children }: Props) {
  return (
    <div className={`${ui.foto} ${className ?? ''}`}>
      {foto ? (
        <Image
          src={foto.src}
          alt={alt}
          fill
          priority={prioridad}
          sizes={sizes}
          style={{ objectFit: 'cover', objectPosition: foto.foco }}
        />
      ) : (
        <div className={ui.fotoHueco} role="img" aria-label={alt}>
          <Hueco etiqueta={pendiente} />
        </div>
      )}
      {children}
    </div>
  );
}
