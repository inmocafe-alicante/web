'use client';

import { useState } from 'react';
import { Icono } from './Icono';
import ui from './ui.module.css';

interface Props {
  src: string;
  titulo: string;
  boton: string;
  aviso: string;
}

/** El mapa de Google solo se carga al pulsar: así no hay cookies de Google sin permiso. */
export function MapaDiferido({ src, titulo, boton, aviso }: Props) {
  const [cargado, setCargado] = useState(false);
  if (cargado) {
    return (
      <div className={ui.mapa}>
        <iframe
          src={src}
          title={titulo}
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }
  return (
    <div className={`${ui.mapa} ${ui.mapaReposo}`} style={{ flexDirection: 'column', gap: 12 }}>
      <Icono nombre="ubicacion" tamano={36} />
      <button type="button" className={ui.botonSec} onClick={() => setCargado(true)}>
        {boton}
      </button>
      <p className={ui.aviso} style={{ letterSpacing: 0, fontWeight: 400 }}>
        {aviso}
      </p>
    </div>
  );
}
