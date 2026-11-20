import type { Idioma } from '@/content/tipos';
import { legales } from '@/content/contenido';
import { PaginaLegal } from '@/components/PaginaLegal';
import { metadatos } from '@/lib/sitio';

const pagina = legales['privacidad'];

export async function generateMetadata({ params }: PageProps<'/[lang]/privacidad'>) {
  const idioma = (await params).lang as Idioma;
  return metadatos(idioma, '/privacidad', pagina.titulo[idioma]);
}

export default async function Pagina({ params }: PageProps<'/[lang]/privacidad'>) {
  const idioma = (await params).lang as Idioma;
  return <PaginaLegal pagina={pagina} idioma={idioma} />;
}
