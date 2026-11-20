# web

Web de InmoCafé: eventos, listas e inscripción y tablón de compraventa.

Next.js (App Router) + TypeScript, estilos con CSS Modules. Español (`/es`) e inglés (`/en`); `/` redirige a `/es`.

## Dónde se cambia cada cosa (fase 1)

| Qué | Archivo |
|---|---|
| Textos de las páginas, eventos, horario, contacto, páginas legales | `content/contenido.ts` (misma forma que las tablas de la fase 2) |
| Botones, menús y etiquetas de formularios | `diccionarios/es.ts` y `diccionarios/en.ts` |
| Colores y tipografías de la marca | `app/globals.css` |
| Fotos | archivo en `public/fotos/` y su ruta y encuadre (`foco`) en `content/contenido.ts` |

Un valor `null` en el contenido es un dato que falta: **en la web no se muestra** (se oculta la línea, la tarjeta, la foto o el botón). Para ver la lista: `npm run huecos`. La compilación de producción solo se detiene si faltan textos legales; la de cualquier entorno, si una foto del contenido no está en `public/`.

Las funciones que aún no funcionan (`Avísame`, publicar en el tablón) se activan en `lib/sitio.ts` (`FUNCIONES`).

## Uso en local

```bash
npm install
npm run dev
```

Iconos de la web (desde el logo real): `node scripts/generar-iconos.mjs`.
