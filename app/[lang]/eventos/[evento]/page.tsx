import type { Idioma } from '@/content/tipos';
import { eventos } from '@/content/contenido';
import { PanelEvento, eventosActivos } from '@/components/VistaEventos';
import { metadatos } from '@/lib/sitio';

export const dynamicParams = false;

export function generateStaticParams() {
  return eventosActivos().map((e) => ({ evento: e.slug }));
}

export async function generateMetadata({ params }: PageProps<'/[lang]/eventos/[evento]'>) {
  const { lang, evento } = await params;
  const idioma = lang as Idioma;
  const e = eventos.find((x) => x.slug === evento);
  return metadatos(idioma, `/eventos/${evento}`, e?.nombre[idioma]);
}

export default async function Evento({ params }: PageProps<'/[lang]/eventos/[evento]'>) {
  const { lang, evento } = await params;
  return <PanelEvento idioma={lang as Idioma} slug={evento} />;
}
