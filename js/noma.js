/**
 * NÖMA · Comportamiento de la tienda demo. Sin dependencias.
 * Carrito (localStorage), agregar rápido, envío gratis, buscador, colección y producto.
 * Lógica equivalente a la AJAX Cart API de Shopify: agregar / cambiar / quitar sin recargar.
 */
(() => {
  const D = window.NOMA;
  const ico = window.ico;
  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const menosMovimiento = matchMedia('(prefers-reduced-motion: reduce)');
  const porId = Object.fromEntries(D.productos.map((p) => [p.id, p]));
  const dinero = (n) => `${D.moneda} ${Number.isInteger(n) ? n : n.toFixed(2)}`;
  const pintar = (ctx) => window.NomaArte?.pintarTodo(ctx);

  // ?captura desactiva las animaciones (para capturas de pantalla de página completa)
  if (!menosMovimiento.matches && !new URLSearchParams(location.search).has('captura')) root.classList.add('anim');

  /* =====================================================================
     Aparición al hacer scroll
     ===================================================================== */
  const io =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entradas) =>
            entradas.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add('is-in');
                io.unobserve(e.target);
              }
            }),
          { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
        )
      : null;

  function revelar(ctx = document) {
    $$('[data-reveal]:not(.is-in)', ctx).forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')));
  }

  /* =====================================================================
     Aviso (toast)
     ===================================================================== */
  let avisoTimer;
  function aviso(texto) {
    const caja = $('[data-aviso-caja]');
    if (!caja) return;
    caja.textContent = texto;
    caja.classList.add('is-visible');
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => caja.classList.remove('is-visible'), 3800);
  }

  /* =====================================================================
     Productos: precio, variantes y card
     ===================================================================== */
  const variantes = (p) => p.opcion?.valores ?? [{ v: null, precio: p.precio }];
  const primeraDisponible = (p) => variantes(p).find((v) => !v.agotado) ?? variantes(p)[0];
  const precioDe = (p, v) => variantes(p).find((x) => x.v === v)?.precio ?? p.precio;
  // Fotos: con fotos cargadas se muestran solo las vistas que existen; sin fotos, todas las ilustraciones
  const mapaFotos = window.NOMA_FOTOS || {};
  const hayFotos = Array.isArray(mapaFotos) ? mapaFotos.length > 0 : Object.keys(mapaFotos).length > 0;
  const tieneFoto = (k) => (Array.isArray(mapaFotos) ? mapaFotos.includes(k) : Boolean(mapaFotos[k]));
  const tieneHover = (id) => !hayFotos || tieneFoto(`${id}-2.webp`);

  const desde = (p) => new Set(variantes(p).map((v) => v.precio)).size > 1;

  function etiquetas(p) {
    if (p.precioAnterior) return `<span class="etiqueta etiqueta--terra">Set especial</span>`;
    if (p.nuevo) return `<span class="etiqueta">Nuevo</span>`;
    if (p.pocas) return `<span class="etiqueta etiqueta--oscura">Últimas unidades</span>`;
    return '';
  }

  function card(p, i = 0, { eager = false } = {}) {
    const v = primeraDisponible(p);
    return `
    <article class="card" data-reveal style="--d:${(i % 4) * 90}ms">
      <div class="card__marco">
        <a class="card__media" href="producto.html?p=${p.id}" tabindex="-1" aria-hidden="true">
          <div class="arte arte--1" data-arte="producto:${p.id}:0" data-foto="${p.id}-1.webp" data-alt="${p.nombre}"${eager ? ' data-eager="1"' : ''}></div>
          ${tieneHover(p.id) ? `<div class="arte arte--2" data-arte="producto:${p.id}:1" data-foto="${p.id}-2.webp"></div>` : ''}
        </a>
        <div class="card__etiquetas">${etiquetas(p)}</div>
        <button class="agregar" type="button" data-agregar="${p.id}" data-variante="${v.v ?? ''}" aria-label="Agregar ${p.nombre} al carrito">
          ${ico('mas')}<span class="agregar__txt btn__txt">Agregar</span>
          <span class="btn__ok" aria-hidden="true">Agregado ✓</span>
        </button>
      </div>
      <div class="card__info">
        <h3 class="card__nombre"><a href="producto.html?p=${p.id}">${p.nombre}</a></h3>
        <p class="card__precio">${desde(p) ? '<span style="color:var(--muted)">desde</span> ' : ''}${dinero(p.precio)}${p.precioAnterior ? ` <s>${dinero(p.precioAnterior)}</s>` : ''}</p>
        ${p.opcion ? `<p class="card__variante">${p.opcion.valores.map((x) => x.v).join(' · ')}</p>` : `<p class="card__variante">${D.categorias[p.categoria].nombre}</p>`}
      </div>
    </article>`;
  }

  /* =====================================================================
     Carrito
     ===================================================================== */
  const CLAVE = 'noma-carrito';
  let lineas = [];
  try {
    lineas = JSON.parse(localStorage.getItem(CLAVE) || '[]').filter((l) => porId[l.id]);
  } catch (e) {
    lineas = [];
  }
  const guardar = () => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(lineas));
    } catch (e) {
      /* navegación privada: el carrito vive solo en esta visita */
    }
  };
  const clave = (id, v) => `${id}|${v ?? ''}`;
  const cantidadTotal = () => lineas.reduce((s, l) => s + l.cant, 0);
  const subtotal = () => lineas.reduce((s, l) => s + precioDe(porId[l.id], l.v) * l.cant, 0);

  function renderCarrito(nueva) {
    const carrito = $('#carrito');
    if (!carrito) return;
    const total = cantidadTotal();
    $$('[data-contador]').forEach((c) => (c.textContent = total));
    carrito.classList.toggle('is-vacio', total === 0);

    $('[data-lineas]').innerHTML = lineas
      .map((l) => {
        const p = porId[l.id];
        return `
        <li class="linea${clave(l.id, l.v) === nueva ? ' is-nueva' : ''}" data-linea="${clave(l.id, l.v)}">
          <a href="producto.html?p=${p.id}" tabindex="-1" aria-hidden="true"><div class="arte" data-arte="producto:${p.id}:0" data-foto="${p.id}-1.webp"></div></a>
          <div class="linea__info">
            <a class="linea__nombre" href="producto.html?p=${p.id}">${p.nombre}</a>
            <span class="linea__variante">${l.v ? `${p.opcion.nombre}: ${l.v}` : D.categorias[p.categoria].nombre}</span>
            <div class="linea__acciones">
              <div class="cantidad">
                <button type="button" data-cambiar="-1" aria-label="Quitar uno">${ico('menos')}</button>
                <output aria-live="polite">${l.cant}</output>
                <button type="button" data-cambiar="1" aria-label="Sumar uno">${ico('mas')}</button>
              </div>
              <button class="linea__quitar" type="button" data-quitar>Eliminar</button>
            </div>
          </div>
          <span class="linea__precio">${dinero(precioDe(p, l.v) * l.cant)}</span>
        </li>`;
      })
      .join('');
    pintar(carrito);

    // Envío gratis
    const st = subtotal();
    const falta = Math.max(0, D.envioGratis - st);
    const envio = $('[data-envio]');
    envio.classList.toggle('is-listo', falta === 0);
    $('[data-envio-texto]').innerHTML = falta
      ? `Te faltan <strong>${dinero(falta)}</strong> para obtener envío gratis.`
      : '¡Envío gratis desbloqueado! ✨';
    requestAnimationFrame(() => ($('[data-envio-barra]').style.width = `${Math.min(100, (st / D.envioGratis) * 100)}%`));
    $('[data-subtotal]').textContent = dinero(st);
  }

  function agregar(id, v, cant = 1) {
    const k = clave(id, v);
    const l = lineas.find((x) => clave(x.id, x.v) === k);
    if (l) l.cant += cant;
    else lineas.unshift({ id, v: v || null, cant });
    guardar();
    renderCarrito(k);
    $$('[data-contador]').forEach((c) => {
      c.classList.remove('pop');
      void c.offsetWidth;
      c.classList.add('pop');
    });
  }

  /* Paneles (carrito, buscador, hoja de filtros): tarjeta flotante con el fondo desenfocado */
  let panelAbierto = null;
  let focoPrevio = null;

  function abrir(panel) {
    if (!panel) return;
    if (panelAbierto && panelAbierto !== panel) cerrar(false);
    focoPrevio = document.activeElement;
    panelAbierto = panel;
    panel.inert = false;
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('is-abierto');
    $('[data-velo]').classList.add('is-visible');
    root.classList.add('no-scroll', 'panel-abierto');
    setTimeout(() => ($('input', panel) || $('[data-cerrar]', panel))?.focus({ preventScroll: true }), 80);
  }

  function cerrar(devolverFoco = true) {
    if (!panelAbierto) return;
    const panel = panelAbierto;
    panelAbierto = null;
    panel.classList.remove('is-abierto');
    panel.setAttribute('aria-hidden', 'true');
    panel.inert = true;
    $('[data-velo]').classList.remove('is-visible');
    root.classList.remove('no-scroll', 'panel-abierto');
    if (devolverFoco) focoPrevio?.focus?.({ preventScroll: true });
  }

  /* Estado del botón: cargando → "Agregado ✓" → vuelve */
  function feedback(boton, alTerminar) {
    if (boton.classList.contains('is-loading')) return;
    boton.classList.add('is-loading');
    setTimeout(() => {
      boton.classList.remove('is-loading');
      boton.classList.add('is-added');
      alTerminar();
      setTimeout(() => boton.classList.remove('is-added'), 1700);
    }, 420);
  }

  /* =====================================================================
     Clicks globales
     ===================================================================== */
  document.addEventListener('click', (e) => {
    const t = e.target instanceof Element ? e.target : null;
    if (!t) return;

    const btnAgregar = t.closest('[data-agregar]');
    if (btnAgregar) {
      e.preventDefault();
      const ids = btnAgregar.dataset.agregar.split(',');
      feedback(btnAgregar, () => {
        ids.forEach((id) => agregar(id, ids.length > 1 ? primeraDisponible(porId[id]).v : btnAgregar.dataset.variante || null));
        abrir($('#carrito')); // firma NS: el carrito se abre solo al agregar
      });
      return;
    }

    if (t.closest('[data-abrir-carrito]')) return abrir($('#carrito'));
    if (t.closest('[data-abrir-buscador]')) {
      if (root.classList.contains('ns-menu-open')) $('.ns-menu-btn')?.click();
      return abrir($('#buscador'));
    }
    if (t.closest('[data-cerrar]') || t.closest('[data-velo]')) return cerrar();

    const linea = t.closest('[data-linea]');
    if (linea) {
      const l = lineas.find((x) => clave(x.id, x.v) === linea.dataset.linea);
      if (t.closest('[data-cambiar]')) {
        l.cant += Number(t.closest('[data-cambiar]').dataset.cambiar);
        if (l.cant < 1) lineas = lineas.filter((x) => x !== l);
        guardar();
        renderCarrito();
      } else if (t.closest('[data-quitar]')) {
        linea.style.transition = 'opacity .3s, transform .4s';
        linea.style.opacity = '0';
        linea.style.transform = 'translateX(24px)';
        setTimeout(() => {
          lineas = lineas.filter((x) => x !== l);
          guardar();
          renderCarrito();
        }, 280);
      }
      return;
    }

    if (t.closest('[data-checkout]')) return aviso('Demo: acá seguiría el checkout seguro de la tienda.');

    const conAviso = t.closest('[data-aviso]');
    if (conAviso) {
      e.preventDefault();
      aviso(conAviso.dataset.aviso);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panelAbierto) cerrar();
  });

  /* =====================================================================
     Buscador instantáneo
     ===================================================================== */
  const normalizar = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  function buscar(q) {
    const caja = $('[data-buscar-resultados]');
    if (!caja) return;
    const n = normalizar(q.trim());
    if (!n) {
      caja.innerHTML = '';
      return;
    }
    const sinonimos = { regalo: 'sets', regalos: 'sets', velas: 'vela', ceramica: 'ceramica' };
    const terminos = n.split(/\s+/).map((x) => sinonimos[x] || x);
    const hallados = D.productos.filter((p) => {
      const texto = normalizar(`${p.nombre} ${D.categorias[p.categoria].nombre} ${p.categoria} ${p.breve} ${D.colores[p.color].nombre}`);
      return terminos.every((x) => texto.includes(x) || texto.includes(x.replace(/s$/, '')));
    });
    caja.innerHTML = hallados.length
      ? `<div class="buscador__resultados">${hallados
          .map(
            (p) => `<a href="producto.html?p=${p.id}"><div class="arte" data-arte="producto:${p.id}:0" data-foto="${p.id}-1.webp"></div><strong>${p.nombre}</strong><span>${dinero(p.precio)}</span></a>`
          )
          .join('')}</div>`
      : `<p class="buscador__nada">Nada con “${q}” (todavía). Probá con velas, cerámica o sets.</p>`;
    pintar(caja);
  }
  $('[data-buscar-input]')?.addEventListener('input', (e) => buscar(e.target.value));
  $('[data-buscar-form]')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = $('[data-buscar-input]').value.trim();
    if (q) location.href = `coleccion.html?q=${encodeURIComponent(q)}`;
  });
  $$('[data-sugerencia]').forEach((b) =>
    b.addEventListener('click', () => {
      $('[data-buscar-input]').value = b.dataset.sugerencia;
      buscar(b.dataset.sugerencia);
    })
  );

  /* =====================================================================
     Newsletter
     ===================================================================== */
  $$('[data-news]').forEach((form) =>
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = $('input', form);
      if (!input.checkValidity() || !input.value) {
        input.focus();
        input.setAttribute('aria-invalid', 'true');
        input.placeholder = 'Revisá tu email';
        return;
      }
      form.closest('.news').classList.add('is-enviado');
    })
  );

  /* =====================================================================
     Carruseles
     ===================================================================== */
  function riel(caja) {
    const pista = $('.riel', caja);
    const prev = $('[data-prev]', caja);
    const next = $('[data-next]', caja);
    if (!pista) return;
    const ir = (dir) => pista.scrollBy({ left: dir * pista.clientWidth * 0.85, behavior: menosMovimiento.matches ? 'auto' : 'smooth' });
    prev?.addEventListener('click', () => ir(-1));
    next?.addEventListener('click', () => ir(1));
    const estado = () => {
      if (prev) prev.disabled = pista.scrollLeft < 8;
      if (next) next.disabled = pista.scrollLeft + pista.clientWidth > pista.scrollWidth - 8;
    };
    pista.addEventListener('scroll', estado, { passive: true });
    estado();
  }

  /* =====================================================================
     Página: inicio
     ===================================================================== */
  function inicio() {
    const fav = $('[data-favoritos]');
    if (fav) {
      fav.innerHTML = ['vela-ambar', 'jarron-arco', 'bandeja-terra', 'difusor-bosque'].map((id, i) => card(porId[id], i)).join('');
    }

    // Encontrá un rincón para cada cosa
    const rincon = $('[data-rincon]');
    const gatillo = $('[data-gatillo]', rincon || document);
    if (rincon && gatillo) {
      const set = (on) => {
        rincon.classList.toggle('is-activo', on);
        gatillo.setAttribute('aria-expanded', String(on));
      };
      const tactil = matchMedia('(hover: none)').matches;
      if (!tactil) {
        gatillo.addEventListener('mouseenter', () => set(true));
        rincon.addEventListener('mouseleave', () => set(false));
      }
      gatillo.addEventListener('focus', () => set(true));
      gatillo.addEventListener('blur', () => set(false));
      gatillo.addEventListener('click', () => set(!rincon.classList.contains('is-activo')));
      if (!tactil && !menosMovimiento.matches) {
        let raf;
        rincon.addEventListener('pointermove', (e) => {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            const r = rincon.getBoundingClientRect();
            rincon.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
            rincon.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
          });
        });
      }
    }
  }

  /* =====================================================================
     Página: colección
     ===================================================================== */
  function coleccion() {
    const grilla = $('[data-grilla]');
    if (!grilla) return;
    const params = new URLSearchParams(location.search);
    const estado = {
      cats: (params.get('cat') || '').split(',').filter((c) => D.categorias[c]),
      precio: params.get('precio') || '',
      colores: (params.get('color') || '').split(',').filter((c) => D.colores[c]),
      pocas: params.get('stock') === 'pocas',
      orden: params.get('orden') || 'recomendados',
      q: params.get('q') || '',
    };

    const rangos = {
      h35: { nombre: 'Hasta USD 35', ok: (p) => p.precio <= 35 },
      '35-50': { nombre: 'USD 35 a 50', ok: (p) => p.precio > 35 && p.precio <= 50 },
      m50: { nombre: 'Más de USD 50', ok: (p) => p.precio > 50 },
    };

    const pasa = (p, sin = '') =>
      (sin === 'cats' || !estado.cats.length || estado.cats.includes(p.categoria)) &&
      (sin === 'precio' || !estado.precio || rangos[estado.precio].ok(p)) &&
      (sin === 'colores' || !estado.colores.length || estado.colores.includes(p.color)) &&
      (sin === 'pocas' || !estado.pocas || p.pocas) &&
      (!estado.q || normalizar(`${p.nombre} ${p.categoria} ${p.breve}`).includes(normalizar(estado.q).replace(/s$/, '')));

    const ordenar = {
      recomendados: (a, b) => a.orden - b.orden,
      nuevos: (a, b) => b.fecha.localeCompare(a.fecha),
      'precio-asc': (a, b) => a.precio - b.precio,
      'precio-desc': (a, b) => b.precio - a.precio,
    };

    // Encabezado según categoría
    const unaCat = estado.cats.length === 1 ? D.categorias[estado.cats[0]] : null;
    const titulo = estado.q ? `“${estado.q}”` : unaCat ? unaCat.titulo : estado.cats.length > 1 ? 'Objetos' : 'Colección';
    $('[data-col-titulo]').textContent = titulo;
    $('[data-col-texto]').textContent = estado.q
      ? 'Resultados de tu búsqueda.'
      : unaCat
        ? unaCat.texto
        : 'Piezas para darle personalidad a cada rincón.';
    document.title = `${titulo.replace(/[“”]/g, '')} · NÖMA`;

    // Accesos por categoría
    $('[data-col-cats]').innerHTML =
      `<a class="chip${!estado.cats.length ? ' is-activo' : ''}" href="coleccion.html">Todo</a>` +
      Object.entries(D.categorias)
        .map(([id, c]) => `<a class="chip${estado.cats.length === 1 && estado.cats[0] === id ? ' is-activo' : ''}" href="coleccion.html?cat=${id}">${c.nombre}</a>`)
        .join('');

    const cuenta = (sin, ok) => D.productos.filter((p) => pasa(p, sin) && ok(p)).length;
    const opcion = (tipo, nombre, valor, etiqueta, checked, n, extra = '') =>
      `<label class="opcion${n === 0 && !checked ? ' is-vacia' : ''}"><input type="${tipo}" name="${nombre}" value="${valor}"${checked ? ' checked' : ''}>${extra}${etiqueta}<small>${n}</small></label>`;

    const grupos = () => ({
      cats: {
        nombre: 'Categoría',
        activos: estado.cats.length,
        html: Object.entries(D.categorias)
          .map(([id, c]) => opcion('checkbox', 'cat', id, c.nombre, estado.cats.includes(id), cuenta('cats', (p) => p.categoria === id)))
          .join(''),
      },
      precio: {
        nombre: 'Precio',
        activos: estado.precio ? 1 : 0,
        html:
          opcion('radio', 'precio', '', 'Todos', !estado.precio, cuenta('precio', () => true)) +
          Object.entries(rangos)
            .map(([id, r]) => opcion('radio', 'precio', id, r.nombre, estado.precio === id, cuenta('precio', r.ok)))
            .join(''),
      },
      colores: {
        nombre: 'Color',
        activos: estado.colores.length,
        html: Object.entries(D.colores)
          .map(([id, c]) =>
            opcion('checkbox', 'color', id, c.nombre, estado.colores.includes(id), cuenta('colores', (p) => p.color === id), `<span class="muestra" style="background:${c.hex}"></span>`)
          )
          .join(''),
      },
      pocas: {
        nombre: 'Disponibilidad',
        activos: estado.pocas ? 1 : 0,
        html:
          `<p style="margin:0 0 6px;font-size:13px;color:var(--muted)">Todo con envío inmediato.</p>` +
          opcion('checkbox', 'stock', 'pocas', 'Últimas unidades', estado.pocas, cuenta('pocas', (p) => p.pocas)),
      },
    });

    const selectOrden = (id) => `
      <div class="orden">
        <label class="sr" for="${id}">Ordenar por</label>
        <select id="${id}" name="orden" data-orden>
          ${[['recomendados', 'Recomendados'], ['nuevos', 'Más nuevos'], ['precio-asc', 'Precio: menor a mayor'], ['precio-desc', 'Precio: mayor a menor']]
            .map(([v, t]) => `<option value="${v}"${estado.orden === v ? ' selected' : ''}>${t}</option>`)
            .join('')}
        </select>${ico('chevron')}
      </div>`;

    function leerForm(form) {
      const fd = new FormData(form);
      estado.cats = fd.getAll('cat');
      estado.precio = fd.get('precio') || '';
      estado.colores = fd.getAll('color');
      estado.pocas = fd.get('stock') === 'pocas';
      if (fd.get('orden')) estado.orden = fd.get('orden');
    }

    function url() {
      const p = new URLSearchParams();
      if (estado.cats.length) p.set('cat', estado.cats.join(','));
      if (estado.precio) p.set('precio', estado.precio);
      if (estado.colores.length) p.set('color', estado.colores.join(','));
      if (estado.pocas) p.set('stock', 'pocas');
      if (estado.orden !== 'recomendados') p.set('orden', estado.orden);
      if (estado.q) p.set('q', estado.q);
      const s = p.toString();
      return `coleccion.html${s ? `?${s}` : ''}`;
    }

    function barra() {
      const g = grupos();
      const abiertos = $$('[data-filtro][open]').map((d) => d.dataset.filtro);
      $('[data-filtros]').innerHTML = Object.entries(g)
        .map(
          ([id, x]) => `
          <details class="desplegable" data-filtro="${id}"${abiertos.includes(id) ? ' open' : ''}>
            <summary>${x.nombre}${x.activos ? ` <b>${x.activos}</b>` : ''} ${ico('chevron')}</summary>
            <div class="desplegable__panel">${x.html}</div>
          </details>`
        )
        .join('');
      $('[data-orden-caja]').innerHTML = selectOrden('orden-escritorio');
      $('[data-hoja-cuerpo]').innerHTML =
        Object.values(g)
          .map((x) => `<fieldset><legend>${x.nombre}</legend>${x.html}</fieldset>`)
          .join('') + `<fieldset><legend>Ordenar por</legend>${selectOrden('orden-movil')}</fieldset>`;
      const totalActivos = Object.values(g).reduce((s, x) => s + x.activos, 0);
      $('[data-activos-n]').textContent = totalActivos ? `(${totalActivos})` : '';

      // Chips de filtros activos
      const chips = [
        ...estado.cats.map((c) => [D.categorias[c].nombre, () => (estado.cats = estado.cats.filter((x) => x !== c))]),
        ...(estado.precio ? [[rangos[estado.precio].nombre, () => (estado.precio = '')]] : []),
        ...estado.colores.map((c) => [D.colores[c].nombre, () => (estado.colores = estado.colores.filter((x) => x !== c))]),
        ...(estado.pocas ? [['Últimas unidades', () => (estado.pocas = false)]] : []),
        ...(estado.q ? [[`Búsqueda: ${estado.q}`, () => (estado.q = '')]] : []),
      ];
      const activos = $('[data-activos]');
      activos.innerHTML = chips.length
        ? chips.map(([t], i) => `<button class="chip" type="button" data-quitar-filtro="${i}">${t} ${ico('cerrar')}</button>`).join('') +
          `<button class="link" type="button" data-limpiar>Limpiar todo</button>`
        : '';
      $$('[data-quitar-filtro]', activos).forEach((b) =>
        b.addEventListener('click', () => {
          chips[Number(b.dataset.quitarFiltro)][1]();
          aplicar();
        })
      );
      $('[data-limpiar]', activos)?.addEventListener('click', () => {
        Object.assign(estado, { cats: [], precio: '', colores: [], pocas: false, q: '' });
        aplicar();
      });
    }

    function productos() {
      const lista = D.productos.filter((p) => pasa(p)).sort(ordenar[estado.orden] || ordenar.recomendados);
      $('[data-cuenta]').textContent = `${lista.length} ${lista.length === 1 ? 'pieza' : 'piezas'}`;
      $('[data-col-n]').textContent = String(lista.length).padStart(2, '0');
      const tile = `
        <a class="tile" href="producto.html?p=set-ritual" data-reveal>
          <div class="tile__texto">
            <p class="eyebrow">El ritual NÖMA</p>
            <p>Piezas que se quedan. <em>Momentos que vuelven.</em></p>
            <span class="link">Ver el set ${ico('flecha', 'flecha')}</span>
          </div>
          <div class="arte" data-arte="escena:tile" data-foto="tile-coleccion.webp"></div>
        </a>`;
      const cards = lista.map((p, i) => card(p, i, { eager: i < 4 }));
      if (lista.length >= 5 && !estado.cats.includes('sets')) cards.splice(4, 0, tile);
      grilla.innerHTML = lista.length
        ? cards.join('')
        : `<div class="sin-resultados"><p>No encontramos piezas con esos filtros.</p><button class="btn btn--ghost" type="button" data-limpiar-todo>Ver toda la colección</button></div>`;
      $('[data-limpiar-todo]', grilla)?.addEventListener('click', () => {
        Object.assign(estado, { cats: [], precio: '', colores: [], pocas: false, q: '' });
        aplicar();
      });
      pintar(grilla);
      revelar(grilla);
    }

    function aplicar(push = true) {
      grilla.classList.add('is-cargando');
      if (push) history.replaceState(null, '', url());
      barra();
      setTimeout(() => {
        productos();
        grilla.classList.remove('is-cargando');
      }, 160);
    }

    // Filtros de escritorio (desplegables) y de celular (hoja)
    $('[data-form-filtros]').addEventListener('change', (e) => {
      leerForm(e.currentTarget);
      aplicar();
    });
    $('[data-form-hoja]').addEventListener('change', (e) => {
      leerForm(e.currentTarget);
      aplicar();
    });
    $('[data-form-hoja]').addEventListener('submit', (e) => {
      e.preventDefault();
      cerrar();
    });
    $('[data-abrir-filtros]').addEventListener('click', () => abrir($('#hoja-filtros')));
    $('[data-hoja-limpiar]').addEventListener('click', () => {
      Object.assign(estado, { cats: [], precio: '', colores: [], pocas: false, q: '' });
      aplicar();
    });
    document.addEventListener('click', (e) => {
      $$('[data-filtro][open]').forEach((d) => {
        if (!d.contains(e.target)) d.removeAttribute('open');
      });
    });

    barra();
    productos();
  }

  /* =====================================================================
     Página: producto
     ===================================================================== */
  function producto() {
    const caja = $('[data-producto]');
    if (!caja) return;
    const p = porId[new URLSearchParams(location.search).get('p')] || porId['vela-ambar'];
    const cat = D.categorias[p.categoria];
    let variante = primeraDisponible(p).v;
    document.title = `${p.nombre} · NÖMA`;

    // Con fotos, la galería muestra la principal (y la segunda si existe); la de ambiente va en "Sobre este producto"
    const vistas = hayFotos ? [0, ...(tieneHover(p.id) ? [1] : [])] : [0, 1, 2];
    caja.innerHTML = `
      <div class="wrap">
        <ol class="migas">
          <li><a href="index.html">Inicio</a></li>
          <li><a href="coleccion.html?cat=${p.categoria}">${cat.nombre}</a></li>
          <li aria-current="page">${p.nombre}</li>
        </ol>
        <div class="prod__grilla">
          <div class="galeria-caja">
            <div class="galeria" data-galeria>
              ${vistas
                .map(
                  (n) => `<figure class="galeria__item"><div class="arte" data-arte="producto:${p.id}:${n}" data-foto="${p.id}-${n + 1}.webp" data-alt="${p.nombre}, vista ${n + 1}"${n === 0 ? ' data-eager="1"' : ''}></div></figure>`
                )
                .join('')}
            </div>
            <span class="galeria__contador" aria-hidden="true"${vistas.length < 2 ? ' hidden' : ''}><span data-foto-n>1</span> / ${vistas.length}</span>
          </div>

          <div class="prod__info">
            <p class="eyebrow eyebrow--linea">${cat.nombre}${p.nuevo ? ' · Nuevo' : ''}</p>
            <h1 class="h1 prod__nombre">${p.nombre}</h1>
            <p class="prod__precio"><span data-precio>${dinero(precioDe(p, variante))}</span>${p.precioAnterior ? ` <s>${dinero(p.precioAnterior)}</s>` : ''}</p>
            <p class="prod__breve">${p.breve}</p>
            ${
              p.opcion
                ? `<fieldset class="variantes">
                    <legend>${p.opcion.nombre} <span data-variante-nombre>${variante}</span></legend>
                    <div class="variantes__opciones">
                      ${p.opcion.valores
                        .map(
                          (x) => `<label class="pastilla"><input type="radio" name="variante" value="${x.v}"${x.v === variante ? ' checked' : ''}${x.agotado ? ' disabled' : ''}><span${x.agotado ? ' style="text-decoration:line-through;opacity:.45;cursor:not-allowed"' : ''}>${x.v}</span></label>`
                        )
                        .join('')}
                    </div>
                  </fieldset>`
                : ''
            }
            ${p.incluye ? `<ul class="ventajas" style="border:0;padding:0">${p.incluye.map((x) => `<li>${ico('ok')}${x}</li>`).join('')}</ul>` : ''}
            <div class="prod__comprar">
              <div class="cantidad">
                <button type="button" data-cant="-1" aria-label="Quitar uno">${ico('menos')}</button>
                <label class="sr" for="cantidad">Cantidad</label>
                <input id="cantidad" type="number" min="1" value="1" inputmode="numeric" data-cant-input>
                <button type="button" data-cant="1" aria-label="Sumar uno">${ico('mas')}</button>
              </div>
              <button class="btn" type="button" data-comprar>
                <span class="btn__txt">Agregar al carrito</span>${ico('flecha', 'flecha')}
                <span class="btn__ok" aria-hidden="true">Agregado ✓</span>
              </button>
            </div>
            <ul class="ventajas">
              <li>${ico('camion')}Envío gratis desde ${dinero(D.envioGratis)}</li>
              <li>${ico('cambio')}Cambios dentro de 30 días</li>
              <li>${ico('candado')}Compra segura</li>
            </ul>
            <div class="acordeon">
              <details open>
                <summary>Detalles ${ico('mas')}</summary>
                <div class="acordeon__cuerpo"><dl>${Object.entries(p.detalles).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl></div>
              </details>
              <details>
                <summary>Cuidados ${ico('mas')}</summary>
                <div class="acordeon__cuerpo">${p.cuidados}</div>
              </details>
              <details>
                <summary>Envíos y cambios ${ico('mas')}</summary>
                <div class="acordeon__cuerpo">Preparamos cada pedido a mano y lo despachamos en 24 a 72 h hábiles. Envío gratis desde ${dinero(D.envioGratis)}. Si algo no te convence, tenés 30 días para cambiarlo.</div>
              </details>
            </div>
          </div>
        </div>
      </div>`;

    // Sobre este producto
    $('[data-sobre]').innerHTML = `
      <div class="wrap sobre__grilla">
        <div class="sobre__titulo" data-reveal>
          <p class="eyebrow eyebrow--linea">Sobre este producto</p>
          <h2 class="h2" style="margin-top:20px">Hecho para <em>quedarse.</em></h2>
        </div>
        <div class="sobre__texto" data-reveal style="--d:120ms">${p.descripcion.map((t) => `<p>${t}</p>`).join('')}</div>
        <blockquote class="sobre__cita" data-reveal>“${p.breve}”</blockquote>
        <div class="arte sobre__img" data-reveal="cortina" data-arte="producto:${p.id}:2" data-foto="${p.id}-3.webp"></div>
      </div>`;

    // Cómo combinarlo
    const combo = [p.id, ...p.combina];
    const totalCombo = combo.reduce((s, id) => s + primeraDisponible(porId[id]).precio, 0);
    $('[data-combina]').innerHTML = `
      <div class="wrap">
        <div class="cabeza cabeza--dividida">
          <div>
            <p class="eyebrow eyebrow--linea" data-reveal>Cómo combinarlo</p>
            <h2 class="h2" style="margin-top:20px" data-reveal>Armá tu <em>rincón.</em></h2>
          </div>
          <p class="lead" data-reveal>Tres piezas que se entienden entre sí. Sumalas juntas y dejá que hagan su magia.</p>
        </div>
        <div class="combina__grilla">
          <div class="combina__piezas">${combo.map((id, i) => `<div class="combina__pieza">${card(porId[id], i)}</div>`).join('')}</div>
          <div class="combina__total" data-reveal>
            <dl>
              ${combo.map((id) => `<div><dt>${porId[id].nombre}</dt><dd>${dinero(primeraDisponible(porId[id]).precio)}</dd></div>`).join('')}
              <div><dt>Total</dt><dd>${dinero(totalCombo)}</dd></div>
            </dl>
            <button class="btn btn--bloque" type="button" data-agregar="${combo.join(',')}">
              <span class="btn__txt">Agregar las ${combo.length} piezas</span>${ico('flecha', 'flecha')}
              <span class="btn__ok" aria-hidden="true">Agregado ✓</span>
            </button>
            ${totalCombo >= D.envioGratis ? `<p style="margin:0;font-size:13px;color:var(--muted)">${ico('camion')} Con este combo tu envío es gratis.</p>` : ''}
          </div>
        </div>
      </div>`;

    // También te puede gustar
    const otros = D.productos.filter((x) => x.id !== p.id).sort((a, b) => (a.categoria === p.categoria ? -1 : 0) - (b.categoria === p.categoria ? -1 : 0) || a.orden - b.orden);
    $('[data-riel]').innerHTML = `
      <div class="wrap">
        <div class="riel__cabeza">
          <div>
            <p class="eyebrow eyebrow--linea" data-reveal>Seguí descubriendo</p>
            <h2 class="h2" style="margin-top:20px" data-reveal>También te puede <em>gustar.</em></h2>
          </div>
          <div class="riel__nav">
            <button class="redondo" type="button" data-prev aria-label="Anteriores">${ico('izq')}</button>
            <button class="redondo" type="button" data-next aria-label="Siguientes">${ico('der')}</button>
          </div>
        </div>
        <div class="riel">${otros.map((x, i) => card(x, i)).join('')}</div>
      </div>`;
    riel($('[data-riel]'));

    // Barra de compra fija (celular y tablet)
    const fija = $('[data-compra-fija]');
    fija.innerHTML = `<div><strong>${p.nombre}</strong><span data-precio-fijo>${dinero(precioDe(p, variante))}</span></div>
      <button class="btn" type="button" data-comprar-fijo><span class="btn__txt">Agregar</span><span class="btn__ok" aria-hidden="true">Agregado ✓</span></button>`;

    // Variantes, cantidad y agregar
    const actualizarPrecio = () => {
      $('[data-precio]').textContent = dinero(precioDe(p, variante));
      $('[data-precio-fijo]').textContent = dinero(precioDe(p, variante));
    };
    $$('input[name="variante"]', caja).forEach((r) =>
      r.addEventListener('change', () => {
        variante = r.value;
        $('[data-variante-nombre]').textContent = variante;
        actualizarPrecio();
      })
    );
    const inputCant = $('[data-cant-input]');
    $$('[data-cant]', caja).forEach((b) =>
      b.addEventListener('click', () => {
        inputCant.value = Math.max(1, (Number(inputCant.value) || 1) + Number(b.dataset.cant));
      })
    );
    const comprar = (boton) =>
      feedback(boton, () => {
        agregar(p.id, variante, Math.max(1, Number(inputCant.value) || 1));
        abrir($('#carrito'));
      });
    $('[data-comprar]').addEventListener('click', (e) => comprar(e.currentTarget));
    $('[data-comprar-fijo]').addEventListener('click', (e) => comprar(e.currentTarget));

    // La barra fija aparece cuando el botón principal sale de la vista
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => fija.classList.toggle('is-visible', !e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 }).observe($('[data-comprar]'));
    }

    // Contador de la galería en celular
    const gal = $('[data-galeria]');
    gal.addEventListener(
      'scroll',
      () => {
        $('[data-foto-n]').textContent = Math.round(gal.scrollLeft / gal.clientWidth) + 1;
      },
      { passive: true }
    );
  }

  /* =====================================================================
     Arranque
     ===================================================================== */
  const pagina = document.body.dataset.pagina;
  if (pagina === 'inicio') inicio();
  if (pagina === 'coleccion') coleccion();
  if (pagina === 'producto') producto();

  renderCarrito();
  pintar();
  revelar();
})();
