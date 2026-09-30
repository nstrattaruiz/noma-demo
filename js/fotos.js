/**
 * Fotos reales de NÖMA.
 * Cada lugar del sitio (la clave, ej. 'vela-ambar-2.webp') se completa con un archivo de img/ y su encuadre.
 * - archivo: nombre del archivo en img/
 * - pos: punto de la foto que tiene que quedar a la vista cuando se recorta ('x% y%', como object-position)
 * Si un lugar no está en esta lista, se muestra la ilustración de js/arte.js.
 *
 * Lugares disponibles: ver img/LEEME.md.
 * Ojo: editorial.webp y comunidad-dormitorio.webp son dípticos (dos fotos en una): en lugares angostos,
 * encuadrar en una de las mitades (0–10% o 100%) para que no se vea la línea del medio.
 */
window.NOMA_FOTOS = {
  // Home
  'hero.webp': { archivo: 'hero.webp', pos: '56% 70%' },
  'mood-calma.webp': { archivo: 'mood-calma.webp', pos: '50% 60%' },
  'mood-tierra.webp': { archivo: 'mood-tierra.webp', pos: '40% 60%' },
  'mood-ritual.webp': { archivo: 'set-ritual.webp', pos: '58% 55%' },
  'editorial.webp': { archivo: 'editorial.webp', pos: '9% 50%' },
  'editorial-detalle.webp': { archivo: 'editorial-detalle.webp', pos: '52% 55%' },
  'comunidad-living.webp': { archivo: 'comunidad-living.webp', pos: '50% 60%' },
  'comunidad-dormitorio.webp': { archivo: 'comunidad-dormitorio.webp', pos: '100% 50%' },
  'comunidad-mesa.webp': { archivo: 'comunidad-mesa.webp', pos: '52% 60%' },
  'comunidad-vela.webp': { archivo: 'vela-ambar.webp', pos: '50% 70%' },
  'comunidad-ceramica.webp': { archivo: 'comunidad-ceramica.webp', pos: '50% 50%' },
  'comunidad-detalle.webp': { archivo: 'comunidad-detalle.webp', pos: '50% 55%' },

  // Colección
  'coleccion-banda.webp': { archivo: 'coleccion-banda.webp', pos: '50% 50%' },
  'tile-coleccion.webp': { archivo: 'tile-coleccion.webp', pos: '50% 60%' },

  // Productos: -1 principal, -2 al pasar el mouse, -3 ambiente
  'vela-ambar-1.webp': { archivo: 'vela-ambar.webp', pos: '50% 72%' },
  'vela-ambar-2.webp': { archivo: 'hero.webp', pos: '61% 78%' },
  'vela-ambar-3.webp': { archivo: 'mood-calma.webp', pos: '50% 60%' },

  'vela-santal-1.webp': { archivo: 'vela-santal.webp', pos: '51% 60%' },
  'vela-santal-2.webp': { archivo: 'mood-calma.webp', pos: '50% 60%' },
  'vela-santal-3.webp': { archivo: 'comunidad-dormitorio.webp', pos: '50% 50%' },

  'difusor-bosque-1.webp': { archivo: 'difusor-bosque.webp', pos: '49% 60%' },
  'difusor-bosque-2.webp': { archivo: 'set-ritual-1.webp', pos: '58% 55%' },
  'difusor-bosque-3.webp': { archivo: 'comunidad-detalle.webp', pos: '50% 55%' },

  'jarron-arco-1.webp': { archivo: 'hero.webp', pos: '48% 75%' },
  'jarron-arco-2.webp': { archivo: 'tile-coleccion.webp', pos: '50% 60%' },
  'jarron-arco-3.webp': { archivo: 'mood-tierra.webp', pos: '37% 70%' },

  'bandeja-terra-1.webp': { archivo: 'bandeja-terra.webp', pos: '60% 60%' },
  'bandeja-terra-2.webp': { archivo: 'set-ritual-1.webp', pos: '50% 70%' },
  'bandeja-terra-3.webp': { archivo: 'comunidad-mesa.webp', pos: '52% 60%' },

  'cuenco-siena-1.webp': { archivo: 'cuenco-siena.webp', pos: '44% 65%' },
  'cuenco-siena-2.webp': { archivo: 'mood-tierra.webp', pos: '66% 70%' },
  'cuenco-siena-3.webp': { archivo: 'comunidad-ceramica.webp', pos: '50% 50%' },

  'manta-lino-1.webp': { archivo: 'manta-lino.webp', pos: '55% 55%' },
  'manta-lino-2.webp': { archivo: 'comunidad-living.webp', pos: '52% 65%' },
  'manta-lino-3.webp': { archivo: 'comunidad-dormitorio.webp', pos: '78% 60%' },

  'set-ritual-1.webp': { archivo: 'set-ritual-1.webp', pos: '52% 60%' },
  'set-ritual-2.webp': { archivo: 'set-ritual.webp', pos: '64% 55%' },
  'set-ritual-3.webp': { archivo: 'mood-calma.webp', pos: '50% 60%' },
};
