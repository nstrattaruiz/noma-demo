# Fotos de NÖMA

Las fotos viven en esta carpeta y se asignan a cada lugar del sitio en `js/fotos.js`, con su encuadre:

```js
'vela-ambar-1.webp': { archivo: 'vela-ambar.webp', pos: '50% 72%' },
```

- La clave es el **lugar** del sitio (tablas de abajo). `archivo` es la foto de esta carpeta. Una misma foto puede usarse en varios lugares.
- `pos` es el punto que queda a la vista cuando la foto se recorta (como `object-position`: horizontal y vertical en %).
- Si un lugar no está en `js/fotos.js`, se muestra la ilustración de `js/arte.js`.

## Pendientes para completar la sesión

Cada producto muestra una sola foto (la `-1`). Si agregás una `-2`, aparece sola al pasar el mouse y como segunda foto de la galería. La `-3` (ambiente del bloque "Sobre este producto") repite escenas de la home. Para que quede redondo faltan:

- `jarron-arco` (hoy usa el jarrón en arco de la portada), `mood-ritual` (usa `set-ritual.webp`) y `comunidad-vela` (usa `vela-ambar.webp`).
- Opcional: una segunda foto de cada producto (hover) y una en ambiente propia.
- Etiquetas con la marca NÖMA: varias fotos tienen otros nombres en el packaging (Ember & Oak, Cozy Corner, Sage & Eucalyptus, Lavender).
- Fotos verticales. Todas son horizontales (1376 × 768) y se recortan para llenar lugares verticales; en pantallas grandes conviene subir de 1600 px de ancho para arriba.

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
