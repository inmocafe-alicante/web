// Genera app/icon.png y app/apple-icon.png recortando el dibujo del logo real
// (edificio + taza) sobre fondo Espresso. No redibuja nada.
// Uso: node scripts/generar-iconos.mjs
import sharp from 'sharp';

const fondo = { r: 0x1e, g: 0x15, b: 0x10, alpha: 1 };
const recorte = await sharp('public/marca/logo-crema.png')
  .extract({ left: 410, top: 350, width: 560, height: 470 })
  .toBuffer();

async function icono(tamano, margen, destino) {
  const dentro = tamano - margen * 2;
  const dibujo = await sharp(recorte).resize(dentro, dentro, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: tamano, height: tamano, channels: 4, background: fondo } })
    .composite([{ input: dibujo, left: margen, top: margen }])
    .png()
    .toFile(destino);
}

await icono(64, 4, 'app/icon.png');
await icono(180, 18, 'app/apple-icon.png');
console.log('Iconos generados en app/');
