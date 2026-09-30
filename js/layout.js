/**
 * NÖMA · Piezas compartidas por todas las páginas (como los "section groups" de Shopify):
 * íconos, header con la firma NS, menú grande, buscador, carrito, newsletter, footer y volver arriba.
 * Se ejecuta antes que ns-firma.js (ambos con defer, en ese orden).
 */
(() => {
  const iconos = {
    flecha: '<path d="M4 12h15.5M14 6.5 19.5 12 14 17.5"/>',
    abajo: '<path d="M12 4v15.5M6.5 14 12 19.5 17.5 14"/>',
    buscar: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>',
    cuenta: '<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5"/>',
    bolsa: '<path d="M5 8h14l-1.2 12.5H6.2z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    cerrar: '<path d="m6 6 12 12M18 6 6 18"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    menos: '<path d="M5 12h14"/>',
    ok: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    camion: '<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7"/><circle cx="6.5" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>',
    hoja: '<path d="M5 19c0-8 5-13.5 14-14 .5 9-5 14-13 14"/><path d="M5 19 13 11"/>',
    candado: '<rect x="5" y="10.5" width="14" height="10" rx="1.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    regalo: '<path d="M4 10h16v4H4zM5.5 14h13v6.5h-13zM12 10v10.5"/><path d="M12 10c-1.5-3.5-5.5-4-5.5-1.5S10 10 12 10Zm0 0c1.5-3.5 5.5-4 5.5-1.5S14 10 12 10Z"/>',
    cambio: '<path d="M9 7 4.5 11.5 9 16"/><path d="M4.5 11.5H15a4.5 4.5 0 0 1 0 9h-3"/>',
    chevron: '<path d="m6 9.5 6 6 6-6"/>',
    izq: '<path d="m14.5 5.5-6.5 6.5 6.5 6.5"/>',
    der: '<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>',
    filtro: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
    ig: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6"/>',
    pin: '<circle cx="12" cy="12" r="8.5"/><path d="M11 8.5 9.3 20M11.6 8.3c3.4-.4 5 1.6 4.2 4-.7 2-2.6 2.5-4 1.6"/>',
    tiktok: '<path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.4 2.6 2.2 4.3 5 4.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/>',
    wa: '<path d="M4 20l1.2-3.8A8 8 0 1 1 8 19.1z"/><path d="M9.2 8.6c.2-.4.5-.4.8-.4h.4l.9 2-.6.9c.5 1 1.3 1.8 2.3 2.3l.9-.6 2 .9v.4c0 .3 0 .6-.4.8-.9.6-2.3.4-4-.8a9 9 0 0 1-2.8-3.1c-.7-1.4-.1-2.1.5-2.4z"/>',
    mano: '<path d="M8 12V6.5a1.5 1.5 0 0 1 3 0V11m0-5.5v-1a1.5 1.5 0 0 1 3 0V11m0-5a1.5 1.5 0 0 1 3 0v6m0-3a1.5 1.5 0 0 1 3 0v4.5c0 4-2.8 7-6.8 7-2.7 0-4.3-1.3-5.7-3.3L4.8 14a1.5 1.5 0 0 1 2.4-1.8L8 13"/>',
  };

  const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">${Object.entries(iconos)
    .map(([id, d]) => `<symbol id="i-${id}" viewBox="0 0 24 24">${d}</symbol>`)
    .join('')}</svg>`;

  const ico = (id, extra = '') => `<svg class="icono ${extra}" aria-hidden="true" focusable="false"><use href="#i-${id}"/></svg>`;
  window.ico = ico;

  const semilla = `<svg class="logo__semilla" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16.4 2.6c6.6 1.3 11.4 7.2 11 14.3-.4 7.3-5.6 12.7-11.9 12.5C9.2 29.2 4.3 23.6 4.7 16.4 5.1 8.6 10.2 1.4 16.4 2.6Zm1.9 5.3c-.3-.5-1-.5-1.3 0-3 5.1-3.5 11.4-1.2 17.4.2.6 1 .7 1.3.2l.1-.4c-2-5.6-1.6-11.5 1.1-16.4.1-.3.1-.6 0-.8Z" fill="currentColor" fill-rule="evenodd"/></svg>`;
  window.semilla = semilla;
  const logo = `<span class="logo">${semilla}<span class="logo__palabra">NÖMA</span></span>`;

  const nav = [
    ['Colección', 'coleccion.html', 'Todo'],
    ['Objetos', 'coleccion.html?cat=decoracion,ceramica', 'Cerámica y deco'],
    ['Aromas', 'coleccion.html?cat=aromas', 'Velas y difusores'],
    ['Sets', 'coleccion.html?cat=sets', 'Para regalar'],
    ['Nuestra historia', 'index.html#historia', 'Manifiesto'],
  ];

  const header = `
  <a class="sr" href="#contenido">Ir al contenido</a>
  <header class="ns-header" id="ns-header">
    <button class="ns-menu-btn" type="button" aria-expanded="false" aria-controls="ns-panel" aria-label="Abrir menú">
      <span class="ns-menu-btn__lines" aria-hidden="true"><span></span><span></span></span>
    </button>

    <div class="ns-bar">
      <a class="ns-brand" href="index.html" aria-label="NÖMA, ir al inicio">${logo}</a>
      <nav class="ns-nav" aria-label="Principal">
        ${nav.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}
      </nav>
      <div class="ns-acciones">
        <button class="ns-accion ns-accion--buscar" type="button" data-abrir-buscador aria-label="Buscar">${ico('buscar')}</button>
        <button class="ns-accion ns-accion--cuenta" type="button" data-aviso="El acceso a la cuenta es parte de la tienda real: acá es solo una demo." aria-label="Cuenta">${ico('cuenta')}</button>
        <button class="ns-accion ns-accion--carrito" type="button" data-abrir-carrito aria-label="Abrir carrito">
          ${ico('bolsa')}<span class="contador" data-contador>0</span>
        </button>
      </div>
    </div>

    <div class="ns-panel" id="ns-panel" aria-hidden="true">
      <nav class="ns-panel__nav" aria-label="Menú">
        ${nav.map(([t, h, sub], i) => `<a href="${h}"><small>0${i + 1}</small>${t}<em>${sub}</em></a>`).join('')}
      </nav>
      <div class="ns-panel__info">
        <a class="ns-panel__promo" href="producto.html?p=set-ritual">
          <div class="arte" data-arte="producto:set-ritual:0"></div>
          <div><strong>Set Ritual de Noche</strong><span>Tres piezas, una hora para vos · USD 89</span></div>
        </a>
        <button class="link" type="button" data-abrir-buscador style="align-self:flex-start">${ico('buscar')} Buscar objetos</button>
        <p class="ns-panel__label">Hablemos</p>
        <a href="mailto:hola@nomahome.com">${ico('mail')}hola@nomahome.com</a>
        <a href="https://wa.me/59800000000" target="_blank" rel="noopener">${ico('wa')}Escribinos por WhatsApp</a>
        <div class="ns-panel__social">
          <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">${ico('ig')}</a>
          <a href="https://pinterest.com/" target="_blank" rel="noopener" aria-label="Pinterest">${ico('pin')}</a>
          <a href="https://tiktok.com/" target="_blank" rel="noopener" aria-label="TikTok">${ico('tiktok')}</a>
        </div>
      </div>
    </div>
  </header>
  <div class="ns-scrim" aria-hidden="true"></div>`;

  const carrito = `
  <div class="velo" data-velo></div>
  <aside class="carrito is-vacio" id="carrito" role="dialog" aria-modal="true" aria-labelledby="carrito-titulo" aria-hidden="true" inert>
    <div class="carrito__cabeza">
      <h2 id="carrito-titulo">Tu carrito <span data-contador>0</span></h2>
      <button class="redondo" type="button" data-cerrar aria-label="Cerrar carrito">${ico('cerrar')}</button>
    </div>
    <div class="envio" data-envio role="status">
      <p data-envio-texto></p>
      <div class="envio__pista" aria-hidden="true"><span class="envio__barra" data-envio-barra></span></div>
    </div>
    <ul class="carrito__lista" data-lineas></ul>
    <div class="carrito__vacio">
      ${semilla}
      <p>Tu carrito todavía<br><em>está esperando.</em></p>
      <a class="btn" href="coleccion.html">Explorar colección ${ico('flecha', 'flecha')}</a>
    </div>
    <div class="carrito__pie">
      <div class="carrito__subtotal"><span>Subtotal</span><strong data-subtotal>USD 0</strong></div>
      <p class="carrito__nota">Impuestos incluidos. El envío se calcula al finalizar.</p>
      <button class="btn btn--bloque" type="button" data-checkout>Finalizar compra ${ico('flecha', 'flecha')}</button>
      <button class="link carrito__seguir" type="button" data-cerrar>Seguir comprando</button>
    </div>
  </aside>

  <div class="buscador" id="buscador" role="dialog" aria-modal="true" aria-label="Buscar" aria-hidden="true" inert>
    <form class="buscador__campo" role="search" data-buscar-form>
      ${ico('buscar')}
      <label class="sr" for="buscar-input">Buscar en NÖMA</label>
      <input id="buscar-input" type="search" placeholder="¿Qué estás buscando?" autocomplete="off" data-buscar-input>
      <button class="redondo" type="button" data-cerrar aria-label="Cerrar buscador">${ico('cerrar')}</button>
    </form>
    <div class="buscador__cuerpo">
      <p class="eyebrow">Lo más buscado</p>
      <div class="buscador__chips">
        ${['Velas', 'Cerámica', 'Regalos', 'Difusor', 'Lino'].map((t) => `<button class="chip" type="button" data-sugerencia="${t}">${t}</button>`).join('')}
      </div>
      <div data-buscar-resultados></div>
    </div>
  </div>`;

  const newsletter = `
  <section class="news seccion" aria-labelledby="news-titulo">
    <svg class="news__semilla" viewBox="0 0 32 32" aria-hidden="true"><path d="M16.4 2.6c6.6 1.3 11.4 7.2 11 14.3-.4 7.3-5.6 12.7-11.9 12.5C9.2 29.2 4.3 23.6 4.7 16.4 5.1 8.6 10.2 1.4 16.4 2.6Z" fill="currentColor"/></svg>
    <div class="wrap">
      <div class="news__grilla">
        <p class="eyebrow eyebrow--linea" data-reveal>Cartas desde NÖMA</p>
        <h2 class="h2 lineas" id="news-titulo" data-reveal><span class="l" style="--i:0"><span>Un poco de inspiración</span></span><span class="l" style="--i:1"><span><em>para tu casa.</em></span></span></h2>
        <p class="lead" data-reveal style="--d:120ms">Ideas, nuevos objetos y pequeños rituales. Nada de spam.</p>
        <form class="news__form" data-news data-reveal style="--d:200ms" novalidate>
          <label class="sr" for="news-email">Tu email</label>
          <input id="news-email" type="email" name="email" placeholder="Tu email" autocomplete="email" required>
          <button class="btn" type="submit">Quiero recibirlo ${ico('flecha', 'flecha')}</button>
        </form>
        <p class="news__legal" data-reveal style="--d:260ms">Una carta al mes. Te das de baja cuando quieras.</p>
        <p class="news__gracias" role="status">${ico('ok')}<span>Listo. Te esperamos en tu bandeja de entrada.</span></p>
      </div>
    </div>
  </section>`;

  const footer = `
  <footer class="pie">
    <div class="wrap">
      <div class="pie__grilla">
        <div class="pie__marca">
          <a href="index.html" aria-label="NÖMA, ir al inicio" style="text-decoration:none">${logo}</a>
          <p>Pequeños objetos. Grandes espacios.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><a href="coleccion.html">Todos los productos</a></li>
            <li><a href="coleccion.html?orden=nuevos">Nuevos</a></li>
            <li><a href="coleccion.html?orden=recomendados">Más vendidos</a></li>
            <li><a href="coleccion.html?cat=sets">Sets</a></li>
          </ul>
        </div>
        <div>
          <h4>Ayuda</h4>
          <ul>
            <li><a href="#" data-aviso="Enviamos a todo el país en 24 a 72 h hábiles. Gratis desde USD 100.">Envíos</a></li>
            <li><a href="#" data-aviso="Tenés 30 días para cambiar cualquier pieza sin uso.">Cambios</a></li>
            <li><a href="#" data-aviso="Esta es una tienda demo: las preguntas frecuentes irían acá.">Preguntas frecuentes</a></li>
            <li><a href="mailto:hola@nomahome.com">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4>NÖMA</h4>
          <ul>
            <li><a href="index.html#historia">Nuestra historia</a></li>
            <li><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://pinterest.com/" target="_blank" rel="noopener">Pinterest</a></li>
            <li><a href="https://tiktok.com/" target="_blank" rel="noopener">TikTok</a></li>
          </ul>
        </div>
      </div>
      <p class="pie__gigante" aria-hidden="true">NÖMA</p>
      <div class="pie__base">
        <span>© 2026 NÖMA · Marca ficticia, tienda demo</span>
        <nav aria-label="Legales">
          <a href="#" data-aviso="Política de privacidad: contenido de ejemplo para la demo.">Política de privacidad</a>
          <a href="#" data-aviso="Términos y condiciones: contenido de ejemplo para la demo.">Términos</a>
        </nav>
      </div>
    </div>
  </footer>

  <div class="ns-top" id="ns-top">
    <button type="button" class="ns-top__button" aria-label="Volver arriba">
      <svg class="ns-top__ring" viewBox="0 0 56 56" aria-hidden="true" focusable="false">
        <circle class="ns-top__track" cx="28" cy="28" r="25"/>
        <circle class="ns-top__progress" cx="28" cy="28" r="25" pathLength="1"/>
      </svg>
      <svg class="ns-top__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
  <div class="aviso" role="status" aria-live="polite" data-aviso-caja></div>`;

  document.body.insertAdjacentHTML('afterbegin', sprite + header);
  const main = document.querySelector('main');
  main.insertAdjacentHTML('afterend', newsletter + footer + carrito);

  // Marca el enlace de la página actual
  const aqui = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.ns-nav a').forEach((a) => {
    const destino = a.getAttribute('href');
    if (destino === aqui + location.search) a.classList.add('is-active');
  });
})();
