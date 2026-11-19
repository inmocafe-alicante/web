'use client';

import Link from 'next/link';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { useRef } from 'react';
import estilos from './Eventos.module.css';

interface Props {
  etiqueta: string;
  pestanas: { slug: string; href: string; texto: string }[];
}

/** Pestañas accesibles: cada una tiene su URL; flechas, Inicio y Fin para moverse. */
export function PestanasEventos({ etiqueta, pestanas }: Props) {
  const router = useRouter();
  // Sin segmento (/eventos) se muestra el primer evento.
  const activa = useSelectedLayoutSegment() ?? pestanas[0]?.slug;
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);

  function alPulsar(e: React.KeyboardEvent, i: number) {
    let destino: number | null = null;
    if (e.key === 'ArrowRight') destino = (i + 1) % pestanas.length;
    if (e.key === 'ArrowLeft') destino = (i - 1 + pestanas.length) % pestanas.length;
    if (e.key === 'Home') destino = 0;
    if (e.key === 'End') destino = pestanas.length - 1;
    if (destino === null) return;
    e.preventDefault();
    refs.current[destino]?.focus();
    router.push(pestanas[destino].href, { scroll: false });
  }

  return (
    <div role="tablist" aria-label={etiqueta} className={estilos.pestanas}>
      {pestanas.map((p, i) => {
        const seleccionada = p.slug === activa;
        return (
          <Link
            key={p.slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`pestana-${p.slug}`}
            href={p.href}
            scroll={false}
            role="tab"
            aria-selected={seleccionada}
            aria-controls="panel-evento"
            tabIndex={seleccionada ? 0 : -1}
            onKeyDown={(e) => alPulsar(e, i)}
            className={estilos.pestana}
          >
            {p.texto}
          </Link>
        );
      })}
    </div>
  );
}
