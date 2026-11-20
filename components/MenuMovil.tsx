'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icono } from './Icono';
import estilos from './Cabecera.module.css';

interface Props {
  enlaces: { href: string; texto: string }[];
  abrir: string;
  cerrar: string;
  etiqueta: string;
}

export function MenuMovil({ enlaces, abrir, cerrar, etiqueta }: Props) {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();
  const boton = useRef<HTMLButtonElement>(null);

  // Al cambiar de página, el menú se cierra.
  useEffect(() => setAbierto(false), [pathname]);

  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    document.addEventListener('keydown', alPulsar);
    return () => document.removeEventListener('keydown', alPulsar);
  }, [abierto]);

  return (
    <>
      <button
        ref={boton}
        type="button"
        className={estilos.botonMenu}
        aria-label={abierto ? cerrar : abrir}
        aria-expanded={abierto}
        aria-controls="menu-movil"
        onClick={() => setAbierto((a) => !a)}
      >
        <Icono nombre={abierto ? 'cerrar' : 'menu'} />
      </button>
      <nav id="menu-movil" aria-label={etiqueta} className={estilos.menuMovil} hidden={!abierto}>
        <ul>
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link href={e.href} onClick={() => setAbierto(false)} aria-current={pathname === e.href ? 'page' : undefined}>
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
