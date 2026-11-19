import ui from './ui.module.css';

/** Dato que falta. Se ve en Preview y bloquea la publicación en producción. */
export function Hueco({ etiqueta }: { etiqueta: string }) {
  return (
    <span className={ui.hueco} data-hueco>
      {etiqueta}
    </span>
  );
}
