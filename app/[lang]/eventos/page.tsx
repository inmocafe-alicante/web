import type { Idioma } from '@/content/tipos';
import { PanelEvento } from '@/components/VistaEventos';
import { diccionario } from '@/lib/i18n';
import { metadatos } from '@/lib/sitio';

export async function generateMetadata({ params }: PageProps<'/[lang]/eventos'>) {
  const idioma = (await params).lang as Idioma;
  return metadatos(idioma, '/eventos', diccionario(idioma).menu.eventos);
}

export default async function Eventos({ params }: PageProps<'/[lang]/eventos'>) {
  const idioma = (await params).lang as Idioma;
  return <PanelEvento idioma={idioma} />;
}
