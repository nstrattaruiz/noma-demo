# Fotos de NÖMA

Mientras no haya fotos, cada imagen del sitio es una ilustración en SVG (`js/arte.js`) con la paleta de la marca.
Para reemplazar una por una foto real:

1. Guardá la foto en esta carpeta con el nombre de la tabla (formato `.webp`, calidad ~80).
2. Agregá el nombre del archivo a `js/fotos.js`, por ejemplo: `window.NOMA_FOTOS = ['hero.webp'];`

Las fotos se recortan solas para llenar su espacio (`object-fit: cover`), así que conviene dejar aire alrededor del motivo.

## Home

| Archivo | Proporción / medida sugerida | Dónde va | Qué mostrar |
|---|---|---|---|
| `hero.webp` | 4:5 vertical, 1600 × 2000 | Portada | Rincón cálido y minimalista con el Jarrón Arco, la Vela Ámbar encendida sobre la Bandeja Terra. Luz de tarde. |
| `mood-calma.webp` | 3:4, 1200 × 1700 | Shop the mood · Calma | Velas encendidas, ambiente oscuro y cálido. |
| `mood-tierra.webp` | 3:4, 1200 × 1500 | Shop the mood · Tierra | Cerámica terracota con ramas secas. |
| `mood-ritual.webp` | 3:4, 1200 × 1600 | Shop the mood · Ritual | Bandeja con vela, difusor y taza. |
| `editorial.webp` | 3:4 vertical, 1200 × 1700 | Manifiesto | Jarrón junto a una ventana, luz natural. |
| `editorial-detalle.webp` | 1:1, 900 × 900 | Manifiesto (imagen chica) | Detalle: taza, textura, mano. |
| `set-ritual-1.webp` | 4:5, 1600 × 1840 | Set Ritual (home y producto) | Las tres piezas del set juntas. |
| `comunidad-living.webp` | 1:1, 1200 × 1200 | Así se vive NÖMA | Living con manta y planta. |
| `comunidad-dormitorio.webp` | 1:2 vertical, 800 × 1600 | Así se vive NÖMA | Dormitorio, mesa de luz con vela. |
| `comunidad-mesa.webp` | 1:1, 800 × 800 | Así se vive NÖMA | Mesa con bandeja y tazas. |
| `comunidad-vela.webp` | 1:2 vertical, 800 × 1600 | Así se vive NÖMA | Vela encendida de noche. |
| `comunidad-ceramica.webp` | 1:1, 800 × 800 | Así se vive NÖMA | Cuencos apilados. |
| `comunidad-detalle.webp` | 2:1 horizontal, 1600 × 800 | Así se vive NÖMA | Difusor y detalle decorativo. |

## Colección

| Archivo | Proporción / medida | Dónde va |
|---|---|---|
| `coleccion-banda.webp` | 16:5 panorámica, 2400 × 750 | Banda debajo del título de la colección |
| `tile-coleccion.webp` | 1:1, 1000 × 1000 | Bloque editorial dentro de la grilla |

## Productos (3 por producto)

Proporción 4:5, 1200 × 1500. `-1` es la principal (fondo claro, producto solo), `-2` la que aparece al pasar el mouse (otro fondo o en uso) y `-3` el ambiente (se usa en "Sobre este producto").

`vela-ambar-1/2/3.webp` · `vela-santal-1/2/3.webp` · `difusor-bosque-1/2/3.webp` · `jarron-arco-1/2/3.webp` · `bandeja-terra-1/2/3.webp` · `cuenco-siena-1/2/3.webp` · `manta-lino-1/2/3.webp` · `set-ritual-1/2/3.webp`
