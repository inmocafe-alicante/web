# web

Web de InmoCafé: eventos, listas e inscripción y tablón de compraventa.

Next.js (App Router) + TypeScript, estilos con CSS Modules. Español (`/es`) e inglés (`/en`); `/` redirige a `/es`.

## Dónde se cambia cada cosa (fase 1)

| Qué | Archivo |
|---|---|
| Textos de las páginas, eventos, horario, contacto, páginas legales | `content/contenido.ts` (misma forma que las tablas de la fase 2) |
| Botones, menús y etiquetas de formularios | `diccionarios/es.ts` y `diccionarios/en.ts` |
| Colores y tipografías de la marca | `app/globals.css` |
| Fotos | `public/fotos/` (nombres en las instrucciones, §4). Si falta una, la web enseña el recuadro. |

Un valor `null` en el contenido es un dato que falta: se ve como hueco en Preview y **detiene la compilación de producción** (`scripts/comprobar-huecos.mts`). Para ver la lista: `npm run huecos`.

## Uso en local

```bash
npm install
npm run dev
```

Iconos de la web (desde el logo real): `node scripts/generar-iconos.mjs`.
