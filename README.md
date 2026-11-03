# ONG Alumco

Sitio web de ONG Alumco (ELEAM Hualpén). Rediseño del sitio WordPress de
https://ongalumco.cl, con el mismo contenido y una identidad construida a partir
del logo: la flor geométrica se reconstruyó en SVG y florece en el fondo a medida
que se recorre la página.

## Desarrollo

Requiere Node 22 o superior.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera el sitio estático en dist/
npm run preview   # sirve dist/ localmente
```

## Publicación

El sitio se publica en Cloudflare Workers como sitio estático, en la cuenta de
la ONG (Ongalumco@gmail.com). La configuración está en `wrangler.jsonc`, que fija
el ID de esa cuenta para no publicar en otra por error.

```bash
npx wrangler login   # una vez, autorizando la cuenta de la ONG
npm run deploy       # compila y publica
```

Vista previa: https://ong-alumco.ong-alumco.workers.dev

## Estructura

```
src/
├── data/sitio.ts          # todo el contenido (textos, enlaces, correos)
├── data/flor.ts           # geometría de la flor del logo
├── components/            # una pieza por sección + logo y flor de fondo
├── scripts/florecer.ts    # animación de la flor ligada al scroll
├── scripts/interfaz.ts    # cabecera, menú móvil y apariciones
├── styles/global.css      # paleta, tipografía y utilidades
└── pages/index.astro      # página única
```

Para cambiar textos, correos o enlaces de memorias basta con editar
`src/data/sitio.ts`.

## Marca

| Color       | Hex       |
| ----------- | --------- |
| Azul        | `#395E9F` |
| Coral       | `#FF6364` |
| Ámbar       | `#F9B401` |
| Verde brote | `#AFDD83` |

Tipografías: Fraunces (títulos) y Figtree (texto), autoalojadas vía Fontsource.

## Floración

La página se divide en etapas (Inicio → Validaciones → Misión y visión →
Nosotros → Memorias → Contacto → Pie). En cada una se abre un anillo de la flor:
el capullo azul se convierte en el logo a color, luego se despliegan pétalos
rombo, pétalos finos y, al final, las semillas se dispersan. Con
`prefers-reduced-motion` la flor aparece abierta y quieta.
