import type { Viewport } from 'next';
import { Caveat, Cormorant_Garamond, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Cabecera } from '@/components/Cabecera';
import { Pie } from '@/components/Pie';
import { diccionario, esIdioma, idiomas } from '@/lib/i18n';
import '../globals.css';

const titulo = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--fuente-titulo',
  display: 'swap',
});
const texto = Inter({ subsets: ['latin'], weight: ['400', '600'], variable: '--fuente-texto', display: 'swap' });
const nota = Caveat({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--fuente-nota', display: 'swap' });

export const dynamicParams = false;

export function generateStaticParams() {
  return idiomas.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: '#1E1510',
  colorScheme: 'dark',
};

export default async function Layout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const d = diccionario(lang);
  return (
    <html lang={lang} className={`${titulo.variable} ${texto.variable} ${nota.variable}`}>
      <body>
        <a href="#contenido" className="saltar">
          {d.saltarAlContenido}
        </a>
        <Cabecera idioma={lang} />
        <main id="contenido">{children}</main>
        <Pie idioma={lang} />
      </body>
    </html>
  );
}
