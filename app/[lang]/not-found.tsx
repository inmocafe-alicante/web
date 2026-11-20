import Link from 'next/link';
import { diccionario } from '@/lib/i18n';
import ui from '@/components/ui.module.css';

export default function NoEncontrada() {
  const d = diccionario('es').noEncontrada;
  return (
    <div className={`${ui.contenedor} ${ui.cabeceraPagina} ${ui.pila}`}>
      <h1>{d.titulo}</h1>
      <p className={ui.texto}>{d.texto}</p>
      <Link href="/es" className={ui.boton}>
        {d.volver}
      </Link>
    </div>
  );
}
