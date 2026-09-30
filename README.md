# NÖMA · Pequeños objetos. Grandes espacios.

Tienda online demo de una marca ficticia de objetos para el hogar: velas, difusores, cerámica, textiles y sets.
Diseño y desarrollo: **Nico Stratta**.

La dirección creativa es *editorial e-commerce*: recorrer la tienda como una revista de diseño.
El recorrido cuenta una historia (**historia → inspiración → producto → emoción → compra**) en lugar de repetir banner y grilla.

## Qué incluye

- **Home:** portada con entrada animada, *Shop the mood* (Calma, Tierra, Ritual), favoritos con agregar rápido, manifiesto a doble página, una interacción de objetos flotantes ("Encontrá un rincón para *cada cosa*"), producto destacado (Set Ritual de Noche), beneficios, comunidad y newsletter.
- **Colección:** filtros por categoría, precio, color y disponibilidad con conteos en vivo, orden, chips de filtros activos, URL compartible, un bloque editorial dentro de la grilla y una hoja de filtros para celular.
- **Producto:** galería (deslizable en celular), variantes con stock, cantidad, detalles y cuidados, "Cómo combinarlo" (agrega el combo completo de una vez), carrusel "También te puede gustar" y barra de compra fija en celular.
- **Carrito deslizable:** se abre al agregar, cantidades, eliminar, subtotal y barra de envío gratis que se actualiza con cada cambio. Se guarda en el navegador.
- **Buscador** con resultados instantáneos.

## Firma NS

Lleva los detalles que se repiten en todas mis webs, adaptados a la paleta de NÖMA: header flotante tipo píldora que se compacta al bajar, ☰ en un círculo aparte, menú grande numerado con columna de contacto, carrito como tarjeta flotante con el fondo desenfocado, volver arriba con anillo de progreso y anillo de foco propio.

## Técnica

- HTML, CSS y JavaScript sin frameworks ni dependencias. Se sirve como sitio estático (GitHub Pages).
- Tipografías: Cormorant Garamond + Jost (Google Fonts).
- Las imágenes son ilustraciones SVG generadas con la paleta de la marca (`js/arte.js`), livianas y nítidas en cualquier pantalla. Se reemplazan por fotos reales sin tocar el HTML (ver `img/LEEME.md`).
- Móvil primero: probado en 375, 390, 768, 1024, 1280 y 1440 px. Botones táctiles de 44 px, sin hover obligatorio.
- Accesible: navegación por teclado, foco visible, `aria` en paneles y botones de ícono, se respeta *reducir movimiento*.
- El catálogo (`js/productos.js`) usa la misma estructura que Shopify (handle, variantes, colección, tags), así el diseño se puede llevar a un tema Liquid.

## Estructura

```
index.html          Home
coleccion.html      Colección (?cat=aromas, ?orden=nuevos, ?q=vela…)
producto.html       Producto (?p=vela-ambar)
css/ns-firma.css    Firma NS
css/noma.css        Estilos de NÖMA
js/productos.js     Catálogo
js/layout.js        Header, menú, carrito, buscador, newsletter y footer
js/arte.js          Ilustraciones SVG
js/fotos.js         Lista de fotos reales disponibles en img/
js/noma.js          Carrito, filtros, producto e interacciones
js/ns-firma.js      Firma NS
```

Para ver capturas sin animaciones de entrada, agregá `?captura` a la URL.

---

NÖMA es una marca ficticia creada para este proyecto.
