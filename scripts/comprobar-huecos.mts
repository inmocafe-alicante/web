/**
 * Comprobación de huecos (§0 regla 4 y §8).
 *
 * Busca datos que faltan en el contenido y en los diccionarios:
 *   - cualquier valor `null` en content/contenido.ts;
 *   - textos con `[ALGO]` o «PENDIENTE».
 *   - fotos que la web usa y todavía no están en /public.
 *
 * En Preview y en local solo informa. En la compilación de PRODUCCIÓN de Vercel
 * (VERCEL_ENV=production) o con `--estricto`, falla si encuentra alguno:
 * así no se puede publicar la web con huecos.
 */
import fs from 'node:fs';
import * as contenido from '../content/contenido.ts';
import { es } from '../diccionarios/es.ts';
import { en } from '../diccionarios/en.ts';

const PATRON = /\[[A-ZÁÉÍÓÚÑ0-9 _-]+\]|PENDIENTE/;
const huecos: string[] = [];

function recorrer(valor: unknown, camino: string, omitir: string[] = []) {
  if (omitir.includes(camino)) return;
  if (valor === null) {
    huecos.push(`${camino}: falta el dato`);
  } else if (typeof valor === 'string') {
    if (PATRON.test(valor)) huecos.push(`${camino}: «${valor}»`);
  } else if (Array.isArray(valor)) {
    valor.forEach((v, i) => recorrer(v, `${camino}[${i}]`, omitir));
  } else if (typeof valor === 'object' && valor !== undefined) {
    for (const [k, v] of Object.entries(valor as Record<string, unknown>)) recorrer(v, `${camino}.${k}`, omitir);
  }
}

recorrer(contenido.eventos, 'eventos');
recorrer(contenido.sesiones, 'sesiones');
recorrer(contenido.ajustes, 'ajustes');
recorrer(contenido.contenidos, 'contenidos');
recorrer(contenido.legales, 'legales');
// `huecos` son las etiquetas que pintan los propios huecos.
recorrer(es, 'diccionario.es', ['diccionario.es.huecos']);
recorrer(en, 'diccionario.en', ['diccionario.en.huecos']);

const fotos = [
  '/fotos/portada.jpg',
  '/fotos/espacio-barra.jpg',
  '/fotos/espacio-mesa.jpg',
  '/fotos/fachada.jpg',
  ...contenido.eventos.map((e) => e.foto),
];
for (const f of new Set(fotos)) {
  if (!fs.existsSync(`public${f}`)) huecos.push(`foto: falta public${f}`);
}

const estricto = process.env.VERCEL_ENV === 'production' || process.argv.includes('--estricto');

if (huecos.length === 0) {
  console.log('✓ Sin huecos: no falta ningún dato.');
} else {
  console.log(`Huecos pendientes (${huecos.length}):`);
  for (const h of huecos) console.log(`  · ${h}`);
  if (estricto) {
    console.error('\n✗ Compilación de producción detenida: hay datos que faltan (ver §8 de las instrucciones).');
    process.exit(1);
  }
  console.log('\n(Preview/local: se muestran como huecos visibles. En producción esta comprobación detiene la publicación.)');
}
