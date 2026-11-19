import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { Hueco } from './Hueco';
import ui from './ui.module.css';

interface Props {
  /** Ruta dentro de /public, p. ej. «/fotos/portada.jpg». */
  src: string | null;
  alt: string;
  alto: number;
  /** Texto del recuadro si la foto todavía no está en el repositorio. */
  pendiente: string;
  prioridad?: boolean;
  sizes?: string;
  children?: React.ReactNode;
}

function existe(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), 'public', src));
}

/**
 * Foto con `next/image` (sirve WebP). Si el archivo aún no está en /public,
 * deja el recuadro con el nombre del archivo que falta.
 */
export function Foto({ src, alt, alto, pendiente, prioridad, sizes = '(min-width: 1100px) 1100px, 100vw', children }: Props) {
  const hay = src !== null && existe(src);
  return (
    <div className={ui.foto} style={{ height: alto }}>
      {hay ? (
        <Image src={src} alt={alt} fill priority={prioridad} sizes={sizes} />
      ) : (
        <div className={ui.fotoHueco} role="img" aria-label={alt}>
          <span>
            <Hueco etiqueta={pendiente} />
            <br />
            <small>{src ?? ''}</small>
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
