import type { Idioma } from '@/content/tipos';
import { CabeceraEventos } from '@/components/VistaEventos';

export default async function LayoutEventos({ children, params }: LayoutProps<'/[lang]/eventos'>) {
  const idioma = (await params).lang as Idioma;
  return (
    <>
      <CabeceraEventos idioma={idioma} />
      {children}
    </>
  );
}
