import Image from 'next/image';
import type { FotoContenido } from '@/content/tipos';
import ui from './ui.module.css';

interface Props {
  /** Foto del contenido; `null` = pendiente: no se muestra nada. */
  foto: FotoContenido | null;
  alt: string;
  /** Ancho real de la columna donde va la foto (atributo `sizes`). */
  sizes: string;
  prioridad?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Sin foto (`null`), no se muestra nada.
 * Foto en 4:3 con `next/image` (WebP). El recorte, si lo hay, respeta el punto
 * de interés (`foco`). Next nunca la amplía por encima del original, y con
 * `sizes` el navegador pide solo el ancho que necesita la columna.
 */
export function Foto({ foto, alt, sizes, prioridad, className, children }: Props) {
  if (!foto) return null;
  return (
    <div className={`${ui.foto} ${className ?? ''}`}>
      <Image
        src={foto.src}
        alt={alt}
        fill
        priority={prioridad}
        sizes={sizes}
        style={{ objectFit: 'cover', objectPosition: foto.foco }}
      />
      {children}
    </div>
  );
}
