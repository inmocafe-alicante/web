import type { Idioma } from '@/content/tipos';
import { legales } from '@/content/contenido';
import { PaginaLegal } from '@/components/PaginaLegal';
import { metadatos } from '@/lib/sitio';

const pagina = legales['cookies'];

export async function generateMetadata({ params }: PageProps<'/[lang]/cookies'>) {
  const idioma = (await params).lang as Idioma;
  return metadatos(idioma, '/cookies', pagina.titulo[idioma]);
}

export default async function Pagina({ params }: PageProps<'/[lang]/cookies'>) {
  const idioma = (await params).lang as Idioma;
  return <PaginaLegal pagina={pagina} idioma={idioma} />;
}
