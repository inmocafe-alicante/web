/**
 * Comprobación de huecos (§0 regla 4 y §8).
 *
 * En la web, lo que falta no se ve: se oculta el elemento entero. Esta
 * comprobación lista todo lo que falta (`npm run huecos`):
 *   - cualquier valor `null` en content/contenido.ts;
 *   - textos con `[ALGO]` o «PENDIENTE».
 *
 * Bloqueos:
 *   - En la compilación de PRODUCCIÓN de Vercel (VERCEL_ENV=production) o con
 *     `--estricto`, falla SOLO si faltan textos legales. El resto no bloquea.
 *   - Siempre (también en Preview) falla si una foto declarada en el contenido
 *     no está en /public: es un error, no un hueco.
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
recorrer(es, 'diccionario.es');
recorrer(en, 'diccionario.en');

const { inicio, espacio, dondeEstamos } = contenido.contenidos;
const fotos = [inicio.foto, espacio.fotoBarra, espacio.fotoMesa, dondeEstamos.fotoFachada, ...contenido.eventos.map((e) => e.foto)];
const rutas = fotos.flatMap((f) => (f ? [f.src] : []));
const perdidas = [...new Set(rutas)].filter((f) => !fs.existsSync(`public${f}`));
if (perdidas.length) {
  for (const f of perdidas) console.error(`✗ La foto public${f} está en el contenido pero no en el repositorio.`);
  process.exit(1);
}

const estricto = process.env.VERCEL_ENV === 'production' || process.argv.includes('--estricto');
const bloquean = huecos.filter((h) => h.startsWith('legales.'));

if (huecos.length === 0) {
  console.log('✓ Sin huecos: no falta ningún dato.');
} else {
  console.log(`Datos que faltan (${huecos.length}); en la web no se muestran:`);
  for (const h of huecos) console.log(`  · ${h}`);
}

if (bloquean.length > 0) {
  if (estricto) {
    console.error(`\n✗ Compilación de producción detenida: faltan ${bloquean.length} textos legales (§8).`);
    process.exit(1);
  }
  console.log(`\n(Faltan ${bloquean.length} textos legales: en producción detienen la compilación. En Preview, no.)`);
}
